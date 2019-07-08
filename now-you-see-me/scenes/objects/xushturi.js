function Xushturi(x, y) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 100;

  var model = null;
  var activeAnimation = null;
  var frameCount = 0;
  var spriteWidth = 0;
  var spriteHeight = 0;
  var speed = 0;
  var sequence = null;

  this.draw = function () {
    push();

    // rectMode(CENTER);
    // fill('yellow');
    // noStroke();
    // rect(this.x, this.y, this.width, this.height);
    if (model) {
      imageMode(CORNER);
      model.update();
      var sprite = model.frame.sequence[model.currentIndex];
      model.translateX = this.x - sprite.width / 2;
      model.translateY = this.y - sprite.height;
      model.draw();
    }

    pop();
  }

  this.update = function() {
  }
  

  this.switchAnimation = function(type) {
    switch(type) {
      case 'start': {
        frameCount = 30;
        spriteWidth = 200;
        spriteHeight = 200;
        speed = 15;
        sequence = sequences.start;
        cutSequence(frameCount, spriteWidth, spriteHeight, sequence, speed);
      }
      break;
      case 'win': {
        frameCount = 15;
        spriteWidth = 200;
        spriteHeight = 279;
        speed = 15;
        sequence = sequences.found;
        cutSequence(frameCount, spriteWidth, spriteHeight, sequence, speed);
      };
      break;
      case 'lose': {
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