function Game() {
  var oGame = this;
  var SCORE = 0;

  this.enter = function() {

  }

  this.draw = function() {
    push();

    background(colors.mainTheme);

    drawScore();
    drawBottle();

    pop();
  }

  this.update = function() {

  }

  function drawScore() {
    push();
    
    fill(colors.beige);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('Score: ' + SCORE, width / 12, 50);

    pop();
  }

  function drawBottle() {
    push();

    imageMode(CENTER);
    image(bottleImages.raspberryBottle, width / 2, height);

    pop();
  }
}