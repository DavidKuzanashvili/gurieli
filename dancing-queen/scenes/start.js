var fontsPath = 'assets/fonts/';
var iconsPath = 'assets/imgs/icons/';
var fonts = {};
var lifeImages = {};
var dancer = null;
var sequences = {};
var icons = {};
var arrow = {};
var whiteDownArrow = {};
var ACTIVE_KEY_CODES = new Set();

function preload() {
  loadFonts();
  loadIcons();
  loadDancer();
  loadSequences();
  loadLife();
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');

  var manager = new SceneManager();
  manager.wire();
  manager.showScene( Game );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Load Assets
function loadFonts() {
  fonts.LGVBold = loadFont(fontsPath + 'lgv-bebas-neue-bold-bold.otf');
  fonts.LVGRegular = loadFont(fontsPath + 'LVG-BEBAS-NEUE-REGULAR.otf');
}

function loadIcons() {
  icons.sound = {
    img: loadImage(iconsPath + 'sound.png'),
    w: 52,
    h: 38
  };
  icons.pause = {
    img: loadImage(iconsPath + 'pause.png'),
    w: 43,
    h: 38
  };
  icons.reset = {
    img: loadImage(iconsPath + 'reset.png'),
    w: 36,
    h: 38
  };
  icons.close = {
    img: loadImage(iconsPath + 'close.png'),
    w: 38,
    h: 38
  };
  arrow = {
    img: loadImage(iconsPath + 'arrow-down.png'),
    w: 38,
    h: 46
  };
  whiteDownArrow = {
    img: loadImage(iconsPath + 'white-down-arrow.png'),
    w: 38,
    h: 46
  };
  icons.resume = {
    img: loadImage(iconsPath + 'resume.png'),
    w: 27,
    h: 38
  };
}

function loadDancer() {
  dancer = loadImage('assets/imgs/dancer.png');
}

function loadLife() {
  lifeImages.active = loadImage('assets/imgs/heart.png');
  lifeImages.inactive = loadImage('assets/imgs/deadheart.png');
}

function loadSequences() {
  sequences.dance = loadImage('assets/imgs/dance.png');
}