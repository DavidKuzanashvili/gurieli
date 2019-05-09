const butcketFruitsMap = [
  {
    x: -50,
    y: 0,
  },
  {
    x: -20,
    y: 5
  },
  {
    x: 30,
    y: 0
  },
  {
    x: 50,
    y: 10
  },
  {
    x: 60,
    y: 0
  }
];

class Bucket {
  constructor(x){
    this.color = color(255);
    this.width = 100;
    this.height = 50;
    this.x = x;
    this.speed = 10;
    this.fruits = [];
  }

  get y() {
    return height - this.height / 2;
  }

  addFruit(fruit) {
    fruit.speed = 0;
    this.fruits.push(fruit);
  }

  draw(){
    push();

    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    
    pop();
    
    this.fruits.forEach(fruit => {
      fruit.draw();
    });
  }

  update(){
    if(mouseX > this.x) {
      this.x = Math.min(this.x + this.speed, mouseX);
    }

    if(mouseX < this.x) {
      this.x = Math.max(this.x - this.speed, mouseX);
    }

    this.fruits.forEach((fruit, index) => {
      fruit.update();
      let currentFruitPosition = butcketFruitsMap[index % butcketFruitsMap.length];
      fruit.x = this.x + currentFruitPosition.x;
      fruit.y = this.y + currentFruitPosition.y;
    });
  }
}