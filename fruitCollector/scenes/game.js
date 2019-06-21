function Game()
{
    var bindGameObject = this;
    var maxFruitCount = 20;
    var fruitAddLastTime = 0;
    var stats;
    var timer;
    var hearts;
    
    var bottle = null;
    var fruits = [];

    var headerButtons = [];

    var quitGameModal = null;
    var pauseGameModal = null;
    var showQuitModal = false;
    var showPauseModal = false;
    var isPaused = false;

    this.enter = function() 
    {
        initGame();
    }

    this.draw = function()
    {
        background('#003919');
        cursor('default');

        dropFruits();

        bottle.update();
        bottle.draw();

        stats.draw();
        hearts.draw();

        if (timer.ended()) {
            this.sceneManager.showScene( GameOver );
        }

        timer.update();
        timer.draw();

        headerButtons.forEach(x => x.update() & x.draw());

        drawCornerLeaves();

        if(showQuitModal) {
            drawQuitGameModal();
        }

        if(showPauseModal) {
            drawPauseGame();
        }

        if(isPaused) {
            noLoop();
        } 
    }

    function initGame()
    {
        stats = new Statistics(3224, 100);
        timer = new Timer(millis());
        hearts = new LifeFactory(100, 5);
        hearts.generateLifes();

        bottle = new Bottle(width / 2, height, bottleImages.mintBottle, 70, new Tooltip({
            width: 18,
            color: colors.sefoamBlue,
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
            shadowOffset:6,
            fontSize: 16
        }));

        headerButtons.push(new Button({
            x: width - 180 - 25,
            y: 70, 
            backgroundColor: color(colors.booger),
            content: "| |", 
            width: 50, 
            height: 50, 
            shadowOffset:6,
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
            var randFruitIndex = round(random() * (fruitImages.leaves.length - 1));
            fruits.push(new Fruit({
                x: random(width), 
                y: -50,
                w: 70,
                h:  120, 
                type: fruitImages.leaves[randFruitIndex], 
                speed: round(random() * 4 + 2)
            }));
        }

        for(var i = 0; i < fruits.length; i++) {
            fruits[i].update();

            if(fruits[i].y > height + fruits[i].height) {
                fruits.splice(i, 1);
                i--;
                continue;
            }

            if(bottle.hitsFruit(fruits[i])) {
                fruits.splice(i, 1);
                stats.increaseScore();
                bottle.tooltip.increase();
                i--;
                continue;
            }
        }

        fruits.forEach(function(fruit) {
            fruit.draw();
        });
    }

    function drawQuitGameModal() {
        quitGameModal.drawQuit();
    }

    function drawPauseGame() {
        pauseGameModal.drawPause();
    }

    this.getScore = function() {
        return stats.getScore();
    }

    this.reset = function() {
        showQuitModal = false;
    }

    this.mousePressed = function()
    {
        headerButtons.forEach(function(btn) {
            if(btn.contains(mouseX, mouseY))  {
                btn.animate('down');
                if(btn.content === 'X') {
                    btn.events.down.end = function() {
                        showQuitModal = true;
                    }
                }

                if(btn.content === '| |') {
                    btn.events.down.end = function() {
                        showPauseModal = true;
                        isPaused = true;
                    }
                }
            }
        });

        quitGameModal.quitButtons.forEach(function(btn) {
            if(btn.contains(mouseX, mouseY)) {
                btn.animate('down');

                if(btn.content === 'ara') {
                    btn.events.down.end = function() {
                        showQuitModal = false;
                    }
                }

                if(btn.content === 'ki') {
                    btn.events.down.end = function() {
                        bindGameObject.sceneManager.showScene( GameOver );
                    }
                }
            }
        });

        if(pauseGameModal.pauseButton.contains(mouseX, mouseY)) {
            pauseGameModal.pauseButton.animate('down');
            pauseGameModal.pauseButton.events.down.end = function() {
                showPauseModal = false;
                isPaused = false;
            }
        }
    }

    function roundStart() {
        fill(colors.darkForestGreen);
    }

    function drawCornerLeaves() {
        push();
        imageMode(CENTER);
        image(fruitImages.leaves[0], width - 100 - 35, height - 85, 70, 120);
        image(fruitImages.leaves[1], width - 180 - 35, height - 85, 70, 120);
        pop();
    }
}
