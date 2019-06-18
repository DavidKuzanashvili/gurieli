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
    // var p = (currentFillLevel - this.min) / (this.max - this.min);
    
    // return Math.max((this.height - 8) * p, 4);
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
    // rect(this.x - this.width / 2 - 2, this.y + this.height / 2 - this.getCurrentFillLevel() - 4, this.width - 8, this.getCurrentFillLevel(), 0, 0, 20, 20);
    
  /**
   * BLEND - linear interpolation of colours: C = A*factor + B. This is the default blending mode.
    ADD - sum of A and B
    DARKEST - only the darkest colour succeeds: C = min(A*factor, B).
    LIGHTEST - only the lightest colour succeeds: C = max(A*factor, B).
    DIFFERENCE - subtract colors from underlying image.
    EXCLUSION - similar to DIFFERENCE, but less extreme.
    MULTIPLY - multiply the colors, result will always be darker.
    SCREEN - opposite multiply, uses inverse values of the colors.
    REPLACE - the pixels entirely replace the others and don't utilize alpha (transparency) values.
    OVERLAY - mix of MULTIPLY and SCREEN . Multiplies dark values, and screens light values. (2D)
    HARD_LIGHT - SCREEN when greater than 50% gray, MULTIPLY when lower. (2D)
    SOFT_LIGHT - mix of DARKEST and LIGHTEST. Works like OVERLAY, but not as harsh. (2D)
    DODGE - lightens light tones and increases contrast, ignores darks. (2D)
    BURN - darker areas are applied, increasing contrast, ignores lights. (2D)
    SUBTRACT - remainder of A and B (3D)  
    */
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