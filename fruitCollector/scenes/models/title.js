function Title(x, y, content, color, fontSize) {
  this.x = x;
  this.y = y;
  this.color = hexToRgb(color) || { r: 255, g: 255, b: 255 };
  this.alpha = 1;
  this.fontSize = fontSize || 30;
  this.content = content;
  this.font = fonts.LGVBold;

  this.draw = function() {
    push();

    fill(this.color.r, this.color.g, this.color.b, this.alpha * 255);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER);
    textFont(this.font);
    text(this.content, x, y);

    pop();
  }
}