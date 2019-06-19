function Tooltip(options) {
  options = options || {};
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.height = options.height || 200;
  this.width = options.width || 16;
  this.color = color(options.color || 'red');
  this.max = options.max || 100;
  this.min = options.min || 0;
  this.speed = 1;
  var fillLevel = this.min;
  var currentFillLevel = 4;

  var darkenColor = darken(this.color);

  this.getCurrentFillLevel = function() {
    return map(currentFillLevel, this.min, this.max, 0, this.height - 8);
  };

  this.draw = function() {
    push();

    rectMode(CENTER);
    noFill();
    stroke(color(255, 255, 255, 75));
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.height, 20);
    
    rectMode(CORNER);
    noStroke();
    fill(190, 100, 100);
    rect(this.x - this.width / 2 + 4, this.y + this.height / 2 - this.getCurrentFillLevel() - 4, this.width - 8, this.getCurrentFillLevel(), 0, 0, 20, 20);
    fill(41, 41, 41);

    pop();
  }

  this.update = function() {
    if(currentFillLevel != fillLevel) {
      if(currentFillLevel < fillLevel) {
        currentFillLevel = Math.min(currentFillLevel + this.speed, fillLevel);
      } else {
        currentFillLevel = Math.max(currentFillLevel - this.speed, fillLevel);
      }
    }
  }

  this.setLevel = function(point){
    fillLevel = Math.max(Math.min(point, this.max), this.min);
  }

  this.increase = function(point){
    fillLevel = this.setLevel(fillLevel + point);
  }

  this.decrease = function(point){
    fillLevel = this.setLevel(fillLevel - point);
  }

  this.reset = function(){
    fillLevel = this.min;
  }
}