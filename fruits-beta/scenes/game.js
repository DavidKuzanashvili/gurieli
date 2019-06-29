function Game() {
    var score = 0;
    var fruitFallStep = 0;
    var fruitTypes = [
        { name: 'cherry', w: 45, h: 110 }, 
        { name: 'raspberry', w: 90, h: 90 }, 
        { name: 'leaves', w: 70, h: 120 }, 
        { name: 'vanilla', w: 90, h: 80 }, 
        { name: 'feijoa', w: 80, h: 115 }, 
        { name: 'peach', w: 85, h: 85 }
    ];
    var bottleTypes = [
        { name: 'cherryBottle', correctFruits: ['cherry'] }, 
        { name: 'raspberryBottle', correctFruits: ['raspberry', 'vanilla'] }, 
        { name: 'mintBottle', correctFruits: ['leaves'] }, 
        { name: 'peachBottle', correctFruits: ['peach'] }, 
        { name: 'feijoaBottle', correctFruits: ['feijoa'] }
    ];
    var fruits = [];
    var bottle = null;
    var randBottleIndex = round(random(0, bottleTypes.length - 1));

    this.enter = function() {

    }

    this.setup = function() {
        gameStart = millis();
        bottle = new Bottle({
            x: width / 2,
            type: bottleTypes[randBottleIndex].name
        });
    }

    this.draw = function() {
        push();

        background(colors.mainTheme);
        fallFruits();
        drawBottle();
        drawScore();

        pop();
    }

    this.update = function() {

    }

    function fallFruits() {
        if(millis() > fruitFallStep + 300) {
            fruitFallStep = millis();
            var randomTypeInex = round(random(0, fruitTypes.length - 1));
            var fruit = fruitTypes[randomTypeInex];
            fruits.push(new Fruit({
                type: fruit.name,
                x: random(width),
                y: -50,
                width: fruit.w,
                height: fruit.h,
                fallSpeed: round(random(4, 10))
            }));
        }

        for(var i = 0; i < fruits.length; i++) {
            fruits[i].update();
            if(fruits[i].isOutsideOfScene()) {
                fruits.splice(i, 1);
                i--;
                continue;
            }

            if(bottle.hitFruit(fruits[i])) {
                if(bottle.hitCorrectFruit(fruits[i].type, bottleTypes[randBottleIndex].correctFruits)) {
                    score++;
                } else {
                    if(score > 0) {
                        score--;
                    }
                }
                fruits.splice(i, 1);
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

        fill(255);
        textFont(fonts.LGVBold);
        textSize(30);
        textAlign(CENTER, CENTER);
        text('qula ' + score, width / 2, 50);

        pop();
    }
}