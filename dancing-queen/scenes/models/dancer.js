function Dancer(img, offsetTop) {
  this.img = img;
  this.width = 255;
  this.height = 350;
  this.offsetTop = offsetTop || 170;
  this.xushturi = null;

  var shake= 0;
  var calmShakeSpeed = 0.5;
  var activeAnimation = null;

  var animations ={
    shake: {
      setup: function() {
        shake = 20;
      },
      update: function() {
        shake = Math.max(shake - calmShakeSpeed, 0);

        if(shake <= 0) {
          activeAnimation = null;
        }
      }
    }
  }

  this.draw = function() {
    push();

    imageMode(CENTER);
    // image(this.img, width / 4, (height + this.offsetTop) / 2, this.width, this.height);
    translate(round(random(-shake, shake)), 0);
    if(this.xushturi) {
      this.xushturi.translateX = width / 4;
      this.xushturi.translateY = (height + this.offsetTop) / 2;
      this.xushturi.draw();
    }

    pop();
  }

  this.update = function() { 
    updateAnimation();
    if(this.xushturi) {
      this.xushturi.update();
    }
  }

  this.animate = function(type) {
    if(animations.hasOwnProperty(type)) {
      activeAnimation = type;
      animations[activeAnimation].setup();
    } else {
      activeAnimation = null;
    }
  }

  function updateAnimation() {
    if(activeAnimation === null) {
      return;
    }

    animations[activeAnimation].update();
  }
}