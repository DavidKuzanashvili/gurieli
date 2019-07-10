function darken(c){
  var h = round(hue(c));
  var s = round(saturation(c) / 100 * 91.8367347);
  var l = round(lightness(c) / 100 * 73);

  return color('hsl(' + h + ', ' + s + '%, ' + l + '%)');
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function emit(message) {
  window.parent.postMessage(message);
}