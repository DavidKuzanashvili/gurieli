function Arrow(x, y, w, h, content) {
  this.x = x;
  this.y = y  ;
  this.w = w;
  this.h = h;
  this.speed = round(random() * 4 + 2);
  this.content = content;
  this.bgColor = hexToRgb(colors.boogerTwo);
  this.alpha = 0.5;

  this.draw = function() {
    push();

    rectMode(CENTER);
    noStroke();
    fill(this.bgColor.r, this.bgColor.g, this.bgColor.b, 255 * this.alpha);
    rect(this.x, this.y, this.w, this.h, 50);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.content, this.x, this.y);
    
    pop();
  }

  this.update = function() {
    this.y += this.speed;
  }

  this.reset = function() {
    this.bgColor = hexToRgb(colors.boogerTwo);
    this.alpha = 0.5;
  }
}