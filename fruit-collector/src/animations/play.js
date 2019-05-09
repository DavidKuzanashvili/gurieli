class Sprite {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

class Frame {
  /** 
   * @param {Array<Sprite>} sequence 
   * @param {Object} animations 
  **/
  constructor(sequence = [], animations = {}){
    this.sequence = sequence;
    this.animations = animations;
  }

  addAnimation(name, start, end){
    this.animations[name] = {start, end};
  }
}

class Model {
  constructor(frame, texture){
    this.texture = texture;
    this.frame = frame;
    this.currentAnimation = null;
    this.currentIndex = 0;
    this.animationStep = 100;
    this.currentStep = 0;
  }

  animate(name, step) {
    this.currentAnimation = name;
    this.animationStep = step;
  }

  update(){
    let calculatedStep = parseInt(millis() / this.animationStep);
    if(calculatedStep <= this.currentStep) {
      return;
    }

    this.currentStep = calculatedStep;
    
    let animation = this.frame.animations[this.currentAnimation];
    
    this.currentIndex++;
    
    if(this.currentIndex > animation.end) {
      this.currentIndex = animation.start;
    }
  }

  draw(){
    translate(width / 2, height / 2);
    let sprite = this.frame.sequence[this.currentIndex];

    if(movingDirection === 'LEFT') {
      scale(-1, 1);
    }
    image(this.texture, 0, 0, sprite.w, sprite.h, sprite.x, sprite.y, sprite.w, sprite.h);
  }
}