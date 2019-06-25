function LifeFactory(type,lifeNumber, w, h, gap) {
  var oLifeFactory = this;
  this.w = w;
  this.h = h;
  this.gap = gap;
  this.lifeNumber = lifeNumber;
  this.lifes = [];
  var drawStart = (width / 4) - (this.lifeNumber * (this.w + this.gap) / 2);

  this.draw = function() {
    push();

    drawLifes();

    pop();
  }

  this.generetaLifes = function() {
    for(var i = 0; i < lifeNumber; i++) {
      this.lifes.push(new Life(type, drawStart + i*(this.w + this.gap), this.w, this.h));
    }
  }

  function drawLifes() {
    oLifeFactory.lifes.forEach(function(life) {
      life.draw();
    });
  }
}