function Statistics(higestScore, startingPoint) {
  this.higestScore = higestScore;
  this.startingPoint = startingPoint;
  this.score = 0;
  this.round = 1;
  this.font = fonts.LGVBold;
  var marginTop = 70;
  var higestScoreColor = hexToRgb(colors.sand);

  var offsetTop = -20;
  var animationSpeed = 1;
  var a = 0;
  var alphaSpeed = 0.01;
  var activeAnimation = null;

  var animtaions = {
    in: {
      setup: function() {
        offsetTop = -20;
        a = 0;
      },
      update: function() {
        a = Math.min(a + alphaSpeed, 1);
        offsetTop = Math.min(offsetTop + animationSpeed, 0);
      }
    }
  };

  this.events = {};

  for(var key in animtaions) {
    this.events[key] = {};
  }

  this.getScore = function() {
    return this.score;
  }

  this.setScore = function(score) {
    this.score = score;
  }

  this.getRound = function() {
    return this.round;
  }

  this.setRound = function(round) {
    this.round = round;
  }

  this.draw = function() {
    push();

    translate(0, offsetTop);
    fill(higestScoreColor.r, higestScoreColor.g, higestScoreColor.b, 255 * a);
    textSize(32);
    textFont(this.font);
    textAlign(LEFT, CENTER);
    text('umaRlesi qula: ' + this.higestScore, this.startingPoint, marginTop);
    fill(255, 255, 255, 255 * a);
    textAlign(RIGHT, CENTER);
    text('qula: ' + this.score, width / 2 - 200, marginTop);
    textAlign(LEFT, CENTER);
    text('raundi: ' + this.round, width / 2 + 200, marginTop);

    pop();
  }

  this.update = function() {
    updateAnimtion();
  }

  this.animate = function(type) {
    if(activeAnimation) {
      triggerAnimationEvent(type, 'end');
    }

    if(animtaions.hasOwnProperty(type)) {
      activeAnimation = type;
      animtaions[activeAnimation].setup();
      triggerAnimationEvent(type, 'start');
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

  function updateAnimtion() {
    if(activeAnimation === null) {
      return;
    }

    animtaions[activeAnimation].update();
  }
}