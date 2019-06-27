function Bottle(x, type, speed, tooltip) {
  this.x = x;
  this.type = type;
  this.speed = speed;
  this.color = color(255);
  this.width = 140;
  this.height = 475;
  this.startPoint = -(this.height + 100);
  this.endPoint = height - this.height / 4 + 10;
  this.y = this.startPoint;
  this.tooltip = tooltip || null;

  var dropSpeed = 20;
  var activeAnimation = 'in';

  var animations = {
    in: {
      setup: function() {
        this.y = this.startPoint;
      }.bind(this),
      update: function() {
        this.y = Math.min(this.y + dropSpeed, this.endPoint);
      }.bind(this)
    }
  };

  if(this.tooltip) {
    // this.tooltip.x = this.x + 75 + 30;
    this.tooltip.height = 250;
    this.tooltip.reload();
  }

  this.draw = function() {
    push();
    
    imageMode(CENTER);
    image(bottleImages[this.type], this.x, this.y, this.width, this.height);

    pop();

    if(this.tooltip) {
      this.tooltip.draw();
    }
  }

  this.update = function() {
    if(this.y >= this.endPoint) {
      if(mouseX > this.x) {
        this.x = Math.min(this.x + this.speed, mouseX);
      }
  
      if(mouseX < this.x) {
        this.x = Math.max(this.x - this.speed, mouseX);
      }
    } else {
      updateAnimation();
    }

    if(this.tooltip){
      this.tooltip.y = height - 20 - this.tooltip.height / 2;
      this.tooltip.x = this.x + 75 + 30;
      this.tooltip.update();
    }
  }

  
  this.staticDraw = function() {
    push();

    imageMode(CENTER);

    image(this.type, this.x, height / 2, this.width, this.height);

    pop();
  }

  this.hitsFruit = function(fruit) {
    let bottleLeft = this.x - this.width / 2;
    let bottleRight = this.x + this.width / 2;
    let bottleTop = this.y - this.height / 2;
    return fruit.x > bottleLeft && fruit.x < bottleRight && fruit.y > bottleTop && fruit.y < bottleTop + 20;
  }

  this.hitsCorrectFruit = function(type = '', correctTypes = []) {
    for(var i = 0; i < correctTypes.length; i++) {
      if(type === correctTypes[i]) 
        return true;
    }
    return false;
  }

  this.animate = function(type) {
    if(animations.hasOwnPropery(type)) {
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