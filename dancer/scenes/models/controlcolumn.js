function ControlColumn(btnType, x) {
  this.btnType = btnType;
  this.x = x;
  this.offsetTop = 170;
  var oControl = this;
  var w = width / 8;
  var h = height - this.offsetTop; 
  var backgroundColor = hexToRgb(colors.boogerTwo);
  var alpha = 0.3;
  var btnSize = 50;
  var startTime = 0;
  this.arrows = [];
  this.btn = new Button({
    x: this.x + (w / 2),
    y: this.offsetTop,
    backgroundColor: color('white'),
    color: colors.seafoamBlueTwo,
    content: this.btnType,
    width: btnSize,
    height: btnSize,
    shadowOffset: 6,
    fontSize: 30
  });

  this.draw = function() {
    push();

    fill(backgroundColor.r, backgroundColor.g, backgroundColor.b, 255 * alpha);
    noStroke();
    rect(this.x, this.offsetTop, w, h);
    fill(colors.boogerTwo);
    rect(this.x, height - 300, w, h / 5);
    stroke(colors.lightTan);
    strokeWeight(2);
    line(this.x + w, this.offsetTop, this.x + w, height);
    dropArrows();
    this.btn.update();
    this.btn.draw();

    pop();
  }

  this.update = function() {

  }

  function dropArrows() {
    if(millis() > startTime + 2000) {
      startTime = millis();
      oControl.arrows.push(new Arrow(oControl.x + w / 2, oControl.offsetTop, btnSize, btnSize, oControl.btnType));
    }

    for(var i = 0; i < oControl.arrows.length; i++) {
      if(oControl.arrows[i].y >= height - 300) {
        oControl.arrows[i].bgColor = hexToRgb(colors.lightTan);
        oControl.arrows[i].alpha = 0.7;
      }

      if(oControl.arrows[i].y >= height - 300 + h / 5) {
        oControl.arrows[i].reset();
      }

      oControl.arrows[i].update();
      oControl.arrows[i].draw();

      if(oControl.arrows[i].y > height) {
        oControl.arrows.splice(i, 1);
        i--;
        continue;
      }
    }
  }
}