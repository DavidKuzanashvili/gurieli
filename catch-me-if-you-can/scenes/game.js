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
    var soundsVolume = 1;

    var oRoundStart;

    var bottle = null;
    var fruits = [];

    var headerButtons = [];
    var closeBtn = null;
    var pauseBtn = null;
    var muteBtn = null;
    var resetBtn = null;
    var settingsBtn = null;
    var settingsBg = null;
    var acceptQuit = null;
    var refuseQuit = null;
    var verticalMargin = 60;
    var gapBetweenBtns = 30;
    var headerMargin = 100;

    var quitGameModal = null;
    var pauseGameModal = null;
    var showQuitModal = false;
    var showPauseModal = false;
    var togglePause = false;
    var toggleClose = false;
    var toggleMusic = false;
    var toggleSettings = false;
    var isPaused = false;
    var pauseStart;

    this.enter = function () {
        initGame();
    }

    this.setup = function () {
        oRoundStart = this.sceneManager.findScene(RoundStart).oScene;

        settingsBtn = new ControlButton(pngIcons.settings.img, width - 100 - pngIcons.settings.w / 2, 70, pngIcons.settings.w, pngIcons.settings.h, 'settings');
        settingsBtn.typeText = 'settings';
        settingsBtn.onUpdate = function() {
            this.w = pngIcons.settings.w * sizes.iconsCoefficients;
            this.h = pngIcons.settings.h * sizes.iconsCoefficients;
        }

        settingsBg = new SettingsBackground({
            x: width - (headerMargin * sizes.headerMarginCoefficient),
            y: 70,
            w: pngIcons.settings.w,
            h: pngIcons.settings.h,
            pedding: 20,
            endHeight: 4 * verticalMargin + (pngIcons.close.h + pngIcons.pause.h + pngIcons.reset.h + pngIcons.sound.h) * sizes.iconsCoefficients,
            onUpdate: function() {
                this.x = width - this.w / 2 - (headerMargin * sizes.headerMarginCoefficient);
                this.endHeight = 4 * verticalMargin + (pngIcons.close.h + pngIcons.pause.h + pngIcons.reset.h + pngIcons.sound.h) * sizes.iconsCoefficients - 10;
            }
        })

        closeBtn = new ControlButton(pngIcons.close.img, width - 100 - pngIcons.close.w / 2, 70, pngIcons.close.w, pngIcons.close.h, 'close');
        closeBtn.typeText = 'close';
        closeBtn.onUpdate = function() {
            this.w = pngIcons.close.w * sizes.iconsCoefficients;
            this.h = pngIcons.close.h * sizes.iconsCoefficients;
        }

        pauseBtn = new ControlButton(pngIcons.pause.img, width - (headerMargin + gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w / 2), 70, pngIcons.pause.w, pngIcons.pause.h, 'pause');
        pauseBtn.typeText = 'pause';
        pauseBtn.onUpdate = function() {
            this.w = pngIcons.pause.w * sizes.iconsCoefficients;
            this.h = pngIcons.pause.h * sizes.iconsCoefficients;
        }

        muteBtn = new ControlButton(pngIcons.sound.img, width - (headerMargin + 2*gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w / 2), 70, pngIcons.sound.w, pngIcons.sound.h, 'sound');
        muteBtn.typeText = 'sound';
        muteBtn.onUpdate = function() {
            this.w = pngIcons.sound.w * sizes.iconsCoefficients;
            this.h = pngIcons.sound.h * sizes.iconsCoefficients;
        }

        resetBtn = new ControlButton(pngIcons.reset.img, width - (headerMargin + 3*gapBetweenBtns + pngIcons.close.w + pngIcons.pause.w + pngIcons.sound.w + pngIcons.reset.w / 2), 70, pngIcons.reset.w, pngIcons.reset.h, 'reset');
        resetBtn.typeText = 'reset';
        resetBtn.onUpdate = function() {
            this.w = pngIcons.reset.w * sizes.iconsCoefficients;
            this.h = pngIcons.reset.h * sizes.iconsCoefficients;
        }

        headerButtons = [ closeBtn, pauseBtn, muteBtn, resetBtn ];

        quitGameModal = new Modal({
            width: 400,
            height: 300,
            shadowOffsetTop: 12
        });

        acceptQuit = quitGameModal.quitButtons[0];
        refuseQuit = quitGameModal.quitButtons[1];

        acceptQuit.events.down.end = function () {
            sounds.popUp.play();
            unpouseGame();
            turnOnSounds();
            bindGameObject.sceneManager.showScene(GameOver);
        }

        refuseQuit.events.down.end = function () {
            sounds.popUp.play();
            showQuitModal = false;
            turnOnSounds();
            unpouseGame();
        }

        pauseGameModal = new Modal({
            width: 499,
            height: 154,
            shadowOffsetTop: 12
        });
        
        // showPauseModal = false;
        // unpouseGame();
    }

    this.draw = function () {
        updateTouchTracker();
        this.update();
        if (!isPaused) {
            generateFruits();
            updateFruits();
            leaves.update();
            bottle.update();
            stats.update();
            if(startTheGame) {
                timer.update();
            } 
            headerButtons.forEach(function(x) { x.update() });
        }

        background(colors.mainTheme);
        cursor('default');


        drawFruits();
        leaves.draw();
        // drawMotion();

        if(!sizes.showSettings) {
            updateIntroFruit();
            drawIntroFruit();
        }

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
        
        if(sizes.showSettings) {
            settingsBg.update();
            settingsBg.draw();
            settingsBtn.update();
            settingsBtn.draw();
        }

        headerButtons.forEach(function(x) { x.draw() });

        if (showQuitModal) {
            drawQuitGameModal();
        }

        if (showPauseModal) {
            drawPauseGame();
        }
    }

    this.update = function() {
        if(sizes.updateHeaderButtons){
            delete sizes.updateHeaderButtons;
            
            headerButtons.forEach(function(btn) {
                btn.alpha = 0;
            });
        }

        if(sizes.showSettings) {
            headerButtons.forEach(function(btn) {
                if(settingsBg.getBgBottom() >= (btn.y + btn.h)) {
                    if(btn.alpha < 1 && !btn.isAnimating()) {
                       btn.animate('fadeIn');
                    }
                } else {
                    if(btn.alpha > 0 && !btn.isAnimating()) {
                        btn.animate('fadeOut');
                    }
                }
            })
        } else {
            headerButtons.forEach(function(btn) {
                btn.alpha = 1;
            });
        }

        if(windowWidth < 1000) {
            headerButtons.forEach(function(btn) {
                settingsBtn.x = width - 45 * sizes.iconsCoefficients - headerMargin * sizes.headerMarginCoefficient;
                btn.x = width - 45 * sizes.iconsCoefficients - headerMargin * sizes.headerMarginCoefficient;

                if(btn.typeText === 'close') {
                    btn.y = 70 + btn.h / 2 + verticalMargin;
                }
                if(btn.typeText === 'pause') {
                    btn.y = 70 + closeBtn.h + btn.h / 2 + 2*verticalMargin;
                }
                if(btn.typeText === 'sound') {
                    btn.y = 70 + (closeBtn.h + pauseBtn.h) + btn.h / 2 + 3*verticalMargin;
                }
                if(btn.typeText === 'reset') {
                    btn.y = 70 + (closeBtn.h + pauseBtn.h + muteBtn.h) +  btn.h / 2 + 4*verticalMargin;
                }
            })
        } else {
            headerButtons.forEach(function(btn) {
                if(btn.typeText === 'close') {
                    btn.x = width - (headerMargin * sizes.headerMarginCoefficient + pngIcons.close.w * sizes.iconsCoefficients / 2);
                    btn.y = 70;
                }
                if(btn.typeText === 'pause') {
                    btn.x = width - (headerMargin * sizes.headerMarginCoefficient + gapBetweenBtns + pngIcons.close.w * sizes.iconsCoefficients + pngIcons.pause.w * sizes.iconsCoefficients / 2);
                    btn.y = 70;
                }
                if(btn.typeText === 'sound') {
                    btn.x = width - (headerMargin * sizes.headerMarginCoefficient + 2*gapBetweenBtns + pngIcons.close.w * sizes.iconsCoefficients + pngIcons.pause.w * sizes.iconsCoefficients + pngIcons.sound.w / 2);
                    btn.y = 70;
                }
                if(btn.typeText === 'reset') {
                    btn.x = width - (headerMargin * sizes.headerMarginCoefficient + 3*gapBetweenBtns + pngIcons.close.w * sizes.iconsCoefficients + pngIcons.pause.w * sizes.iconsCoefficients + pngIcons.sound.w * sizes.iconsCoefficients + pngIcons.reset.w * sizes.iconsCoefficients / 2);
                    btn.y = 70;
                }
            });
        }
    }

    function initGame() {
        gameStart = millis();
        startTheGame = false;
        maxFruitCount = LEVEL[CURRENT_LEVEL].maxFruitsToGather;
        stats = new Statistics(3224, headerMargin);
        stats.score = score;
        
        timer = new Timer(millis(), 35);
        hearts = new LifeFactory(headerMargin, 5);
        
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
                    sounds.catch.play();
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
                    sounds.heartLose.play();
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
        timer.startSound = 0;
        if(deadHearts >= 5) {
            deadHearts = 0;
        }

        if(currentLevelFruitCount < maxFruitCount) {
            score -= currentLevelFruitCount;
            stats.setScore(score);
            // axios.post("https://gurieli-api.leavingstone.club/api/game", {
            //     type: 1,
            //     point: score,
            //     name: username
            // }).then(function(response) {
            //     console.log(response);
            // }).catch(function(error) {
            //     console.log(error);
            // });
        } else {
            // axios.post("https://gurieli-api.leavingstone.club/api/game", {
            //     type: 1,
            //     point: score,
            //     name: username
            // }).then(function(response) {
            //     console.log(response);
            // }).catch(function(error) {
            //     console.log(error);
            // });
        }
        index = 0; 
        currentLevelFruitCount = 0;
        showQuitModal = false;
    }

    var touchEndedTime = 0;

    function updateTouchTracker(){
        if(touches.length) {
            touchEndedTime = millis();
        }
    }

    this.touchStarted = function(){
        var target = touches.length ? touches[touches.length - 1] : {x: -1000, y: -1000};
        clickCallback(target.x, target.y);
    }

    this.mousePressed = function () {
        if(millis() - touchEndedTime < 25) {
            return;
        }

        clickCallback(mouseX, mouseY);
    }

    function clickCallback(mouseX, mouseY){
        if(sizes.showSettings) {
            if(settingsBtn.contains(mouseX, mouseY)) {
                toggleSettings = !toggleSettings;
                if(toggleSettings) {
                    settingsBg.animate('down');
                } else {
                    settingsBg.animate('up');
                }
            }
        }

        headerButtons.forEach(function (btn) {
            if (btn.contains(mouseX, mouseY)) {
                if(btn.typeText === 'settings') {
                    sounds.popUp.play;
                }

                if(btn.typeText === 'close') {
                    sounds.popUp.play();
                    showQuitModal = true;
                    muteSounds();
                    pauseGame();
                }

                if(btn.typeText === 'pause') {
                    sounds.popUp.play();
                    showPauseModal = true;
                    pauseGame();
                }

                if(btn.typeText === 'sound') {
                    soundsVolume = soundsVolume ? 0 : 1;
                    if(soundsVolume) {
                        btn.isSound = true;
                    } else {
                        btn.isSound = false;
                    }

                    for(key in sounds) {

                        if(key === 'background') {
                            sounds[key].setVolume(soundsVolume / 2);
                        } else {
                            sounds[key].setVolume(soundsVolume)
                        }
                    }
                }

                if(btn.typeText === 'reset') {
                    bindGameObject.reset();
                    oRoundStart.reset();
                    bindGameObject.sceneManager.showScene( RoundStart );
                }
            }
        });

        quitGameModal.quitButtons.forEach(function (btn) {
            if (btn.contains(mouseX, mouseY)) {
                btn.animate('down');
            }
        });

        if (pauseGameModal.resumeBtn.contains(mouseX, mouseY)) {
            showPauseModal = false;
            unpouseGame();
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
                if(togglePause) {
                    sounds.popUp.play();
                    showPauseModal = true;
                    pauseGame();
                } else {
                    sounds.popUp.play();
                    showPauseModal = false;
                    unpouseGame();
                }
            }
            break;
            case (M || m): {
                soundsVolume = soundsVolume ? 0 : 1;
                for(key in sounds) {
                    if(key === 'background') {
                        sounds[key].setVolume(soundsVolume / 2);
                    } else {
                        sounds[key].setVolume(soundsVolume)
                    }
                }
            }
            break;
            case(R || r): {
                bindGameObject.reset();
                oRoundStart.reset();
                bindGameObject.sceneManager.showScene( RoundStart );
            }
            break;
            case ESCAPE: {
                toggleClose = !toggleClose;

                if(toggleClose) {
                    showQuitModal = true;
                    muteSounds();
                    pauseGame();
                    sounds.popUp.play();
                } else {
                    sounds.popUp.play();
                    refuseQuit.animate('down');
                }
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

    function muteSounds() {
        for(key in sounds) {
            sounds[key].setVolume(0);
        }
    }

    function turnOnSounds() {
        for(key in sounds) {
            if(key === 'background') {
                sounds[key].setVolume(0.5);
            } else {
                sounds[key].setVolume(1);
            }
        }
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
