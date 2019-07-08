function Fruit(options = {}) {
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.type = options.type;
  this.imageTypeIndex = options.imageTypeIndex || 0;
  this.speed = options.speed || 2;
  this.width = options.w || 70;
  this.height = options.h || 70;

  var scaleCoefficient = 1;
  var scaleDownSpeed = 0.05;
  var activeAnimation = null;

  var animations = {
    scaleDown: {
      setup: function () {
        scaleCoefficient = 1;
      },
      update: function () {
        scaleCoefficient = Math.max(scaleCoefficient - scaleDownSpeed, 0);
        if (scaleCoefficient === 0) {
          this.animate(null);
        }
      }.bind(this)
    }
  };

  this.events = {};

  for (var key in animations) {
    this.events[key] = {};
  }

  this.draw = function() {
    push();

    imageMode(CENTER);

    image(fruitImages[this.type][this.imageTypeIndex].img, this.x, this.y, fruitImages[this.type][this.imageTypeIndex].w * sizes.fruitsCoefficient * scaleCoefficient, fruitImages[this.type][this.imageTypeIndex].h * sizes.fruitsCoefficient * scaleCoefficient);

    pop();
  }

  this.update = function() {
    updateAnimation();
    this.y += this.speed;
  }

  this.animate = function (type) {
    if (activeAnimation) {
      triggerAnimationEvent(activeAnimation, 'end');
    }

    if (animations.hasOwnProperty(type)) {
      activeAnimation = type;
      animations[activeAnimation].setup();
      triggerAnimationEvent(activeAnimation, 'start');
    } else {
      activeAnimation = null;
    }
  }

  function updateAnimation() {
    if (activeAnimation === null) {
      return;
    }
    animations[activeAnimation].update();
  }

  var triggerAnimationEvent = function (animation, event) {
    if (this.events.hasOwnProperty(animation) && this.events[animation].hasOwnProperty(event)) {
      return this.events[animation][event]();
    }

    return false;
  }.bind(this);
}