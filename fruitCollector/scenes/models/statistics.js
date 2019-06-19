function Statistics(higestScore) {
  this.higestScore = higestScore;
  this.score = 0;
  this.round = 1;
  this.margin = 100;
  var statsContainerStart = width - this.margin;


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

    fill('#ddd254');
    textSize(32);
    text('The higest score: ' + this.higestScore, 100, 100, 500, 100);
    fill(255);
    text('Score: ' + this.score, 600, 100, 700, 100);

    pop();
  }

  this.update = function() {

  }

  this.increaseScore = function() {
    this.score++;
  }
}