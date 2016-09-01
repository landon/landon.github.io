import 'dart:html';
import 'dart:async';

import 'VideoPile.dart';

RangeInputElement slider;
VideoPile pile;
bool ignoreVideoTimeUpdates = false;

void main() {
  //List<double> durations = [600.633, 600.633, 600.633, 600.633, 600.633, 54.388];
  List<double> durations = [4.171, 2.997, 4.720, 5.558, 3.592, 3.833, 5.596];
  //List<double> durations = [389.9896];
  slider = new RangeInputElement()
         ..step ='0.01'
         ..min = 0.toString()
         ..max = durations.fold(0, (t, x) => t + x).toString()
         ..style.width = '75%'
         ..value = '0';
  
  slider.onMouseDown.listen((_) => sliderDown());
  slider.onMouseUp.listen((_) => sliderUp());
  
  slider.onTouchStart.listen((_) => sliderDown());
  slider.onTouchEnd.listen((_) => sliderUp());
  
  document.body.nodes.add(new BRElement());
  document.body.nodes.add(slider);
  document.body.nodes.add(new BRElement());
  document.body.nodes.add(new BRElement());
  
  
  var button = new ButtonElement()
        ..text = "Play";
  button.onClick.listen((_) => begin());
  
  document.body.nodes.add(button);

  var theCanvas = querySelector('#TheCanvas');
  theCanvas.style.width = '75%';
  theCanvas.style.height = 'auto';

  //pile = new VideoPile(theCanvas, ["https://s3-us-west-2.amazonaws.com/svvideochunks/20141017141900_Rocky_100_PICT0005.MP4", "https://s3-us-west-2.amazonaws.com/svvideochunks/20141017142855_Rocky_100_PICT0006.MP4", "https://s3-us-west-2.amazonaws.com/svvideochunks/20141017143856_Rocky_100_PICT0007.MP4", "https://s3-us-west-2.amazonaws.com/svvideochunks/20141017144856_Rocky_100_PICT0008.MP4", "https://s3-us-west-2.amazonaws.com/svvideochunks/20141017145857_Rocky_100_PICT0009.MP4", "https://s3-us-west-2.amazonaws.com/svvideochunks/20141017150858_Rocky_100_PICT0010.MP4"],
  //    durations);
  pile = new VideoPile(theCanvas, ["https://s3-us-west-2.amazonaws.com/testbucketsv1/sample/out00.mp4", "https://s3-us-west-2.amazonaws.com/testbucketsv1/sample/out01.mp4", "https://s3-us-west-2.amazonaws.com/testbucketsv1/sample/out02.mp4", "https://s3-us-west-2.amazonaws.com/testbucketsv1/sample/out03.mp4", "https://s3-us-west-2.amazonaws.com/testbucketsv1/sample/out04.mp4", "https://s3-us-west-2.amazonaws.com/testbucketsv1/sample/out05.mp4", "https://s3-us-west-2.amazonaws.com/testbucketsv1/sample/out06.mp4"],
      durations);
  //pile = new VideoPile(theCanvas, ["https://s3.amazonaws.com/safetyvisionmedia/20140916112100_Rocky_100_PICT0003.MP4"], durations);
  
  pile.timeUpdated.listen(onTimeUpdated);
  
}

void begin(){
  pile.beginPlayback();
}

void onTimeUpdated(double time) {
  if (ignoreVideoTimeUpdates)
    return;
  
  slider.value = time.toString();
}

void sliderDown() {
  ignoreVideoTimeUpdates = true;
  pile.pause(true);
}

void sliderUp() {
  pile.seek(double.parse(slider.value));
    
  ignoreVideoTimeUpdates = false;
  pile.pause(false);
}

void sliderChanged() {
  if (!ignoreVideoTimeUpdates)
      return;
  
  pile.seek(double.parse(slider.value));
}


