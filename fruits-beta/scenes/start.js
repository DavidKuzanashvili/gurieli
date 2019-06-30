var imgPath = 'assets/imgs/';
var fontsPath = 'assets/fonts/';
var bottleImages = {};
var fruitImages = {};
var fonts = {};
var icons = {};

function preload() {
  loadBottles();
  loadFruits();
  loadFonts();
  loadIcons();
}

function setup() {
  frameRate(60);
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');

  var mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(Game);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function loadFruits() {
  fruitImages.raspberry = [loadImage(imgPath + 'raspberry/raspberryright.png'), loadImage(imgPath + 'raspberry/raspberryleft.png')];
  fruitImages.vanilla = [loadImage(imgPath + 'vanilla/vanillaleft.png'), loadImage(imgPath + 'vanilla/vanillaright.png')];
  fruitImages.leaves = [loadImage(imgPath + 'mint/mintleft.png'), loadImage(imgPath + 'mint/mintright.png')];
  fruitImages.cherry = [loadImage(imgPath + 'cherry/cherryright.png')];
  fruitImages.feijoa = [loadImage(imgPath + 'feijoa/feijoaleft.png'), loadImage(imgPath + 'feijoa/feijoaright.png')];
  fruitImages.peach = [loadImage(imgPath + 'peach/peachleft.png'), loadImage(imgPath + 'peach/peachright.png')];
}

function loadBottles() {
  bottleImages.cherryBottle = loadImage(imgPath + 'bottles/cherry.png');
  bottleImages.mintBottle = loadImage(imgPath + 'bottles/feijoa.png');
  bottleImages.peachBottle = loadImage(imgPath + 'bottles/peach.png');
  bottleImages.raspberryBottle = loadImage(imgPath + 'bottles/raspberry.png');
  bottleImages.mintBottle = loadImage(imgPath + 'bottles/mint.png');
  bottleImages.feijoaBottle = loadImage(imgPath + 'bottles/feijoa.png');
}

function loadFonts() {
  fonts.LGVBold = loadFont(fontsPath + 'lgv-bebas-neue-bold-bold.otf');
  fonts.LVGRegular = loadFont(fontsPath + 'LVG-BEBAS-NEUE-REGULAR.otf');
}

function loadIcons() {
  icons.close = loadImage(imgPath + 'icons/close.svg');
  icons.fb = loadImage(imgPath + 'icons/facebook.svg');
  icons.reload = loadImage(imgPath + 'icons/reload.svg');
  icons.pause = loadImage(imgPath + 'icons/pause.svg');
  icons.music = loadImage(imgPath + 'icons/music.svg');
}