part of FixerBreaker;

class Card extends SvgDisplayObject {
  int id;

  int stack;
  num _homeX;
  num _homeY;
  num _ux;
  num _uy;
  int w;
  int h;
  bool _won = false;
  int _lastChildIndex;
  Point<double> dragOffset;

  num get ux => _ux;
  set ux(num v) {
    if (v != _ux) {
      _ux = v;
      Update();
    }
  }

  num get uy => _uy;
  set uy(num v) {
    if (v != _uy) {
      _uy = v;
      Update();
    }
  }

  bool get won => _won;
  set won(bool v) {
    if (v != _won) {
      _won = v;
      CompleteRedraw();
    }
  }

  Card(num ux, num uy, int w, int h, int stack, int id): super(Cards.Spades[12 - id], w, h) {
    _ux = ux;
    _uy = uy;
    this.w = w;
    this.h = h;
    this.stack = stack;
    this.id = id;
    _homeX = _ux;
    _homeY = _uy;
    CompleteRedraw();
  }

  void CompleteRedraw() {
    graphics.clear();
    graphics.rect(0, 0, w, h);
    graphics.fillColor(0x00000000);

    Update();
  }

  void Update() {
    x = _ux * Canvas.WIDTH;
    y = _uy * Canvas.HEIGHT;
  }

  void StartDrag(num x, num y) {
    _lastChildIndex = stage.getChildIndex(this);
    stage.setChildIndex(this, stage.numChildren - 1);
    dragOffset = new Point(_ux - x, _uy - y);
  }

  void SendHome({num x: null, num y: null, num index: null}) {
    if (index != null) _lastChildIndex = index;

    if (_lastChildIndex != null) stage.setChildIndex(this, _lastChildIndex);

    if (x != null) _homeX = x;
    if (y != null) _homeY = y;

    var tween = new Tween(this, 0.5);

    tween.animate.x.to(_homeX * Canvas.WIDTH);
    tween.animate.y.to(_homeY * Canvas.HEIGHT);
    tween.onComplete = () => AnimiationComplete();

    stage.renderLoop.juggler.add(tween);
  }

  void AnimiationComplete() {
    _ux = _homeX;
    _uy = _homeY;

    Update();
  }

  void Dragged(num x, num y) {
    _ux = dragOffset.x + x;
    _uy = dragOffset.y + y;
    Update();
  }
}
