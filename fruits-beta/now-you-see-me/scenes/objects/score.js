function Score() {
  this.font = fonts.LGVBold;
  this.score = 1;
  var scoreColor = '#f9f5ed';
  var scoreShadow = '#328087';

  this.draw = function () {
    push();

    translate(0, 0);
    noStroke();
    fill(scoreShadow);
    arc(width / 2, 0, 250, 250, 0, PI);

    fill(scoreColor);
    arc(width / 2, 0, 240, 220, 0, PI);

    textAlign(CENTER, CENTER);
    fill(scoreShadow);
    textSize(30);
    textFont(this.font);
    text(this.getScore(), width / 2, 50);

    pop();
  }

  this.getScore = function() {
    return this.score;
  }

  this.setScore = function(value) {
    this.score = value;
  }
}