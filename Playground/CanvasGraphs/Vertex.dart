part of CanvasGraphs;

class Vertex extends Sprite {
  static const DEFAULT_FILL_COLOR = 0x78000000;
  static const DEFAULT_STROKE_COLOR = Color.Black;
  static final _textFormat = new TextFormat('Garamond', 26, Color.Black, bold: true, italic: false);
  
  double _ux;
  double _uy;
  String _label;
  int _radius = 25;
  bool isSelected = false;
  Point<double> dragOffset;
  int fillColor = DEFAULT_FILL_COLOR;
  
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

  int get radius => _radius;
  set radius(num v) {
    if (v != _radius) {
      _radius = v;
      CompleteRedraw();
    }
  }

  Vertex(double ux, double uy, [String label]) {
    _ux = ux;
    _uy = uy;
    _label = label;

    CompleteRedraw();
  }

  void CompleteRedraw() {
    graphics.clear();
    graphics.circle(0, 0, _radius);
    graphics.fillColor(fillColor);
    graphics.strokeColor(DEFAULT_STROKE_COLOR);
    
    removeChildren();
    if (_label != null){
      var textField = new TextField(_label, _textFormat);
      textField.x = -textField.textWidth / 2;
      textField.y = -textField.textHeight / 2;
      textField.mouseEnabled = false;
      addChild(textField);
    }

    Update();
  }

  void Update() {
    x = _ux * Canvas.WIDTH - _radius / 2;
    y = _uy * Canvas.HEIGHT - _radius / 2;
    movedController.add("vertex moved");
  }

  void StartDrag(double x, double y) {
    dragOffset = new Point(_ux - x, _uy - y);
  }

  void Dragged(double x, double y) {
    _ux = dragOffset.x + x;
    _uy = dragOffset.y + y;
    Update();
  }
}
