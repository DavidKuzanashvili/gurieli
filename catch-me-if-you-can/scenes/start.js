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
    if(!sounds.background.isLoaded()) {
        setTimeout(setup, 50);
        return;
    }

    sounds.background.setVolume(0.2);
    sounds.background.loop();
    frameRate(60);
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');

    leaves = new Leaves(LEVEL[CURRENT_LEVEL].leaves);

    var mgr = new SceneManager();
    mgr.wire();
    mgr.showScene(RoundStart);
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
    // arrow = {
    //   img: loadImage(iconsPath + 'arrow-down.png'),
    //   w: 38,
    //   h: 46
    // };
    // whiteDownArrow = {
    //   img: loadImage(iconsPath + 'white-down-arrow.png'),
    //   w: 38,
    //   h: 46
    // };
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