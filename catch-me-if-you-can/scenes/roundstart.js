function RoundStart() {
  var comboColor = hexToRgb(colors.mainTheme);
  var comboOutStart = 0;
  var counter;
  var title;
  var subTitle;
  var endingAnimationFinished = false;
  var veryFirstLoadStartButton = null;

  this.enter = function () {
    roundStartInit();
  }

  this.setup = function () {
    veryFirstLoadStartButton = new Button({
      x: width / 2,
      y: height / 2,
      backgroundColor: color('#86b23d'),
      font: fonts.LGVBold,
      content: 'daiwye',
      onUpdate: function () {
        this.x = width / 2;
        this.y = height / 2;
      }
    });

    veryFirstLoadStartButton.events.up.end = function () {
      veryFirstLoadState = false;
      counter.startTime = millis();
      veryFirstLoadStartButton = null;
    }
  }

  this.draw = function () {
    cursor('default');

    title.fontSize = 60 * sizes.roundStartCoefficient;
    subTitle.fontSize = 40 * sizes.roundStartCoefficient;

    leaves.update();

    title.update();
    subTitle.update();

    background(colors.mainTheme);

    leaves.draw();
    title.draw();
    if (!veryFirstLoadState) {
      counter.update();
      counter.draw();
    }

    if (veryFirstLoadStartButton != null) {
      veryFirstLoadStartButton.update();
      veryFirstLoadStartButton && veryFirstLoadStartButton.draw();
    }

    drawIntroFruit();
    subTitle.draw();

    if (counter.isNextScene && introOut === null) {
      drawIntroFruit = drawIntroFruitOut;
      comboOutStart = millis();
      introOut = {
        x: width / 2,
        y: height - targetIntroFruitOffset,
        scale: 1,
        stepSize: 10,
        scaleSpeed: 0.025,
        pos: function () {
          return createVector(this.x, this.y);
        },
        target: {
          x: function () {
            return width - 100 - LEVEL[CURRENT_LEVEL].introFruit.width / 4;
          },
          y: function () {
            return height - LEVEL[CURRENT_LEVEL].introFruit.height / 2;
          },
          pos: function () {
            return createVector(this.x(), this.y());
          },
          scale: 0.5
        },
        current: {
          x: width / 2,
          y: height - targetIntroFruitOffset,
          scale: 1,
          pos: function () {
            return createVector(this.x, this.y);
          },
        }
      };

      title.animate('out');
      subTitle.animate('out');
      counter.animate('out');
      // leaves.animate('out');
      // title.animate('out');
    }

    if (endingAnimationFinished) { //endingAnimationFinished
      this.sceneManager.showScene(Game);
    }
  }

  this.touchStarted = function () {
    var target = touches.length ? touches[touches.length - 1] : { x: -1000, y: -1000 };

    clickCallback(target.x, target.y);
  }
  this.mousePressed = function () {
    clickCallback(mouseX, mouseY);
  }

  var clickedLastTime = 0;

  function clickCallback(x, y) {
    if (millis() <= clickedLastTime + 25) {
      return;
    }

    if (veryFirstLoadStartButton && veryFirstLoadStartButton.contains(x, y)) {
      veryFirstLoadStartButton.animate('down');
    }
  }

  function roundStartInit() {
    drawIntroFruit = drawIntroFruitIn;
    leaves.leavesType = LEVEL[CURRENT_LEVEL].leaves;
    leaves.currentHieght = LEVEL[CURRENT_LEVEL].leavesHeight;
    leaves.animate('in');
    counter = new CountDown(width / 2, height / 2, 3, LEVEL[CURRENT_LEVEL].color);
    counter.onUpdate = function () {
      this.x = width / 2;
      this.y = height / 2;
    }

    title = new Title(width / 2, height / 2 - 150, 'turi: ' + (CURRENT_LEVEL + 1), LEVEL[CURRENT_LEVEL].color, 60);
    title.onUpdate = function () {
      this.x = width / 2;
      this.y = height / 2 - 150;
    }
    title.animate('in');

    subTitle = new Title(width / 2, height - 70, 'Seagrove ' + LEVEL[CURRENT_LEVEL].fruitName, LEVEL[CURRENT_LEVEL].color, 40);
    subTitle.onUpdate = function () {
      this.x = width / 2;
      this.y = height - 70;
    }
    counter.alpha = 0;
    subTitle.alpha = 0;
    setTimeout(function () {
      subTitle.alpha = 0.5;
      subTitle.animate('in');
      setTimeout(function () {
        counter.alpha = 1;
        counter.animate('in');
      }, 100);
    }, 300);
  }

  var introFruitOffset = 0;
  var targetIntroFruitOffset = 200;
  var introFruitOffsetSpeed = 10;

  var drawIntroFruit = drawIntroFruitIn;

  function drawIntroFruitIn() {
    push();

    introFruitOffset = Math.min(introFruitOffset + introFruitOffsetSpeed, targetIntroFruitOffset);

    imageMode(CENTER);
    image(introFruits[LEVEL[CURRENT_LEVEL].introFruit.name], width / 2, height - introFruitOffset, LEVEL[CURRENT_LEVEL].introFruit.width * sizes.roundStartCoefficient, LEVEL[CURRENT_LEVEL].fruitName.height * sizes.roundStartCoefficient);

    pop();
  }

  var introOut = null;

  // function drawIntroFruitOut() {
  //   push();

  //   introFruitOffset = Math.min(introFruitOffset + introFruitOffsetSpeed, targetIntroFruitOffset);

  //   imageMode(CENTER);
  //   var currentPos = introOut.current.pos();
  //   var distance = currentPos.dist(introOut.target.pos());
  //   currentPos.add(p5.Vector.fromAngle(p5.Vector.angleBetween(introOut.pos(), introOut.target.pos())).mult(Math.min(distance, introOut.stepSize)));
  //   introOut.current.scale = Math.max(introOut.current.scale - introOut.scaleSpeed, introOut.target.scale);
  //   introOut.current.x = Math.min(currentPos.x, introOut.target.x());
  //   introOut.current.y = Math.min(currentPos.y, introOut.target.y());

  //   if (distance < 0.5) {
  //     endingAnimationFinished = true;
  //   }

  //   image(introFruits[LEVEL[CURRENT_LEVEL].introFruit.name], introOut.current.x, introOut.current.y, LEVEL[CURRENT_LEVEL].introFruit.width * introOut.current.scale, LEVEL[CURRENT_LEVEL].introFruit.height * introOut.current.scale);

  //   pop();
  // }

  var changeAlpha = 1;
  var changeAlphaSpeed = 0.05;

  function drawIntroFruitOut() {
    push();

    if (millis() > comboOutStart + 300) {
      changeAlpha = Math.max(changeAlpha - changeAlphaSpeed, 0);
    }

    imageMode(CENTER);
    tint(255, 255 * changeAlpha);
    image(introFruits[LEVEL[CURRENT_LEVEL].introFruit.name], width / 2, height - introFruitOffset, LEVEL[CURRENT_LEVEL].introFruit.width * sizes.roundStartCoefficient, LEVEL[CURRENT_LEVEL].fruitName.height * sizes.roundStartCoefficient);

    if (changeAlpha === 0) {
      endingAnimationFinished = true;
    }

    pop();
  }

  this.reset = function () {
    endingAnimationFinished = false;
    drawIntroFruit = drawIntroFruitIn;
    introOut = null;
    counter.reset();
    counter.animate('in');
  }
}