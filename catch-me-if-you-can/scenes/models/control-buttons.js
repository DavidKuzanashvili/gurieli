function ControlButton(type, x, y, w, h, typeText) {
  var self = this;
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.typeText = typeText || '';
  this.onUpdate = function() {};
  var defaultType = this.type;
  var hoverType = 'yellow' + capitalize(this.typeText);

  this.alpha = 1;
  var alphaSpeed = 0.01;
  var activeAnimation = null;

  var animations = {
    fadeIn: {
      setup: function() {
        self.alpha = 0;
      },
      update: function() {
        self.alpha = Math.min(self.alpha + alphaSpeed, 1);
        if(self.alpha >= 1) {
          self.alpha = 1;
          self.animate();
        }
      }
    },
    fadeOut: {
      setup: function() {
        self.alpha = 1;
        alphaSpeed = 0.3;
      },
      update: function() {
        self.alpha = Math.max(self.alpha - alphaSpeed, 0);
        if(self.alpha <= 0) {
          self.alpha = 0;
          self.animate();
        }
      } 
    }
  }

  this.draw = function() {
    push();

    if(this.contains(mouseX, mouseY)) {
      cursor('pointer');
    }
    
    imageMode(CENTER);
    tint(255, 255 * this.alpha);
    image(this.type, this.x, this.y, this.w, this.h);

    pop();
  }

  this.update = function() {
    this.onUpdate();
    updateAnimation();
    if(this.typeText !== 'share' && this.typeText !== 'resume') {
      if(this.contains(mouseX, mouseY)) {
        this.type = pngIcons[hoverType].img;
      } else {
        this.type = defaultType;
      }
    }
  }

  this.contains = function(x, y) {
    var w = this.w / 2;
    var h = this.h / 2;

    return x > this.x - w
        && x < this.x + w
        && y > this.y - h
        && y < this.y + h;
  }

  this.events = {};

  for(var key in animations) {
    this.events[key] = {};
  }

  function updateAnimation(){
    if(activeAnimation == null) {
      return;
    }

    animations[activeAnimation].update();
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

  this.isAnimating = function() {
    return !!activeAnimation;
  }

  var triggerAnimationEvent = function(animation, event) {
    if(this.events.hasOwnProperty(animation) && this.events[animation].hasOwnProperty(event)) {
      return this.events[animation][event]();
    }

    return false;
  }.bind(this);

  function capitalize(str) 
  {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
  }
}