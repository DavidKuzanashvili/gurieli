function Intro() {
  this.draw = function() {
    push();

    image( this.sceneManager.bkImg, 0, 0 );

    drawIntroScreen();
    
    pop();
  }

  this.keyPressed = function() {
    if(key == '1') {
      this.sceneManager.showScene( Game );
    }
  }

  function drawIntroScreen() {
    textSize(22)
    textAlign(CENTER);
    text('Find hidden object', width / 2, height / 2);
    text('Press 1 to start', width / 2, height / 2 + 30);
  }
}