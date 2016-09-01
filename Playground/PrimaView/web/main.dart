// Copyright (c) 2015, <your name>. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';

import 'package:PrimaView/nav_menu.dart';
import 'package:route_hierarchical/client.dart';

void main() {
  initNavMenu();
 
  var router = new Router();
  router.root
      ..addRoute(name: 'login', defaultRoute: true, path: '/', enter: showLogin)
      ..addRoute(name: 'find', path: '/find', enter: showFind)
      ..addRoute(name: 'results', path: '/results', enter: showResults)
      ..addRoute(name: 'view', path: '/view', enter: showView);
      
  router.listen();
}

void showLogin(RouteEvent e) {
  hideAll();
  querySelector('#login').style.display = '';
}
void showFind(RouteEvent e) {
  hideAll();
  querySelector('#find').style.display = '';
}
void showResults(RouteEvent e) {
  hideAll();
  querySelector('#results').style.display = '';
}
void showView(RouteEvent e) {
  hideAll();
  querySelector('#view').style.display = '';
  
  var video = querySelector('#TheVideo');
  
  video.autoplay = true;
  video.controls = true;
  //var test = "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4";
  var ours = "https://bodycamstorage.blob.core.windows.net/asset-4b61366c-ea21-47d2-bd95-e1076a46c2b2/20140916104749_Rocky_101.MP4?sv=2012-02-12&sr=c&si=e0e8b205-28fd-4136-b1b4-df1224f396fc&sig=QSRDOIjSZofDHUuil4Pf20OJvYQthnxc6VSAenFevbs%3D&se=2015-02-13T03%3A31%3A52Z";
  video.src = ours;
 // video.load();
  //video.load();
  
}

void hideAll(){
  querySelector('#TheVideo').pause();
  querySelector('#login').style.display = 'none';
  querySelector('#find').style.display = 'none';
  querySelector('#results').style.display = 'none';
  querySelector('#view').style.display = 'none';
}

