function RoundStart() {
  var counter;
  var title;
  var subTitle;
  var subTitleWidth = parseInt(textWidth('Seagrove mxolod ' + LEVEL[CURRENT_LEVEL].fruitName));

  this.enter = function () {
    roundStartInit();
  }

  this.draw = function () {
    background(colors.mainTheme);
    leaves.update();
    leaves.draw();

    title.draw();

    counter.update();
    counter.draw();

    drawIntroFruit();
    subTitle.draw();

    if (counter.isNextScene) {
      this.sceneManager.showScene(Game);
    }
  }

  function roundStartInit() {
    leaves.leavesType = LEVEL[CURRENT_LEVEL].leaves;
    counter = new CountDown(width / 2, height / 2, 3, LEVEL[CURRENT_LEVEL].color);

    title = new Title(width / 2, height / 2 - 150, 'turi: ' + (CURRENT_LEVEL + 1), LEVEL[CURRENT_LEVEL].color, 60);

    subTitle = new Title(width / 2, height - 70, 'Seagrove mxolod ' + LEVEL[CURRENT_LEVEL].fruitName, LEVEL[CURRENT_LEVEL].color, 40);
    subTitle.alpha = 0.5;
  }

  function drawIntroFruit() {
    push();

    imageMode(CENTER);
    image(introFruits[LEVEL[CURRENT_LEVEL].introFruit.name], width / 2, height - 200, LEVEL[CURRENT_LEVEL].introFruit.width, LEVEL[CURRENT_LEVEL].fruitName.height);

    pop();
  }

  this.reset = function () {
    counter.reset();
  }
}