function Modal(options) {
  options = options || {};
  var oModal = this;
  this.backgroundColor = options.backgroundColor || colors.dullYellow;
  this.shadowOffsetTop = options.shadowOffsetTop || 20;
  this.width = options.width || 419;
  this.height = options.height || 529;
  this.fontSize = options.fontSize || 40;
  this.font = options.font || fonts.LGVBold;
  this.score = 0;
  this.resetBtn = null;
  this.closeBtn = null;
  this.shareBtn = null;
  var shadowColor = darken(color(this.backgroundColor));
  var marginLeft = 50;
  var marginTop = 80;
  var lineHeight = 90;
  var overlayColor = hexToRgb(colors.seafoamBlueTwo);
  var resumeText = 'TamaSis gagrZeleba';
  var resumeTextWidth;
  var statButtonOffsetX = 40;
  var overlayColor = hexToRgb(colors.seafoamBlueTwo);

  this.resetBtn = new ControlButton(pngIcons.reset.img, width / 2 + statButtonOffsetX, height / 2 - this.height / 2 + marginTop + 2 * lineHeight, pngIcons.reset.w, pngIcons.reset.h, 'reset');
  this.resetBtn.onUpdate = function() {
    this.x = width / 2 + statButtonOffsetX;
    this.y = height / 2 - oModal.height / 2 + marginTop + 2 * lineHeight;
    this.w = pngIcons.reset.w * sizes.iconSizes;
    this.h = pngIcons.reset.h * sizes.iconSizes;
  }

  this.closeBtn = new ControlButton(pngIcons.close.img, width / 2 + statButtonOffsetX, height / 2 - this.height / 2 + marginTop + 3 * lineHeight, pngIcons.close.w, pngIcons.close.h, 'close');
  this.closeBtn.onUpdate = function() {
    this.x = width / 2 + statButtonOffsetX;
    this.y = height / 2 - oModal.height / 2 + marginTop + 3 * lineHeight;
    this.w = pngIcons.close.w * sizes.iconSizes;
    this.h = pngIcons.close.h * sizes.iconSizes;
  }

  this.shareBtn = new ControlButton(pngIcons.share.img, width / 2 + statButtonOffsetX, height / 2 - oModal.height / 2 + marginTop + 4 * lineHeight, pngIcons.share.w, pngIcons.share.h, 'share');
  this.shareBtn.onUpdate = function() {
    this.x = width / 2 + statButtonOffsetX;
    this.y = height / 2 - oModal.height / 2 + marginTop + 4 * lineHeight;
    this.w = pngIcons.share.w * sizes.iconSizes;
    this.h = pngIcons.share.h * sizes.iconSizes;

  }

  this.statButtons = [
    this.resetBtn,
    this.closeBtn,
    this.shareBtn
  ];

  this.quitButtons = [
    new Button({
      color: 'black',
      backgroundColor: color(colors.beige),
      content: 'ki',
      width: 130,
      height: 70,
      shadowOffset: 15,
      fontSize: 30,
      speed: 2,
      onUpdate: function() {
        this.x = width / 2 - oModal.width / 2 + 110;
        this.y = height / 2 + 60;
      }
    }),
    new Button({
      backgroundColor: color(colors.seafoamBlueTwo),
      content: 'ara',
      width: 130,
      height: 70,
      shadowOffset: 15,
      fontSize: 30,
      speed: 2,
      onUpdate: function() {
        this.x = width / 2 + oModal.width / 2 - 110;
        this.y = height / 2 + 60;
      }
    })
  ];

  this.resumeBtn = new ControlButton(pngIcons.resume.img, width / 2 + resumeTextWidth / 2 + 20, height / 2, pngIcons.resume.w, pngIcons.resume.h, 'resume');
  this.resumeBtn.onUpdate = function() {
    this.x = width / 2 + resumeTextWidth / 2 + 20;
    this.y = height / 2;
    this.w = pngIcons.resume.w * sizes.iconSizes;
    this.h = pngIcons.resume.h * sizes.iconSizes;
  }
  
  this.drawStats = function() {
    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255*0.5);
    cursor('default');
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 60);
    fill(this.backgroundColor);
    rect(width / 2, height / 2, this.width, this.height, 60);
    fill(255);
    textSize(this.fontSize);

    textFont(this.font);
    textAlign(LEFT, CENTER);
    fill(colors.sickGreen);
    text('umaRlesi qula: 57', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop);
    fill(255);
    text('qula: ' + this.score, width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop + lineHeight);
    fill(colors.sickGreen);
    text('Tavidan ', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop + 2 * lineHeight);
    text('gamorTva ', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop + 3 * lineHeight);
    fill(colors.frenchBlue);
    text('gaaziare ', width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop + 4 * lineHeight);

    this.statButtons.forEach(function(btn) {
      btn.update();
      btn.draw();
    });

    pop();
  }

  this.drawQuit = function() {
    push();

    background(overlayColor.r, overlayColor.g, overlayColor.b, 255*0.5);

    //Modal Box
    fill(shadowColor);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2 + this.shadowOffsetTop, this.width, this.height, 40);
    fill(this.backgroundColor);
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
    fill(this.backgroundColor);
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