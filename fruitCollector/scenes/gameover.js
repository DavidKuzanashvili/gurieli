function GameOver()
{
    var bindGameOverObject = this;
    var oRoundStart;
    var oGame;
    var modal = null;
    var modalAnimation = null;

    this.setup = function()
    {
        // find a different scene using the SceneManager
        oRoundStart = this.sceneManager.findScene( RoundStart ).oScene;
        oGame = this.sceneManager.findScene( Game ).oScene;
        initGameOver();
    }

    this.draw = function()
    {
        background('#003919');
        leaves.draw();

        modal.drawStats();

        // modalAnimation.update();
        // modalAnimation.draw();
    }

    function initGameOver() {
        modal = new Modal();
        modalAnimation = new Model(new Frame(), sequenceImage);

        for(var i = 0; i < 8; i++) {
            var x = (i % 4) * 512;
            var y = parseInt(i / 4) * 256;

            modalAnimation.frame.sequence.push(new Sprite(x, y, 512, 256));
        }

        modalAnimation.frame.addAnimation('moving', 0, 7);
        modalAnimation.animate('moving', 50);
    }

    this.keyPressed = function()
    {
        this.sceneManager.showScene( Intro );
    }

    this.mousePressed = function() {
        modal.statButtons.forEach(function(btn) {
            btn.contains(mouseX, mouseY) && btn.animate('down');

            if(btn.content === 'R') {
                btn.events.down.end = function() {
                    bindGameOverObject.sceneManager.showScene( RoundStart );
                    oRoundStart.reset();
                    oGame.reset();
                }
            }
        })
    }
}
