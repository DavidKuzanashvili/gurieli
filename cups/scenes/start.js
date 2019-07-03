var fontsPath = 'assets/fonts/';
var imgsPath = 'assets/imgs/';
var fonts = {};
var icons = {};
var lifes = {};
var cupImgObj = null;

function preload() {
  loadFonts();
  loadCup();
  loadIcons();
  loadLifes();
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');
  frameRate(60);
  var mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(Game);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function loadFonts() {
  fonts.LGVBold = loadFont(fontsPath + 'lgv-bebas-neue-bold-bold.otf');
  fonts.LVGRegular = loadFont(fontsPath + 'LVG-BEBAS-NEUE-REGULAR.otf');
}

function loadIcons() {
  icons.close = loadImage(imgsPath + 'icons/close.svg');
  icons.fb = loadImage(imgsPath + 'icons/facebook.svg');
  icons.reload = loadImage(imgsPath + 'icons/reload.svg');
  icons.pause = loadImage(imgsPath + 'icons/pause.svg');
  icons.music = loadImage(imgsPath + 'icons/music.svg');
}

function loadLifes() {
  lifes.active = loadImage(imgsPath + 'heart.png');
  lifes.inactive = loadImage(imgsPath + 'deadheart.png');
}

function loadCup() {
  cupImgObj = {
    img: loadImage(imgsPath + 'cup.png'),
    width: 235,
    height: 300
  }
}