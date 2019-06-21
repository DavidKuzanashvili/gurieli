function Title(x, y, content, color, fontSize) {
  this.x = x;
  this.y = y;
  this.color = color || 'white';
  this.fontSize = fontSize || 30;
  this.content = content;
  this.font = fonts.LGVBold;

  this.draw = function() {
    push();

    fill(this.color);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER);
    textFont(this.font);
    text(this.content, x, y);

    pop();
  }
}