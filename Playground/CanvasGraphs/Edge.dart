part of CanvasGraphs;

class Edge extends Sprite {
  Vertex _v1;
  Vertex _v2;
  Edge(Vertex v1, Vertex v2) {
    _v1 = v1;
    _v2 = v2;

    _v1.Moved.listen((_) => Update());
    _v2.Moved.listen((_) => Update());
  }

  void Update() {

    var cos = (_v2.x - _v1.x) / math.sqrt((_v2.x - _v1.x) * (_v2.x - _v1.x) + (_v2.y - _v1.y) * (_v2.y - _v1.y));
    cos = math.min(math.max(cos, -1), 1);

    var angle = math.acos(cos);
    if (_v1.y > _v2.y) angle = -angle;

    var r1 = _v1.radius + 5;
    var x1 = _v1.x + r1 * math.cos(angle);
    var y1 = _v1.y + r1 * math.sin(angle);

    var r2 = _v2.radius + 5;
    var x2 = _v2.x - r2 * math.cos(angle);
    var y2 = _v2.y - r2 * math.sin(angle);

    graphics.clear();
    graphics.moveTo(x1, y1);
    graphics.lineTo(x2, y2);
    graphics.closePath();

    graphics.strokeColor(0xFF000000, 4);
  }
}
