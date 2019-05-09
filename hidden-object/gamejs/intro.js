function Intro() {
  this.draw = function() {
    push();

    image( this.sceneManager.bkImg, 0, 0 );

    drawIntroScreen();
    
    pop();
  }

  this.keyPressed = function() {
    if(keyCode === ENTER) {
      this.sceneManager.showScene( Game );
    }
  }

  function drawIntroScreen() {
    textSize(22)
    textAlign(CENTER);
    text('Find hidden object', width / 2, height / 2);
    text('Press ENTER to start', width / 2, height / 2 + 30);
  }
}