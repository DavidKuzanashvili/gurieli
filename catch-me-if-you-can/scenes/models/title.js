function Title(x, y, content, color, fontSize) {
  this.x = x;
  this.y = y;
  this.color = hexToRgb(color) || { r: 255, g: 255, b: 255 };
  this.alpha = 1;
  this.fontSize = fontSize || 30;
  this.content = content;
  this.font = fonts.LGVBold;
  this.alphaSpeed = 0.05;
  this.events = {};
  this.outEnd = false;
  this.onUpdate = function() {};

  var currentAlpha = this.alpha;
  var activeAnimation = 'in';
  var animations = {
    in: {
      setup: function () {
        currentAlpha = 0;
      }.bind(this),
      update: function () {
        currentAlpha = Math.min(currentAlpha + this.alphaSpeed, this.alpha);
        if (currentAlpha === this.alpha) {
          activeAnimation = null;
        }
      }.bind(this)
    },
    out: {
      setup: function () {
        currentAlpha = this.alpha;
      }.bind(this),
      update: function () {
        currentAlpha = Math.max(currentAlpha - this.alphaSpeed, 0);
        if (currentAlpha === 0) {
          activeAnimation = null;
          this.outEnd = true;
        }
      }.bind(this)
    }
  }

  for(var key in animations) {
    this.events[key] = {};
  }

  this.draw = function () {
    push();

    fill(this.color.r, this.color.g, this.color.b, currentAlpha * 255);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER);
    textFont(this.font);
    text(this.content, this.x, this.y);

    pop();
  }

  this.update = function () {
    this.onUpdate();
    UpdateAnimation();
  }

  this.animate = function (type) {
    if(activeAnimation) {
      triggerAnimationEvent(activeAnimation, 'end');
    }

    if (animations.hasOwnProperty(type)) {
      animations[type].setup();
      activeAnimation = type;
      triggerAnimationEvent(activeAnimation, 'start');
    } else {
      activeAnimation = null;
    }
  }

  function UpdateAnimation() {
    if (activeAnimation === null) {
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
}