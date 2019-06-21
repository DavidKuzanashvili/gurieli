function Fruit(options = {}) {
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.type = options.type;
  this.speed = options.speed || 2;
  this.width = options.w || 70;
  this.height = options.h || 70;

  this.draw = function() {
    push();

    imageMode(CENTER);

    image(this.type, this.x, this.y, this.width, this.height);

    pop();
  }

  this.update = function() {
    this.y += this.speed;
  }
}