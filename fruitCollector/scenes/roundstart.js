function RoundStart() {
  var counter;
  var title;
  var subTitle;
  var subTitleWidth = parseInt(textWidth('Seagrove mxolod pitna'));

  this.setup = function() {
    roundStartInit();
  }

  this.draw = function() {
    background(colors.mainTheme);
    leaves.draw();

    title.draw();

    counter.update();
    counter.draw();

    image(fruitImages.leaves[1], width / 2 - subTitleWidth / 2 - 40, height - 220);
    image(fruitImages.leaves[0], width / 2 - subTitleWidth / 2 + 40, height - 220);
    subTitle.draw();

    if(counter.isNextScene) {
      this.sceneManager.showScene( Game );
    }
  } 

  function roundStartInit() {
    counter = new CountDown(width / 2, height / 2, 3);
    counter.scaleDawn = 2;
    counter.speed = 5;

    title = new Title(width / 2, height / 2 - 150, 'turi: 1', colors.sefoamBlue, 60);
    subTitle = new Title(width / 2, height - 70, 'Seagrove mxolod pitna', colors.spruce, 40);
  }

  this.reset = function() {
    counter.reset();
  }
}