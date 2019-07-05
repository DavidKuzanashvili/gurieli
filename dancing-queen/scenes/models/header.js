function Header() {
  var btnSize = 50;
  var drawStart = 65;
  var marginBetweenBtns = 35;
  var score = 0;
  this.isPaused = false;
  this.height = 170;
  this.soundBtn = new Button({
    x: drawStart,
    y: this.height / 2,
    backgroundColor: color(colors.seafoamBlueTwo),
    content: "m",
    width: btnSize,
    height: btnSize,
    shadowOffset: 6,
    fontSize: 16
  });
  this.pauseBtn = new Button({
    x: drawStart + btnSize + marginBetweenBtns,
    y: this.height / 2,
    backgroundColor: color('white'),
    color: color(colors.boogerTwo),
    content: "p",
    width: btnSize,
    height: btnSize,
    shadowOffset: 6,
    fontSize: 16
  });
  this.closeBtn = new Button({
    x: drawStart + 2*(btnSize + marginBetweenBtns),
    y: this.height / 2,
    backgroundColor: color(colors.sand),
    content: "X",
    width: btnSize,
    height: btnSize,
    shadowOffset: 6,
    fontSize: 16
  });
  this.btns = [ this.soundBtn, this.pauseBtn, this.closeBtn ];
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
    text('umaRlesi qula: 1', width  - 100, 85);
  }
}