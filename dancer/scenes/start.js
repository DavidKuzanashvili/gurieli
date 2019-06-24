var fontsPath = 'assets/fonts/';
var fonts = {};
var dancer = null;

function preload() {
  loadFonts();
  loadDancer();
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