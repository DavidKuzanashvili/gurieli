function Fruit(x, y, type, speed) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.speed = speed;
  this.width = 70;
  this.height = 70;

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