
//------------------------------------------------------------------------------
// Site
//------------------------------------------------------------------------------

console.log("... Portal ...");

let windowSpacing = 25;
let windowCount = 0;

function addWindow(w, h, title, art, hasGraphics) {
    windowCount++;
    return redSandLauncher.addWindow(windowCount * windowSpacing, windowCount * windowSpacing,
        w, h, title, art, hasGraphics);
}

//==== Phaser ===================================================================

const win01 = addWindow(89, 25, "Phaser \\ OS Demo", redSandLauncher.ART["BULMA_turquoise"], true);

//***

// Basic open-source Hello, World! demo from the Phaser site
var config = {
    type: Phaser.AUTO,
    parent: win01.windowlet.DOMContainer.id,
    width: win01.windowlet.width,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'pages/n0003-portal/assets/space3.png');
    this.load.image('logo', 'pages/n0003-portal/assets/phaser3-logo.png');
    this.load.image('red', 'pages/n0003-portal/assets/red.png');
}

function create() {
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}

//==== Canvas spline ===========================================================

const win02Art = {
    // Handle or header
    handleBgColor: redSandDesktop.palette.BULMA_cyan,
    handleColor: redSandDesktop.palette.BULMA_white_ter,
    // Content
    contentBgColor: redSandDesktop.palette.BULMA_white_ter,
    contentColor: redSandDesktop.palette.PICO_dark_gray
}
const win02 = addWindow(80, 20, "Canvas \\ Spline", win02Art, true);
win02.addSizedCanvas();

const points = [50, 50, 150, 550, 250, 100, 350, 500, 450, 150, 550, 450, 650, 200, 750, 400, 800, 250, 850, 350];
const points08 = points.map(coord => coord * 0.8);  // Scale 0.8x to fit the window

const pointsCorr = points08.map(coord => simpleUtils.fixDPI(coord));

win02.ctx.moveTo(pointsCorr[0], pointsCorr[1]);     // optionally move to first point
win02.ctx.curve(pointsCorr);                        // add cardinal spline to path
win02.ctx.stroke();                                 // stroke path

//==== Mermaid diagram =========================================================

const win03Art = {
    // Handle or header
    handleBgColor: redSandDesktop.palette.BULMA_green,
    handleColor: redSandDesktop.palette.BULMA_white_ter,
    // Content
    contentBgColor: redSandDesktop.palette.BULMA_white_ter,
    contentColor: redSandDesktop.palette.PICO_dark_gray
}
const win03 = addWindow(80, 20, "Mermaid \\ Diagram", win03Art, true);
win03.addDiv(win03.windowlet.width - 90, win03.windowlet.height - win03.windowlet.handleHeight - 90);

win03.div.style.padding = "45px";

mermaid.initialize({ startOnLoad: true });

const graphDef01 = `
    graph LR
        A[Hard edge] -->|Link text| B(Round edge)
        B --> C{Decision}
        C -->|One| D[Result one]
        C -->|Two| E[Result two]
`;

const graphDef02 = `
    %%{init: {'theme': 'forest'}}%%
    graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
        C-->E;
        C-->F;
`;

function render(svgCode) {
    win03.div.innerHTML += svgCode;
}

mermaid.render('theGraph01', graphDef01, render);
mermaid.render('theGraph02', graphDef02, render);

//==== Anime ===================================================================

const win04Art = {
    // Handle or header
    handleBgColor: redSandDesktop.palette.PICO_pink,
    handleColor: redSandDesktop.palette.PICO_dark_gray,
    // Content
    contentBgColor: redSandDesktop.palette.BULMA_white_ter,
    contentColor: redSandDesktop.palette.PICO_dark_gray
}
const win04 = addWindow(80, 20, "Anime \\ OS Demo", win04Art, true);
win04.addSizedDiv();

//***

// Basic feature demo from the Anime.js site, by Julian Garnier
win04.div.style.backgroundColor = "#252423";

win04.div.innerHTML = `
<div class="animation-wrapper">
  <div class="feature-animation">
    <div class="easing-visualizer">
      <div class="wrapper bars-wrapper"></div>
      <div class="wrapper dots-wrapper"></div>
    </div>
  </div>
</div>
`;

function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
        if (timeout) clearTimeout(timeout);
        anime.set(el, { scale: 1 });
        var pad = padding || 0;
        var parentEl = el.parentNode;
        var elOffsetWidth = el.offsetWidth - pad;
        var parentOffsetWidth = parentEl.offsetWidth;
        var ratio = parentOffsetWidth / elOffsetWidth;
        timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
    }
    resize();
    window.addEventListener('resize', resize);
}

var easingsAnimation = (function () {

    var easingVisualizerEl = document.querySelector('.easing-visualizer');
    var barsWrapperEl = easingVisualizerEl.querySelector('.bars-wrapper');
    var dotsWrapperEl = easingVisualizerEl.querySelector('.dots-wrapper');
    var barsFragment = document.createDocumentFragment();
    var dotsFragment = document.createDocumentFragment();
    var numberOfBars = 72;
    var duration = 450;
    var animation;

    fitElementToParent(easingVisualizerEl, 0);

    for (var i = 0; i < numberOfBars; i++) {
        var barEl = document.createElement('div');
        var dotEl = document.createElement('div');
        barEl.classList.add('bar');
        dotEl.classList.add('dot');
        dotEl.classList.add('color-red');
        barsFragment.appendChild(barEl);
        dotsFragment.appendChild(dotEl);
    }

    barsWrapperEl.appendChild(barsFragment);
    dotsWrapperEl.appendChild(dotsFragment);

    function play() {

        var easings = [];
        for (let ease in anime.penner) easings.push(ease);
        easings.push('steps(' + anime.random(5, 20) + ')');
        easings.push('steps(' + anime.random(5, 20) + ')');
        easings.push('cubicBezier(0.545, 0.475, 0.145, 1)');
        var ease = easings[anime.random(0, easings.length - 1)];

        animation = anime.timeline({
            duration: duration,
            easing: ease,
            complete: play
        })
            .add({
                targets: '.easing-visualizer .bar',
                scaleY: anime.stagger([1, 30], { easing: ease, from: 'center', direction: 'reverse' }),
                delay: anime.stagger(7, { from: 'center' })
            })
            .add({
                targets: '.easing-visualizer .dot',
                translateY: anime.stagger(['-125px', '125px'], { easing: ease, from: 'last' }),
                delay: anime.stagger(7, { from: 'center' })
            }, 0);

    }

    play();

})();

//==== Raphael =================================================================

const win05Art = {
    // Handle or header
    handleBgColor: redSandDesktop.palette.BULMA_blue,
    handleColor: redSandDesktop.palette.BULMA_white_ter,
    // Content
    contentBgColor: redSandDesktop.palette.BULMA_white_ter,
    contentColor: redSandDesktop.palette.PICO_dark_gray
}
const win05 = addWindow(50, 24, "Raphael \\ OS Demo", win05Art, true);
win05.addSizedDiv();

//***

// Raphael demo by voskaul @ https://codepen.io/voskaul/pen/vJLorM
win05.div.style.paddingTop = "21px";

var R = Raphael(win05.div.id, 450, 580);
// 调用绘制地图方法
paintMap(R);

for (var state in taiwan) {
    taiwan[state]['path'].color = Raphael.getColor(0.9);

    (function (st, state) {

        st[0].onmouseover = function () {
            st.animate({ fill: st.color, stroke: "#eee" }, 100);
            // taiwan[state]['text'].toFront();
            // R.safari();
        };
        st[0].onmouseout = function () {
            st.animate({ fill: "#c8c8c8", stroke: "#eee" }, 100);
            // taiwan[state]['text'].toFront();
            // R.safari();
        };

    })(taiwan[state]['path'], state);
}

//==== About ===================================================================

const winAboutArt = {
    // Handle or header
    handleBgColor: redSandDesktop.palette.PICO_dark_gray,
    handleColor: redSandDesktop.palette.BULMA_white_ter,
    // Content
    contentBgColor: redSandDesktop.palette.BULMA_white_ter,
    contentColor: redSandDesktop.palette.PICO_dark_gray
}
const winAbout = addWindow(39, 8, "About", winAboutArt);
winAbout.write(2, 2, "    Proof of concept algorithms");
winAbout.write(2, 4, "Programming by Toth, Balazs Aladar");
winAbout.write(2, 6, "             Enjoy! <3");

winAbout.render();

//------------------------------------------------------------------------------
