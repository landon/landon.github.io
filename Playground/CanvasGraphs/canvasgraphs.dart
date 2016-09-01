library CanvasGraphs;

import 'dart:html' as html;
import 'dart:math' as math;
import 'dart:async' as async;
import 'dart:collection';
import 'dart:convert' as convert;
import 'package:stagexl/stagexl.dart';

part 'Canvas.dart';
part 'Vertex.dart';
part 'Edge.dart';

void main() {
  var params = GetQueryStringParameters();
  var json = params["graph"];
  var canvas = new Canvas('stage', json);
}

Map<String, String> GetQueryStringParameters() {
  var params = new HashMap<String, String>();
  html.window.location.search.replaceFirst("?", "").split("&").forEach((e) {
    if (e.contains("=")) {
      var split = e.split("=");
      params[split[0]] = split[1];
    }
  });
  
  return params;
}
