function Intro()
{
    var title;
    var bottles = [];
    var btn;

    this.setup = function() {
        title = new Title(width / 2, 100, '#TamaSi');
        var bottlesCount = Object.keys(bottleImages).length;
        var bottlesOffsetLeft = (width - (bottlesCount * 150 + (bottlesCount - 1) * 60)) / 2 + 75;

        for(var key in bottleImages) {
            bottles.push(new Bottle(bottlesOffsetLeft, bottleImages[key], 0));
            bottlesOffsetLeft += 150 + 60;
        }

        btn = new Button({
            x: width / 2,
            y: height - 100,
            backgroundColor: color('#86b23d'),
            font: fonts.LGVBold,
            content: 'daiwye'
        });
    }

    this.draw = function()
    {
        background('#003919')

        cursor('default');
        drawIntroScreen();
    }

    this.mousePressed = function()
    {
        if(btn.contains(mouseX, mouseY)) {
            btn.animate('down');
            btn.events.down.end = function(){
                this.sceneManager.showScene( RoundStart );
            }.bind(this);
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
