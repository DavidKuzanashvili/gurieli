function LifeFactory(type,lifeNumber, w, h, gap) {
  var oLifeFactory = this;
  this.w = w;
  this.h = h;
  this.gap = gap;
  this.lifeNumber = lifeNumber;
  this.lifes = [];
  this.inactiveLifes = [];

  var drawStart = (width / 4) - (this.lifeNumber * (this.w + this.gap) / 2);
  var getFactoryWidth = function(){
    return (this.lifeNumber * this.w + this.lifeNumber * this.gap);
  }.bind(this);

  this.draw = function() {
    push();

    if(windowWidth < 768) {
      translate(width / 2 - getFactoryWidth() / 2, 0);
    } else {
      translate(drawStart, 0);
    }

    drawLifes();

    pop();
  }

  this.generetaLifes = function() {
    while(this.lifes.length < this.lifeNumber) {
      this.lifes.push(new Life(lifeImages.active, this.lifes.length * (this.w + this.gap) + this.gap, this.w, this.h));
    }

    while(this.inactiveLifes.length < this.lifeNumber) {
      this.inactiveLifes.push(new Life(lifeImages.inactive, this.inactiveLifes.length*(this.w + this.gap) + this.gap, this.w, this.h));
    }
  }

  function drawLifes() {
    oLifeFactory.inactiveLifes.forEach(function(life) {
      life.draw();
    });
    oLifeFactory.lifes.forEach(function(life) {
      life.draw();
    });
  }
}