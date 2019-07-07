function Life(x, x1, movmentSpeed, isActive) {
  this.x = x;
  this.y = height - 70;
  this.x1 = x1;
  this.width = 37;
  this.height = 32;
  this.movmentSpeed = movmentSpeed;
  this.isActive = isActive;
  this.onUpdate = function() {
    this.y = height - 70;
  };

  this.draw = function() {
    push();

    imageMode(CENTER);

    if(this.isActive) {
      image(lifeImages.active, this.x, this.y, this.width, this.height);
    } else {
      image(lifeImages.inactive, this.x, this.y, this.width, this.height);
    }

    pop();
  }

  this.update = function() {
    this.onUpdate();
    if(this.x >= this.x1) {
      return;
    } else {
      this.x += this.movmentSpeed;
    }
  }
}