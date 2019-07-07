function LifeFactory(startDrawFrom, lifeNumber) {
  this.lifeNumber = lifeNumber;
  this.startDrawFrom = startDrawFrom || 100;
  this.lifes = [];
  this.inactiveLifes = [];
  var lifeWidth = 40;
  var gap = 30;
  var step = lifeWidth + gap;

  this.draw = function() {
    push();
    imageMode(CENTER);
    this.inactiveLifes.forEach(function(inactiveLife) {
      inactiveLife.draw();
      inactiveLife.update();
    });
    this.lifes.forEach(function(life) {
      life.update();
      life.draw();
    });
    pop();
  }
  
  this.generateLifes = function() {
    var x1 = this.startDrawFrom;

    for(var i = 0; i < this.lifeNumber; i++) {
      this.lifes.push(new Life(this.startDrawFrom, x1, 8, true));
      this.inactiveLifes.push(new Life(this.startDrawFrom, x1, 8, false));
      x1 += step;
    }
  }
}