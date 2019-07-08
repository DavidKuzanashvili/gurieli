function Modal(options) {
  options = options || {};
  var self = this;
  this.backgroundColor = options.backgroundColor;
  this.shadowOffsetTop = options.shadowOffsetTop || 20;
  this.width = options.width || 640;
  this.height = options.height || 480;
  this.fontSize = options.fontSize || 40;
  this.font = options.font || fonts.LGVBold;
  var shadowColor = darken(color(colors.boogerTwo));
  var marginLeft = 50;
  var marginTop = 100;
  var lines = 'umaRlesi qula: 3224\nqula: 244\nTavidan\ngamorTva'
  var controlButtonsOffsetX = textWidth('gamorTva') * this.fontSize / 12;
  var lineHeight = 90;
  var overlayColor = hexToRgb(colors.lightTan);
  var resumeText = 'TamaSis gagrZeleba';
  var resumeTextWidth;
  this.statResetButton = new ControlButton(icons.reset.img, width / 2, height / 2, icons.reset.w, icons.reset.h);
  this.statResetButton.textType = 'reset';
  this.statResetButton.onUpdate = function() {
    this.x = width / 2 - self.width / 2 + controlButtonsOffsetX + this.w + 20;
    this.y = height / 2 - self.height / 2 + this.w / 2 - this.h / 2 + (marginTop + 2 * lineHeight) - 15;
  }

  this.statCloseButton = new ControlButton(icons.close.img, width / 2, height / 2, icons.close.w, icons.close.h);
  this.statCloseButton.textType = 'close';
  this.statCloseButton.onUpdate = function() {
    this.x = width / 2 - self.width / 2 + controlButtonsOffsetX + this.w + 20;
    this.y = height / 2 - self.height / 2 + this.w / 2 - this.h / 2 + (marginTop + 3 * lineHeight) - 15;
  }

  
  this.statShareButton = new ControlButton(icons.share.img, width / 2, height / 2, icons.share.w, icons.share.h);
  this.statShareButton.textType = 'share';
  this.statShareButton.onUpdate = function() {
    this.x = width / 2 + controlButtonsOffsetX + 50;
    this.y = height / 2 - self.height / 2 + this.w / 2 - this.h / 2 + (marginTop + 3 * lineHeight) - 15;
  }
  this.statButtons = [
    this.statResetButton,
    this.statCloseButton,
    this.statShareButton
  ];

  this.quitButtons = [
    new Button({
      x: width / 2 - this.width / 2 + 100,
      y: height / 2 + 70,
      color: 'black',
      backgroundColor: color(colors.beige),
      content: 'ki',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30,
      onUpdate: function() {
        this.x = width / 2 - self.width / 2 + 100;
        this.y = height / 2 + 70;
      }
    }),
    new Button({
      x: width / 2 + this.width / 2 - 100,
      y: height / 2 + 70,
      backgroundColor: color(colors.sand),
      content: 'ara',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30,
      onUpdate: function() {
        this.x =  width / 2 + self.width / 2 - 100;
        this.y = height / 2 + 70;
      }
    })
  ];

  this.resumeBtn = new ControlButton(icons.resume.img, width / 2 + resumeTextWidth / 2 + 20, height / 2, icons.resume.w, icons.resume.h);
  this.resumeBtn.typeText = 'resume';
  this.resumeBtn.onUpdate = function() {
    this.x = width / 2 + resumeTextWidth / 2 + 20;
    this.y = height / 2;
  }
  
  this.drawStats = function() {
    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.5);
    cursor('default');
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 60);
    fill(colors.boogerTwo);
    rect(width / 2, height / 2, this.width, this.height, 60);
    image(dancer, width / 2 - this.width / 2 + 370, height / 2 - this.height / 2 + marginTop, 150, 200);
    fill(255);
    textSize(this.fontSize);
    textLeading(lineHeight);
    textFont(this.font);
    text(lines, width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop);
    fill(colors.frenchBlue);
    text('gaaziare', width / 2 - this.width / 2 + 370, height / 2 - this.height / 2 + marginTop + 3 * lineHeight);

    //Buttons
    this.statButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  this.drawQuit = function() {
    push();

    //Modal Box
    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.5);
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 40);
    fill(colors.boogerTwo);
    rect(width / 2, height / 2, this.width, this.height, 40);

    //Modal Text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    textLeading(35);
    textFont(this.font);
    text('namdvilad ginda\nTamaSis gamorTva?', width / 2, height / 2 - this.height / 2 + 70);

    //Buttons
    this.quitButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  this.drawPause = function() {
    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.5);
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 40);
    fill(colors.boogerTwo);
    rect(width / 2, height / 2, this.width, this.height, 40);

    //Modal Text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    textLeading(35);
    textFont(this.font);
    text(resumeText, width / 2 - 20, height / 2);
    resumeTextWidth = textWidth(resumeText)

    this.resumeBtn.update();
    this.resumeBtn.draw();

    pop();
  }
}