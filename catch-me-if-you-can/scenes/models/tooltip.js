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
  var currentHeight = 0;

  var darkenColor = darken(this.color);
  var fillObject = null;

  this.getCurrentHeight = function(){
    return parseInt(map(fillLevel, this.min, this.max, 0, this.height));
  }

  var reavealAnimationSpeed = 1;
  var offsetLeft = -100;
  var alphaChangeSpeed = 0.05;
  var a = 0;
  var activeAnimation = '';

  var animations = {
    in: {
      setup: function() {
        a = 0;
        hideX = -100;
      },
      update: function() {
        a = Math.min(a + alphaChangeSpeed, 1);
        offsetLeft = Math.min(offsetLeft + reavealAnimationSpeed, 0);
      } 
    }
  };

  this.events = {};

  for(var key in animations) {
    this.events[key] = {};
  }

  this.draw = function() {
    push();

    rectMode(CENTER);
    noFill();
    stroke(color(255, 255, 255, 75 * a));
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.height, 20);
    
    tint(255, 255 * a);
    image(fillObject, this.x - this.width / 2, this.y - this.height / 2 + (this.height - currentHeight), this.width, currentHeight, 0, this.height - currentHeight, this.width, currentHeight);

    pop();
  }

  this.update = function() {
    updateAnimation(); 
    if(currentHeight != this.getCurrentHeight()) {
      if(currentHeight < this.getCurrentHeight()) {
        currentHeight += this.speed;
      } else {
        currentHeight -= this.speed;
      }
    }
  }

  this.setLevel = function(point){
    fillLevel = Math.max(Math.min(point, this.max), this.min);
    
    return -(this.max - point);
  }

  this.increase = function(point) {
    return this.setLevel(fillLevel + (point || 1));
  }

  this.decrease = function(point) {
    return this.setLevel(fillLevel - (point || 1));
  }

  this.reset = function() {
    this.setLevel(this.min);
  }

  this.reload = function(){
    if(!!fillObject) {
      delete fillObject;
    }
    
    fillObject = createGraphics(this.width, this.height);

    fillObject.clear();
    fillObject.fill(this.color);
    fillObject.noStroke();
    fillObject.rect(4, 4, this.width - 7, this.height - 7, 20);
    fillObject.loadPixels();

    var c = {
      r: red(darkenColor),
      g: green(darkenColor),
      b: blue(darkenColor),
      a: alpha(darkenColor),
      w: round((this.width - 4) / 3)
    };
    
    for(var i = 2; i < c.w + 2; i++) {
      for(var j = 2; j < this.height - 2; j++) {        
        var index = (i + j * this.width) * 4;

        fillObject.pixels[index + 0] = c.r;
        fillObject.pixels[index + 1] = c.g;
        fillObject.pixels[index + 2] = c.b;
      }
    }

    fillObject.updatePixels();
  }

  this.animate = function(type) {
    if(activeAnimation) {
      triggerAnimationEvent(activeAnimation, 'end');
    }

    if(animations.hasOwnProperty(type)) {
      activeAnimation = type;
      animations[activeAnimation].setup();
      triggerAnimationEvent(activeAnimation, 'start');
    } else {
      activeAnimation = null;
    }
  }

  function updateAnimation() {
    if(activeAnimation === '') {
      return;
    }

    animations[activeAnimation].update();
  }

  var triggerAnimationEvent = function(animation, event) {
    if(this.events.hasOwnProperty(animation) && this.events[animation].hasOwnProperty(event)) {
      return this.events[animation][event]();
    }

    return false;
  }.bind(this);

  this.reload();
}