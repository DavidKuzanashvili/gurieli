function Header() {
  var self = this;
  var drawStart = 100;
  var marginBetweenBtns = 35;
  var score = 0;
  this.isPaused = false;
  this.height = 170;
  this.soundBtn = new ControlButton(icons.sound.img, drawStart, this.height / 2, icons.sound.w, icons.sound.h);
  this.soundBtn.typeText = 'sound';
  this.soundBtn.onUpdate = function() {
    this.x = drawStart;
    this.y = self.height / 2;
  }

  this.pauseBtn = new ControlButton(icons.pause.img, drawStart + icons.pause.w + marginBetweenBtns, this.height / 2, icons.pause.w, icons.pause.h);
  this.pauseBtn.typeText = 'pause';
  this.pauseBtn.onUpdate = function() {
    this.x = drawStart + icons.sound.w + marginBetweenBtns;
    this.y = self.height / 2;
  }

  this.resetBtn = new ControlButton(icons.reset.img, drawStart + (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns), this.height / 2, icons.reset.w, icons.reset.h);
  this.resetBtn.typeText = 'reset';
  this.resetBtn.onUpdate = function() {
    this.x = drawStart + (icons.pause.w + icons.sound.w + 2 * marginBetweenBtns);
    this.y = self.height / 2;
  }

  this.closeBtn = new ControlButton(icons.close.img, drawStart + (icons.reset.w + icons.pause.w + icons.sound.w + 3*marginBetweenBtns), this.height / 2, icons.close.w, icons.close.h);
  this.closeBtn.typeText = 'close';
  this.closeBtn.onUpdate = function() {
    this.x = drawStart + (icons.reset.w + icons.pause.w + icons.sound.w + 3*marginBetweenBtns);
    this.y = self.height / 2;
  }
  this.btns = [ this.soundBtn, this.pauseBtn, this.resetBtn, this.closeBtn ];
  this.timer = new Timer(millis(), 60);


  this.draw = function() {
    push();

    //Background
    fill(colors.boogerTwo);
    noStroke();
    rect(0, 0, width, this.height);

    /*
      Header components - 1.Buttons, 2.Timer, 3.Statistics
    */

    //Buttons
    this.btns.forEach(function(btn) {
      btn.update() & btn.draw();
    });

    //Timer
    if(!this.isPaused) {
      this.timer.update();
    }
    this.timer.draw();

    //Statistics
    drawStats();

    pop();
  }

  this.setScore = function(value) {
    score = value;
  }

  function drawStats() {
    fill(255);
    textSize(32);
    textFont(fonts.LGVBold);
    textAlign(RIGHT, CENTER);
    text('qula: ' + score, width / 2 - 200, 85);
    textAlign(LEFT, CENTER);
    text('raundi: 1', width / 2 + 200, 85);

    textAlign(RIGHT, CENTER);
    text('umaRlesi qula: 1', width  - drawStart, 85);
  }
}