var fontsPath = 'assets/fonts/';
var imgsPath = 'assets/imgs/';
var iconsPath = imgsPath + 'icons/';
var fonts = {};
var icons = {};
var pngIcons = {};
var lifes = {};
var sequences = {};
var sounds = {};
var cupImgObj = null;
var sizes = {
  cupSizeCoefficient: 0,
  cupsGapCoefficeint: 0,
  headerMarginCoefficient: 0,
  iconSizes: 0,
  fontCoefficient: 0
};

function preload() {
  loadFonts();
  loadSounds();
  loadSequnces();
  loadCup();
  loadIcons();
  loadLifes();
}

function setup() {
  if(!sounds.background.isLoaded()) {
    setTimeout(this.setup, 50);
    return;
  }

  sounds.background.setVolume(0.2);
  sounds.background.loop();

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

  pngIcons.yellowSound = {
    img: loadImage(iconsPath + 'yellowsound.png'),
    w: 52,
    h: 38
  };
  pngIcons.yellowPause = {
    img: loadImage(iconsPath + 'yellowpause.png'),
    w: 43,
    h: 38
  };
  pngIcons.yellowReset = {
    img: loadImage(iconsPath + 'yellowreset.png'),
    w: 36,
    h: 38
  };
  pngIcons.yellowClose = {
    img: loadImage(iconsPath + 'yellowclose.png'),
    w: 38,
    h: 38
  };
  pngIcons.yellowSettings = {
    img: loadImage(iconsPath + 'yellowsettings.png'),
    w: 45,
    h: 45
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
    sizes.iconSizes = 1;
    sizes.fontCoefficient = 1;
  } else if(windowWidth >= 1200 && windowWidth < 1440) {
    sizes.cupSizeCoefficient = 0.8;
    sizes.cupsGapCoefficeint = 0.7;
    sizes.headerMarginCoefficient = 0.5;
    sizes.iconSizes = 0.8;
    sizes.fontCoefficient = 0.8;
  } else if(windowWidth >= 700 && windowWidth < 1200) {
    sizes.cupSizeCoefficient = 0.7;
    sizes.cupsGapCoefficeint = 0.1;
    sizes.headerMarginCoefficient = 0.4;
    sizes.iconSizes = 0.75;
    sizes.fontCoefficient = 0.7;
  } else {
    sizes.cupSizeCoefficient = 0.6;
    sizes.cupsGapCoefficeint = 0.1;
    sizes.headerMarginCoefficient = 0.3;
    sizes.iconSizes = 0.6;
    sizes.fontCoefficient = 0.7;
  }
}

function loadSequnces() {
  sequences.start = loadImage('assets/imgs/start.png');
  sequences.found = loadImage('assets/imgs/povna.png');
  sequences.notFound = loadImage('assets/imgs/verpovna.png');
}

function loadSounds() {
  sounds.background = loadSound('assets/sounds/background.mp3');
  sounds.open = loadSound('assets/sounds/Ageba.wav');
  sounds.close = loadSound('assets/sounds/Dadeba.wav');
  sounds.click = loadSound('assets/sounds/Click.wav');
  sounds.giggle = loadSound('assets/sounds/Chacineba.wav');
  sounds.slide = loadSound('assets/sounds/Sriali.wav');
  sounds.popUp = loadSound('assets/sounds/PopUpAppear.wav');
}