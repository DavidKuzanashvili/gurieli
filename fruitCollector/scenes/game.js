function Game() {
    var bindGameObject = this;
    var maxFruitCount = LEVEL[CURRENT_LEVEL].maxFruitsToGather;
    var fruitAddLastTime = 0;
    var stats;
    var timer;
    var hearts;

    var oRoundStart;

    var bottle = null;
    var fruits = [];

    var headerButtons = [];

    var quitGameModal = null;
    var pauseGameModal = null;
    var showQuitModal = false;
    var showPauseModal = false;
    var isPaused = false;
    var pauseStart;

    this.enter = function () {
        initGame();
    }

    this.setup = function () {
        oRoundStart = this.sceneManager.findScene(RoundStart).oScene;
    }

    this.draw = function () {
        if (!isPaused) {
            background(colors.mainTheme);
            cursor('default');

            dropFruits();
            leaves.update();
            leaves.draw();

            bottle.update();
            bottle.draw();

            stats.draw();
            hearts.draw();

            if (timer.ended()) {
                if (this.getScore() >= maxFruitCount && LEVEL.length - 1 > CURRENT_LEVEL) {
                    CURRENT_LEVEL++;
                    oRoundStart.reset();
                    this.sceneManager.showScene(RoundStart)
                } else {
                    this.sceneManager.showScene(GameOver);
                }
            }

            timer.update();
            timer.draw();

            headerButtons.forEach(x => x.update() & x.draw());

            drawCornerLeaves();

            if (showQuitModal) {
                drawQuitGameModal();
            }
        }

        if (showPauseModal) {
            drawPauseGame();
        }
    }

    function initGame() {
        stats = new Statistics(3224, 100);
        timer = new Timer(millis(), 180);
        hearts = new LifeFactory(100, 5);
        hearts.generateLifes();

        bottle = new Bottle(width / 2, height, LEVEL[CURRENT_LEVEL].bottle, 70, new Tooltip({
            width: 18,
            color: LEVEL[CURRENT_LEVEL].color,
            max: maxFruitCount
        }));
        fruits = [];

        headerButtons.push(new Button({
            x: width - 100 - 25,
            y: 70,
            backgroundColor: color(colors.sand),
            content: "X",
            width: 50,
            height: 50,
            shadowOffset: 6,
            fontSize: 16
        }));

        headerButtons.push(new Button({
            x: width - 180 - 25,
            y: 70,
            backgroundColor: color(colors.booger),
            content: "| |",
            width: 50,
            height: 50,
            shadowOffset: 6,
            fontSize: 16
        }));

        headerButtons.push(new Button({
            x: width - 260 - 25,
            y: 70,
            backgroundColor: color(colors.seafoamBlueTwo),
            content: "m",
            width: 50,
            height: 50,
            shadowOffset: 6,
            fontSize: 16
        }));

        quitGameModal = new Modal({
            width: 400,
            height: 300,
            shadowOffsetTop: 12
        });

        pauseGameModal = new Modal({
            width: 400,
            height: 300,
            shadowOffsetTop: 12
        })
    }

    function dropFruits() {
        if (millis() > fruitAddLastTime + 600) {
            fruitAddLastTime = millis();
            var randDifferentFruitIndex = round(random(LEVEL[CURRENT_LEVEL].fruits.length - 1));
            var imageTypeIndex = round(random(fruitImages[LEVEL[CURRENT_LEVEL].fruits[randDifferentFruitIndex].fruit].length - 1));

            fruits.push(new Fruit({
                x: random(width),
                y: -50,
                w: LEVEL[CURRENT_LEVEL].fruits[randDifferentFruitIndex].width,
                h: LEVEL[CURRENT_LEVEL].fruits[randDifferentFruitIndex].height,
                type: LEVEL[CURRENT_LEVEL].fruits[randDifferentFruitIndex].fruit,
                imageTypeIndex: imageTypeIndex,
                speed: round(random() * 4 + 2)
            }));
        }

        for (var i = 0; i < fruits.length; i++) {
            fruits[i].update();

            if (fruits[i].y > height + fruits[i].height) {
                fruits.splice(i, 1);
                i--;
                continue;
            }

            if (bottle.hitsFruit(fruits[i])) {
                if (bottle.hitsCorrectFruit(fruits[i].type, LEVEL[CURRENT_LEVEL].correctFruits)) {
                    stats.increaseScore();
                    bottle.tooltip.increase();
                } else {
                    stats.decreaseScore();
                    bottle.tooltip.decrease();
                }
                fruits.splice(i, 1);
                i--;
                continue;
            }
        }

        fruits.forEach(function (fruit) {
            fruit.draw();
        });
    }

    function drawQuitGameModal() {
        quitGameModal.drawQuit();
    }

    function drawPauseGame() {
        pauseGameModal.drawPause();
    }

    this.getScore = function () {
        return stats.getScore();
    }

    this.reset = function () {
        showQuitModal = false;
    }

    this.mousePressed = function () {
        headerButtons.forEach(function (btn) {
            if (btn.contains(mouseX, mouseY)) {
                btn.animate('down');
                if (btn.content === 'X') {
                    btn.events.down.end = function () {
                        showQuitModal = true;
                    }
                }

                if (btn.content === '| |') {
                    btn.events.down.end = function () {
                        showPauseModal = true;
                        pauseGame();
                    }
                }
            }
        });

        quitGameModal.quitButtons.forEach(function (btn) {
            if (btn.contains(mouseX, mouseY)) {
                btn.animate('down');

                if (btn.content === 'ara') {
                    btn.events.down.end = function () {
                        showQuitModal = false;
                    }
                }

                if (btn.content === 'ki') {
                    btn.events.down.end = function () {
                        bindGameObject.sceneManager.showScene(GameOver);
                    }
                }
            }
        });

        if (pauseGameModal.pauseButton.contains(mouseX, mouseY)) {
            pauseGameModal.pauseButton.animate('down');
            pauseGameModal.pauseButton.events.down.end = function () {
                showPauseModal = false;
                unpouseGame();
            }
        }
    }

    function roundStart() {
        fill(colors.darkForestGreen);
    }

    function drawCornerLeaves() {
        push();
        imageMode(CENTER);
        image(introFruits[LEVEL[CURRENT_LEVEL].introFruit.name], width - 100 - LEVEL[CURRENT_LEVEL].introFruit.width / 2, height - LEVEL[CURRENT_LEVEL].introFruit.height / 2, LEVEL[CURRENT_LEVEL].introFruit.width / 2, LEVEL[CURRENT_LEVEL].introFruit.height / 2);
        pop();
    }

    function dispatcher() {

    }

    function pauseGame() {
        pauseStart = millis();
        isPaused = true;
    }

    function unpouseGame() {
        timer.fixTime(millis() - pauseStart);
        isPaused = false;
        delete pauseStart;
    }
}
