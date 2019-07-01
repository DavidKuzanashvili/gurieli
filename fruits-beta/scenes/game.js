function Game() {
  var score = 0;
  var fruitFallStep = 0;
  var fruitTypes = [
    // { name: 'cherry', w: 45, h: 110 }, 
    { name: 'raspberry', w: 90, h: 90 },
    { name: 'leaves', w: 70, h: 120 },
    { name: 'vanilla', w: 90, h: 80 },
    { name: 'feijoa', w: 80, h: 115 },
    { name: 'peach', w: 85, h: 85 }
  ];
  var bottleTypes = [
    // { name: 'cherryBottle', correctFruits: ['cherry'], leaves: { name: 'cherry', height: 290 } }, 
    { name: 'raspberryBottle', correctFruits: ['raspberry', 'vanilla'], leaves: { name: 'raspberry', height: 280 } },
    { name: 'mintBottle', correctFruits: ['leaves'], leaves: { name: 'mint', height: 290 } },
    { name: 'peachBottle', correctFruits: ['peach'], leaves: { name: 'peach', height: 310 } },
    { name: 'feijoaBottle', correctFruits: ['feijoa'], leaves: { name: 'feijoa', height: 310 } }
  ];
  var fruits = [];
  var animatedFruitsIndexes = [];
  var bottle = null;
  var randBottleIndex = round(random(0, bottleTypes.length - 1));
  var currentLeavesHeight = 0;
  var ratio = bottleTypes[randBottleIndex].leaves.height / 1440;

  this.enter = function () {
  }

  this.setup = function () {
    gameStart = millis();
    bottle = new Bottle({
      x: width / 2,
      type: bottleTypes[randBottleIndex].name
    });
  }

  this.draw = function () {
    push();
    this.update();
    background(colors.mainTheme);
    fallFruits();
    drawLeaves();
    drawBottle();
    drawScore();
    pop();
  }

  this.update = function () {
    // debugger;
    // console.log(sizes);

    //Responsive
    currentLeavesHeight = windowWidth * ratio;
    bottle.width = 140 * sizes.bottleSizesCoefficient;
    bottle.height = 475 * sizes.bottleSizesCoefficient;
  }

  function fallFruits() {
    if (millis() > fruitFallStep + 300) {
      fruitFallStep = millis();
      // var randomTypeInex = round(random(0, fruitTypes.length - 1));
      // var fruit = fruitTypes[randomTypeInex];
      var randomFruitModeIndex = round(random(0, bottleTypes[randBottleIndex].correctFruits.length - 1));
      var randomFruit = bottleTypes[randBottleIndex].correctFruits[randomFruitModeIndex];
      var fruit = fruitTypes.find(function (f) {
        return f.name === randomFruit;
      });
      fruits.push(new Fruit({
        type: fruit.name,
        x: random(15, width - 15),
        y: -50,
        width: fruit.w * sizes.fruitsCoefficient,
        height: fruit.h * sizes.fruitsCoefficient,
        fallSpeed: round(random(4, 6))
      }));
    }

    for (var i = 0; i < fruits.length; i++) {
      fruits[i].update();
      if (fruits[i].isOutsideOfScene()) {
        fruits.splice(i, 1);
        i--;
        continue;
      }
      if (bottle.hitFruit(fruits[i])) {
        if (bottle.hitCorrectFruit(fruits[i].type, bottleTypes[randBottleIndex].correctFruits)) {
          score++;
        } else {
          if (score > 0) {
            score--;
          }
        }
        bottle.addFruit(fruits.splice(i, 1));
        i--;
        continue;
      }
      fruits[i].draw();
    }
  }

  function drawBottle() {
    bottle.update();
    bottle.draw();
  }

  function drawScore() {
    push();
    fill(colors.booger);
    textFont(fonts.LGVBold);
    textSize(130 * sizes.fontCoefficient);
    textAlign(LEFT, CENTER);
    text(score, 100 * sizes.scoreOffsetCoefficientRight, height - 115 * sizes.scoreOffsetCoefficientBottom);
    pop();
  }

  function drawLeaves() {
    push();

    translate(0, sizes.translateLeaves);
    image(leaveImages[bottleTypes[randBottleIndex].leaves.name][0], 0, 0, width, currentLeavesHeight); //bottleTypes[randBottleIndex].leaves.height

    pop();
  }
}