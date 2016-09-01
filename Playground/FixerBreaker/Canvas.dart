part of FixerBreaker;


class Canvas {
  static const WIDTH = 960;
  static const HEIGHT = 570;
  static const BORDER_BUFFER = 5;

  Stage stage;
  RenderLoop renderLoop;
  bool dragging = false;
  Card draggedCard;
  int _n;
  List<List<Card>> _stacks = new List<List<Card>>();
  List<Sprite> _stackSprites = new List<Sprite>();
  math.Random _rand = new math.Random();
  bool gameOver = false;

  Canvas(String id, int n) {
    _n = n;

    Multitouch.inputMode = MultitouchInputMode.TOUCH_POINT;
    var htmlCanvas = html.querySelector('#' + id);

    stage = new Stage(htmlCanvas, width: WIDTH, height: HEIGHT);
    stage.scaleMode = StageScaleMode.EXACT_FIT;
    stage.align = StageAlign.NONE;

    renderLoop = new RenderLoop();
    renderLoop.addStage(stage);

    var background = new Sprite();
    background.graphics.rect(0, 0, WIDTH, HEIGHT);
    background.graphics.fillColor(0xfff7f7f7);
    background.name = "background";
    stage.addChild(background);

    stage.onMouseDown.listen(OnMouseDown);
    stage.onMouseUp.listen(OnMouseUp);
    stage.onMouseMove.listen(OnMouseMove);
    stage.onTouchBegin.listen(OnTouchBegin);
    stage.onTouchEnd.listen(OnTouchEnd);
    stage.onTouchMove.listen(OnTouchMove);

    for (int i = 0; i < _n; i++) AddStack(i);

    var w = (WIDTH - 2 * _n * BORDER_BUFFER) ~/ _n;
    var h = (HEIGHT - 2 * BORDER_BUFFER) ~/ ((_n + 2) / 3);

    var count = new List<int>.filled(_n, 0);
    var need = new List<int>.filled(_n, 2);
    need[0] = 0;
    need[1] = 1;
    while (true) {
      for (int i = 0; i < _n; i++) {
        var id = _rand.nextInt(_n);
        if (count[id] < need[id] && !_stacks[i].any((v) => v.id == id)) {
          var v = new Card(i * 1.0 / _n, id * 1.0 / _n, w, h, i, id);
          _stacks[i].add(v);
          stage.addChild(v);
          count[id]++;
        }
      }

      var done = true;
      for (int id = 0; id < _n; id++) {
        if (count[id] < need[id]) done = false;
      }

      if (done) break;
    }

    var ss = _stacks.firstWhere((s) => s.any((c) => c.id == 1));
    var v = new Card(ss[0].stack * 1.0 / _n, 1 * 1.0 / _n, w, h, ss[0].stack, 0);
    ss.add(v);
    stage.addChild(v);

    ArrangeStacks();
  }

  void OnTouchBegin(TouchEvent e) => OnDown(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnMouseDown(MouseEvent e) => OnDown(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnTouchEnd(TouchEvent e) => OnUp(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnMouseUp(MouseEvent e) => OnUp(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnTouchMove(TouchEvent e) => OnMove(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnMouseMove(MouseEvent e) => OnMove(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);

  void AddStack(int i) {
    _stacks.add(new List<Card>());

    var w = WIDTH ~/ _n;
    var stackSprite = new Sprite();
    stackSprite.graphics.rect(0, 0, w - 2 * BORDER_BUFFER, HEIGHT - 2 * BORDER_BUFFER);
    stackSprite.graphics.fillColor(0xffdddddd);
    stackSprite.x = BORDER_BUFFER + i * w;
    stackSprite.y = BORDER_BUFFER;

    _stackSprites.add(stackSprite);
    stage.addChild(stackSprite);
  }

  void ArrangeStacks() {
    for (int i = 0; i < _n; i++) {
      var top = _stackSprites[i].y + BORDER_BUFFER / 2;
      var left = _stackSprites[i].x;

      var stack = _stacks[i];
      stack.sort((a, b) => a.id < b.id ? 1 : -1);
      var indices = stack.map((c) => stage.getChildIndex(c)).toList();
      indices.sort();
      for (int j = stack.length - 1; j >= 0; j--) {
        stack[j].SendHome(x: left / WIDTH, y: (top + 0.33 * stack[j].h * j) / HEIGHT, index: indices[j]);
      }
    }
  }

  void OnDown(EventDispatcher target, double x, double y) {
    if (gameOver || dragging || !(target is Card)) return;

    dragging = true;
    draggedCard = target as Card;
    draggedCard.StartDrag(x, y);
  }

  num Overlap(Sprite v1, Sprite v2) {
    return math.max(0, math.min(v1.x + v1.width, v2.x + v2.width) - math.max(v1.x, v2.x)) * math.max(0, math.min(v1.y + v1.height, v2.y + v2.height) - math.max(v1.y, v2.y));
  }

  void OnUp(EventDispatcher target, double x, double y) {
    if (!dragging) return;


    var t = -1;
    var max = draggedCard.width * draggedCard.height / 2;
    for (int i = 0; i < _n; i++) {
      if (_stacks[i].any((v) => v.id == draggedCard.id)) continue;

      var overlap = Overlap(_stackSprites[i], draggedCard);
      if (overlap > max) {
        max = overlap;
        t = i;
      }
    }

    dragging = false;

    if (t >= 0) {
      var stack = draggedCard.stack;
      MoveCard(stack, t, draggedCard.id);
      ArrangeStacks();
      DoBreakerMove(stack, t, draggedCard.id);
      ArrangeStacks();
      var win = CheckWin(0, new List<int>());
      if (win != null) {
        gameOver = true;

        for (var card in win.reversed) {
          for (var otherCard in _stacks[card.stack].where((c) => c.id != card.id)) {
            var tween = new Tween(otherCard, 3.0);
            tween.animate.alpha.to(0);
            stage.renderLoop.juggler.add(tween);
          }
        }

      }
    } else {
      draggedCard.SendHome();
    }
  }

  // TODO: add Hopcroft-Karp implementation (or some better way using the fact that one side has max degree 2)
  List<Card> CheckWin(int i, List<int> used) {
    if (i >= _stacks.length) return new List<Card>();

    for (var v in _stacks[i].where((w) => !used.contains(w.id))) {
      used.add(v.id);
      var cl = CheckWin(i + 1, used);
      used.remove(v.id);
      if (cl != null) {
        cl.add(v);
        return cl;
      }
    }

    return null;
  }

  void OnMove(EventDispatcher target, double x, double y) {
    if (dragging) draggedCard.Dragged(x, y);
  }

  void DoBreakerMove(int stack1, int stack2, int id) {
    if (id != 0 && id != 1) {
      for (int i = 0; i < _n; i++) {
        var swapID = _rand.nextInt(_stacks.length);
        if (swapID == id) continue;
        if (swapID == 0) continue;
        if (swapID == 1) continue;
        var has1 = _stacks[stack1].any((v) => v.id == swapID);
        var has2 = _stacks[stack2].any((v) => v.id == swapID);

        if (has1 == has2) continue;

        if (has1) {
          MoveCard(stack1, stack2, swapID);
        } else {
          MoveCard(stack2, stack1, swapID);
        }
        break;
      }
    } else if (id == 0) {
      if (_stacks[stack1].any((s) => s.id == 1)) MoveCard(stack1, stack2, 1);
    } else {
      if (_stacks[stack1].any((s) => s.id == 0)) MoveCard(stack1, stack2, 0);
    }
  }

  void MoveCard(int from, int to, int id) {
    var card = _stacks[from].firstWhere((v) => v.id == id);
    _stacks[from].remove(card);
    _stacks[to].add(card);

    card.stack = to;
  }
}
