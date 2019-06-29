function GameOver()
{
    var bindGameOverObject = this;
    var oRoundStart;
    var oGame;
    var modal = null;
    var modalAnimation = null;

    this.enter = function() {
        initGameOver();        
    }

    this.setup = function()
    {
        // find a different scene using the SceneManager
        oRoundStart = this.sceneManager.findScene( RoundStart ).oScene;
        oGame = this.sceneManager.findScene( Game ).oScene;
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
        modal.score = oGame.getScore();
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

            if(btn.type === 'R') {
                btn.events.down.end = function() {
                    CURRENT_LEVEL = 0;
                    oRoundStart.reset();
                    oGame.reset();
                    score = 0;
                    bindGameOverObject.sceneManager.showScene( RoundStart );
                }
            }

            if(btn.type === 'X') {
                btn.events.down.end = function() {
                    oRoundStart.reset();
                    oGame.reset();
                    score = 0;
                    bindGameOverObject.sceneManager.showScene( Intro );
                }
            }
        })
    }
}
