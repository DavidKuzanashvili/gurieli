function Life(type, x, w, h) {
  this.type = type;
  this.x = x;
  this.y = height - 100;
  this.w = w;
  this.h = h;

  this.draw = function() {
    push();

    imageMode(CENTER);
    image(this.type, this.x, this.y, this.w, this.h);

    pop();
  }
}