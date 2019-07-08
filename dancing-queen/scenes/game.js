function Game() {
  var self = this;
  var bindGameObject = this;
  var header = null;
  var oDancer = null;
  var hearts = null;
  var controlColumns = [];
  var isPaused = false;
  var showQuit = false;
  var showStats = false;
  var pauseGameModal;
  var quitGameModal;
  var statsModal;
  var pauseStart;
  var arrowSize = 72;
  var score = 0;
  var dance = null;
  var activeAreaStart = height - 300;
  var inCorrectArrowsLimit = 3;
  var lastDrop = 0;

  //Toggles
  var isSound = true;

  this.enter = function() {
    initGame();
  }

  this.setup = function() {
    if(!sounds.background.isLoaded()) {
      setTimeout(this.setup, 50);
      return;
    }

    sounds.background.setVolume(0.2);
    sounds.background.loop();
  }

  this.draw = function() {
    push();

    if(!isPaused) {
      oDancer.update();
    }

    cursor('default');
    background(colors.lightTan);
    this.update();
    drawHeader();
    drawDancer();
    drawControlColumns();
    
    drawLifes();
    
    if(showQuit) {
      quitGameModal.drawQuit();
    }

    if(isPaused) {
      pauseGameModal.drawPause();
    }
    
    pop();
  }

  this.update = function() {
    var randomColumn = controlColumns[round(random(0, 3))];
    if(!isPaused) {
      if(millis() > lastDrop + 1000) {
        lastDrop = millis();
        var speed = 3;
        randomColumn.arrows.push(new Arrow(randomColumn.x + (width / 8) / 2, randomColumn.offsetTop, arrowSize, arrowSize, randomColumn.btnTypeCode, speed));
      }
    }
    updateActiveKeyCodes();
  }

  function updateActiveKeyCodes(){
    ACTIVE_KEY_CODES.clear();
    controlColumns.forEach(function(col){
      if(col.isSomeArrowsInActiveArea()){
        ACTIVE_KEY_CODES.add(col.btnTypeCode);
      }
    });
  }

  function initGame() {
    var acceptQuitBtn = null;
    var refuseQuitBtn = null;

    header = new Header();
    oDancer = new Dancer();
    cutSequence();
    hearts = new LifeFactory(lifeImages.active, 3, 45, 40, 50);
    hearts.generetaLifes();
    controlColumns.push(new ControlColumn(UP_ARROW, width / 2, colors.beige));
    controlColumns[0].arrowRotation = PI;
    controlColumns[0].onUpdate = function() {
      this.x = width / 2;
    };
    controlColumns.push(new ControlColumn(LEFT_ARROW, width / 2 + (width / 8), colors.sand));
    controlColumns[1].arrowRotation = PI / 2;
    controlColumns[1].onUpdate = function() {
      this.x = width / 2 + (width / 8);
    };
    controlColumns.push(new ControlColumn(DOWN_ARROW, width / 2 + 2*(width / 8), colors.seafoamBlue));
    controlColumns[2].arrowRotation = 0;
    controlColumns[2].onUpdate = function() {
      this.x = width / 2 + 2*(width / 8);
    };
    controlColumns.push(new ControlColumn(RIGHT_ARROW, width / 2 + 3*(width / 8), colors.booger));
    controlColumns[3].arrowRotation = -PI / 2;
    controlColumns[3].onUpdate = function() {
      this.x = width / 2 + 3*(width / 8);
    };

    statsModal = new Modal();

    quitGameModal = new Modal({
      width: 400,
      height: 300,
      shadowOffsetTop: 12
    });
    
    acceptQuitBtn = quitGameModal.quitButtons[0];
    refuseQuitBtn = quitGameModal.quitButtons[1];
    acceptQuitBtn.events.down.end = function() {
      showStats = true;
      showQuit = false;
    }

    refuseQuitBtn.events.down.end = function() {
      showQuit = false;
    }


    pauseGameModal = new Modal({
      width: 499,
      height: 154,
      shadowOffsetTop: 12
    });
  }

  function drawHeader() {
    header.draw();
    header.setScore(score);
  }

  function drawDancer() {
    oDancer.draw();
  }

  function drawLifes() {
    hearts.draw();
  }

  function drawControlColumns() {
    controlColumns.forEach(function(column) {
      column.isPaused = isPaused;
      column.update();
      column.draw();
    });
  }

  function pauseGame() {
    pauseStart = millis();
    isPaused = true;
    header.isPaused = isPaused;
  }

  function unpouseGame() {
    isPaused = false;
    header.isPaused = isPaused;
    delete pauseStart;
  }

  this.mousePressed = function() {
    if(header.soundBtn.contains(mouseX, mouseY)) {
      if(isSound) {
        for(key in sounds) {
          sounds[key].setVolume(0);
        }
      } else {
        for(key in sounds) {
          if(key === 'background') {
            sounds[key].setVolume(0.2);
          } else {
            sounds[key].setVolume(0.5);
          }
        }
      }
      isSound = !isSound;
    }    

    if(header.pauseBtn.contains(mouseX, mouseY)) {
      pauseGame();
    }

    if(pauseGameModal.resumeBtn.contains(mouseX, mouseY)) {
      unpouseGame();
    }

    if(header.closeBtn.contains(mouseX, mouseY)) {
      showQuit = true;
    }

    quitGameModal.quitButtons.forEach(function (btn) {
      if (btn.contains(mouseX, mouseY)) {
          btn.animate('down');
      }
    });

    statsModal.statButtons.forEach(function(btn) {
      if(btn.contains(mouseX, mouseY)) {
        if(btn.textType === 'reset') {
          self.reset();
        }
      }
    })
  }

  this.keyPressed = function() {
    gameAction(keyCode);
  }

  function gameAction(keyCode){
    if(ACTIVE_KEY_CODES.has(keyCode)) {
      score++;
      for(var i = 0; i < controlColumns.length; i++) {
        if(controlColumns[i].btnTypeCode === keyCode) {
          for(var j = 0; j < controlColumns[i].arrows.length; j++) {
            if(controlColumns[i].arrows[j].isTriggered()){
              continue;
            }
            if(controlColumns[i].isInActiveArea(controlColumns[i].arrows[j].y)) {
              controlColumns[i].arrows[j].correct();
            }
          }
        }
      }
    } else {
      var wrongKeyCodes = [UP_ARROW, LEFT_ARROW, DOWN_ARROW, RIGHT_ARROW].filter(function(a) {
        return !ACTIVE_KEY_CODES.has(a);
      });

      wrongKeyCodes.forEach(function(k) {
        if(keyCode === k) {
          
          for(var i = 0; i < controlColumns.length; i++) {
            if(controlColumns[i].btnTypeCode !== k) {
              for(var j = 0; j < controlColumns[i].arrows.length; j++) {
                if(controlColumns[i].arrows[j].isTriggered()){
                  continue;
                }
                
                if(controlColumns[i].isInActiveArea(controlColumns[i].arrows[j].y)) {
                  score--;
                  controlColumns[i].arrows[j].incorrect();
                  oDancer.animate('shake');

                  if(inCorrectArrowsLimit === 0) {
                    inCorrectArrowsLimit = 3;
                    hearts.lifes.pop();
                  }
                  --inCorrectArrowsLimit;
                }
              }
            }
          }
        }
      });
    }
  }

  function cutSequence() {
    dance = new Model(new Frame(), sequences.dance);
    dance.currentIndex = 26;

    for(var i = 0; i < 96; i++) {
      var x = (i % 96) * 400;
      var y = parseInt(i / 96) * 400;
      dance.frame.sequence.push(new Sprite(x, y, 400, 400));
    }

    dance.frame.addAnimation('moving', 26, 59);
    dance.animate('moving', floor(1000 / 15));
    oDancer.xushturi = dance;
  }

  this.reset = function() {
    score = 0;
    header.setScore(score);
    showStats = false;
    unpouseGame();
  }
}