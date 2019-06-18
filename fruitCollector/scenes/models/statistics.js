function Statistics(higestScore) {
  this.higestScore = higestScore;
  this.score = 0;
  this.round = 1;

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

    fill(255);
    textSize(32);
    text('The higest score: ' + this.higestScore, 100, 100, 500, 100);
    text('Score: ' + this.score, 700, 100, 500, 100);

    pop();
  }

  this.update = function() {

  }

  this.increaseScore = function() {
    this.score++;
  }
}