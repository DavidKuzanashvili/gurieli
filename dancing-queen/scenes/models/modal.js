function Modal(options) {
  options = options || {};
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
  var lineHeight = 90;
  var overlayColor = hexToRgb(colors.lightTan);
  var resumeText = 'TamaSis gagrZeleba';
  var resumeTextWidth;
  this.statButtons = [
    new Button({
      x: width / 2 - this.width / 2 + 250,
      y: height / 2 - this.height / 2 + marginTop + 2 * lineHeight - 15, 
      backgroundColor: color(colors.lipstick),
      content: "R", 
      width: 50, 
      height: 50, 
      shadowOffset:6,
      fontSize: 16
    }),
    new Button({
      x: width / 2 - this.width / 2 + 250,
      y: height / 2 - this.height / 2 + marginTop + 3 * lineHeight - 15, 
      backgroundColor: color(colors.booger),
      content: "X", 
      width: 50, 
      height: 50, 
      shadowOffset:6,
      fontSize: 16
    }),
    new Button({
      x: width / 2 + 230,
      y: height / 2 - this.height / 2 + marginTop + 3 * lineHeight - 15,
      backgroundColor: color('#3C5A99'),
      content: 'f',
      width: 50,
      height: 50,
      shadowOffset: 6,
      fontSize: 25
    })
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
      fontSize: 30
    }),
    new Button({
      x: width / 2 + this.width / 2 - 100,
      y: height / 2 + 70,
      backgroundColor: color(colors.sand),
      content: 'ara',
      width: 150,
      height: 60,
      shadowOffset: 7,
      fontSize: 30
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
    image(dancer, width / 2 - this.width / 2 + 350, height / 2 - this.height / 2 + marginTop, 150, 200);
    fill(255);
    textSize(this.fontSize);
    textLeading(lineHeight);
    textFont(this.font);
    text(lines, width / 2 - this.width / 2 + marginLeft, height / 2 - this.height / 2 + marginTop);
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