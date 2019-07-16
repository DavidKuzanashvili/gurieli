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
        updateTouchTracker();
        push();
        background('#003919');
        leaves.draw();

        modal.drawStats();
        pop();
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

    var touchEndedTime = 0;

    function updateTouchTracker() {
      if(touches.length) {
        touchEndedTime = millis();
      }
    }

    this.touchStarted = function () {
        var target = touches.length ? touches[touches.length - 1] : { x: -1000, y: -1000 };
        clickCallback(target.x, target.y);
    }
    
    this.mousePressed = function () {
      if(millis() - touchEndedTime < 25) {
        return;
      }

      clickCallback(mouseX, mouseY);
    }

    function clickCallback(mouseX, mouseY) {
        modal.statButtons.forEach(function(btn) {
            if (btn.contains(mouseX, mouseY)) {
                if(btn.typeText === 'reset') {
                    CURRENT_LEVEL = 0;
                    turi = CURRENT_LEVEL + 1;
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
                    emit('close');
                    // if(btn.typeText === 'close') {
                    //   if(window.parent && window.parent !== window) {
                    //     window.parent.history.back();
                    //   } else {
                    //     window.close() | window.location.reload();
                    //   }
                    // }
                    bindGameOverObject.sceneManager.showScene( RoundStart );
                }

                if(btn.typeText === 'share') {
                    emit('share');
                    // var params = window.requestQueryParams;
                    // var url = params.url;
                    // if(url !== undefined) {
                    //     window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blacnk');                        
                    // }
                }
            }
        });
    }
}
