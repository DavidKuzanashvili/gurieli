function SettingsBackground(options = {}) {
  self = this;
  this.x = options.x;
  this.y = options.y;
  this.w = options.w;
  this.h = options.h;
  this.endHeight = options.endHeight || 100;
  this.color = hexToRgb(colors.boogerTwo);
  this.onUpdate = options.onUpdate || function() {};
  this.padding = options.padding || 20;

  var deltaHeight = 0;
  var speed = 10;
  var activeAnimation = null;

  var animations = {
    up: {
      setup: function() {
        deltaHeight = self.endHeight;
      },
      update: function() {
        deltaHeight = Math.max(deltaHeight - speed, 0);
        if(deltaHeight <= 0) {
          deltaHeight = 0;
          self.animate();
        }
      }
    },
    down: {
      setup: function() {
        deltaHeight = 0;
      },
      update: function() {
        deltaHeight = Math.min(deltaHeight + speed, self.endHeight);

        if(deltaHeight >= self.endHeight) {
          deltaHeight = self.endHeight;
          self.animate();
        }
      }
    }
  }

  this.draw = function() {
    push();

    rectMode(CENTER);
    translate(0, (this.h + deltaHeight) / 2 - this.h / 2);
    fill(this.color.r, this.color.g, this.color.b, 255 * 0.5)
    noStroke();
    rect(this.x, this.y, this.w + this.padding, this.h + this.padding + deltaHeight, 40);

    pop();
  }

  this.update = function() {
    this.onUpdate();
    updateAnimation();
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

  var triggerAnimationEvent = function(animation, event) {
    if(this.events.hasOwnProperty(animation) && this.events[animation].hasOwnProperty(event)) {
      return this.events[animation][event]();
    }

    return false;
  }.bind(this);

  this.getBgBottom = function() {
    return this.y + this.h + this.padding + deltaHeight;
  }
}