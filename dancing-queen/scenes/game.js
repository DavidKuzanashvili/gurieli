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
  var startTime = 0;
  var arrowSize = 72;
  var score = 0;
  var dance = null;
  var activeAreaStart = height - 200;
  var inCorrectArrowsLimit = 3;

  this.enter = function() {
    initGame();
  }

  this.setup = function() {
    sounds.background.setVolume(0.5);
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
    drawLifes();
    drawControlColumns();

    
    if(showQuit) {
      quitGameModal.drawQuit();
    }

    if(isPaused) {
      pauseGameModal.drawPause();
    }

    if(header.timer.ended() || showStats) {
      statsModal.drawStats();
      pauseGame();
    }
    
    pop();
  }

  this.update = function() {
    var randomColumn = controlColumns[round(random(0, 3))];
    if(!isPaused) {
      if(millis() > startTime + 1000) {
        startTime = millis();
        var speed = 3;
        randomColumn.arrows.push(new Arrow(randomColumn.x + (width / 8) / 2, randomColumn.offsetTop, arrowSize, arrowSize, randomColumn.btnTypeCode, speed));
      }
    }
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
    header.timer.fixTime(millis() - pauseStart);
    isPaused = false;
    header.isPaused = isPaused;
    delete pauseStart;
  }

  this.mousePressed = function() {
    var headerButtons = header.btns;
    headerButtons.forEach(function(btn) {
      if(btn.contains(mouseX, mouseY)) {
        console.log('mouse pressed!');
      }
    });

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
    if(ACTIVE_KEY_CODES.has(keyCode)) {
      score++;
      for(var i = 0; i < controlColumns.length; i++) {
        if(controlColumns[i].btnTypeCode === keyCode) {
          for(var j = 0; j < controlColumns[i].arrows.length; j++) {
            if(controlColumns[i].arrows[j].isInActiveArea(activeAreaStart)) {
              controlColumns[i].arrows[j].bgColor = hexToRgb(colors.boogerTwo);
              controlColumns[i].arrows[j].animate('fadeIn');
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
          score--;
          
          for(var i = 0; i < controlColumns.length; i++) {
            if(controlColumns[i].btnTypeCode !== k) {
              for(var j = 0; j < controlColumns[i].arrows.length; j++) {
                if(controlColumns[i].arrows[j].isInActiveArea(activeAreaStart)) {
                  controlColumns[i].arrows[j].bgColor = hexToRgb(colors.lipstick);
                  controlColumns[i].arrows[j].animate('fadeIn');
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
    dance.animate('moving', floor(1000 / 20));
    oDancer.xushturi = dance;
  }

  this.reset = function() {
    score = 0;
    header.setScore(score);
    header.timer = new Timer(millis(), 60);
    showStats = false;
    unpouseGame();
  }
}