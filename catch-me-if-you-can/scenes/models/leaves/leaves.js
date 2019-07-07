function Leaves(leavesType, currentHeight) {
  this.y = -300;
  this.leavesType = leavesType;
  this.leafRotationSpeed = 0.2;
  this.changeX = 10;
  this.currentHeight = currentHeight;
  var ratio;
  var activeAnimation = 'in';
  var translateLeaves = -300;
  var translateSpeed = 10;
  var animations = {
    in: {
      setup: function () {
        this.y = translateLeaves;
        sounds.leavesReveal.play();
      }.bind(this),
      update: function () {
        this.y = Math.min(this.y + translateSpeed, 0);
      }.bind(this)
    },
    out: {
      setup: function () {
        this.y = 0;
      }.bind(this),
      update: function () {
        this.y = Math.max(this.y - translateSpeed, translateLeaves);
      }.bind(this)
    }
  }

  this.draw = function () {
    push();

    image(leavesImages[this.leavesType][0], 0, this.y, width, windowWidth * ratio);

    pop();
  }

  this.update = function () {
    ratio = this.currentHeight / 1920;
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