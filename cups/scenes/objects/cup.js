function Cup(x, y, width = cupImgObj.width, height = cupImgObj.height) {
  var self = this;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.xushturi = null;
  this.xushturiOn = false;
  this.onUpdate = function() {};
  this.offsetX = 0;
  this.offsetY = 0;
  
  this.rotation = 0;

  var activeAnimation = null;
  var yDistance = 120;
  var xDistance = 600;
  var revealXDistance = 100;

  var animations = {
    right: {
      current: 0,
      from: -1,
      to: 1,
      speed: 0.03,
      xStart: 0,
      yStart: 0,
      yDirection: 0,
      xDirection: 0,
      cPoint: 1/2,
      setup: function() {
        this.current = this.from;
        this.xStart = self.x;
        this.yStart = self.y;
        this.yDirection = -1;
        this.xDirection = 1;
      },
      update: function() {
        this.current = Math.min(this.current + this.speed, this.to);

        var c = -this.cPoint * Math.pow(this.current, 2) + this.cPoint;
        var ec = easeInOut(map(this.current, this.from, this.to, 0, 1));

        self.x = this.xStart;
        self.offsetX = this.xDirection * round(xDistance * (this.current / (this.to - this.from)) + xDistance / 2) * ec;
        self.y = this.yStart;
        self.offsetY = this.yDirection * round(yDistance * c) * ec;
        self.rotation = 0;

        if(this.to === this.current) {
          self.animate();
        }
      }
    },
    left: {
      setup: function(){
        animations.right.setup();
        animations.right.yDirection = 1;
        animations.right.xDirection = -1;
      },
      update: function(){
        animations.right.update();
      }
    },
    reveal: {
      current: 0,
      from: 0,
      to: -0.35,
      speed: 0.02,
      xStart: 0,
      yStart: 0,
      setup: function() {
        this.xStart = self.x;
        this.yStart = self.y;
        this.current = this.from;
        self.offsetX = 0;
        self.offsetY = 0;
        self.rotation = 0;
        self.xushturiOn = true;
      },
      update: function() {
        this.current = Math.min(Math.max(this.current - this.speed, this.to), this.from);

        var c = 1 / ((1/(20 * abs(this.current)) + 0.2) * 4);

        self.x = this.xStart;
        self.offsetX = - round(revealXDistance * (this.current / (this.to - this.from)));
        self.y = this.yStart;
        self.offsetY = - round(self.height * c);
        self.rotation = -c;


        if(this.to === this.current) {
          self.animate();
        }
      }
    },
    hide: {
      current: 0,
      from: -0.35,
      to: 0,
      speed: 0.02,
      xStart: 0,
      yStart: 0,
      setup: function(){
        this.xStart = self.x;
        this.yStart = self.y;
        this.current = this.from;
        self.offsetX = revealXDistance;
        self.offsetY = self.height;
        self.rotation = -1;
        self.xushturiOn = true;
      },
      update: function(){
        this.current = Math.max(Math.min(this.current + this.speed, this.to), this.from);

        var c = 1 / ((1/(20 * abs(this.current)) + 0.2) * 4);

        self.x = this.xStart;
        self.offsetX = round(revealXDistance * (this.current / (this.to - this.from)));
        self.y = this.yStart;
        self.offsetY = - round(self.height * c);
        self.rotation = -c;

        if(this.to === this.current) {
          self.xushturiOn = false;
          self.animate();
        }
      }
    }
  };

  this.contains = function(x, y) {
    var w = this.width / 2;
    var h = this.height / 2;

    return x > this.x - w
        && x < this.x + w
        && y > this.y - h
        && y < this.y + h;
  }

  this.events = {};

  for (var key in animations) {
    this.events[key] = {};
  }

  this.draw = function() {
    if(this.xushturi && this.xushturiOn) {
      this.xushturi.draw();
    }
    push();

    imageMode(CENTER);
    translate(this.x + this.offsetX, this.y + this.offsetY);
    rotate(this.rotation);
    image(cupImgObj.img, 0, 0, this.width, this.height);

    pop();
  }

  this.update = function() {
    this.onUpdate();

    if(this.xushturi && this.xushturiOn) {
      this.xushturi.update();
      this.xushturi.x = this.x;
      this.xushturi.y = this.y;
    }

    updateAnimation();
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

  this.goLeft = function(range) {
    xDistance = range;
    yDistance = 120 / 600 * xDistance;
    this.animate('left');
  }

  this.goRight = function(range) {
    xDistance = range;
    yDistance = round(120 / 600 * xDistance);
    this.animate('right');
  }
  
  this.setAnimationSpeed = function(speed) {
    animations.right.speed = speed;
  }
}