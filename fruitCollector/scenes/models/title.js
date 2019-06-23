function Title(x, y, content, color, fontSize) {
  this.x = x;
  this.y = y;
  this.color = hexToRgb(color) || { r: 255, g: 255, b: 255 };
  this.alpha = 1;
  this.fontSize = fontSize || 30;
  this.content = content;
  this.font = fonts.LGVBold;
  this.alphaSpeed = 0.05;

  var currentAlpha = this.alpha;
  var activeAnimation = 'in';
  var animations = {
    in: {
      setup: function () {
        currentAlpha = 0;
      }.bind(this),
      update: function () {
        currentAlpha = Math.min(currentAlpha + this.alphaSpeed, this.alpha);
        if (currentAlpha === this.alpha) {
          activeAnimation = null;
        }
      }.bind(this)
    },
    out: {
      setup: function () {
        currentAlpha = this.alpha;
      }.bind(this),
      update: function () {
        currentAlpha = Math.max(currentAlpha - this.alphaSpeed, 0);
        if (currentAlpha === 0) {
          activeAnimation = null;
        }
      }.bind(this)
    }
  }

  this.draw = function () {
    push();

    fill(this.color.r, this.color.g, this.color.b, currentAlpha * 255);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER);
    textFont(this.font);
    text(this.content, x, y);

    pop();
  }

  this.update = function () {
    UpdateAnimation();
  }

  this.animate = function (type) {
    if (animations.hasOwnProperty(type)) {
      animations[type].setup();
      activeAnimation = type;
    } else {
      activeAnimation = null;
    }
  }

  function UpdateAnimation() {
    if (activeAnimation === null) {
      return;
    }

    animations[activeAnimation].update();
  }
}