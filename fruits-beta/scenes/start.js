var imgPath = 'assets/imgs/';
var fontsPath = 'assets/fonts/';
var fruitImages = {};
var bottleImages = {};
var fonts = {};
var leaveImages = {};
var sizes = {
  translateLeaves: 0,
  bottleSizesCoefficient: 0,
  fruitsCoefficient: 0,
  fontCoefficient: 0,
  scoreOffsetCoefficientRight: 0,
  scoreOffsetCoefficientBottom: 0
}

function preload() {
  loadFruits();
  loadBottles();
  loadLeaves();
  loadFonts();
}

function setup() {
  changeSizes(); 
  currentWindowWidth = windowWidth;
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

function loadLeaves() {
  leaveImages.mint = [loadImage(imgPath + 'leaves/mint/mint-leaves.png')];
  leaveImages.raspberry = [loadImage(imgPath + 'leaves/raspberry/raspberry-leaves.png')];
  leaveImages.cherry = [loadImage(imgPath + 'leaves/cherry/cherry-leaves.png')];
  leaveImages.peach = [loadImage(imgPath + 'leaves/peach/peach-leaves.png')];
  leaveImages.feijoa = [loadImage(imgPath + 'leaves/feijoa/feijoa-leaves.png')];
}

function loadFonts() {
  fonts.LGVBold = loadFont(fontsPath + 'lgv-bebas-neue-bold-bold.otf');
  fonts.LVGRegular = loadFont(fontsPath + 'LVG-BEBAS-NEUE-REGULAR.otf');
}

function changeSizes() {
  if(windowWidth > 1440) {
    sizes.translateLeaves = -90;
    sizes.bottleSizesCoefficient = 1;
    sizes.fruitsCoefficient = 1;
    sizes.fontCoefficient = 1;
    sizes.scoreOffsetCoefficientRight = 1;
    sizes.scoreOffsetCoefficientBottom = 1;
  } else if(windowWidth > 1000 && windowWidth < 1440) {
    sizes.translateLeaves = 0;
  } else if(windowWidth > 700 && windowWidth < 1000) {
    sizes.bottleSizesCoefficient = 0.8;
    sizes.fruitsCoefficient = 0.8;
    sizes.fontCoefficient = 0.6;
    sizes.scoreOffsetCoefficientRight = 0.5;
    sizes.scoreOffsetCoefficientBottom = 0.6;
  } else if(windowWidth < 700) {
    sizes.bottleSizesCoefficient = 0.6
    sizes.fruitsCoefficient = 0.5;
    sizes.fontCoefficient = 0.5;
    sizes.scoreOffsetCoefficientRight = 0.2;
    sizes.scoreOffsetCoefficientBottom = 0.5;
  }
}
