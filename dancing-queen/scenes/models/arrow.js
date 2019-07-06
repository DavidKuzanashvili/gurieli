function Arrow(x, y, w, h, content, speed) {
  this.x = x;
  this.y = y  ;
  this.w = w;
  this.h = h;
  this.speed = speed || 3;
  this.content = content;
  this.bgColor = hexToRgb(colors.boogerTwo);
  this.alpha = 0.5;
  this.keycode;
  this.arrowRotatation = 0;
  var alpha = this.alpha || 0;
  var alphaSpeed = 0.1;
  var broadLine = height - 300;
  var circleChangeSpeed = 0.5;
  var maxDelta = 15;
  var deltaSize = 0;
  var animations = {
    increaseCircle: {
      setup: function() {
        deltaSize = 0;
      },
      update: function() {
        deltaSize = Math.min(deltaSize + circleChangeSpeed, maxDelta);
        
        if(deltaSize >= maxDelta) {
          this.animate('fadeOut');
        }
      }.bind(this)
    },
    decreaseCircle: {
      setup: function() {
        deltaSize = maxDelta;
      },
      update: function() {
        deltaSize = Math.max(deltaSize - circleChangeSpeed, 0);
      }
    },
    fadeOut: {
      setup: function() {
        alpha = 0.5;
      }.bind(this),
      update: function() {
        alpha = Math.max(alpha - alphaSpeed, 0);
      }.bind(this)
    }
  };
  var activeAnimation = null;

  switch(this.content) {
    case '^': {
      this.keycode = UP_ARROW;
      this.arrowRotatation = PI;
    }
    break;
    case '<': {
      this.keycode = LEFT_ARROW;
      this.arrowRotatation = PI / 2;
    }
    break;
    case '|': {
      this.keycode = DOWN_ARROW;
      this.arrowRotatation = 0;
    }
    break;
    case '>': {
      this.keycode = RIGHT_ARROW;
      this.arrowRotatation = -PI / 2;
    }
    break;
  }

  this.draw = function() {
    push();

    rectMode(CENTER);
    noStroke();
    fill(this.bgColor.r, this.bgColor.g, this.bgColor.b, 255 * alpha);
    rect(this.x, this.y, this.w + deltaSize, this.h + deltaSize, 50);
    fill(this.bgColor.r, this.bgColor.g, this.bgColor.b, 255 * (2 * alpha));
    rect(this.x, this.y, this.w, this.h, 50);
    translate(this.x, this.y);
    rotate(this.arrowRotatation);
    imageMode(CENTER);
    image(whiteDownArrow.img, 0, 0, whiteDownArrow.w, whiteDownArrow.h);
    
    pop();
  }

  this.update = function() {
    updateAnimation();
    
    this.y += this.speed;
  }

  this.isInActiveArea = function(y) {
    return this.y >= y;
  }

  this.passedActiveArea = function(y, h) {
    return this.y > y + h;
  }

  this.reset = function() {
    this.bgColor = hexToRgb(colors.boogerTwo);
    // this.alpha = 0.5;
    // deltaSize = 0;
    // activeAnimation = null;
  }

  this.animate = function(type) {
    if(animations.hasOwnProperty(type)) {
      activeAnimation = type;
      animations[activeAnimation].setup();
      return;
    }

    activeAnimation = null;
  }

  function updateAnimation() {
    if(activeAnimation === null) {
      return;
    }

    animations[activeAnimation].update();
  }
}