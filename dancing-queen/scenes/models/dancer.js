function Dancer(img, offsetTop) {
  this.img = img;
  this.width = 255;
  this.height = 350;
  this.offsetTop = offsetTop || 170;
  this.xushturi = null;

  this.draw = function() {
    push();

    imageMode(CENTER);
    // image(this.img, width / 4, (height + this.offsetTop) / 2, this.width, this.height);
    if(this.xushturi) {
      this.xushturi.translateX = width / 4;
      this.xushturi.translateY = (height + this.offsetTop) / 2;
      this.xushturi.draw();
    }

    pop();
  }

  this.update = function() { 
    if(this.xushturi) {
      this.xushturi.update();
    }
  }
}