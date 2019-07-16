function Timer(timerStart, maxTime = 60) {
  this.timerStart = timerStart;
  this.font = fonts.LGVBold;
  var timerColor = '#f9f5ed';
  var textColor = colors.sapGreen;
  var textOffsetX = 0;
  var timerShadow = colors.sixD;
  var seconds = 0;
  this.startSound = 0;

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
    arc(width / 2, 0, 250 * sizes.timerCoefficient, 250 * sizes.timerCoefficient, 0, PI);

    fill(timerColor);
    arc(width / 2, 0, 240 * sizes.timerCoefficient, 220 * sizes.timerCoefficient, 0, PI);

    textAlign(CENTER, CENTER);
    fill(textColor);
    textSize(30 * sizes.timerTextCoefficient);
    textFont(this.font);
    text(this.getTimeText(), width / 2 + textOffsetX, 50 * sizes.timerCoefficient);

    pop();
  }

  this.update = function () {
    updateAnimaton();
    seconds = Math.min(round(millis() / 1000) - round(this.timerStart / 1000), maxTime);

    if(!this.startSound && this.getSecondsLeft() <= 10) {
      this.startSound = 1;
      setTimeout(function() {
        textColor = colors.cherry;
        sounds.timeLeft.play();
      }, 1000 / 60 * 50);
    }

    // if(this.getSecondsLeft() === 10) {
    //   this.startSound++;
    //   if( >= 50) {
    //     textColor = colors.cherry;
    //     sounds.timeLeft.play();
    //     this.startSound = 0;
    //   } 
    // }

    if(this.getSecondsLeft() <= 9) {
      textOffsetX = round(random(-1, 1));
    }
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