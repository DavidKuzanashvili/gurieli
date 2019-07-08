function Button(options) {
  options = options || {};
  this.x = options.x;
  this.y = options.y;
  this.width = options.width || 237;
  this.height = options.height || 74;
  this.textColor = options.color || color(255);
  this.backgroundColor = options.backgroundColor;
  this.shadowColor = darken(this.backgroundColor);
  this.content = options.content || 'Undefined';
  this.fontSize = options.fontSize || 30;
  this.font = options.font || fonts.LGVBold;
  this.type = options.type || 'undefined';
  this.onUpdate = options.onUpdate || function () { };
  this.alpha = options.alpha || 1;
  this.alphaSpeed = options.alphaSpeed || 0.05;

  this.shadowOffset = options.shadowOffset || 10;

  this.currentOffset = 0;
  this.speed = options.speed || 1;
  var currentAlpha = this.alpha;

  var drawContent = function () {
    textSize(this.fontSize);
    text(this.content, this.x, this.y + this.currentOffset);
  }.bind(this);

  var usingAlpha = function (c, a) {
    var values = c.levels.slice();
    values[3] = a;
    return values;
  }

  switch (typeof this.content) {
    case 'object':
      drawContent = function () {
        push();
        imageMode(CENTER);
        image(this.content, this.x, this.y + this.currentOffset, this.width / 3.5, this.height / 3.5);
        pop();
      }.bind(this);
      break;
    case 'function':
      drawContent = this.content;
      break;
    default:
  }

  this.draw = function () {
    push();

    if (this.contains(mouseX, mouseY)) {
      cursor('pointer');
    }
    noStroke();
    rectMode(CENTER);

    fill(usingAlpha(this.shadowColor, 255 * currentAlpha));
    rect(this.x, this.y + this.shadowOffset, this.width, this.height, 43);
    fill(usingAlpha(this.backgroundColor, 255 * currentAlpha));
    rect(this.x, this.y + this.currentOffset, this.width, this.height, 43);
    textAlign(CENTER, CENTER);
    fill(usingAlpha(this.textColor, 255 * currentAlpha));
    textFont(this.font);
    drawContent();

    pop();
  }

  this.update = function () {
    this.onUpdate();
    updateAnimation();
  }

  var activeAnimation = null;
  var animations = {
    down: {
      setup: function () {
        this.currentOffset = 0;
      }.bind(this),
      update: function () {
        if (this.currentOffset < this.shadowOffset) {
          this.currentOffset += this.speed;
        } else {
          this.currentOffset = this.shadowOffset;
          this.animate('up');
        }
      }.bind(this)
    },
    up: {
      setup: function () {
        this.currentOffset = this.shadowOffset;
      }.bind(this),
      update: function () {
        if (this.currentOffset > 0) {
          this.currentOffset -= this.speed;
        } else {
          this.currentOffset = 0;
          this.animate();
        }
      }.bind(this)
    },
    fadeIn: {
      setup: function () {
        currentAlpha = 0;
      }.bind(this),
      update: function () {
        currentAlpha = Math.min(currentAlpha + this.alphaSpeed, this.alpha);
        if (currentAlpha === this.alpha) {
          this.animate();
        }
      }.bind(this)
    },
    fadeOut: {
      setup: function () {
        currentAlpha = this.alpha;
      }.bind(this),
      update: function () {
        currentAlpha = Math.max(currentAlpha - this.alphaSpeed, 0);
        if (currentAlpha === 0) {
          this.animate();
        }
      }.bind(this)
    }
  };

  this.events = {};

  for (var key in animations) {
    this.events[key] = {};
  }

  function updateAnimation() {
    if (activeAnimation == null) {
      return;
    }

    animations[activeAnimation].update();
  }

  this.animate = function (type) {
    if (activeAnimation) {
      triggerAnimationEvent(activeAnimation, 'end');
    }
    if (animations.hasOwnProperty(type)) {
      activeAnimation = type;
      animations[activeAnimation].setup();
      triggerAnimationEvent(activeAnimation, 'start');
    } else {
      activeAnimation = null;
    }
  }

  var triggerAnimationEvent = function (animation, event) {
    if (this.events.hasOwnProperty(animation) && this.events[animation].hasOwnProperty(event)) {
      return this.events[animation][event]();
    }

    return false;
  }.bind(this);

  this.contains = function (x, y) {
    var w = this.width / 2;
    var h = this.height / 2;

    return x > this.x - w
      && x < this.x + w
      && y > this.y - h
      && y < this.y + h + this.shadowOffset;
  }
}