function Timer(timerStart, maxTime = 60) {
  this.timerStart = timerStart;
  this.font = fonts.LGVBold;
  var timerColor = '#f9f5ed';
  var timerShadow = '#aeaeae';
  var seconds = 0;

  var offsetTop = -250;
  var animationSpeed = 5;
  var activeAnimation = null;

  var animations = {
    in: {
      setup: function() {
        offsetTop = -250;
      },
      update: function() {
        offsetTop = Math.min(offsetTop + animationSpeed, 0);
        console.log(offsetTop);
      }
    }
  };

  this.events = {};

  for(var key in animations) {
    this.events[key] = {};
  }

  this.draw = function () {
    push();

    translate(0, offsetTop);
    noStroke();
    fill(timerShadow);
    arc(width / 2, 0, 250, 250, 0, PI);

    fill(timerColor);
    arc(width / 2, 0, 240, 220, 0, PI);

    textAlign(CENTER, CENTER);
    fill('#db2643');
    textSize(30);
    textFont(this.font);
    text(this.getTimeText(), width / 2, 50);

    pop();
  }

  this.update = function () {
    updateAnimaton();
    seconds = Math.min(round(millis() / 1000) - round(this.timerStart / 1000), maxTime);
  }

  this.getTimeLeft = function () {
    return maxTime - seconds;
  }

  this.getSecondsLeft = function () {
    return this.getTimeLeft() % 60;
  }

  this.getMinutesLeft = function () {
    return parseInt(this.getTimeLeft() / 60);
  }

  this.getTimeText = function () {
    return this.getMinutesLeft() + ':' + this.getSecondsLeft().toString().padStart(2, '0');
  }

  this.ended = function () {
    return seconds === maxTime;
  }

  this.fixTime = function (badMS) {
    this.timerStart += badMS;
  }

  this.animate = function(type) {
    if(activeAnimation) {
      triggerAnimationEvent(type, 'end');
    }

    if(animations.hasOwnProperty(type)) {
      activeAnimation = type;
      animations[activeAnimation].setup();
      triggerAnimationEvent(type, 'start');
    } else {
      activeAnimation = null;
    }
  }

  function updateAnimaton() {
    if(activeAnimation !== null) {
      animations[activeAnimation].update();
    }
  }

  var triggerAnimationEvent = function(animation, event) {
    if(this.events.hasOwnProperty(animation) && this.events[animation].hasOwnProperty(event)) {
      return this.events[animation][event]();
    }

    return false;
  }.bind(this);
}