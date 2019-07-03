function Game() {
  //Controls
  var pauseButton = null;
  var closeButton = null;
  var muteButton = null;
  var resetButton = null;
  var headerButtons = [];
  var pauseGameModal = null;
  var quitGameModal  = null;
  var statsGameModal = null;
  
  var togglePause = false;
  var toggleClose = false;

  var isPaused = false;
  var showQuitModal = false;
  var showStats = false;
  
  //Game
  var score = 0;
  var hearts = [];
  var scoreCircle = null;
  var marginTop = 70;
  var cups = [];
  var winningCup = null
  var clickableCups = false;
  var xushturi = null;
  var gap = 70;
  var isCupsClickable = function(){
    return clickableCups && !swapping;
  }
  var onCupUpdates = [
    function() {
      this.x = width / 2 - gap - cupImgObj.width;
      this.y = height / 2;
    },
    function() {
      this.x = width / 2;
      this.y = height / 2;
    },
    function() {
      this.x = width / 2 + gap + cupImgObj.width;
      this.y = height / 2;
    }
  ];
  var swapping = false;
  var swapStep = null;

  var startLevel = function(level){
    CURRENT_LEVEL = level;
    if(level >= LEVELS.length) {

    } else {
      swapStep = turn(LEVELS[CURRENT_LEVEL].speed, LEVELS[CURRENT_LEVEL].swaps, function() {
        swapStep = null;
        clickableCups = true;
      });
    }
  }

  this.ender = function() {
  }

  this.setup = function() {
    initGame();

    cups[1].animate('reveal');
    cups[1].events.reveal.end = function() {
      delete cups[1].events.reveal.end;
      setTimeout(function() {
        cups[1].animate('hide');
        cups[1].events.hide.end = function(){
          delete cups[1].events.hide.end;
          startLevel(0);
        };
      }, 1000);
    }
  }

  this.draw = function() {
    push();

    background(colors.seafoamBlueTwo);

    headerButtons.forEach(function(btn) {
      btn.update();
    });
    
    cups.forEach(function(cup) {
      cup.update();
    });
    
    if(!isPaused && swapStep) {
      swapStep();
    }
    
    cups.forEach(function(cup) {
      cup.draw();
    });

    hearts.draw();

    drawHigestScore();
    scoreCircle.draw();
    headerButtons.forEach(function(btn) {
      btn.draw();
    });
    
    if(showQuitModal) {
      quitGameModal.drawQuit();
    }

    if(isPaused) {
      pauseGameModal.drawPause();
    }

    if(showStats) {
      statsGameModal.drawStats();
    }

    // line(mouseX, 0, mouseX, height);
    // text(mouseX, mouseX, mouseY);
    pop();
  }
  
  var turn = function(speed, turns, cb){
    cups.forEach(function(cup){
      cup.setAnimationSpeed(speed);
    });

    var t = 1;
    
    return function(){
      if(!swapping && turns) {
        if(t > 0) {
          t = 0;
          return;
        }

        turns--;
        t=1;
        if(turns > 0) {
          swapCups.apply(null, randomIdx());
        } else {
          swapCups.apply(null, [].concat(randomIdx(), [cb]));
        }
      }
    }
  }

  var randomIdx = function(){
    var idx = [0, 1, 2];
    var a = random(idx);
    var b = random(
      idx.filter(function(c){
        return c != a;
      })
    );
    return [a, b].sort();
  }

  this.update = function() {
  }

  this.mousePressed = function() {
    if(!isPaused) {
      headerButtons.forEach(function(btn) {
        if(btn.contains(mouseX, mouseY)) {
          btn.animate('down');
        }
      });
    }

    if(pauseGameModal.pauseButton.contains(mouseX, mouseY)) {
      pauseGameModal.pauseButton.animate('down');
    } 

    quitGameModal.quitButtons.forEach(function(btn){
      if(btn.contains(mouseX, mouseY)) {
        btn.animate('down');
      } 
    });

    if(isCupsClickable()) {
      cups.forEach(function(cup) {
        if(cup.contains(mouseX, mouseY)) {
          cup.animate('reveal');
          clickableCups = false;
          cup.events.reveal.end = function(){
            delete cup.events.reveal.end;
            if(cup.xushturi) {
              CURRENT_LEVEL++;
              setTimeout(function(){
                cup.animate('hide');
                cup.events.hide.end = function(){
                  delete cup.events.hide.end;
                  startLevel(CURRENT_LEVEL);
                }
              }, 500);
            } else {
              if(hearts.lifes.length > 0) {
                hearts.lifes.pop();
              }

              if(hearts.lifes.length === 0) {
                console.log('Game over');
              } else {
                setTimeout(function(){
                  cup.animate('hide');
                  setTimeout(function(){
                    winningCup.events.reveal.end = function(){
                      setTimeout(function(){
                        winningCup.animate('hide');
                        winningCup.events.hide.end = function(){
                          delete winningCup.events.hide.end;
                          startLevel(CURRENT_LEVEL);
                        }
                      }, 200);
                    }
                    winningCup.animate('reveal');
                  }, 50);
                }, 200);
              }
            }

            // clickableCups = true;
          }
        }
      });
    }
  }

  this.keyPressed = function() {
    var SPACE = 32;
    var M = 77;
    var m = 109;
    var R = 82;
    var r = 114;

    switch(keyCode) {
      case SPACE: {
        togglePause = !togglePause;
        
        if(togglePause) {
          pauseButton.animate('down');
        } else {
          // pauseGameModal.pauseButton.animate('down');
        }
      }
      break;
      case (M || m): {
        muteButton.animate('down');
      }
      break;
      case (R || r): {
        resetButton.animate('down');
      }
      break;
      case ESCAPE: {
        toggleClose = !toggleClose;
        if(toggleClose) {
          closeButton.animate('down');
        } else {
          // quitGameModal.quitButtons[1].animate('down');
        }
      }
      break;
    }
}

  var updateCupHandlers = function(){
    for(var i = 0; i < 3; i++) {
      cups[i].onUpdate = onCupUpdates[i];
      cups[i].onUpdate();
    }
  }
  
  var swapCups = function(i1, i2, cb){
    if(swapping) {
      return;
    }
    swapping = true;

    if(i1 > i2) {
      return swapCups(i2, i1);
    }

    var a = cups[i1];
    var b = cups[i2];

    var range = b.x - a.x;
    var c = 2;

    b.events.left.end = a.events.right.end = function() {
      c--;
      if(c) {
        return;
      }

      cups[i1] = b;
      cups[i2] = a;

      a.offsetX = 0;
      b.offsetX = 0;
  
      a.events.right.end();
      b.events.left.end();
      
      updateCupHandlers();
      swapping = false;
      cb && cb();
    };

    a.goRight(range);
    b.goLeft(range);
  }

  function initGame() {
    xushturi = new Xushturi(0,0);
    hearts  = new LifeFactory(lifes.active, 3, width / 2 - 3 * (43 + 50) / 2, 43, 40, 50);
    cups.push(new Cup(width / 2 - gap - cupImgObj.width, height / 2));
    cups.push(new Cup(width / 2, height / 2));
    cups.push(new Cup(width / 2 + gap + cupImgObj.width, height / 2));
    updateCupHandlers();
    cups[1].xushturi = xushturi;
    winningCup = cups[1];

    headerButtons.push(new Button({
      y: marginTop,
      backgroundColor: color(colors.sand),
      type: "X",
      content: icons.close,
      width: 50,
      height: 50,
      shadowOffset: 6,
      fontSize: 16,
      onUpdate: function() {
        this.x = width - 100 - 25;
      }
    }));
    closeButton = headerButtons[0];

    closeButton.events.down.end = function() {
      showQuitModal = true;
    }

    headerButtons.push(new Button({
      y: marginTop,
      backgroundColor: color(colors.booger),
      type: "P",
      content: icons.pause,
      width: 50,
      height: 50,
      shadowOffset: 6,
      fontSize: 16,
      onUpdate: function() {
        this.x = width - 180 - 25;
      }
    }));
    pauseButton = headerButtons[1];

    pauseButton.events.down.end = function() {
      isPaused = true;
    }

    headerButtons.push(new Button({
      y: marginTop,
      backgroundColor: color(colors.seafoamBlueTwo),
      type: "M",
      content: icons.music,
      width: 50,
      height: 50,
      shadowOffset: 6,
      fontSize: 16,
      onUpdate: function() {
        this.x = width - 260 - 25;
      }
    }));
    muteButton = headerButtons[2];

    headerButtons.push(new Button({
      y:  marginTop,
      backgroundColor: color(colors.lipstick),
      type: "R",
      content: icons.reload,
      width: 50,
      height: 50,
      shadowOffset: 6,
      fontSize: 16,
      onUpdate: function() {
        this.x = width - 340 - 25;
      }
    }));
    resetButton = headerButtons[3];

    scoreCircle = new Score();

    quitGameModal = new Modal({
      width: 400,
      height: 300,
      shadowOffsetTop: 12
    });

    quitGameModal.quitButtons[0].events.down.end = function () {
      // bindGameObject.sceneManager.showScene(GameOver);
      showStats = true;
    }

    quitGameModal.quitButtons[1].events.down.end = function () {
      showQuitModal = false;
    }

    pauseGameModal = new Modal({
      width: 400,
      height: 300,
      shadowOffsetTop: 12
    });

    pauseGameModal.pauseButton.events.down.end = function () {
      showPauseModal = false;
      unpouseGame();
    }

    statsGameModal = new Modal();

  }

  function drawHigestScore() {
    push();

    fill(255);
    textSize(40);
    textFont(fonts.LGVBold);
    textAlign(LEFT, CENTER);
    text('umaRlesi qula: 3224', 100, marginTop);

    pop();
  }

  function pauseGame() {
    isPaused = true;
  }

  function unpouseGame() {
    isPaused = false;
  }
}