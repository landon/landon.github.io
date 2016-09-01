part of FixerBreaker;

class Vertex extends Sprite {
  static const ONE_FILL_COLOR = 0xBB000099;
  static const ZERO_FILL_COLOR = 0xfff7f7f7;
  static const ACTIVE_FILL_COLOR = 0x44000099;
  static const WON_FILL_COLOR = 0xBB990000;

  int row, column;
  double _homeX;
  double _homeY;
  double _ux;
  double _uy;
  int _w;
  int _h;
  bool _one = false;
  bool _active = false;
  bool _won = false;
  Point<double> dragOffset;

  async.StreamController movedController = new async.StreamController.broadcast();
  async.Stream get Moved => movedController.stream;

  double get ux => _ux;
  set ux(num v) {
    if (v != _ux) {
      _ux = v;
      Update();
    }
  }

  double get uy => _uy;
  set uy(num v) {
    if (v != _uy) {
      _uy = v;
      Update();
    }
  }

  bool get one => _one;
  set one(bool v) {
    if (v != _one) {
      _one = v;
      CompleteRedraw();
    }
  }

  bool get active => _active;
  set active(bool v) {
    if (v != _active) {
      _active = v;
      CompleteRedraw();
    }
  }
  
  bool get won => _won;
   set won(bool v) {
     if (v != _won) {
       _won = v;
       CompleteRedraw();
     }
   }

  Vertex(double ux, double uy, int w, int h, bool one, int row, int column) {
    _ux = ux;
    _uy = uy;
    _w = w;
    _h = h;
    _one = one;
    this.row = row;
    this.column = column;
    CompleteRedraw();
  }

  void CompleteRedraw() {
    graphics.clear();
    graphics.rect(0, 0, _w, _h);
    if (_won)
      graphics.fillColor(WON_FILL_COLOR);
    else if (_active) {
      graphics.fillColor(ACTIVE_FILL_COLOR);
    } else {
      graphics.fillColor(_one ? ONE_FILL_COLOR : ZERO_FILL_COLOR);
    }
    graphics.strokeColor(Color.Black);

    Update();
  }

  void Update() {
    x = _ux * Canvas.WIDTH;
    y = _uy * Canvas.HEIGHT;
    movedController.add("vertex moved");
  }

  void StartDrag(double x, double y) {
    stage.setChildIndex(this, stage.numChildren - 1);
    dragOffset = new Point(_ux - x, _uy - y);

    _homeX = _ux;
    _homeY = _uy;
  }

  void EndDrag(Vertex target) {
    _ux = _homeX;
    _uy = _homeY;
    
    if (target != null) {
      one = false;
      target.one = true;
    } else {
      Update();
    }
  }

  void Dragged(double x, double y) {
    _ux = dragOffset.x + x;
    _uy = dragOffset.y + y;
    Update();
  }
}
