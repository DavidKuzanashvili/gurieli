function Xushturi(x, y) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 100;

  this.draw = function() {
    push();

    rectMode(CENTER);
    fill('yellow');
    noStroke();
    rect(this.x, this.y, this.width, this.height);

    pop();
  }

  this.update = function() {

  }
}