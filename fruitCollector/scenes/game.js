function Game() {
    var bindGameObject = this;
    var strtTheGame = null;
    var gameStart = null;
    var maxFruitCount;
    var currentLevelFruitCount = 0;
    var fruitAddLastTime = 0;
    var deadHearts = 0;
    var isStoryLineFinished = false;
    var index = 0;
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
    var togglePause = false;
    var toggleClose = false;
    var toggleMusic = false;
    var isPaused = false;
    var pauseStart;

    this.enter = function () {
        // sounds.background.play();
        initGame();
    }

    this.setup = function () {
        oRoundStart = this.sceneManager.findScene(RoundStart).oScene;
    }

    this.draw = function () {
        if (!isPaused) {
            generateFruits();
            updateFruits();
            leaves.update();
            bottle.update();
            stats.update();
            if(startTheGame) {
                timer.update();
            } 
            headerButtons.forEach(x => x.update());
        }

        background(colors.mainTheme);
        cursor('default');


        drawFruits();
        leaves.draw();
        // drawMotion();

        updateIntroFruit();
        drawIntroFruit();

        bottle.draw();

        stats.draw();
        hearts.draw();

        if (timer.ended()) {
            if (currentLevelFruitCount >= maxFruitCount) {
                if(isStoryLineFinished || CURRENT_LEVEL < LEVEL.length - 1) {
                    if(isStoryLineFinished) {
                        CURRENT_LEVEL = round(random(0, LEVEL.length - 1));
                    } else {
                        CURRENT_LEVEL++;                        
                    }
                    this.reset();
                    oRoundStart.reset();
                    this.sceneManager.showScene(RoundStart)
                } else {
                    isStoryLineFinished = true;
                    // this.sceneManager.showScene(GameOver);
                }
            } else {
                deadHearts++;
                if(deadHearts >= 5) {
                    this.sceneManager.showScene(GameOver);
                } else {
                    this.reset();
                    oRoundStart.reset();
                    this.sceneManager.showScene(RoundStart);
                }
            }
        }

        if(hearts.lifes.length <= 0) {
            this.sceneManager.showScene( GameOver );
        }

        timer.draw();

        headerButtons.forEach(x => x.draw());

        if (showQuitModal) {
            drawQuitGameModal();
        }

        if (showPauseModal) {
            drawPauseGame();
        }
    }

    function initGame() {
        gameStart = millis();
        startTheGame = false;
        maxFruitCount = LEVEL[CURRENT_LEVEL].maxFruitsToGather;
        stats = new Statistics(3224, 100);
        stats.score = score;
        
        timer = new Timer(millis(), 30);
        hearts = new LifeFactory(100, 5);
        hearts.generateLifes();
        for(var i = 0; i < deadHearts; i++) {
            hearts.lifes.pop();
        }

        bottle = new Bottle(width / 2, LEVEL[CURRENT_LEVEL].bottle, 70, new Tooltip({
            width: 18,
            color: LEVEL[CURRENT_LEVEL].color,
            max: maxFruitCount
        }));
        bottle.animate('in');
        fruits = [];

        headerButtons.push(new Button({
            x: width - 100 - 25,
            y: 70,
            backgroundColor: color(colors.sand),
            type: "X",
            content: icons.close,
            width: 50,
            height: 50,
            shadowOffset: 6,
            fontSize: 16,
        }));

        headerButtons[0].events.down.end = function() {
            showQuitModal = true;
        }

        headerButtons.push(new Button({
            x: width - 180 - 25,
            y: 70,
            backgroundColor: color(colors.booger),
            type: "| |",
            content: icons.pause,
            width: 50,
            height: 50,
            shadowOffset: 6,
            fontSize: 16
        }));

        headerButtons[1].events.down.end = function() {
            if(togglePause) {
                showPauseModal = true;
                pauseGame();
            }
        }

        headerButtons.push(new Button({
            x: width - 260 - 25,
            y: 70,
            backgroundColor: color(colors.seafoamBlueTwo),
            type: "m",
            content: icons.music,
            width: 50,
            height: 50,
            shadowOffset: 6,
            fontSize: 16
        }));

        headerButtons.push(new Button({
            x: width - 340 - 25,
            y: 70,
            backgroundColor: color(colors.lipstick),
            type: "R",
            content: icons.reload,
            width: 50,
            height: 50,
            shadowOffset: 6,
            fontSize: 16
        }));

        headerButtons[3].events.down.end = function() {
            bindGameObject.reset();
            oRoundStart.reset();
            bindGameObject.sceneManager.showScene( RoundStart );
        }

        quitGameModal = new Modal({
            width: 400,
            height: 300,
            shadowOffsetTop: 12
        });

        quitGameModal.quitButtons[0].events.down.end = function () {
            bindGameObject.sceneManager.showScene(GameOver);
        }

        quitGameModal.quitButtons[1].events.down.end = function () {
            showQuitModal = false;
        }

        pauseGameModal = new Modal({
            width: 400,
            height: 300,
            shadowOffsetTop: 12
        });
        
        pauseGameModal.pauseButton.events.down.end = function () {
            showPauseModal = false;
            unpouseGame();
        }

        cutSequence();
    }

    function generateFruits() {
        bottle.events.in.end = function() {
            startTheGame = true;
            timer.animate('in');
            timer.fixTime(millis() - gameStart);
            bottle.tooltip.animate('in');
            stats.animate('in');
        }

        if (millis() > fruitAddLastTime + LEVEL[CURRENT_LEVEL].fruitGenerateSpeed && startTheGame) {
            index++;
            fruitAddLastTime = millis();
            var randDifferentFruitIndex;
            if(index % 2 === 0) {
                randDifferentFruitIndex = round(random((LEVEL[CURRENT_LEVEL].correctFruits.length - 1)));
            } else {
                randDifferentFruitIndex = round(random(LEVEL[CURRENT_LEVEL].fruits.length - 1));
            }

            var imageTypeIndex = round(random(fruitImages[LEVEL[CURRENT_LEVEL].fruits[randDifferentFruitIndex].fruit].length - 1));

            fruits.push(new Fruit({
                x: random(width),
                y: -50,
                w: LEVEL[CURRENT_LEVEL].fruits[randDifferentFruitIndex].width,
                h: LEVEL[CURRENT_LEVEL].fruits[randDifferentFruitIndex].height,
                type: LEVEL[CURRENT_LEVEL].fruits[randDifferentFruitIndex].fruit,
                imageTypeIndex: imageTypeIndex,
                speed: round(random() * LEVEL[CURRENT_LEVEL].fruitSpeedRange.start + LEVEL[CURRENT_LEVEL].fruitSpeedRange.end)
            }));
        }
    }

    function updateFruits() {
        for (var i = 0; i < fruits.length; i++) {
            fruits[i].update();

            if (fruits[i].y > height + fruits[i].height) {
                fruits.splice(i, 1);
                i--;
                continue;
            }

            if (bottle.hitsFruit(fruits[i])) {
                if (bottle.hitsCorrectFruit(fruits[i].type, LEVEL[CURRENT_LEVEL].correctFruits)) {
                    currentLevelFruitCount++;
                    score++;
                    stats.setScore(score);
                    bottle.tooltip.increase();
                } else {
                    currentLevelFruitCount--;
                    if((score - 1) < 0) {
                        score = 0;
                    } else {
                        score--;
                    }
                    stats.setScore(score);       
                    deadHearts++;
                    // bottle.tooltip.decrease();
                    hearts.lifes.pop();
                }
                bottle.addFruit(fruits.splice(i, 1));
                i--;
                continue;
            }
        }
    }

    function drawFruits() {
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

    this.isRandomRound = function() {
        return c;
    }

    this.resetGame = function() {
        return deadHearts < 5 ? false : true;
    }

    this.reset = function () {
        if(deadHearts >= 5) {
            deadHearts = 0;
        }

        if(currentLevelFruitCount < maxFruitCount) {
            score -= currentLevelFruitCount;
            stats.setScore(score);
        }
        index = 0; 
        currentLevelFruitCount = 0;
        showQuitModal = false;
    }

    this.mousePressed = function () {
        headerButtons.forEach(function (btn) {
            if (btn.contains(mouseX, mouseY)) {
                btn.animate('down');
                if (btn.type === '| |') {
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
            }
        });

        if (pauseGameModal.pauseButton.contains(mouseX, mouseY)) {
            pauseGameModal.pauseButton.animate('down');
        }
    }

    this.keyPressed = function() {
        var SPACE = 32;
        var M = 77;
        var m = 109;
        var R = 82;
        var r = 114;

        switch(keyCode) {
            case SPACE: {
                togglePause = !togglePause;
                var puaseBtn = headerButtons.find(function(x) {
                    return x.type === '| |';
                });

                if(togglePause) {
                    puaseBtn.animate('down');
                } else {
                    pauseGameModal.pauseButton.animate('down');
                }
            }
            break;
            case (M || m): {
                var musicBtn = headerButtons.find(function(x) {
                    return x.type === 'm';
                });
                musicBtn.animate('down');
            }
            break;
            case(R || r): {
                var resetBtn = headerButtons.find(function(x) {
                    return x.type === 'R';
                });
                resetBtn.animate('down');
            }
            break;
            case ESCAPE: {
                var closeBtn = headerButtons.find(function(x) {
                    return x.type === 'X';
                });
                closeBtn.animate('down');
            }
            break;
        }
    }

    function roundStart() {
        fill(colors.darkForestGreen);
    }

    var introFruitAlpha = 0;
    var introFrutiAlphaSpeed = 0.009;

    function drawIntroFruit() {
        push();
        imageMode(CENTER);
        tint(255, 255 * introFruitAlpha);
        image(introFruits[LEVEL[CURRENT_LEVEL].introFruit.name], width - 100 - LEVEL[CURRENT_LEVEL].introFruit.width / 4, height - LEVEL[CURRENT_LEVEL].introFruit.height / 2, LEVEL[CURRENT_LEVEL].introFruit.width / 2, LEVEL[CURRENT_LEVEL].introFruit.height / 2);
        pop();
    }

    function updateIntroFruit() {
        if(millis() > gameStart + 300) {
            introFruitAlpha = Math.min(introFruitAlpha + introFrutiAlphaSpeed, 1);
        }
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

    function cutSequence() {
        leafMotionModel = new Model(new Frame(), sprites.leafMotion);
        for(var i = 0; i < 90; i++) {
            var x = (i % 90) * 230;
            var y = parseInt(i / 90) * 95;

            leafMotionModel.frame.sequence.push(new Sprite(x, y, 230, 95));
        }

        leafMotionModel.frame.addAnimation('moving', 0, 89);
        leafMotionModel.animate('moving', 50);
        leafMotionModel.translateX = 400;
    }

    function drawMotion() {
        leafMotionModel.update();
        leafMotionModel.draw();
    }
}
