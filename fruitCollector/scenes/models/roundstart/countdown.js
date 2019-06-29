function CountDown(x, y, countNumber, numberColor) {
  this.x = x;
  this.y = y;
  this.countNumber = countNumber;
  this.color = hexToRgb(numberColor);
  this.fontSize = 250;
  this.translate = 600;
  this.startTime = millis();
  this.isNextScene = false;
  this.alpha = 1;
  this.alphaSpeed = 0.025;
  this.events = {};

  var minFontSize = this.fontSize * 0.2;
  var duration = 3000;
  var offset = 0;
  var offsetSpeed = 5;
  var realOffset = 0;

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
        }
      }.bind(this)
    }
  }

  for(var key in animations) {
    this.events[key] = {};
  }

  var getFontSizeFor = function (diff) {
    diff = Math.abs(diff);

    return map(diff, 0, this.translate, this.fontSize, minFontSize);
  }.bind(this);

  this.draw = function () {
    push();

    var diff = millis() - this.startTime;

    if (!(floor(diff / 1000) < 3)) {
      this.isNextScene = true;
    } else {
      textFont(fonts.LGVBold);
      textAlign(CENTER, CENTER);

      var currentFontSize = getFontSizeFor(offset);
      textSize(currentFontSize);
      fill(this.color.r, this.color.g, this.color.b, 255 * map(currentFontSize, minFontSize, this.fontSize, 0.25, 1) * currentAlpha);
      text('3', this.x + offset, this.y + (this.fontSize - currentFontSize / 2) / 2);

      currentFontSize = getFontSizeFor(offset + 200);
      textSize(currentFontSize);
      fill(this.color.r, this.color.g, this.color.b, 255 * map(currentFontSize, minFontSize, this.fontSize, 0.25, 1) * currentAlpha);
      text('2', this.x + offset + 200, this.y + (this.fontSize - currentFontSize / 2) / 2);

      currentFontSize = getFontSizeFor(offset + 400);
      textSize(currentFontSize);
      fill(this.color.r, this.color.g, this.color.b, 255 * map(currentFontSize, minFontSize, this.fontSize, 0.25, 1) * currentAlpha);
      text('1', this.x + offset + 400, this.y + (this.fontSize - currentFontSize / 2) / 2);
    }

    pop();
  }

  this.update = function () {
    UpdateAnimation();

    if (this.fontSize <= 200) {
      return;
    }

    var diff = millis() - this.startTime;

    realOffset = map(floor(diff / 1000) * 1000, 0, duration, 0, -this.translate) % this.translate;
    if (realOffset !== offset) {
      offset = Math.max(realOffset, offset - offsetSpeed);
    }
  }

  this.reset = function () {
    this.startTime = millis();
    this.isNextScene = false;
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