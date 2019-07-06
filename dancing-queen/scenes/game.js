function Game() {
  var bindGameObject = this;
  var header = null;
  var oDancer = null;
  var hearts = null;
  var controlColumns = [];
  var isPaused = false;
  var showQuit = false;
  var pauseGameModal;
  var quitGameModal;
  var statsModal;
  var pauseStart;
  var startTime = 0;
  var arrowSize = 72;
  var score = 0;
  var dance = null;
  var inCorrectArrowsLimit = 3;

  this.enter = function() {
    initGame();
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

    if(header.timer.ended()) {
      pauseGame();
      statsModal.drawStats();
    }
    
    pop();
  }

  this.update = function() {
    var randomColumn = controlColumns[round(random(0, 3))];
    if(!isPaused) {
      if(millis() > startTime + 1000) {
        startTime = millis();
        var speed = 3;
        randomColumn.arrows.push(new Arrow(randomColumn.x + (width / 8) / 2, randomColumn.offsetTop, arrowSize, arrowSize, randomColumn.btnType, speed));
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
    controlColumns.push(new ControlColumn('^', width / 2, colors.beige));
    controlColumns[0].arrowRotation = PI;
    controlColumns.push(new ControlColumn('<', width / 2 + (width / 8), colors.sand));
    controlColumns[1].arrowRotation = PI / 2;
    controlColumns.push(new ControlColumn('|', width / 2 + 2*(width / 8), colors.seafoamBlue));
    controlColumns[2].arrowRotation = 0;
    controlColumns.push(new ControlColumn('>', width / 2 + 3*(width / 8), colors.booger));
    controlColumns[3].arrowRotation = -PI / 2;

    statsModal = new Modal();

    quitGameModal = new Modal({
      width: 400,
      height: 300,
      shadowOffsetTop: 12
    });
    
    acceptQuitBtn = quitGameModal.quitButtons[0];
    refuseQuitBtn = quitGameModal.quitButtons[1];

    acceptQuitBtn.events.down.end = function() {
      console.log('User closed game');
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
      btn.contains(mouseX, mouseY) && btn.animate('down');
    })
  }

  this.keyPressed = function() {
    if(ACTIVE_KEY_CODES.has(keyCode)) {
      score++;
    } else {
      score--;
    }

    switch(keyCode) {
      case UP_ARROW: {
        var up = controlColumns[0];
        up.arrows.forEach(function(arrow) {
          if(arrow.isInActiveArea(height - 300)) {
            arrow.animate('increaseCircle');
          }
        });
      }
      break;
      case LEFT_ARROW: {
        var left = controlColumns[1];
        left.arrows.forEach(function(arrow) {
          if(arrow.isInActiveArea(height - 300)) {
            arrow.animate('increaseCircle');
          }
        });
      }
      break;
      case DOWN_ARROW: {
        var down = controlColumns[2];
        down.arrows.forEach(function(arrow) {
          if(arrow.isInActiveArea(height - 300)) {
            arrow.animate('increaseCircle');
          }
        });
      }
      break;
      case RIGHT_ARROW: {
        var right = controlColumns[3];
        right.arrows.forEach(function(arrow) {
          if(arrow.isInActiveArea(height - 300)) {
            arrow.animate('increaseCircle');
          }
        });
      }
      break;
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
}