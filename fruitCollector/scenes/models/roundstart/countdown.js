function CountDown(x, y, countNumber) {
  this.x = x;
  this.y = y;
  this.countNumber = countNumber;
  this.fontSize = 300;
  this.translate = 400;
  this.speed = 2;
  this.scaleDawn = 5;
  this.startTime = millis();
  this.isNextScene = false;
  var minFontSize = this.fontSize * 0.4;
  var duration = 1800;
  var offset = 0;

  // var items = [
  //   {
  //     x, y, fontSize, alpha, targetX, targetY, targetFontSize, targetAlpha
  //   }
  // ];

  var getFontSizeFor = function(diff){
    diff %= duration * 2;
    if(diff > duration) {
      return map(diff, duration, 2 * duration, minFontSize, this.fontSize);
    }
    return map(diff, 0, duration, this.fontSize, minFontSize);
  }.bind(this);

  this.draw = function() {
    push();

    var diff = millis() - this.startTime;
    var currentFontSize = getFontSizeFor(diff);

    if(diff > duration) {
      diff = duration;
      this.isNextScene = true;
      // noLoop();
    }
    
    fill(107, 200, 167, 255 * 0.25);
    textAlign(CENTER, CENTER);

    textSize(currentFontSize);
    fill(107, 200, 167, 255 * map(currentFontSize, minFontSize, this.fontSize, 0.25, 1));
    text('3', this.x + offset, this.y + (this.fontSize - currentFontSize / 2) / 2);
    
    currentFontSize = getFontSizeFor(diff + duration * 1.5);
    textSize(currentFontSize);
    fill(107, 200, 167, 255 * map(currentFontSize, minFontSize, this.fontSize, 0.25, 1));
    text('2', this.x + offset + 200, this.y + (this.fontSize - currentFontSize / 2) / 2);

    currentFontSize = getFontSizeFor(diff + duration);
    textSize(currentFontSize);
    fill(107, 200, 167, 255 * map(currentFontSize, minFontSize, this.fontSize, 0.25, 1));
    text('1', this.x + offset + 400, this.y + (this.fontSize - currentFontSize / 2) / 2);

    pop();
  }

  this.update = function() {

    if(this.fontSize <= 200) {
      return;
    }

    var diff = millis() - this.startTime;

    offset = map(diff, 0, duration, 0, -this.translate);
  }

  this.reset = function() {
    this.startTime = millis();
    this.isNextScene = false;
  }
}