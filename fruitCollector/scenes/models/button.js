function Button(x, y, backgroundColor, content) {
  this.x = x;
  this.y = y;
  this.width = 237;
  this.height = 74;
  this.textColor = color(255);
  this.backgroundColor = backgroundColor;
  this.shadowColor = darken(this.backgroundColor);
  this.content = content;

  this.offsetTop = 10;

  this.currentOffset = 0;
  this.speed = 1;

  this.draw = function() {
    push();
    
    if(this.contains(mouseX, mouseY)) {
      cursor('pointer');
    }

    noStroke();
    rectMode(CENTER);
    fill(this.shadowColor);
    rect(this.x, this.y + this.offsetTop, this.width, this.height, 43);
    fill(this.backgroundColor);
    rect(this.x, this.y + this.currentOffset, this.width, this.height, 43);
    textAlign(CENTER, CENTER);
    fill(this.textColor);
    textSize(30);
    text(this.content, this.x, this.y + this.currentOffset);
    
    pop();
  }

  this.update = function() {
    updateAnimation();
  }

  var activeAnimation = null;
  var animations = {
    down: {
      setup: function() {
        this.currentOffset = 0;
      }.bind(this),
      update: function() {
        if(this.currentOffset < this.offsetTop) {
          this.currentOffset += this.speed;
        } else {
          this.currentOffset = this.offsetTop;
          this.animate('up');
        }
      }.bind(this)
    },
    up: {
      setup: function() {
        this.currentOffset = this.offsetTop;
      }.bind(this),
      update: function() {
        if(this.currentOffset > 0) {
          this.currentOffset -= this.speed;
        } else {
          this.currentOffset = 0;
          this.animate();
        }
      }.bind(this)
    },
  };

  function updateAnimation(){
    if(activeAnimation == null) {
      return;
    }

    animations[activeAnimation].update();
  }

  this.animate = function(type){
    if(animations.hasOwnProperty(type)) {
      activeAnimation = type;
      animations[activeAnimation].setup();
    } else {
      activeAnimation = null;
    }
  }

  this.contains = function(x, y) {
    var w = this.width / 2;
    var h = this.height / 2;

    return x > this.x - w
        && x < this.x + w
        && y > this.y - h
        && y < this.y + h + this.offsetTop;
  }
}