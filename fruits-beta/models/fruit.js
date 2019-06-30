function Fruit(options) {
  options = options || {};
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.type = options.type || 'undifined';
  this.width = options.width || 50;
  this.height = options.height || 50;
  this.fallSpeed = options.fallSpeed || 1;
  this.animationEnd = false;
  var randomFruitMode = round(random(0, fruitImages[this.type].length - 1));

  var scaleCoefficient = 1;
  var scaleDownSpeed = 0.1;
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

  this.draw = function () {
    push();

    imageMode(CENTER);
    image(fruitImages[this.type][randomFruitMode], this.x, this.y, this.width * scaleCoefficient, this.height * scaleCoefficient);

    pop();
  }

  this.update = function () {
    updateAnimation();
    this.y += this.fallSpeed;
  }

  this.isOutsideOfScene = function () {
    if (this.y > height + this.height) {
      return true;
    }

    return false;
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