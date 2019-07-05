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
  var arrowSize = 50;
  var score = 0;
  var inCorrectArrowsLimit = 3;

  this.enter = function() {
    initGame();
  }

  this.draw = function() {
    push();

    background(colors.lightTan);
    cursor('default');
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
    header = new Header();
    oDancer = new Dancer(dancer);
    hearts = new LifeFactory(lifeImages.active, 3, 45, 40, 50);
    hearts.generetaLifes();
    controlColumns.push(new ControlColumn('^', width / 2, colors.beige));
    controlColumns.push(new ControlColumn('<', width / 2 + (width / 8), colors.sand));
    controlColumns.push(new ControlColumn('|', width / 2 + 2*(width / 8), colors.seafoamBlue));
    controlColumns.push(new ControlColumn('>', width / 2 + 3*(width / 8), colors.booger));

    statsModal = new Modal();

    quitGameModal = new Modal({
      width: 400,
      height: 300,
      shadowOffsetTop: 12
    });

    pauseGameModal = new Modal({
      width: 400,
      height: 300,
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
        btn.animate('down');
      }
    });

    if(header.pauseBtn.contains(mouseX, mouseY)) {
      pauseGame();
    }

    if(pauseGameModal.pauseButton.contains(mouseX, mouseY)) {
      pauseGameModal.pauseButton.animate('down');
      pauseGameModal.pauseButton.events.down.end = function() {
        unpouseGame();
      }
    }

    if(header.closeBtn.contains(mouseX, mouseY)) {
      showQuit = true;
    }

    quitGameModal.quitButtons.forEach(function (btn) {
      if (btn.contains(mouseX, mouseY)) {
          btn.animate('down');

          if (btn.content === 'ara') {
              btn.events.down.end = function () {
                showQuit = false;
              }
          }

          if (btn.content === 'ki') {
            btn.events.down.end = function () {
               console.log('User closed game');
            }
          }
      }
    });

    statsModal.statButtons.forEach(function(btn) {
      btn.contains(mouseX, mouseY) && btn.animate('down');

      if(btn.content === 'R') {
        btn.events.down.end = function() {
          unpouseGame();
        }
      }
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
        up.btn.animate('down');
        up.arrows.forEach(function(arrow) {
          if(arrow.isInActiveArea(height - 300)) {
            arrow.animate('increaseCircle');
          }
        });
      }
      break;
      case LEFT_ARROW: {
        var left = controlColumns[1];
        left.btn.animate('down');
        left.arrows.forEach(function(arrow) {
          if(arrow.isInActiveArea(height - 300)) {
            arrow.animate('increaseCircle');
          }
        });
      }
      break;
      case DOWN_ARROW: {
        var down = controlColumns[2];
        down.btn.animate('down');
        down.arrows.forEach(function(arrow) {
          if(arrow.isInActiveArea(height - 300)) {
            arrow.animate('increaseCircle');
          }
        });
      }
      break;
      case RIGHT_ARROW: {
        var right = controlColumns[3];
        right.btn.animate('down');
        right.arrows.forEach(function(arrow) {
          if(arrow.isInActiveArea(height - 300)) {
            arrow.animate('increaseCircle');
          }
        });
      }
      break;
    }
  }
}