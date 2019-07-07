function Game() {
  //Controls
  var pauseButton = null;
  var closeButton = null;
  var muteButton = null;
  var resetButton = null;
  var headerButtons = [];
  var closeBtn = null;
  var pauseBtn = null;
  var muteBtn = null;
  var resetBtn = null;
  var gapBetweenBtns = 30;
  var headerMargin = 100;
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
  
  //Levels
  var startSpeed = 0.1;
  var startSwaps = 5;
  var increaseSpeed = 0.1;
  var increaseSwaps = 3;
  var endSpeed = 0.5;
  var endSwaps = 25;
  var CURRENT_LEVEL = 0;

  var isCupsClickable = function(){
    return clickableCups
      && !swapping
      && !showQuitModal
      && !isPaused
      && !showStats;
  }
  var onCupUpdates = [
    function() {
      this.width = cupImgObj.width * sizes.cupSizeCoefficient;
      this.height = cupImgObj.height * sizes.cupSizeCoefficient;
      this.x = width / 2 - (gap * sizes.cupsGapCoefficeint) - cupImgObj.width;
      this.y = height / 2;
    },
    function() {
      this.width = cupImgObj.width * sizes.cupSizeCoefficient;
      this.height = cupImgObj.height * sizes.cupSizeCoefficient;
      this.x = width / 2;
      this.y = height / 2;
    },
    function() {
      this.width = cupImgObj.width * sizes.cupSizeCoefficient;
      this.height = cupImgObj.height * sizes.cupSizeCoefficient;
      this.x = width / 2 + (gap * sizes.cupsGapCoefficeint) + cupImgObj.width;
      this.y = height / 2;
    }
  ];

  var swapping = false;
  var swapStep = null;

  var startLevel = function(level){
    CURRENT_LEVEL = level;
    speed = Math.min(startSpeed + CURRENT_LEVEL * increaseSpeed, endSpeed);
    swaps = Math.min(startSwaps + CURRENT_LEVEL * increaseSwaps, endSwaps);

    swapStep = turn(speed, swaps, function() {
      swapStep = null;
      clickableCups = true;
    });
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
    cursor('default');

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
          if(btn.typeText === 'reset') {
            resetGame();
          }
        }
      });
    }

    if(pauseGameModal.resumeBtn.contains(mouseX, mouseY)) {
      showPauseModal = false;
      unpouseGame();
    } 

    quitGameModal.quitButtons.forEach(function(btn){
      if(btn.contains(mouseX, mouseY)) {
        btn.animate('down');
      } 
    });

    statsGameModal.statButtons.forEach(function(btn) {
      if(btn.contains(mouseX, mouseY)) {
        if(btn.typeText === 'reset') {
          showStats = false;
          resetGame();
        }
      }
    });

    if(isCupsClickable()) {
      cups.forEach(function(cup) {
        if(cup.contains(mouseX, mouseY)) {
          cup.events.reveal.start = function() {
            if(cup.xushturi) {
              cup.xushturi.switchAnimation('win');
            }
          }
          cup.animate('reveal');
          clickableCups = false;

          cup.events.reveal.end = function(){
            delete cup.events.reveal.end;
            if(cup.xushturi) {
              score++;
              scoreCircle.setScore(score);
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
                setTimeout(function() {
                  cup.animate('hide');
                  setTimeout(() => {
                    cup.events.hide.end = function() {
                      delete cup.events.hide.end;
                      showStats = true;
                    }
                  }, 200);
                }, 200);  
              } else {
                setTimeout(function(){
                  cup.animate('hide');
                  setTimeout(function(){
                    winningCup.events.reveal.start = function() {
                      delete winningCup.events.reveal.start;
                      winningCup.xushturi.switchAnimation('lose');                      
                    }

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
    xushturi.switchAnimation('start');
    hearts  = new LifeFactory(lifes.active, 3, width / 2 - 3 * (36 + 50) / 2, 36, 31, 50);
    cups.push(new Cup(width / 2 - gap - cupImgObj.width, height / 2));
    cups.push(new Cup(width / 2, height / 2));
    cups.push(new Cup(width / 2 + gap + cupImgObj.width, height / 2));
    updateCupHandlers();
    cups[1].xushturi = xushturi;
    winningCup = cups[1];

    closeBtn = new ControlButton(pngIcons.close.img, width - 100 - pngIcons.close.w / 2, 70, pngIcons.close.w, pngIcons.close.h);
    closeBtn.typeText = 'close';
    closeBtn.onUpdate = function() {
        this.x = width - 100 - pngIcons.close.w / 2;
    }

    pauseBtn = new ControlButton(pngIcons.pause.img, width - (headerMargin + gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w / 2), 70, pngIcons.pause.w, pngIcons.pause.h);
    pauseBtn.typeText = 'pause';
    pauseBtn.onUpdate = function() {
        this.x = width - (headerMargin + gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w / 2);
    }

    muteBtn = new ControlButton(pngIcons.sound.img, width - (headerMargin + 2*gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w / 2), 70, pngIcons.sound.w, pngIcons.sound.h);
    muteBtn.typeText = 'mute';
    muteBtn.onUpdate = function() {
        this.x = width - (headerMargin + 2*gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w / 2);
    }

    resetBtn = new ControlButton(pngIcons.reset.img, width - (headerMargin + 3*gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w + pngIcons.reset.w / 2), 70, pngIcons.reset.w, pngIcons.reset.h);
    resetBtn.typeText = 'reset';
    resetBtn.onUpdate = function() {
        this.x = width - (headerMargin + 3*gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w + pngIcons.reset.w / 2);
    }

    headerButtons = [ closeBtn, pauseBtn, muteBtn, resetBtn ];

    scoreCircle = new Score();
    scoreCircle.setScore(score);

    quitGameModal = new Modal({
      width: 400,
      height: 300,
      shadowOffsetTop: 12
    });

    quitGameModal.quitButtons[0].events.down.end = function () {
      showStats = true;
      showQuitModal = false;
    }

    quitGameModal.quitButtons[1].events.down.end = function () {
      showQuitModal = false;
    }

    pauseGameModal = new Modal({
      width: 499,
      height: 154,
      shadowOffsetTop: 12
    });

    statsGameModal = new Modal();
  }

  function drawHigestScore() {
    push();

    fill(255);
    textSize(40);
    textFont(fonts.LGVBold);
    textAlign(LEFT, CENTER);
    text('umaRlesi qula: 3224', 100 * sizes.headerMarginCoefficient, marginTop);

    pop();
  }

  function pauseGame() {
    isPaused = true;
  }

  function unpouseGame() {
    isPaused = false;
  }

  function resetGame() {
    showStats = false;
    score = 0;
    scoreCircle.setScore(score);
    CURRENT_LEVEL = 0;

    hearts.generateLifes(false);
    
    cups.forEach(function(cup) {
      cup.xushturi = null;
    });

    cups[1].xushturi = xushturi;
    winningCup = cups[1];

    winningCup.events.reveal.start = function() {
      delete winningCup.events.reveal.start;
      winningCup.xushturi.switchAnimation('start');
    }
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
}