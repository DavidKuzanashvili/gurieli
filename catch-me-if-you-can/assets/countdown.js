function CountDown(x, y, countNumber, numberColor) {
  this.x = x;
  this.y = y;
  this.countNumber = countNumber;
  this.color = hexToRgb(numberColor);
  this.fontSize = 150 * sizes.countDownCoefficient;
  this.translate = 450;
  this.startTime = millis();
  this.isNextScene = false;
  this.alpha = 1;
  this.alphaSpeed = 0.025;
  this.events = {};
  this.onUpdate = function() {};

  var minFontSize = this.fontSize * sizes.countDownCoefficient * 0.2;
  var duration = 3000;
  var offset = 0;
  var offsetSpeed = 5;
  var realOffset = 0;
  var soundCounter = 0;

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

    return map(diff, 0, this.translate, this.fontSize * sizes.countDownCoefficient, minFontSize);
  }.bind(this);

  this.draw = function () {
    push();

    var diff = millis() - this.startTime;

    if (!(floor(diff / 1000) < 3)) {
      this.isNextScene = true;
    } else {
      
      if(floor(diff / 1000) > soundCounter) {
        soundCounter++;
        sounds.countDown.play();
      }

      textFont(fonts.LGVBold);
      textAlign(CENTER, CENTER);

      var currentFontSize = getFontSizeFor(offset);
      textSize(currentFontSize);
      fill(this.color.r, this.color.g, this.color.b, 255 * map(currentFontSize, minFontSize, this.fontSize * sizes.countDownCoefficient, 0.1, 1) * currentAlpha);
      text('3', this.x + offset, this.y + (this.fontSize * sizes.countDownCoefficient - currentFontSize / 2) / 2  - responsiveOffsetY);

      currentFontSize = getFontSizeFor(offset + (this.translate / 3));
      textSize(currentFontSize);
      fill(this.color.r, this.color.g, this.color.b, 255 * map(currentFontSize, minFontSize, this.fontSize * sizes.countDownCoefficient, 0.1, 1) * currentAlpha);
      text('2', this.x + offset + (this.translate / 3), this.y + (this.fontSize * sizes.countDownCoefficient - currentFontSize / 2) / 2  - responsiveOffsetY);

      currentFontSize = getFontSizeFor(offset + (this.translate * 2 / 3));
      textSize(currentFontSize);
      fill(this.color.r, this.color.g, this.color.b, 255 * map(currentFontSize, minFontSize, this.fontSize, 0.1, 1) * currentAlpha);
      text('1', this.x + offset + (this.translate * 2 / 3), this.y + (this.fontSize * sizes.countDownCoefficient - currentFontSize / 2) / 2 - responsiveOffsetY);
    }

    pop();
  }

  var responsiveOffsetY = 0;

  this.update = function () {
    this.translate = 400 * sizes.countDownCoefficient;

    if(windowWidth <= 500) {
      responsiveOffsetY = 50;
    }

    this.onUpdate();
    UpdateAnimation();

    if (this.fontSize * sizes.countDownCoefficient <= this.fontSize * sizes.countDownCoefficient - 50) {
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