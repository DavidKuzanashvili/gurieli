function LifeFactory(startDrawFrom, lifeNumber) {
  this.lifeNumber = lifeNumber;
  this.startDrawFrom = startDrawFrom || 100;
  var lifes = [];
  var lifeWidth = 40;
  var gap = 30;
  var step = lifeWidth + gap;

  this.draw = function() {
    lifes.forEach(function(life) {
      life.update();
      life.draw();
    });
  }
  
  this.generateLifes = function() {
    var x1 = this.startDrawFrom;

    for(var i = 0; i < this.lifeNumber; i++) {
      lifes.push(new Life(this.startDrawFrom, x1, 8))
      x1 += step;
    }
  }
}