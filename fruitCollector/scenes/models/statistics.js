function Statistics(higestScore, startingPoint) {
  this.higestScore = higestScore;
  this.startingPoint = startingPoint;
  this.score = 0;
  this.round = 1;
  this.font = fonts.LGVBold;
  var marginTop = 70;

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

    fill(colors.sand);
    textSize(32);
    textFont(this.font);
    textAlign(LEFT, CENTER);
    text('umaRlesi qula: ' + this.higestScore, this.startingPoint, marginTop);
    fill(255);
    textAlign(RIGHT, CENTER);
    text('qula: ' + this.score, width / 2 - 200, marginTop);
    textAlign(LEFT, CENTER);
    text('raundi: ' + this.round, width / 2 + 200, marginTop);

    pop();
  }

  this.update = function() {

  }

  this.increaseScore = function() {
    this.score++;
  }

  this.decreaseScore = function() {
    this.score--;
  }
}