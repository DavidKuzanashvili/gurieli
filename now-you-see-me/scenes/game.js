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
  var quitGameModal = null;
  var statsGameModal = null;

  var togglePause = false;
  var toggleClose = false;
  var toggleSound = false;

  var isPaused = false;
  var showQuitModal = false;
  var showStats = false;
  var showPauseModal = false;

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
  var increaseSpeed = 0.02;
  var increaseSwaps = 1;
  var endSpeed = 0.4;
  var endSwaps = 15;
  var CURRENT_LEVEL = 0;

  var isCupsClickable = function () {
    return clickableCups
      && !swapping
      && !showQuitModal
      && !isPaused
      && !showStats;
  }
  var onCupUpdates = [
    function () {
      this.width = cupImgObj.width * sizes.cupSizeCoefficient;
      this.height = cupImgObj.height * sizes.cupSizeCoefficient;
      this.x = width / 2 - (gap * sizes.cupsGapCoefficeint) - cupImgObj.width * sizes.cupSizeCoefficient;
      this.y = height / 2;
    },
    function () {
      this.width = cupImgObj.width * sizes.cupSizeCoefficient;
      this.height = cupImgObj.height * sizes.cupSizeCoefficient;
      this.x = width / 2;
      this.y = height / 2;
    },
    function () {
      this.width = cupImgObj.width * sizes.cupSizeCoefficient;
      this.height = cupImgObj.height * sizes.cupSizeCoefficient;
      this.x = width / 2 + (gap * sizes.cupsGapCoefficeint) + cupImgObj.width * sizes.cupSizeCoefficient;
      this.y = height / 2;
    }
  ];

  var swapping = false;
  var swapStep = null;

  var startLevel = function (level) {
    CURRENT_LEVEL = level;
    speed = Math.min(startSpeed + CURRENT_LEVEL * increaseSpeed, endSpeed);
    swaps = Math.min(startSwaps + CURRENT_LEVEL * increaseSwaps, endSwaps);

    swapStep = turn(speed, swaps, function () {
      swapStep = null;
      clickableCups = true;
    });
  }

  var startButton = null;

  this.setup = function () {
    initGame();
    startButton = new Button({
      x: width / 2,
      y: height / 2,
      width: 237,
      hegth: 74,
      backgroundColor: color(colors.dullYellow),
      font: fonts.LGVBold,
      content: 'daiwye'
    });

    startButton.events.up.end = function () {
      veryFirstLoadState = false;
      startButton = null;
      setTimeout(function () {
        cups[1].animate('reveal');
      }, 500);
    }
    cups[1].events.reveal.end = function () {
      delete cups[1].events.reveal.end;
      setTimeout(function () {
        cups[1].animate('hide');
        cups[1].events.hide.end = function () {
          delete cups[1].events.hide.end;
          startLevel(0);
        };
      }, 1500);
    }
  }

  this.draw = function () {
    updateTouchTracker();
    push();
    this.update();

    background(colors.seafoamBlueTwo);
    cursor('default');

    headerButtons.forEach(function (btn) {
      btn.update();
    });

    if (veryFirstLoadState && startButton) {
      startButton.update();
      startButton && startButton.draw();
    }

    !veryFirstLoadState && cups.forEach(function (cup) {
      if (!isPaused) {
        cup.update();
      }
    });

    if (!veryFirstLoadState && !isPaused && swapStep) {
      swapStep();
    }

    !veryFirstLoadState && cups.forEach(function (cup) {
      cup.draw();
    });

    hearts.draw();

    drawHigestScore();

    if (windowWidth >= 1000) {
      scoreCircle.draw();
    } else {
      drawPoint();
    }
    headerButtons.forEach(function (btn) {
      btn.draw();
    });

    if (showQuitModal) {
      quitGameModal.drawQuit();
    }

    if (showPauseModal) {
      pauseGameModal.drawPause();
    }

    if (showStats) {
      statsGameModal.drawStats();
    }

    // line(mouseX, 0, mouseX, height);
    // text(mouseX, mouseX, mouseY);
    pop();
  }

  var turn = function (speed, turns, cb) {
    cups.forEach(function (cup) {
      cup.setAnimationSpeed(speed);
    });

    var t = 1;

    return function () {
      if (!swapping && turns) {
        if (t > 0) {
          t = 0;
          return;
        }

        turns--;
        t = 1;
        if (turns > 0) {
          swapCups.apply(null, randomIdx());
        } else {
          swapCups.apply(null, [].concat(randomIdx(), [cb]));
        }
      }
    }
  }

  var randomIdx = function () {
    var idx = [0, 1, 2];
    var a = random(idx);
    var b = random(
      idx.filter(function (c) {
        return c != a;
      })
    );
    return [a, b].sort();
  }

  this.update = function () {
    var stw = 237;
    var sth = 74;
    var fs = 30;
    var coef = 1;

    if(windowWidth <= 768) {
      coef = 0.8;
      stw = parseInt(237 * coef);
      sth = parseInt(74 * coef);
      fs = parseInt(30 * coef);
    }

    if(startButton) {
      startButton.onUpdate = function () {
        this.x = width / 2;
        this.y = height / 2;
        this.width = stw;
        this.height = sth;
        this.fontSize = fs;
      }
    }

    if(showStats) {
      statsGameModal.score = score;
    }

    if (windowWidth <= 550) {
      headerButtons.forEach(function (btn) {
        btn.x = width - 100 * sizes.headerMarginCoefficient - pngIcons.close.w / 2;
        if (btn.typeText === 'close') {
          btn.y = 70 * sizes.headerMarginTopCoefficient;
        }
        if (btn.typeText === 'pause') {
          btn.y = 70 * sizes.headerMarginTopCoefficient + closeBtn.h + 30;
        }
        if (btn.typeText === 'sound') {
          btn.y = 70 * sizes.headerMarginTopCoefficient + closeBtn.h + pauseBtn.h + 60;
        }
      });
    } else {
      headerButtons.forEach(function (btn) {
        btn.y = 70 * sizes.headerMarginTopCoefficient;
        if (btn.typeText === 'close') {
          btn.x = width - 100 * sizes.headerMarginCoefficient - pngIcons.close.w / 2;
        }
        if (btn.typeText === 'pause') {
          btn.x = width - (headerMargin * sizes.headerMarginCoefficient + gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w / 2);
        }
        if (btn.typeText === 'sound') {
          btn.x = width - (headerMargin * sizes.headerMarginCoefficient + 2 * gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w / 2);
        }
      });
    }
  }

  var touchEndedTime = 0;

  function updateTouchTracker() {
    if(touches.length) {
      touchEndedTime = millis();
    }
  }

  this.touchStarted = function () {
    var target = touches.length ? touches[touches.length - 1] : { x: -1000, y: -1000 };
    clickCallback(target.x, target.y);
  }

  this.mousePressed = function () {
    if(millis() - touchEndedTime < 25) {
      return;
    }

    clickCallback(mouseX, mouseY);
  }

  function clickCallback(mouseX, mouseY) {
    if (veryFirstLoadState) {
      if (startButton.contains(mouseX, mouseY)) {
        startButton.animate('down');
      }
      return;
    }
    headerButtons.forEach(function (btn) {
      if (btn.contains(mouseX, mouseY)) {
        if (btn.typeText === 'close') {
          showQuitModal = true;
          sounds.popUp.play();
        }

        // if (btn.typeText === 'reset') {
        //   sounds.click.play();
        //   showQuitModal = showPauseModal = showStats = false;
        //   unpouseGame();
        //   resetGame();
        // }

        if (btn.typeText === 'sound') {
          sounds.click.play();
          toggleSound = !toggleSound;

          if (toggleSound) {
            btn.isSound = false;
            for (key in sounds) {
              sounds[key].setVolume(0);
            }
          } else {
            btn.isSound = true;
            for (key in sounds) {
              if (key === 'background') {
                sounds[key].setVolume(0.2);
              } else {
                sounds[key].setVolume(1);
              }
            }
          }
        }

        if (btn.typeText === 'pause') {
          sounds.popUp.play();
          showPauseModal = true;
        }
      }
    })

    if (pauseGameModal.resumeBtn.contains(mouseX, mouseY)) {
      showPauseModal = false;
      unpouseGame();
    }

    quitGameModal.quitButtons.forEach(function (btn) {
      if (btn.contains(mouseX, mouseY)) {
        btn.animate('down');
      }
    });

    statsGameModal.statButtons.forEach(function (btn) {
      if (btn.contains(mouseX, mouseY)) {
        if (btn.typeText === 'reset') {
          showStats = false;
          resetGame();
        }

        if(btn.typeText === 'close') {
          emit('close');
          // if(window.parent && window.parent !== window) {
          //   window.parent.history.back();
          // } else {
          //   window.close() | window.location.reload();
          // }
        }

        if(btn.typeText === 'share') {
          emit('share');
          // var params = window.requestQueryParams;
          // var url = params.url;
          // if(url !== undefined) {
          //     window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blacnk');                        
          // }
        }
      }
    });

    if (isCupsClickable()) {
      cups.forEach(function (cup) {
        if (cup.contains(mouseX, mouseY)) {
          cup.events.reveal.start = function () {
            if (cup.xushturi) {
              cup.xushturi.switchAnimation('win');
            }
          }
          cup.animate('reveal');
          clickableCups = false;

          cup.events.reveal.end = function () {
            delete cup.events.reveal.end;
            if (cup.xushturi) {
              score++;
              scoreCircle.setScore(score);
              CURRENT_LEVEL++;
              setTimeout(function () {
                cup.animate('hide');
                cup.events.hide.end = function () {
                  delete cup.events.hide.end;
                  startLevel(CURRENT_LEVEL);
                }
              }, 1500);
            } else {
              sounds.giggle.play();
              if (score > 0) {
                score--;
                scoreCircle.setScore(score);
              }
              if (hearts.lifes.length > 0) {
                hearts.lifes.pop();
              }

              if (hearts.lifes.length === 0) {
                setTimeout(function () {
                  cup.animate('hide');
                  setTimeout(() => {
                    cup.events.hide.end = function () {
                      delete cup.events.hide.end;
                      showStats = true;
                    }
                  }, 200);
                }, 200);
              } else {
                setTimeout(function () {
                  cup.animate('hide');
                  setTimeout(function () {
                    winningCup.events.reveal.start = function () {
                      delete winningCup.events.reveal.start;
                      winningCup.xushturi.switchAnimation('lose');
                    }

                    winningCup.events.reveal.end = function () {
                      setTimeout(function () {
                        winningCup.animate('hide');
                        winningCup.events.hide.end = function () {
                          delete winningCup.events.hide.end;
                          startLevel(CURRENT_LEVEL);
                        }
                      }, 800);
                    }
                    winningCup.animate('reveal');
                  }, 800);
                }, 800);
              }
            }

            // clickableCups = true;
          }
        }
      });
    }
  }

  this.keyPressed = function () {
    var SPACE = 32;
    var M = 77;
    var m = 109;
    var R = 82;
    var r = 114;

    switch (keyCode) {
      case SPACE: {
        togglePause = !togglePause;

        if (togglePause) {
          sounds.popUp.play();
          showPauseModal = true;
        } else {
          showPauseModal = false;
          unpouseGame();
        }
      }
        break;
      case (M || m): {
        sounds.click.play();
        togglePause = !togglePause;

        if (togglePause) {
          for (key in sounds) {
            sounds[key].setVolume(0);
          }
        } else {
          for (key in sounds) {
            if (key === 'background') {
              sounds[key].setVolume(0.2);
            } else {
              sounds[key].setVolume(1);
            }
          }
        }
      }
        break;
      case (R || r): {
      }
        break;
      case ESCAPE: {
        toggleClose = !toggleClose;
        if (toggleClose) {
          showQuitModal = true;
          sounds.popUp.play();
        } else {
          showStats = true;
          showQuitModal = false;
          sounds.popUp.play();
        }
      }
        break;
    }
  }

  var updateCupHandlers = function () {
    for (var i = 0; i < 3; i++) {
      cups[i].onUpdate = onCupUpdates[i];
      cups[i].onUpdate();
    }
  }

  var swapCups = function (i1, i2, cb) {
    if (swapping) {
      return;
    }
    swapping = true;

    if (i1 > i2) {
      return swapCups(i2, i1);
    }

    var a = cups[i1];
    var b = cups[i2];

    var range = b.x - a.x;
    var c = 2;

    b.events.left.end = a.events.right.end = function () {
      c--;
      if (c) {
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
    xushturi = new Xushturi(0, 0);
    xushturi.switchAnimation('start');
    hearts = new LifeFactory(lifes.active, 3, width / 2 - 3 * (36 + 50) / 2, 36, 31, 50);
    cups.push(new Cup(width / 2 - gap - cupImgObj.width, height / 2));
    cups.push(new Cup(width / 2, height / 2));
    cups.push(new Cup(width / 2 + gap + cupImgObj.width, height / 2));
    updateCupHandlers();
    cups[1].xushturi = xushturi;
    winningCup = cups[1];

    closeBtn = new ControlButton(pngIcons.close.img, width - 100 - pngIcons.close.w / 2, 70, pngIcons.close.w, pngIcons.close.h, 'close');
    closeBtn.onUpdate = function () {
      this.w = pngIcons.close.w * sizes.iconSizes;
      this.h = pngIcons.close.h * sizes.iconSizes
    }

    pauseBtn = new ControlButton(pngIcons.pause.img, width - (headerMargin + gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w / 2), 70, pngIcons.pause.w, pngIcons.pause.h, 'pause');
    pauseBtn.onUpdate = function () {
      this.w = pngIcons.pause.w * sizes.iconSizes;
      this.h = pngIcons.pause.h * sizes.iconSizes
    }

    muteBtn = new ControlButton(pngIcons.sound.img, width - (headerMargin * sizes.headerMarginCoefficient + 2 * gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w / 2), 70, pngIcons.sound.w, pngIcons.sound.h, 'sound');
    muteBtn.onUpdate = function () {
      this.w = pngIcons.sound.w * sizes.iconSizes;
      this.h = pngIcons.sound.h * sizes.iconSizes
    }

    resetBtn = new ControlButton(pngIcons.reset.img, width - (headerMargin * sizes.headerMarginCoefficient + 3 * gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w + pngIcons.reset.w / 2), 70, pngIcons.reset.w, pngIcons.reset.h, 'reset');
    resetBtn.onUpdate = function () {
      this.x = width - (headerMargin * sizes.headerMarginCoefficient + 3 * gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w + pngIcons.reset.w / 2);
      this.w = pngIcons.reset.w * sizes.iconSizes;
      this.h = pngIcons.reset.h * sizes.iconSizes
    }

    headerButtons = [closeBtn, pauseBtn, muteBtn];

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
      sounds.click.play();
    }

    quitGameModal.quitButtons[1].events.down.end = function () {
      showQuitModal = false;
      sounds.click.play();
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
    textSize(40 * sizes.fontCoefficient);
    textFont(fonts.LGVBold);
    textAlign(LEFT, CENTER);
    text('umaRlesi qula: 57', 100 * sizes.headerMarginCoefficient, marginTop * sizes.headerMarginTopCoefficient);

    pop();
  }

  function drawPoint() {
    push();

    fill(255);
    textSize(40 * sizes.fontCoefficient);
    textFont(fonts.LGVBold);
    textAlign(LEFT, CENTER);
    text('qula: ' + scoreCircle.getScore(), 100 * sizes.headerMarginCoefficient, marginTop * sizes.headerMarginTopCoefficient + 45);

    pop();
  }

  function pauseGame() {
    isPaused = true;
  }

  function unpouseGame() {
    isPaused = false;
  }

  function resetGame() {
    //   showStats = false;
    //   score = 0;
    //   scoreCircle.setScore(score);
    //   CURRENT_LEVEL = 0;

    //   hearts.generateLifes(false);

    //   cups.forEach(function(cup) {
    //     cup.xushturi = null;
    //   });

    //   cups[1].xushturi = xushturi;
    //   winningCup = cups[1];

    //   winningCup.events.reveal.start = function() {
    //     delete winningCup.events.reveal.start;
    //     winningCup.xushturi.switchAnimation('start');
    //   }
    //   cups[1].animate('reveal');
    //   cups[1].events.reveal.end = function() {
    //     delete cups[1].events.reveal.end;
    //     setTimeout(function() {
    //       cups[1].animate('hide');
    //       cups[1].events.hide.end = function(){
    //         delete cups[1].events.hide.end;
    //         startLevel(0);
    //       };
    //     }, 1000);
    //   }
    document.location.reload();
  }
}