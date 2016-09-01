part of CanvasGraphs;


class Canvas {
  static const WIDTH = 960;
  static const HEIGHT = 570;

  Stage stage;
  RenderLoop renderLoop;
  DraggingStates draggingState = DraggingStates.IDLE;
  List<Vertex> draggedVertices;
  List<Vertex> allVertices = new List<Vertex>();

  Canvas(String id, [String input]) {
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
    stage.addChild(background);

    stage.onMouseDown.listen(OnMouseDown);
    stage.onMouseUp.listen(OnMouseUp);
    stage.onMouseMove.listen(OnMouseMove);
    stage.onTouchBegin.listen(OnTouchBegin);
    stage.onTouchEnd.listen(OnTouchEnd);
    stage.onTouchMove.listen(OnTouchMove);

    if (input != null) {
      var json = Uri.decodeFull(input);
      var graph = convert.JSON.decode(json);

      for (var v in graph["Vertices"]) {
        _AddVertex(new Vertex(v["Location"]["X"], v["Location"]["Y"], v["Label"]));
      }
      
      for (var e in graph["Edges"]){
        _AddEdge(new Edge(allVertices[e["IndexV1"]], allVertices[e["IndexV2"]]));
      }
        
    } else {
      _AddVertex(new Vertex(0.5, 0.5, "4"));
      _AddVertex(new Vertex(0.75, 0.75, "5"));
      _AddVertex(new Vertex(0.33, 0.45));
      
      _AddEdge(new Edge(allVertices[0], allVertices[1]));
    }

    ZoomFit();
  }

  void _AddVertex(Vertex x) {
    allVertices.add(x);
    stage.addChild(x);
  }
  
  void _AddEdge(Edge e){
    stage.addChild(e);
  }
  

  void ZoomFit() {
    var buffer = 0.1;
    
    var box = GetBoundingBox();

    for (var v in allVertices) {
      v.ux -= box.left;
      v.uy -= box.top;

      v.ux *= (1 - 2 * buffer) / box.width;
      v.uy *= (1 - 2 * buffer) / box.height;
      
      v.ux += buffer;
      v.uy += buffer;
    }
  }

  Rectangle<double> GetBoundingBox() {
    num left = double.INFINITY;
    num top = double.INFINITY;
    num right = double.NEGATIVE_INFINITY;
    num bottom = double.NEGATIVE_INFINITY;

    for (var v in allVertices) {
      if (v.ux < left) left = v.ux;
      if (v.uy < top) top = v.uy;
      if (v.ux > right) right = v.ux;
      if (v.uy > bottom) bottom = v.uy;
    }

    return new Rectangle<double>(left, top, right - left, bottom - top);
  }

  void OnTouchBegin(TouchEvent e) => OnDown(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnMouseDown(MouseEvent e) => OnDown(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnTouchEnd(TouchEvent e) => OnUp(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnMouseUp(MouseEvent e) => OnUp(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnTouchMove(TouchEvent e) => OnMove(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);
  void OnMouseMove(MouseEvent e) => OnMove(e.target, e.stageX / WIDTH, e.stageY / HEIGHT);

  void OnDown(EventDispatcher target, double x, double y) {
    switch (draggingState) {
      case DraggingStates.IDLE:
        if (target is Vertex) {
          var v = target as Vertex;
          if (v.isSelected) {
            // TODO: drag selected vertices
            draggedVertices = [v];
            draggingState = DraggingStates.DRAGGING_VERTICES;
          } else {
            draggedVertices = [v];
            draggingState = DraggingStates.DRAGGING_VERTICES;
          }

          for (var w in draggedVertices) w.StartDrag(x, y);

        } else {

        }
        break;
      case DraggingStates.DRAGGING_VERTICES:
        break;
      case DraggingStates.DRAGGING_SELECTION_REGION:
        break;
    }
  }

  void OnUp(EventDispatcher target, double x, double y) {
    switch (draggingState) {
      case DraggingStates.IDLE:
        break;
      case DraggingStates.DRAGGING_VERTICES:
        draggingState = DraggingStates.IDLE;
        break;
      case DraggingStates.DRAGGING_SELECTION_REGION:
        break;
    }
  }

  void OnMove(EventDispatcher target, double x, double y) {
    switch (draggingState) {
      case DraggingStates.IDLE:
        break;
      case DraggingStates.DRAGGING_VERTICES:
        for (var w in draggedVertices) w.Dragged(x, y);
        break;
      case DraggingStates.DRAGGING_SELECTION_REGION:
        break;
    }
  }
}

class DraggingStates {
  final _value;
  const DraggingStates._internal(this._value);
  toString() => 'DraggingStates.$_value';

  static const IDLE = const DraggingStates._internal('IDLE');
  static const DRAGGING_VERTICES = const DraggingStates._internal('DRAGGING_VERTICES');
  static const DRAGGING_SELECTION_REGION = const DraggingStates._internal('DRAGGING_SELECTION_REGION');
}
