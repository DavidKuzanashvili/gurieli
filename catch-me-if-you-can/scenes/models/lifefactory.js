function LifeFactory(startDrawFrom, lifeNumber) {
  this.lifeNumber = lifeNumber;
  this.startDrawFrom = startDrawFrom || 100;
  this.lifes = [];
  this.inactiveLifes = [];
  var lifeWidth = 40;
  var gap = 30;
  var step = lifeWidth + gap;
  var resHeart = null;

  this.draw = function() {
    if(sizes.showHeart) {
      this.drawSingleHeart();
    } else {
      this.drawMultipleHearts();
    }
  }
  
  this.generateLifes = function() {
    var x1 = this.startDrawFrom;
    
    resHeart = new Life(x1, x1, 8, true);

    for(var i = 0; i < this.lifeNumber; i++) {
      this.lifes.push(new Life(this.startDrawFrom, x1, 8, true));
      this.inactiveLifes.push(new Life(this.startDrawFrom, x1, 8, false));
      x1 += step;
    }
  }

  this.drawSingleHeart = function(){
    push();
    imageMode(CENTER);

    resHeart.update();
    resHeart.draw();

    fill(255);
    textSize(resHeart.height);
    textFont(fonts.LGVBold);
    textAlign(LEFT, CENTER);
    text(this.lifes.length, resHeart.x + resHeart.width, resHeart.y);

    pop();
  }

  this.drawMultipleHearts = function(){
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
}