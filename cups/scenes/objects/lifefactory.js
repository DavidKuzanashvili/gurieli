function LifeFactory(type, lifeNumber, drawStart, w, h, gap) {
  var oLifeFactory = this;
  this.w = w;
  this.h = h;
  this.gap = gap;
  this.lifeNumber = lifeNumber;
  this.lifes = [];
  this.drawStart = drawStart;
  var deadHerts = [];

  this.draw = function() {
    push();

    this.update();
    drawLifes();

    pop();
  }

  this.generateLifes = function() {
    for(var i = 0; i < lifeNumber; i++) {
      this.lifes.push(new Life(type, this.drawStart + i * (this.w + this.gap), this.w, this.h));
      deadHerts.push(new Life(lifes.inactive, this.drawStart + i * (this.w + this.gap), this.w, this.h));
    }
  }
  
  this.generateLifes();

  this.onUpdate = function() {
    this.drawStart = width / 2 - (this.lifeNumber - 1) * (this.w + this.gap) / 2;
    for(var i = 0; i < this.lifes.length; i++) {
      this.lifes[i].x = this.drawStart + i * (this.w + this.gap);
      this.lifes[i].y = height - 100;
      deadHerts[i].x = this.drawStart + i * (this.w + this.gap);
      deadHerts[i].y = height - 100;
    }
  };

  this.update = function() {
    this.onUpdate();
  }

  function drawLifes() {
    deadHerts.forEach(function(life) {
      life.draw();
    });
    oLifeFactory.lifes.forEach(function(life) {
      life.draw();
    });
  }
}