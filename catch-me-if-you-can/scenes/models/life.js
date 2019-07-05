function Life(x, x1, movmentSpeed, isActive) {
  this.x = x;
  this.y = height - 70;
  this.x1 = x1;
  this.width = 43;
  this.height = 40;
  this.movmentSpeed = movmentSpeed;
  this.isActive = isActive;

  this.draw = function() {
    push();

    imageMode(CORNER);

    if(this.isActive) {
      image(lifeImages.active, this.x, this.y, this.width, this.height);
    } else {
      image(lifeImages.inactive, this.x, this.y, this.width, this.height);
    }

    pop();
  }

  this.update = function() {
    if(this.x >= this.x1) {
      return;
    } else {
      this.x += this.movmentSpeed;
    }
  }
}