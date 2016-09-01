part of FixerBreaker;

class SvgDisplayObject extends Sprite {

  RenderTexture _renderTexture;
  RenderTextureQuad _renderTextureQuad;

  SvgDisplayObject(String data, int width, int height) {
    data = data.replaceFirst('__width__', width.toString());
    data = data.replaceFirst('__height__', height.toString());

    var blob = new html.Blob([data], "image/svg+xml;charset=utf-8");
    var url = html.Url.createObjectUrlFromBlob(blob);

    var imageElement = new html.ImageElement();
    imageElement.src = url;
    imageElement.onLoad.listen((e) {
      html.Url.revokeObjectUrl(url);
      _renderTexture = new RenderTexture.fromImage(imageElement, 1.0);
      _renderTextureQuad = _renderTexture.quad;
    });
  }

  render(RenderState renderState) {
    super.render(renderState);
    if (_renderTextureQuad != null) {
      renderState.renderQuad(_renderTextureQuad);
    }
  }
}