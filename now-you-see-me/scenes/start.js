var fontsPath = 'assets/fonts/';
var imgsPath = 'assets/imgs/';
var iconsPath = imgsPath + 'icons/';
var fonts = {};
var icons = {};
var pngIcons = {};
var lifes = {};
var sequences = {};
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
  loadSequnces();
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
  pngIcons.sound = {
    img: loadImage(iconsPath + 'sound.png'),
    w: 52,
    h: 38
  };
  pngIcons.pause = {
    img: loadImage(iconsPath + 'pause.png'),
    w: 43,
    h: 38
  };
  pngIcons.reset = {
    img: loadImage(iconsPath + 'reset.png'),
    w: 36,
    h: 38
  };
  pngIcons.close = {
    img: loadImage(iconsPath + 'close.png'),
    w: 38,
    h: 38
  };
  pngIcons.resume = {
    img: loadImage(iconsPath + 'resume.png'),
    w: 27,
    h: 38
  };
  pngIcons.share = {
    img: loadImage(iconsPath + 'share.png'),
    w: 45,
    h: 38
  };
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

function loadSequnces() {
  sequences.start = loadImage('assets/imgs/start.png');
  sequences.found = loadImage('assets/imgs/povna.png');
  sequences.notFound = loadImage('assets/imgs/verpovna.png');
}