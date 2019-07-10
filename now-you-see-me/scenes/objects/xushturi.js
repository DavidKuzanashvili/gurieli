function Xushturi(x, y) {
  var self = this;
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 100;
  this.state = '';

  var model = null;
  var activeAnimation = null;
  var frameCount = 0;
  var spriteWidth = 0;
  var spriteHeight = 0;
  var speed = 0;
  var sequence = null;
  var sprite = null;
  var coef = 0;

  this.draw = function () {
    push();

    this.update();
    translate(this.getX(), this.getY());
    if (model) {
      imageMode(CORNER);
      model.update();
      // model.translateX = this.x - sprite.width / 2;
      // model.translateY = this.y - sprite.height;
      if(windowWidth <= 768) {
        model.draw(spriteWidth * coef, spriteHeight * coef);
      } else {
        model.draw();
      }
    }

    pop();
  }



  this.update = function() {
    if(model) {
      coef = 0.4;
      sprite = model.frame.sequence[model.currentIndex];
    }
  }

  this.getX = function(){
    if(windowWidth <= 768) {
      return this.x - spriteWidth * coef / 2;
    } else {
      if(model && sprite) {
        return this.x - sprite.width / 2;
      } else {
        return 0;
      }
    }
  }

  this.getY = function(){
    if(windowWidth <= 768) {
      return this.y - spriteHeight * coef;
    } else {
      if(model && sprite) {
        return this.y - sprite.height;
      } else {
        return 0;
      }
    }
  }

  this.switchAnimation = function(type) {
    switch(type) {
      case 'start': {
        self.state = 'start';
        frameCount = 30;
        spriteWidth = 200;
        spriteHeight = 200;
        speed = 15;
        sequence = sequences.start;
        cutSequence(frameCount, spriteWidth, spriteHeight, sequence, speed);
      }
      break;
      case 'win': {
        self.state = 'win';
        frameCount = 15;
        spriteWidth = 200;
        spriteHeight = 279;
        speed = 15;
        sequence = sequences.found;
        cutSequence(frameCount, spriteWidth, spriteHeight, sequence, speed);
      };
      break;
      case 'lose': {
        self.state = 'lose';
        frameCount = 32;
        spriteWidth = 200;
        spriteHeight = 184;
        speed = 15;
        sequence = sequences.notFound;
        cutSequence(frameCount, spriteWidth, spriteHeight, sequence, speed);
      };
      break;
    }
  }

  
  function cutSequence(fc, w, h, sequence, speed) {
    model = new Model(new Frame(), sequence);

    for(var i = 0; i < fc; i++) {
      var x = (i % fc) * w;
      var y = parseInt(i / fc) * h;
      model.frame.sequence.push(new Sprite(x, y, w, h));
    }

    model.frame.addAnimation('moving', 0, (fc - 1));
    model.animate('moving', floor(1000 / speed));
  }
}