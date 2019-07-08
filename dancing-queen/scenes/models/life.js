function Life(type, x, w, h) {
  this.type = type;
  this.x = x;
  this.w = w;
  this.h = h;

  this.draw = function() {
    push();

    imageMode(CENTER);
    
    if(windowWidth <= 768) {
      image(this.type, this.x, height - 70, this.w, this.h);
    } else {
      image(this.type, this.x, height - 100, this.w, this.h);
    }

    pop();
  }
}