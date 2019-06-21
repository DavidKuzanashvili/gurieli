function Sprite(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
}

/**
  * @param {Array<Sprite>} sequence
  * @param {Object} animations 
**/
function Frame(sequence = [], animations = {}) {
  this.sequence = sequence;
  this.animations = animations;

  this.addAnimation = function(name, start, end) {
    this.animations[name] = {start, end};
  }
}

function Model(frame, texture) {
  this.texture = texture;
  this.frame = frame;
  this.currentAnimation = null;
  this.currentIndex = 0;
  this.animationStep = 100;
  this.currentStep = 0;

  this.animate = function(name, step) {
    this.currentAnimation = name;
    this.animationStep = step;
  }

  this.update = function(){
    var calculatedStep = parseInt(millis() / this.animationStep);
    if(calculatedStep <= this.currentStep) {
      return;
    }

    this.currentStep = calculatedStep;
    
    var animation = this.frame.animations[this.currentAnimation];
    
    this.currentIndex++;
    
    if(this.currentIndex > animation.end) {
      this.currentIndex = animation.start;
    }
  }

  this.draw = function() {
    var sprite = this.frame.sequence[this.currentIndex];
    console.log(sprite)
    image(this.texture, 0, 0, sprite.width, sprite.height, sprite.x, sprite.y, sprite.width, sprite.height);
  }
}