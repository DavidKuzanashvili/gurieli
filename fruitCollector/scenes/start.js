var imgPath = 'assets/imgs/';
var fontsPath = 'assets/fonts/';
var bgImage;
var leaves = null;
var bottleImages = {};
var fruitImages = {};
var introFruits = {};
var lifeImages = {};
var leavesImages = {};
var fonts = {};
var sequenceImage = null;
var xushturi = null;
var CURRENT_LEVEL = 0;

function preload() {
    loadLeaves();
    loadIntroFruits();
    loadBottles();
    loadFruits();
    loadLife();
    loadFonts();
    sequenceImage = loadImage(imgPath + 'cat.png');
    xushturi = loadImage(imgPath + 'xushturi.png');
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');

    leaves = new Leaves(LEVEL[CURRENT_LEVEL].leaves);

    var mgr = new SceneManager();
    mgr.wire();
    mgr.showScene(Intro);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function loadIntroFruits() {
    var introFruitsPath = imgPath + 'intro-fruits/';
    introFruits.raspberry = loadImage(introFruitsPath + 'berry-vanilla.png');
    introFruits.cherry = loadImage(introFruitsPath + 'cherry.png');
    introFruits.feijoa = loadImage(introFruitsPath + 'feijoa.png');
    introFruits.mint = loadImage(introFruitsPath + 'mint.png');
    introFruits.peach = loadImage(introFruitsPath + 'peach.png');
}

function loadBottles() {
    bottleImages.cherryBottle = loadImage(imgPath + 'bottles/cherry.png');
    bottleImages.mintBottle = loadImage(imgPath + 'bottles/feijoa.png');
    bottleImages.peachBottle = loadImage(imgPath + 'bottles/peach.png');
    bottleImages.raspberryBottle = loadImage(imgPath + 'bottles/raspberry.png');
    bottleImages.mintBottle = loadImage(imgPath + 'bottles/mint.png');
    bottleImages.feijoaBottle = loadImage(imgPath + 'bottles/feijoa.png');
}

function loadFruits() {
    fruitImages.raspberry = [loadImage(imgPath + 'raspberry/raspberryright.png'), loadImage(imgPath + 'raspberry/raspberryleft.png')];
    fruitImages.vanilla = [loadImage(imgPath + 'vanilla/vanillaleft.png'), loadImage(imgPath + 'vanilla/vanillaright.png')];
    fruitImages.leaves = [loadImage(imgPath + 'mint/mintleft.png'), loadImage(imgPath + 'mint/mintright.png')];
    fruitImages.cherry = [loadImage(imgPath + 'cherry/cherryright.png')];
    fruitImages.feijoa = [loadImage(imgPath + 'feijoa/feijoaleft.png'), loadImage(imgPath + 'feijoa/feijoaright.png')];
    fruitImages.peach = [loadImage(imgPath + 'peach/peachleft.png'), loadImage(imgPath + 'peach/peachright.png')];
}

function loadLeaves() {
    leavesImages.mint = [loadImage(imgPath + 'leaves/mint/mint-leaves.png'), loadImage(imgPath + 'leaves/mint/motion-1.png'), loadImage(imgPath + 'leaves/mint/motion-2.png')];
    leavesImages.raspberry = [loadImage(imgPath + 'leaves/raspberry/raspberry-leaves.png')];
    leavesImages.cherry = [loadImage(imgPath + 'leaves/cherry/cherry-leaves.png')];
    leavesImages.peach = [loadImage(imgPath + 'leaves/peach/peach-leaves.png')];
    leavesImages.feijoa = [loadImage(imgPath + 'leaves/feijoa/peach-leaves.png')];
}

function loadLife() {
    lifeImages.active = loadImage(imgPath + 'heart.png')
    lifeImages.inactive = loadImage(imgPath + 'deadheart.png')
}

function loadFonts() {
    fonts.LGVBold = loadFont(fontsPath + 'lgv-bebas-neue-bold-bold.otf');
    fonts.LVGRegular = loadFont(fontsPath + 'LVG-BEBAS-NEUE-REGULAR.otf');
}