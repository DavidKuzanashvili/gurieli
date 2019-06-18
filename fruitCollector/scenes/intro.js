function Intro()
{
    var title;
    var bottles = [];
    var btn;

    this.setup = function() {
        title = new Title(width / 2, 100, '#თამაში');
        var bottlesCount = Object.keys(bottleImages).length;
        var bottlesOffsetLeft = (width - (bottlesCount * 150 + (bottlesCount - 1) * 60)) / 2 + 75;

        for(var key in bottleImages) {
            bottles.push(new Bottle(bottlesOffsetLeft, height / 2, bottleImages[key], 0));
            bottlesOffsetLeft += 150 + 60;
        }

        btn = new Button(width / 2, height - 100, color('#86b23d'), 'დაიწყე');
    }

    this.draw = function()
    {
        image(this.sceneManager.bgImage, 0, 0);

        cursor('default');
        drawIntroScreen();  
    }

    this.mousePressed = function()
    {
        if(btn.contains(mouseX, mouseY)) {
            btn.animate('down');
            this.sceneManager.showScene( Game );
        }
    }

    function drawIntroScreen()
    {
        title.draw();

        bottles.forEach(function(bottle) {
           bottle.staticDraw();
        });
    
       btn.update();
       btn.draw();
    }
}
