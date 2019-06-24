function Dancer(img, offsetTop) {
  this.img = img;
  this.width = 255;
  this.height = 350;
  this.offsetTop = offsetTop || 170;

  this.draw = function() {
    push();

    imageMode(CENTER);
    // rectMode(CENTER);
    // fill(255);
    // rect(width / 8 + this.width, (height + 170) / 2, this.width, this.height);
    image(this.img, width / 4, (height + this.offsetTop) / 2, this.width, this.height);
    // line(width / 2, 0, width / 2, height);

    pop();
  }
}