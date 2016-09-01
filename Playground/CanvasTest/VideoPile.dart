import 'dart:html';
import 'dart:async';

class VideoPile {
  static const _redrawDuration = const Duration(milliseconds: 20);
  StreamController _timeUpdatedController = new StreamController.broadcast();

  List<VideoElement> _videos;
  List<double> _durations;
  CanvasRenderingContext2D _canvasContext;
  int _currentIndex;
  Timer _redrawTimer;

  Stream get timeUpdated => _timeUpdatedController.stream;
  bool get isPaused => _videos[_currentIndex].paused;

  VideoPile(CanvasElement targetCanvas, List<String> videoUrls, List<double> durations) {
    _canvasContext = targetCanvas.context2D;
    _videos = videoUrls.map(_createVideoElement).toList();
    _durations = durations;
    _currentIndex = 0;
  }

  void beginPlayback() {
    _videos[_currentIndex].play();
    _redrawTimer = new Timer.periodic(_redrawDuration, (_) => _drawFrame());
  }

  void seek(double time) {
    pause(true);

    int j = 0;
    var prior = 0.0;
    while (j < _durations.length && prior + _durations[j] < time) {
      prior += _durations[j];
      j++;
    }
    
    if (j != _currentIndex) {
      _changeVideoIndex(j, time - prior);
    } else {
      _videos[_currentIndex].currentTime = time - prior;
    }
  }

  void dispose() {
    _videos.forEach(_disposeVideoElement);
  }

  void _disposeVideoElement(VideoElement ve) {
    ve.pause();
    ve.src = "";
    ve.load();
  }

  void pause(bool shouldPause) {
    if (shouldPause && !_videos[_currentIndex].paused) {
      _videos[_currentIndex].pause();
    } else if (!shouldPause && _videos[_currentIndex].paused) {
      _videos[_currentIndex].play();
    }
  }

  VideoElement _createVideoElement(String url) {
    var ve = new VideoElement();
    ve.onEnded.listen(_onEnded);
    ve.attributes['type'] = 'video/mp4';
    ve.src = url;
    ve.load();

    return ve;
  }

  void _onEnded(Event e) {
    _changeVideoIndex((_currentIndex + 1) % _videos.length, 0.0);
  }

  void _changeVideoIndex(int index, double offset) {
    var previousIndex = _currentIndex;
    _currentIndex = index;
    _videos[previousIndex].muted = true;
    _videos[_currentIndex].muted = false;
    _videos[_currentIndex].currentTime = offset;
    _videos[_currentIndex].play();
    _videos[previousIndex].pause();
    _videos[previousIndex].currentTime = 0;
  }

  void _drawFrame() {
    var i = _currentIndex;
    var ve = _videos[i];
    _canvasContext.drawImageScaled(ve, 0, 0, _canvasContext.canvas.width, _canvasContext.canvas.height);

    var priorTime = 0.0;
    for (int j = 0; j < i; j++) priorTime += _durations[j];

    _timeUpdatedController.add(priorTime + ve.currentTime);
  }
}
