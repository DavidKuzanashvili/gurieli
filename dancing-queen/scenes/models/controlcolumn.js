function ControlColumn(btnTypeCode, x, buttonColor) {
  this.btnTypeCode = btnTypeCode;
  this.x = x;
  this.offsetTop = 170;
  this.isPaused = false;
  this.onUpdate = function () { }
  var oControl = this;
  var w = width / 8;
  var h = height - this.offsetTop;
  var backgroundColor = hexToRgb(colors.boogerTwo);
  var alpha = 0.3;
  var btnSize = 50;
  var activeAreaStart = height - this.offsetTop;
  this.arrows = [];
  this.arrowRotation = 0;
  this.btn = new ControlButton(arrow.img, 0, 0, arrow.w, arrow.h, 'arrow');
  // this.btn.typeText = this.btnTypeCode;

  this.draw = function () {
    push();

    fill(backgroundColor.r, backgroundColor.g, backgroundColor.b, 255 * alpha);
    noStroke();
    rect(this.x, this.offsetTop, w, h);
    fill(colors.boogerTwo);
    rect(this.x, activeAreaStart, w, oControl.getActiveAreaHeight());
    stroke(colors.lightTan);
    strokeWeight(2);
    line(this.x + w, this.offsetTop, this.x + w, height);
    dropArrows();

    translate(this.x + (w / 2), this.offsetTop);
    rotate(this.arrowRotation);
    this.btn.update();
    this.btn.draw();

    pop();
  }

  this.update = function () {
    this.onUpdate();

    activeAreaStart = height - 300;
    w = width / 8;
    h = height - this.offsetTop;

    if (windowWidth < 768) {
      w = width / 4;
      this.x = (this.x - width / 2) * 2;
      activeAreaStart = height - oControl.getActiveAreaHeight() - parseInt(this.offsetTop * (2 / 3));
    }

    for (var i = 0; i < this.arrows.length; i++) {
      this.arrows[i].x = this.x + w / 2;
    }

  }

  this.getActiveAreaStart = function () {
    return activeAreaStart;
  }

  this.getActiveAreaHeight = function () {
    return parseInt(h / 5);
  }

  this.isInActiveArea = function (x, y) {
    if (!y) {
      y = x;
      return y > activeAreaStart && y < (activeAreaStart + oControl.getActiveAreaHeight());
    }

    return x > this.x
      && x < this.x + w
      && this.isInActiveArea(y);
  }

  this.isSomeArrowsInActiveArea = function () {
    return oControl.arrows.some(function (arrow) {
      return !arrow.isTriggered() && oControl.isInActiveArea(arrow.y);
    });
  }

  this.getPassedActiveAreaArrows = function () {
    return oControl.arrows.filter(function (arrow) {
      return !arrow.isTriggered() && arrow.y > (activeAreaStart + (oControl.getActiveAreaHeight()));
    });
  }

  function dropArrows() {
    for (var i = 0; i < oControl.arrows.length; i++) {
      if (!oControl.isPaused) {
        oControl.arrows[i].update();
      }
      oControl.arrows[i].draw();

      if (oControl.arrows[i].y > height) {
        oControl.arrows.splice(i, 1);
        i--;
        continue;
      }
    }
  }
}