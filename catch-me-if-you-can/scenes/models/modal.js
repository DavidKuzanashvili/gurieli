function Modal(options) {
  options = options || {};
  var oModal = this;
  var self = this;
  this.backgroundColor = options.backgroundColor;
  this.shadowOffsetTop = options.shadowOffsetTop || 20;
  this.width = options.width || 640;
  this.height = options.height || 480;
  this.fontSize = options.fontSize || 40;
  this.font = options.font || fonts.LGVBold;
  this.score = 0;
  this.xushturi = null;
  var shadowColor = darken(color(colors.boogerTwo));
  var marginLeft = 50;
  var marginTop = 100;
  var resumeText = 'TamaSis gagrZeleba';
  var resumeTextWidth;
  var overlayColor = hexToRgb(colors.darkForestGreen);
  var lines = 'umaRlesi qula: 3224\nqula: ' + this.score +'\nTavidan\ngamorTva';
  var controlButtonsOffsetX = textWidth('gamorTva') * this.fontSize / 12;
  var lineHeight = 90;
  this.statResetButton = new ControlButton(pngIcons.reset.img, width / 2, height / 2, pngIcons.reset.w, pngIcons.reset.h, 'reset');
  this.statResetButton.typeText = 'reset';
  this.statResetButton.onUpdate = function() {
    this.x = width / 2 - self.width / 2 + controlButtonsOffsetX + this.w + 20;
    this.y = height / 2 - self.height / 2 + this.w / 2 - this.h / 2 + (marginTop + 2 * lineHeight) - 15;
  }

  this.statCloseButton = new ControlButton(pngIcons.close.img, width / 2, height / 2, pngIcons.close.w, pngIcons.close.h, 'close');
  this.statCloseButton.typeText = 'close';
  this.statCloseButton.onUpdate = function() {
    this.x = width / 2 - self.width / 2 + controlButtonsOffsetX + this.w + 20;
    this.y = height / 2 - self.height / 2 + this.w / 2 - this.h / 2 + (marginTop + 3 * lineHeight) - 15;
  }

  
  this.statShareButton = new ControlButton(pngIcons.share.img, width / 2, height / 2, pngIcons.share.w, pngIcons.share.h, 'share');
  this.statShareButton.typeText = 'share';
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
      color: 'black',
      backgroundColor: color(colors.beige),
      content: 'ki',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30,
      onUpdate: function() {
        this.x = width / 2 - oModal.width / 2 + 100;
        this.y = height / 2 + 70;
      }
    }),
    new Button({
      backgroundColor: color(colors.sand),
      content: 'ara',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30,
      onUpdate: function() {
        this.x = width / 2 + oModal.width / 2 - 100;
        this.y = height / 2 + 70;
      }
    })
  ];

  this.resumeBtn = new ControlButton(pngIcons.resume.img, width / 2 + resumeTextWidth / 2 + 20, height / 2, pngIcons.resume.w, pngIcons.resume.h, 'resume');
  this.resumeBtn.typeText = 'resume';
  this.resumeBtn.onUpdate = function() {
    this.x = width / 2 + resumeTextWidth / 2 + 20;
    this.y = height / 2;
  }
  
  this.drawStats = function() {
    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.6);
    cursor('default');
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 60);
    fill(colors.boogerTwo);
    rect(width / 2, height / 2, this.width, this.height, 60);
    if(this.xushturi) {
      this.xushturi.translateX = width / 2 - this.width / 2 + 350;
      this.xushturi.translateY = height / 2 - this.height / 2 + marginTop;
      this.xushturi.update();
      this.xushturi.draw();
    }
    // image(xushturi, width / 2 - this.width / 2 + 350, height / 2 - this.height / 2 + marginTop);
    fill(255);
    textSize(this.fontSize);

    textLeading(lineHeight);
    textFont(this.font);
    text('umaRlesi qula: 3224\nqula: ' + this.score +'\nTavidan\ngamorTva', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop);
    text('gaaziare', width / 2 - this.width / 2 + 350, height / 2 - this.height / 2 + marginTop + 3 * lineHeight);

    //Buttons
    this.statButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  this.drawQuit = function() {
    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.6);
    //Modal Box
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

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255 * 0.6);
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