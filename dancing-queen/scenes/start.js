var fontsPath = 'assets/fonts/';
var fonts = {};
var lifeImages = {};
var dancer = null;
var ACTIVE_KEY_CODES = new Set();

function preload() {
  loadFonts();
  loadDancer();
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

function loadDancer() {
  dancer = loadImage('assets/imgs/dancer.png');
}

function loadLife() {
  lifeImages.active = loadImage('assets/imgs/heart.png');
  lifeImages.inactive = loadImage('assets/imgs/deadheart.png');
}