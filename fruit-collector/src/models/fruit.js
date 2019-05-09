class Fruit {
  constructor(x, y, type, speed = 2) {
    this.width = 40;
    this.height = 60;
    this.x = x;
    this.y = y;
    this.type = type;
    this.speed = speed;
  }

  draw() {
    push();

    fill(33);
    noStroke();
    //rect(this.x, this.y, this.width, this.height);
    image(fruitModels[this.type], this.x, this.y, this.width, this.height);

    pop();
  }

  update() {
    this.y += this.speed;
  }
}