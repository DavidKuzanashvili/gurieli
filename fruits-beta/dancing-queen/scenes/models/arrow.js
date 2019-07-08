function Arrow(x, y, w, h, content, speed) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.speed = speed || 3;
  this.content = content;
  this.bgColor = hexToRgb(colors.boogerTwo);
  this.alpha = 0.5;
  this.keycode;
  this.arrowRotatation = 0;
  var self = this;
  var alpha = this.alpha || 0;
  var alphaSpeed = 0.01;
  var circleAlpha = 0;  
  var circleAlphaSpeed = 0.01;  
  var circleChangeSpeed = 0.5;
  var maxDelta = 20;
  var deltaSize = 0;
  var triggered = false;
  var asset = whiteDownArrow;
  var circleAlphaCoef = 1;
  var animations = {
    fadeIn: {
      setup: function() {
        deltaSize = 0;
        circleAlpha = 0;
      },
      update: function() {
        circleAlpha = Math.min(circleAlpha + circleChangeSpeed, 0.5);
        deltaSize = Math.min(deltaSize + circleChangeSpeed, maxDelta);

        if(circleAlpha >= 0.5 && deltaSize >= maxDelta) {
          self.animate('fadeOut');
        }
      }
    },
    fadeOut: {
      setup: function() {
        alpha = 0.5;
        circleAlpha = 0.5;
      }.bind(this),
      update: function() {
        alpha = Math.max(alpha - alphaSpeed, 0);
        circleAlpha = Math.max(circleAlpha - circleAlphaSpeed, 0);

        if(alpha <= 0 && circleAlpha <= 0) {
          delete activeAnimation;
        }
      }.bind(this)
    }
  };
  var activeAnimation = null;

  switch(this.content) {
    case UP_ARROW: {
      this.keycode = UP_ARROW;
      this.arrowRotatation = PI;
    }
    break;
    case LEFT_ARROW: {
      this.keycode = LEFT_ARROW;
      this.arrowRotatation = PI / 2;
    }
    break;
    case DOWN_ARROW: {
      this.keycode = DOWN_ARROW;
      this.arrowRotatation = 0;
    }
    break;
    case RIGHT_ARROW: {
      this.keycode = RIGHT_ARROW;
      this.arrowRotatation = -PI / 2;
    }
    break;
  }

  this.events = {};

  for(var key in animations) {
    this.events[key] = {};
  }

  this.draw = function() {
    push();

    rectMode(CENTER);
    noStroke();
    fill(this.bgColor.r, this.bgColor.g, this.bgColor.b, 255 * circleAlpha * circleAlphaCoef);
    rect(this.x, this.y, this.w + deltaSize, this.h + deltaSize, 50);
    fill(this.bgColor.r, this.bgColor.g, this.bgColor.b, 255 * (2 * circleAlpha) * circleAlphaCoef);
    rect(this.x, this.y, this.w, this.h, 50);
    translate(this.x, this.y);
    rotate(this.arrowRotatation);
    imageMode(CENTER);
    tint(255, 255 * (2*alpha));
    image(asset.img, 0, 0, whiteDownArrow.w, whiteDownArrow.h);
    
    pop();
  }

  this.update = function() {
    updateAnimation();
    
    this.y += this.speed;
  }

  this.isInActiveArea = function(y1, y2) {
    return this.y >= y1 && this.y <= y2;
  }

  this.passedActiveArea = function(y, h) {
    return this.y > y + h;
  }

  this.reset = function() {
  }

  this.animate = function(type){
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

  var triggerAnimationEvent = function(animation, event) {
    if(this.events.hasOwnProperty(animation) && this.events[animation].hasOwnProperty(event)) {
      return this.events[animation][event]();
    }

    return false;
  }.bind(this);

  this.isTriggered = function(){
    return triggered;
  }

  this.correct = function(){
    if(this.isTriggered()) {
      return;
    }
    triggered = true;

    this.bgColor = hexToRgb("#ffffff");
    circleAlphaCoef = 0.4;
    this.animate('fadeIn');
  }

  this.incorrect = function(){
    if(this.isTriggered()) {
      return;
    }
    triggered = true;

    this.bgColor = hexToRgb(colors.red);
    asset = redDownArrow;
    this.animate('fadeIn');
  }

  function updateAnimation() {
    if(activeAnimation === null) {
      return;
    }

    animations[activeAnimation].update();
  }
}