window.requestQueryParams = window.location.href
    .split('?')
    .slice(1)
    .join('?')
    .split('&')
    .reduce(function(o, c) {
        c = c.split('=');
        c.length = 2;

        o[c[0] || 'undefined'] = c[1] || null;

        return o;
    }, {});

var imgPath = 'assets/imgs/';
var fontsPath = 'assets/fonts/';
var iconsPath = 'assets/imgs/icons/';
var bgImage;
var leaves = null;
var bottleImages = {};
var fruitImages = {};
var introFruits = {};
var lifeImages = {};
var leavesImages = {};
var fonts = {};
var icons = {};
var pngIcons = {};
var sprites = {};
var sounds = {};
var sequenceImage = null;
var xushturi = null;
var sequences = {};
var username = window.requestQueryParams.username || null;

var score = 0;

var CURRENT_LEVEL = 0;

var sizes = {
    roundStartCoefficient: 0,
    bottleSizesCoefficient: 0,
    fruitsCoefficient: 0,
    fontCoefficient: 0,
    scoreOffsetCoefficientRight: 0,
    scoreOffsetCoefficientBottom: 0,
    tooltipCoefficient: 0,
    timerCoefficient: 0,
    timerTextCoefficient: 0,
    iconsCoefficients: 0,
    headerMarginCoefficient: 0,
    showHigestScore: true,
    showSettings: false,
    showHeart: false
};

function preload() {
    soundFormats('mp3', 'ogg');
    loadSoundEffects();
    loadLeaves();
    loadIntroFruits();
    loadBottles();
    loadFruits();
    loadLife();
    loadFonts();
    loadIcons();
    loadSprite();
    sequenceImage = loadImage(imgPath + 'cat.png');
    xushturi = loadImage(imgPath + 'xushturi.png');
}

function setup() {
    changeSizes();
    if(sizes.showSettings) {
      sizes.updateHeaderButtons = true;
    }

    if(!sounds.background.isLoaded()) {
        setTimeout(setup, 50);
        return;
    }

    sounds.background.setVolume(0.2);
    sounds.background.loop();
    frameRate(60);
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');

    leaves = new Leaves(LEVEL[CURRENT_LEVEL].leaves, LEVEL[CURRENT_LEVEL].leavesHeight);

    var mgr = new SceneManager();
    mgr.wire();
    mgr.showScene(Intro);
}

function windowResized() {
    changeSizes();
    if(sizes.showSettings) {
      sizes.updateHeaderButtons = true;
    }
    
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
    fruitImages.raspberry = [
        { img: loadImage(imgPath + 'raspberry/raspberryright.png'), w: 92, h:88 },
        { img: loadImage(imgPath + 'raspberry/raspberryleft.png'), w: 92, h: 86 }
      ];
      fruitImages.vanilla = [
        { img: loadImage(imgPath + 'vanilla/vanillaleft.png'), w: 87, h: 78 }, 
        { img: loadImage(imgPath + 'vanilla/vanillaright.png'), w: 88, h: 83},
      ];
      fruitImages.leaves = [
        { img: loadImage(imgPath + 'mint/mintleft.png'), w: 68, h: 120 }, 
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

function loadLeaves() {
    leavesImages.mint = [loadImage(imgPath + 'leaves/mint/mint-leaves.png'), loadImage(imgPath + 'leaves/mint/motion-1.png'), loadImage(imgPath + 'leaves/mint/motion-2.png')];
    leavesImages.raspberry = [loadImage(imgPath + 'leaves/raspberry/raspberry-leaves.png')];
    leavesImages.cherry = [loadImage(imgPath + 'leaves/cherry/cherry-leaves.png')];
    leavesImages.peach = [loadImage(imgPath + 'leaves/peach/peach-leaves.png')];
    leavesImages.feijoa = [loadImage(imgPath + 'leaves/feijoa/feijoa-leaves.png')];
}

function loadLife() {
    lifeImages.active = loadImage(imgPath + 'heart.png');
    lifeImages.inactive = loadImage(imgPath + 'deadheart.png');
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
    pngIcons.settings = {
      img: loadImage(iconsPath + 'settings.png'),
      w: 45,
      h: 45
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

function loadSprite() {
    sprites.leafMotion = loadImage(imgPath + 'sprites/motions.png');
    sequences.poetXushturi = loadImage(imgPath + 'sprites/poet_xushturi_sequence.png');
}

function loadSoundEffects() {
    sounds.background = loadSound('sound-effects/background/background.mp3');
    sounds.bottleDrop = loadSound('sound-effects/BotlisChamosvla.wav');
    sounds.leavesReveal = loadSound('sound-effects/FotlebisShemosvla.wav');
    sounds.heartLose = loadSound('sound-effects/SicocxlisDakargva.wav');
    sounds.popUp = loadSound('sound-effects/PopUpAppear.wav');
    sounds.catch = loadSound('sound-effects/Dachera.wav');
    sounds.countDown = loadSound('sound-effects/CountDown.wav');
    sounds.timeLeft = loadSound('sound-effects/TimeLeft.wav');
}

function changeSizes() {
    if(windowWidth >= 1600) {
      sizes.roundStartCoefficient = 1;
      sizes.bottleSizesCoefficient = 1;
      sizes.fruitsCoefficient = 1;
      sizes.fontCoefficient = 1;
      sizes.scoreOffsetCoefficientRight = 0.8;
      sizes.scoreOffsetCoefficientBottom = 1;
      sizes.tooltipCoefficient = 1;
      sizes.timerCoefficient = 1;
      sizes.timerTextCoefficient = 1;
      sizes.iconsCoefficients = 1;
      sizes.headerMarginCoefficient = 1;
      sizes.showHigestScore = true;
      sizes.showSettings = false;
      sizes.showHeart = false;
    } else if(windowWidth >= 1440 && windowWidth < 1600) {
      sizes.roundStartCoefficient = 0.85;
      sizes.bottleSizesCoefficient = 0.85;
      sizes.fruitsCoefficient = 0.8;
      sizes.fontCoefficient = 0.9;
      sizes.scoreOffsetCoefficientRight = 0.7;
      sizes.scoreOffsetCoefficientBottom = 1;
      sizes.tooltipCoefficient = 0.95;
      sizes.timerCoefficient = 0.9;
      sizes.timerTextCoefficient = 0.9;
      sizes.iconsCoefficients = 0.8;
      sizes.headerMarginCoefficient = 0.8;
      sizes.showHigestScore = true;
      sizes.showSettings = false;
      sizes.showHeart = false;
    } else if(windowWidth >= 1200 && windowWidth < 1440) {
      sizes.roundStartCoefficient = 0.8;
      sizes.bottleSizesCoefficient = 0.85;
      sizes.fruitsCoefficient = 0.8;
      sizes.fontCoefficient = 0.9;
      sizes.scoreOffsetCoefficientRight = 0.7;
      sizes.scoreOffsetCoefficientBottom = 1;
      sizes.tooltipCoefficient = 0.8;
      sizes.timerCoefficient = 0.8;
      sizes.timerTextCoefficient = 0.9;
      sizes.iconsCoefficients = 0.8;
      sizes.headerMarginCoefficient = 0.8;
      sizes.showHigestScore = true;
      sizes.showSettings = false;
      sizes.showHeart = false;
    } else if(windowWidth >= 1000 && windowWidth < 1200) {
      sizes.roundStartCoefficient = 0.8;
      sizes.bottleSizesCoefficient = 0.85;
      sizes.fruitsCoefficient = 0.8;
      sizes.fontCoefficient = 0.9;
      sizes.scoreOffsetCoefficientRight = 0.7;
      sizes.scoreOffsetCoefficientBottom = 0.9;
      sizes.tooltipCoefficient = 0.8;
      sizes.timerCoefficient = 0.8;
      sizes.timerTextCoefficient = 0.9;
      sizes.iconsCoefficients = 0.8;
      sizes.headerMarginCoefficient = 0.8;
      sizes.showHigestScore = false;
      sizes.showSettings = false;
      sizes.showHeart = true;
    } else if(windowWidth >= 700 && windowWidth < 1000) {
      sizes.roundStartCoefficient = 0.8;
      sizes.bottleSizesCoefficient = 0.8;
      sizes.fruitsCoefficient = 0.8;
      sizes.fontCoefficient = 0.6;
      sizes.scoreOffsetCoefficientRight = 0.5;
      sizes.scoreOffsetCoefficientBottom = 0.6;
      sizes.tooltipCoefficient = 0.7;
      sizes.timerCoefficient = 0.8;
      sizes.timerTextCoefficient = 0.9;
      sizes.iconsCoefficients = 0.8;
      sizes.headerMarginCoefficient = 0.8;
      sizes.showHigestScore = false;
      sizes.showSettings = true;
      sizes.showHeart = true;
    } else if(windowWidth < 700) {
      sizes.roundStartCoefficient = 0.7;
      sizes.bottleSizesCoefficient = 0.6
      sizes.fruitsCoefficient = 0.5;
      sizes.fontCoefficient = 0.5;
      sizes.scoreOffsetCoefficientRight = 0.2;
      sizes.scoreOffsetCoefficientBottom = 0.5;
      sizes.tooltipCoefficient = 0.7;
      sizes.timerCoefficient = 0.7;
      sizes.timerTextCoefficient = 0.8;
      sizes.iconsCoefficients = 0.7;
      sizes.headerMarginCoefficient = 0.7;
      sizes.showHigestScore = false;
      sizes.showSettings = true;
      sizes.showHeart = true;
    }
  }