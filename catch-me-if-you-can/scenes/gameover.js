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
    }

    function initGameOver() {
        modal = new Modal();
        modal.score = oGame.getScore();
        modalAnimation = new Model(new Frame(), sequences.poetXushturi);

        for(var i = 0; i < 60; i++) {
            var x = (i % 60) * 200;
            var y = parseInt(i / 60) * 227;
            modalAnimation.frame.sequence.push(new Sprite(x, y, 200, 227));
        }

        modalAnimation.frame.addAnimation('moving', 0, 59);
        modalAnimation.animate('moving', floor(1000 / 15));
        modal.xushturi = modalAnimation;
    }

    this.keyPressed = function()
    {
        this.sceneManager.showScene( RoundStart );
    }

    this.mousePressed = function() {
        modal.statButtons.forEach(function(btn) {
            if (btn.contains(mouseX, mouseY)) {
                if(btn.typeText === 'reset') {
                    CURRENT_LEVEL = 0;
                    oRoundStart.reset();
                    oGame.reset();
                    score = 0;
                    bindGameOverObject.sceneManager.showScene( RoundStart );
                }
    
                if(btn.typeText === 'close') {
                    CURRENT_LEVEL = 0;
                    oRoundStart.reset();
                    oGame.reset();
                    score = 0;
                    bindGameOverObject.sceneManager.showScene( RoundStart );
                }

                if(btn.typeText === 'share') {
                    var params = window.requestQueryParams;
                    var url = params.url;
                    if(url !== undefined) {
                        window.open('https://www.facebook.com/sharer/sharer.php?url=' + encodeURIComponent(url), '_blacnk');                        
                    }
                }
            }
        });
    }
}
