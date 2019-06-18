function darken(c){
  var h = round(hue(c));
  var s = round(saturation(c) / 100 * 91.8367347);
  var l = round(lightness(c) / 100 * 73);

  return color('hsl(' + h + ', ' + s + '%, ' + l + '%)');
}