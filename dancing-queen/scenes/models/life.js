function Life(type, x, w, h) {
  this.type = type;
  this.x = x;
  this.w = w;
  this.h = h;

  this.draw = function() {
    push();

    imageMode(CENTER);
    image(this.type, this.x, height - 100, this.w, this.h);

    pop();
  }
}