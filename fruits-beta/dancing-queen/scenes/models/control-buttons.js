function ControlButton(type, x, y, w, h) {
  this.type = type;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.typeText = '';
  this.onUpdate = function() {};

  this.draw = function() {
    push();

    if(this.contains(mouseX, mouseY)) {
      cursor('pointer');
    }
    
    imageMode(CENTER);
    image(this.type, this.x, this.y, this.w, this.h);

    pop();
  }

  this.update = function() {
    this.onUpdate();
  }

  this.contains = function(x, y) {
    var w = this.w / 2;
    var h = this.h / 2;

    return x > this.x - w
        && x < this.x + w
        && y > this.y - h
        && y < this.y + h;
  }
}