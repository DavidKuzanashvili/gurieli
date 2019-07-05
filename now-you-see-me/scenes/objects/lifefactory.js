function LifeFactory(type, lifeNumber, drawStart, w, h, gap) {
  var oLifeFactory = this;
  this.w = w;
  this.h = h;
  this.gap = gap;
  this.lifeNumber = lifeNumber;
  this.lifes = [];
  this.drawStart = drawStart;
  var deadHearts = [];

  this.draw = function() {
    push();

    this.update();
    drawLifes();

    pop();
  }

  this.generateLifes = function(withDeadHearts = true) {
    while(this.lifes.length < this.lifeNumber) {
      this.lifes.push(new Life(type, this.drawStart + this.lifes.length * (this.w + this.gap), this.w, this.h));
    }

    if(withDeadHearts) {
      while(deadHearts.length < this.lifeNumber) {
        deadHearts.push(new Life(lifes.inactive, this.drawStart + deadHearts.length * (this.w + this.gap), this.w, this.h));
      }
    }
  }
  
  this.generateLifes();

  this.onUpdate = function() {
    this.drawStart = width / 2 - (this.lifeNumber - 1) * (this.w + this.gap) / 2;
    for(var i = 0; i < this.lifes.length; i++) {
      this.lifes[i].x = this.drawStart + i * (this.w + this.gap);
      this.lifes[i].y = height - 100;
      deadHearts[i].x = this.drawStart + i * (this.w + this.gap);
      deadHearts[i].y = height - 100;
    }
  };

  this.update = function() {
    this.onUpdate();
  }

  function drawLifes() {
    deadHearts.forEach(function(life) {
      life.draw();
    });
    oLifeFactory.lifes.forEach(function(life) {
      life.draw();
    });
  }
}