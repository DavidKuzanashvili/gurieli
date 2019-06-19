function Timer(gameStart) {
  this.gameStart = gameStart;
  var timerColor = '#f9f5ed';
  var timerShadow = '#aeaeae';
  var secondsString = '00';
  var seconds = 0;
  var minutes = 0;

  this.draw = function() {
    push();

    noStroke();
    fill(timerShadow);
    arc(width / 2, 0, 250, 250, 0, PI);

    fill(timerColor);
    arc(width / 2, 0, 240, 220, 0, PI);

    textAlign(CENTER, CENTER);
    fill('#db2643');
    textSize(30);
    text(minutes + ':' + secondsString, width / 2, 50);

    pop();
  }

  this.update = function() {
    seconds = round(millis() / 1000) - round(this.gameStart / 1000) - minutes * 59;

    if (seconds <= 9) {
      secondsString = '0' + seconds;
    } else {
      secondsString = seconds;
    }

    if(seconds >= 59) {
      seconds = 0;
      minutes += 1;
    }
  }

  this.getSeconds = function() {
    return seconds;
  }

  this.getMinutes = function() {
    return minutes;
  }
}