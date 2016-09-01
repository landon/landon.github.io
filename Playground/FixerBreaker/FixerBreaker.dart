library FixerBreaker;

import 'dart:html' as html;
import 'dart:math' as math;
import 'dart:async' as async;
import 'dart:collection';
import 'package:stagexl/stagexl.dart';

part 'Canvas.dart';
part 'Card.dart';
part 'SvgDisplayObject.dart';
part 'Cards.dart';

void main() {
  var params = GetQueryStringParameters();
  var n = 5;
  if (params["n"] != null)
    n = int.parse(params["n"]);
  n = math.max(3, math.min(13, n));
  var canvas = new Canvas('stage', n);
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

