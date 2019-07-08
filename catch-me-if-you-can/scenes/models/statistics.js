function Statistics(higestScore, startingPoint) {
  this.higestScore = 547;
  this.startingPoint = startingPoint;
  this.score = 0;
  this.round = 1;
  this.font = fonts.LGVBold;
  var pointX = 0;
  var roundX = 0;
  var roundY = 0;
  var pointAlign;
  var roundAlign;
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
    textSize(32 * sizes.statisticsFontCoefficient);
    textFont(this.font);
    textAlign(LEFT, CENTER);
    if(sizes.showHigestScore) {
      text('umaRlesi qula: ' + this.higestScore, this.startingPoint * sizes.headerMarginCoefficient, marginTop);
    }
    fill(255, 255, 255, 255 * a);
    textAlign(pointAlign, CENTER);
    text('qula: ' + this.score, pointX, marginTop);
    textAlign(roundAlign, CENTER);
    text('raundi: ' + this.round, roundX, roundY);

    pop();
  }

  this.update = function() {
    updateAnimtion();

    if(windowWidth >= 1200) {
      pointAlign = RIGHT;
      roundAlign = LEFT;
      pointX = width / 2 - 200 * sizes.headerMarginCoefficient;
      roundX = width / 2 + 200 * sizes.headerMarginCoefficient;
      roundY = marginTop;
    } else {
      pointX = roundX = this.startingPoint * sizes.headerMarginCoefficient;
      roundY = marginTop + 50;
      pointAlign = roundAlign = LEFT;
    }
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