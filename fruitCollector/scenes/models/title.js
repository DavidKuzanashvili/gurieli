function Title(x, y, content) {
  this.x = x;
  this.y = y;
  this.content = content;

  this.draw = function() {
    push();

    fill('White');
    textSize(30);
    textAlign(CENTER, CENTER);
    text(this.content, x, y);

    pop();
  }
}