function GameOver() {
  var oGame;

  this.setup = function() {
    oGame = this.sceneManager.findScene( Game ).oScene;
  }

  this.draw = function() {
    push();

    image( this.sceneManager.bkImg, 0, 0 );

    textSize(20);
    textAlign(CENTER);
    text('Score: ' + oGame.getScore(), width / 2, height / 2 - 20);

    text('Press any key to restart game...', width / 2, height / 2 + 20);

    pop();
  }

  this.keyPressed = function() {
    this.sceneManager.showScene( Intro );
  }
}