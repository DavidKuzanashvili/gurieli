function Bottle(x, y, type, speed, tooltip) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.speed = speed;
  this.color = color(255);
  this.width = 150;
  this.height = 400;
  this.tooltip = tooltip || null;
  
  this.getY = function() {
    this.y = height - this.height / 3;
    return this.y;
  }

  if(this.tooltip) {
    // this.tooltip.x = this.x + 75 + 30;
    this.tooltip.height = 250;
    this.tooltip.reload();
    this.tooltip.y = height - 20 - this.tooltip.height / 2;
  }

  this.draw = function() {
    push();
    
    rectMode(CENTER);
    imageMode(CENTER);

    fill(this.color);
    noStroke();
    // rect(this.x, this.getY(), this.width, this.height);
    image(this.type, this.x, this.getY(), this.width, this.height);

    pop();

    if(this.tooltip) {
      this.tooltip.draw();
    }
  }

  this.update = function() {
    if(mouseX > this.x) {
      this.x = Math.min(this.x + this.speed, mouseX);
    }

    if(mouseX < this.x) {
      this.x = Math.max(this.x - this.speed, mouseX);
    }

    if(this.tooltip){
      this.tooltip.x = this.x + 75 + 30;
      this.tooltip.update();
    }
  }

  
  this.staticDraw = function() {
    push();

    imageMode(CENTER);

    image(this.type, this.x, this.y, this.width, this.height);

    pop();
  }

  this.hitsFruit = function(fruit) {
    let bottleLeft = this.x - this.width / 2;
    let bottleRight = this.x + this.width / 2;
    let bottleTop = this.y - this.height / 2;
    return fruit.x > bottleLeft && fruit.x < bottleRight && fruit.y > bottleTop && fruit.y < bottleTop + 5;
  }
} 