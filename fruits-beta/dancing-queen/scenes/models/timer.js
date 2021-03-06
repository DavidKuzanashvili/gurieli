function Timer(timerStart, maxTime = 60) {
  this.timerStart = timerStart;
  this.font = fonts.LGVBold;
  var timerColor = colors.beige;
  var timerShadow = '#dddddd';
  var seconds = 0;

  this.draw = function () {
    push();


    noStroke();
    fill(timerShadow);
    arc(width / 2, 0, 250, 250, 0, PI);

    fill(timerColor);
    arc(width / 2, 0, 250, 220, 0, PI);

    textAlign(CENTER, CENTER);
    fill('#db2643');
    textSize(30);
    textFont(this.font);
    text(this.getTimeText(), width / 2, 50);

    pop();
  }

  this.update = function () {
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
}