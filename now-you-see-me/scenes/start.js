var fontsPath = 'assets/fonts/';
var imgsPath = 'assets/imgs/';
var fonts = {};
var icons = {};
var lifes = {};
var cupImgObj = null;
var sizes = {
  cupSizeCoefficient: 0,
  cupsGapCoefficeint: 0,
  headerMarginCoefficient: 0,
  headerButtonUpdateHandlers: {
    closeUpdate: function() {},
    pauseUpdate: function() {},
    muteUpdate: function() {},
    resetUpdate: function() {},
  }
};

function preload() {
  loadFonts();
  loadCup();
  loadIcons();
  loadLifes();
}

function setup() {
  changeSizes();

  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');
  frameRate(60);
  var mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(Game);
}

function windowResized() {
  changeSizes();

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

function changeSizes() {
  if(windowWidth >= 1440) {
    sizes.cupSizeCoefficient = 1;
    sizes.cupsGapCoefficeint = 1;
    sizes.headerMarginCoefficient = 1;
  } else if(windowWidth >= 1000 && windowWidth < 1440) {
    sizes.cupSizeCoefficient = 0.8;
    sizes.cupsGapCoefficeint = 0.7;
    sizes.headerMarginCoefficient = 0.7;
  } else {
    sizes.cupSizeCoefficient = 0.8;
    sizes.cupsGapCoefficeint = 0.7;
    sizes.headerMarginCoefficient = 0.7;
  }
}