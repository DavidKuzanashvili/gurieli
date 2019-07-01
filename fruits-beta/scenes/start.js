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
  fruitImages.raspberry = [
    { img: loadImage(imgPath + 'raspberry/raspberryright.png'), w: 92, h:88 },
    { img: loadImage(imgPath + 'raspberry/raspberryleft.png'), w: 92, h: 86 }
  ];
  fruitImages.vanilla = [
    { img: loadImage(imgPath + 'vanilla/vanillaleft.png'), w: 87, h: 78 }, 
    { img: loadImage(imgPath + 'vanilla/vanillaright.png'), w: 88, h: 83},
  ];
  fruitImages.leaves = [
    { img: loadImage(imgPath + 'mint/mintleft.png'), w: 68, h: 120}, 
    { img: loadImage(imgPath + 'mint/mintright.png'), w: 68, h: 113 }
  ];
  fruitImages.cherry = [
    { img: loadImage(imgPath + 'cherry/cherryright.png'), w: 43, h: 110 }
  ];
  fruitImages.feijoa = [
    { img: loadImage(imgPath + 'feijoa/feijoaleft.png'), w: 80, h: 113 }, 
    { img: loadImage(imgPath + 'feijoa/feijoaright.png'), w: 77, h: 112 },
    { img: loadImage(imgPath + 'feijoa/feijoa-slice-left.png'), w: 80, h: 83 },
    { img: loadImage(imgPath + 'feijoa/feijoa-slice-right.png'), w: 85, h: 83 }
  ];
  fruitImages.peach = [
    { img: loadImage(imgPath + 'peach/peachleft.png'), w: 83, h: 84}, 
    { img: loadImage(imgPath + 'peach/peachright.png'), w: 82, h: 90}, 
    { img: loadImage(imgPath + 'peach/peach-slice-left.png'), w: 75, h: 79}, 
    { img: loadImage(imgPath + 'peach/peach-slice-right.png'), w: 65, h: 79 }
  ];
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
  if(windowWidth >= 1600) {
    sizes.translateLeaves = -90;
    sizes.bottleSizesCoefficient = 1;
    sizes.fruitsCoefficient = 1;
    sizes.fontCoefficient = 1;
    sizes.scoreOffsetCoefficientRight = 0.8;
    sizes.scoreOffsetCoefficientBottom = 1;
  } else if(windowWidth >= 1440 && windowWidth < 1600) {
    sizes.translateLeaves = -90;
    sizes.bottleSizesCoefficient = 0.85;
    sizes.fruitsCoefficient = 0.8;
    sizes.fontCoefficient = 0.9;
    sizes.scoreOffsetCoefficientRight = 0.7;
    sizes.scoreOffsetCoefficientBottom = 1;
  } else if(windowWidth >= 1000 && windowWidth < 1440) {
    sizes.translateLeaves = 0;
  } else if(windowWidth >= 700 && windowWidth < 1000) {
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

try{
  var orientKey = 'orientation';
  if ('mozOrientation' in screen) {
    orientKey = 'mozOrientation';
  } else if ('msOrientation' in screen) {
    orientKey = 'msOrientation';
  }

  if (screen[orientKey]) {

    var orientationLock = function(){
      if (screen[orientKey].lock) {
        promise = screen[orientKey].lock('portrait-primary');
      } else {
        var o = screen[orientKey];
        o.type = 'portrait-primary';
        promise = screen.orientationLock(o);
      }

      promise.then(function(){}).catch(function(){
        console.log("Screen orientation is not able to lock");
      });
    }

    var onOrientationChange = function(){
      orientationLock();
    };
  
    if ('onchange' in screen[orientKey]) {
      screen[orientKey].addEventListener('change', onOrientationChange);
    } else if ('onorientationchange' in screen) {
      screen.addEventListener('orientationchange', onOrientationChange);
    }

    orientationLock();
  }

} catch(err) {
  console.log("Screen orientation is not able to lock");
}