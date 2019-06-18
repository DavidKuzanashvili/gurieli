function Game()
{
    var fruitAddLastTime = 0;
    var stats;
    
    var bottle = null;
    var fruits = [];

    this.enter = function()
    {
        initGame();
    }

    this.draw = function()
    {
        image(this.sceneManager.bgImage, 0, 0);

        dropFruits();

        bottle.update();
        bottle.draw();

        stats.draw();
    }

    this.mousePressed = function()
    {
        
    }

    function initGame()
    {
        stats = new Statistics(3224);
        bottle = new Bottle(width / 2, height, bottleImages.mintBottle, 70, new Tooltip({
            width: 18,
            color: '#993333',
            max: 100
        }));
        fruits = [];
    }

    function dropFruits() {
        if (millis() > fruitAddLastTime + 600) {
            fruitAddLastTime = millis();
            fruits.push(new Fruit(random(width), -50, fruitImages.raspberry, round(random() * 3 + 3)))
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
                i--;
                continue;
            }
        }

        fruits.forEach(function(fruit) {
            fruit.draw();
        });
    }
}
