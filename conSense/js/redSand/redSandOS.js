//////////////////////////////////////////////////////////////////////////////
// RedSand dynamic JavaScript toolkit by Toth, Balazs Aladar (c) 2005-2020
// For detailed licensing information see conSense.js.
// See redSandOSVersion and the changelog for detailed version info.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

'use strict';

//----------------------------------------------------------------------------
// Globals
//----------------------------------------------------------------------------

const redSandOSVersion = "0.09";

//----------------------------------------------------------------------------
// redSandDesktop
//----------------------------------------------------------------------------

class RedSandDesktop 
{
    //------------------------------------------------------------------------

    constructor() 
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandDesktop                                      Class variables
        //////////////////////////////////////////////////////////////////////
        
        this.version = redSandOSVersion;

        this.palette = {};
        // Pico8 palette colors
        this.palette.PICO_black       = "rgb(0, 0, 0)";
        this.palette.PICO_dark_blue   = "rgb(29, 43, 83)";
        this.palette.PICO_dark_purple = "rgb(126, 37, 83)";
        this.palette.PICO_dark_green  = "rgb(0, 135, 81)";
        this.palette.PICO_brown       = "rgb(171, 82, 54)";
        this.palette.PICO_dark_gray   = "rgb(95, 87, 79)";
        this.palette.PICO_light_gray  = "rgb(194, 195, 199)";
        this.palette.PICO_white       = "rgb(255, 241, 232)";
        this.palette.PICO_red         = "rgb(255, 0, 77)";
        this.palette.PICO_orange      = "rgb(255, 163, 0)";
        this.palette.PICO_yellow      = "rgb(255, 236, 39)";
        this.palette.PICO_green       = "rgb(0, 228, 54)";
        this.palette.PICO_blue        = "rgb(41, 173, 255)";
        this.palette.PICO_indigo      = "rgb(131, 118, 156)";
        this.palette.PICO_pink        = "rgb(255, 119, 168)";
        this.palette.PICO_peach       = "rgb(255, 204, 170)";
        
        // Bulma colors (grey = gray in my notation)
        this.palette.BULMA_black         = "hsl(0, 0%, 4%)";
        this.palette.BULMA_black_bis     = "hsl(0, 0%, 7%)";
        this.palette.BULMA_black_ter     = "hsl(0, 0%, 14%)";
        this.palette.BULMA_gray_darker   = "hsl(0, 0%, 21%)";
        this.palette.BULMA_gray_dark     = "hsl(0, 0%, 29%)";
        this.palette.BULMA_gray          = "hsl(0, 0%, 48%)";
        this.palette.BULMA_gray_light    = "hsl(0, 0%, 71%)";
        this.palette.BULMA_gray_lighter  = "hsl(0, 0%, 86%)";
        this.palette.BULMA_gray_lightest = "hsl(0, 0%, 93%)";
        this.palette.BULMA_white_ter     = "hsl(0, 0%, 96%)";
        this.palette.BULMA_white_bis     = "hsl(0, 0%, 98%)";
        this.palette.BULMA_white         = "hsl(0, 0%, 100%)";
        this.palette.BULMA_orange        = "hsl(14, 100%, 53%)";
        this.palette.BULMA_yellow        = "hsl(48, 100%, 67%)";
        this.palette.BULMA_green         = "hsl(141, 53%, 53%)";
        this.palette.BULMA_turquoise     = "hsl(171, 100%, 41%)";
        this.palette.BULMA_cyan          = "hsl(204, 71%, 53%)";
        this.palette.BULMA_blue          = "hsl(217, 71%, 53%)";
        this.palette.BULMA_purple        = "hsl(271, 100%, 71%)";
        this.palette.BULMA_red           = "hsl(348, 86%, 61%)";

        // CGA colors (DOS
        this.palette.CGA_black       = "#000000";
        this.palette.CGA_blue        = "#0000AA";
        this.palette.CGA_green       = "#00AA00";
        this.palette.CGA_cyan        = "#00AAAA";
        this.palette.CGA_red         = "#AA0000";
        this.palette.CGA_magenta     = "#AA00AA";
        this.palette.CGA_brown       = "#AA5500";
        this.palette.CGA_silver      = "#AAAAAA";
        this.palette.CGA_gray        = "#555555";
        this.palette.CGA_light_blue  = "#5555FF";
        this.palette.CGA_light_green = "#55FF55";
        this.palette.CGA_light_cyan  = "#55FFFF";
        this.palette.CGA_light_red   = "#FF5555";
        this.palette.CGA_pink        = "#FF55FF";
        this.palette.CGA_yellow      = "#FFFF55";
        this.palette.CGA_white       = "#FFFFFF";
            
        //////////////////////////////////////////////////////////////////////
    }

    //========================================================================

    // Utility functions

    // RedSandDesktop
    // Returns text size in pixels, and counts with this.windowStyle.
    // Returns {width: __, height: __} in pixels
    getTextDimensions(text) 
    {
        // redSandTextMeasureBox is already present, was created in conSense.js
        const textMeasureBox = document.getElementById("redSandTextMeasureBox");
        textMeasureBox.style = this.windowStyle;
        textMeasureBox.innerHTML = text;

        let ret = {};
        ret.width  = textMeasureBox.clientWidth;
        ret.height = textMeasureBox.clientHeight;

        textMeasureBox.innerHTML = "";

        return ret;        
    }

    //------------------------------------------------------------------------

    // RedSandDesktop
    // Returns the size of a monospaced character in pixels. (The page's font is
    // supposed to be monospaced for this.)
    // Returns {width: __, height: __} in pixels
    getCharDimensions() 
    {
        let dim = this.getTextDimensions(
            "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW" +
            "<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W" +
            "<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W" +
            "<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W" +
            "<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W" +
            "<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W<br>W");

        dim.width  /= 100;
        dim.height /= 100;

        dim.width = Math.floor(dim.width);

        return dim;
    }

    //------------------------------------------------------------------------

    // RedSandDesktop
    // Returns viewport size in characters.
    // Returns {width: __, height: __} in characters
    getDimensions() 
    {
        console.log("ERROR: Implement me: RedSandDesktop.getDimensions()");
        // TODO
    }

}

//----------------------------------------------------------------------------
// RedSandLauncher - to launch and dock windows
//----------------------------------------------------------------------------

class RedSandLauncher
{
    //------------------------------------------------------------------------

    constructor() 
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandLauncher                                     Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandOSVersion;

        // Window registry
        this.blueprint = new Set();

        // This is merely a demo of possibe art styles, define your own according
        // to the structure of the records below.
        this.ART = {
            "bw": {
                // Handle or header
                handleBgColor:  redSandDesktop.palette.CGA_black,
                handleColor:    redSandDesktop.palette.CGA_white,
                // Content
                contentBgColor: redSandDesktop.palette.CGA_white,
                contentColor:   redSandDesktop.palette.CGA_black
            },            
            "PICO_indigo": {
                // Handle or header
                handleBgColor:  redSandDesktop.palette.PICO_indigo,
                handleColor:    redSandDesktop.palette.PICO_white,
                // Content
                contentBgColor: redSandDesktop.palette.PICO_white,
                contentColor:   redSandDesktop.palette.PICO_dark_gray
            },
            "PICO_blue": {
                // Handle or header
                handleBgColor:  redSandDesktop.palette.PICO_blue,
                handleColor:    redSandDesktop.palette.PICO_white,
                // Content
                contentBgColor: redSandDesktop.palette.PICO_white,
                contentColor:   redSandDesktop.palette.PICO_dark_gray
            },
            "BULMA_green": {
                // Handle or header
                handleBgColor:  redSandDesktop.palette.BULMA_green,
                handleColor:    redSandDesktop.palette.BULMA_white_bis,
                // Content
                contentBgColor: redSandDesktop.palette.BULMA_white_bis,
                contentColor:   redSandDesktop.palette.BULMA_black
            },
            "BULMA_turquoise": {
                // Handle or header
                handleBgColor:  redSandDesktop.palette.BULMA_turquoise,
                handleColor:    redSandDesktop.palette.BULMA_white_bis,
                // Content
                contentBgColor: redSandDesktop.palette.BULMA_white_bis,
                contentColor:   redSandDesktop.palette.BULMA_black
            },
        };
        //////////////////////////////////////////////////////////////////////
    }

    //========================================================================

    // Window functions

    // RedSandLauncher
    addWindow(x, y, width, height, title = "", art = this.ART["bw"], hasGraphics = false)
    {
        const window = new RedSandWindow(x, y, width, height, title, art, hasGraphics);
        
        this.blueprint.add(window);

        return window;
    }

    //------------------------------------------------------------------------
    
    // RedSandLauncher
    deleteWindow(window)
    {
        console.log("ERROR: Implement me: RedSandLauncher.deleteWindow(window)");
        // TODO
    }

}

//----------------------------------------------------------------------------
// RedSandWindow
//----------------------------------------------------------------------------

// These are windows made out of RedSandWindowlets.
// Key features:
//     o a textmode handle line
//     o textmode-emulated contents
//     o an optional graphics mode for the contents instead of text

class RedSandWindow
{
    //------------------------------------------------------------------------

    constructor(x, y, width, height, title, art, hasGraphics) 
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandWindow                                       Class variables
        //////////////////////////////////////////////////////////////////////
        
        this.version = redSandOSVersion;

        this.NBSP = "\u00A0";
        this.art = art;                   // Window decoration, color, etc.
        this.hasGraphics = hasGraphics;   // Tells if the window is in graphics mode
                                          // rather than text.
                                          // *** This overrides content-text rendering!

        this.canvas = undefined;          // Only defined if graphics mode + a canvas was
                                          // added with addCanvas()
        this.ctx = undefined;             // 2D context of the canvas

        this.div = undefined;             // Only defined if graphics mode + a div was
                                          // added with addDiv()

        // Dimensions of the whole window, in characters
        this.width  = width;                    // Valid >= 2
        this.height = height;                   // Valid >= 1 (minimum a header)
        // Usable space for text contents, in characters
        this.clientWidth  = this.width;         // Valid >= 2
        this.clientHeight = this.height - 1;    // Valid >= 0

        this.title = title;
        this.titlePrefix = " C:\\> ";     // Window decoration 
        
        // 2D arrays, initialized in this.createCharacterWindow()
        this.charBuffer = [];
        this.bgcBuffer  = [];
        this.colBuffer  = [];

        // Actual render buffer, built up from the above three buffers in HTML
        this.renderBuffer = "";

        // RedSandWindowlet that holds the character window        
        this.windowlet = undefined;
        // Initialized in createCharacterWindow()
        this.lineBorder = undefined;
        this.lineHeight = undefined;

        // Cursor
        this.cursorVisible = false;
        this.cursorX = 0;
        this.cursorY = 1;
        this.cursorPhase = 0;   // 0, 1
        this.cursorTimer = undefined;

        //////////////////////////////////////////////////////////////////////

        this.createCharacterWindow(x, y);
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Creates a window, sets size in characters.
    // Importantly, the rendered text output is valid HTML, so selectable text.
    // Windows have an optional graphics mode as well (with a text title bar).
    // Returns undefined on invalid params.
    createCharacterWindow(x, y) 
    {
        if (this.width < 2 || this.height < 2)
        {
            return;
        }

        // This here is a character-based process, window dimensions will be
        // multiples of character dimensions. That is a shortcoming of this approach,
        // beside its benefits.

        const charDim = redSandDesktop.getCharDimensions();
        this.lineBorder = Math.floor(charDim.height / 4);
        this.lineHeight = charDim.height + 2 * this.lineBorder;

        this.windowlet = new RedSandWindowlet(
            x, y, charDim.width * this.width, this.lineHeight * this.height, "default", "default", true, this.lineHeight);

        // Some settings here, some in conSense.scss/.redSandWindow
        this.windowlet.DOMContainer.classList.add("redSandWindow");
        // Remove height to reset RedSandWindowlet default
        this.windowlet.DOMContainer.style["height"] = "";
        // Same character proportions for the shadow as in the 90s
        this.windowlet.DOMContainer.style["box-shadow"] 
            = `${2 * charDim.width}px ${this.lineHeight}px 2px rgba(0, 0, 0, .75)`;

        // ***
        // In case of graphics mode only the tile bar will be rendered
        if (this.hasGraphics) this.height = 1;

        // ***
        // Populate text buffers
        for (let i = 0; i < this.height; i++)
        {
            this.charBuffer[i] = [];
            this.bgcBuffer[i] = [];
            this.colBuffer[i] = [];

            // Handle
            if (i === 0)
            {
                for (let j = 0; j < this.width; j++) 
                {
                    this.charBuffer[i][j] = this.NBSP;
                    this.bgcBuffer[i][j] = this.art.handleBgColor;
                    this.colBuffer[i][j] = this.art.handleColor;
                }
            }
            // Content
            else
            {
                for (let j = 0; j < this.width; j++) 
                {
                    this.charBuffer[i][j] = this.NBSP;
                    this.bgcBuffer[i][j] = this.art.contentBgColor;
                    this.colBuffer[i][j] = this.art.contentColor;
                }
            }
        }

        this.setTitle(this.titlePrefix + this.title);
        this.render();
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Renders this.renderBuffer to the window.
    //
    // This routine needs a counter built in just for Chrome. Firefox behaves standards-compliant
    // and fine, a simple wrapping flex row layout would fit. Not for Chrome, where div sizing
    // seems to be off by a fraction. Tried box-sizing: border-box; as well, to no avail.
    render() 
    {
        if (this.width < 2 || this.height < 1)
        {
            return;
        }

        this.renderBuffer = "<div>";
        let bgc = "init";
        let col = "init";
        let style = "";

        let tempBuf = "";
        // Because tempBuf.length does not cut it this time, unfortunately.
        // (Think &nbsp; for instance, one HTML entity = six chars in the string.)
        let count = 0;

        const charDim = redSandDesktop.getCharDimensions();

        for (let i = 0; i < this.height; i++)
        {
            for (let j = 0; j < this.width; j++) 
            {
                // Row 0, column 0 and changed color / Init
                if (i === 0 && j === 0 && (this.bgcBuffer[i][j] !== bgc || this.colBuffer[i][j] !== col))
                {
                    bgc = this.bgcBuffer[i][j];
                    col = this.colBuffer[i][j];
                    style = `background-color: ${bgc}; color: ${col};`
                        + ` border-top: ${this.lineBorder}px solid ${bgc};`
                        + ` border-bottom: ${this.lineBorder}px solid ${bgc};`;
                    this.renderBuffer += `</div><div style="${style} `;
                    tempBuf = "";
                    count = 0;
                }
                // Column 0 and no changed color
                else if (j === 0 && this.bgcBuffer[i][j] === bgc && this.colBuffer[i][j] === col)
                {
                    this.renderBuffer += `<div style="${style} `;
                    tempBuf = "";
                    count = 0;
                }
                // Column 0 and changed color
                else if (j === 0 && (this.bgcBuffer[i][j] !== bgc || this.colBuffer[i][j] !== col))
                {
                    bgc = this.bgcBuffer[i][j];
                    col = this.colBuffer[i][j];
                    style = `background-color: ${bgc}; color: ${col};`
                        + ` border-top: ${this.lineBorder}px solid ${bgc};`
                        + ` border-bottom: ${this.lineBorder}px solid ${bgc};`;
                    this.renderBuffer += `<div style="${style} `;
                    tempBuf = "";
                    count = 0;
                }
                // Any other column and changed color
                else if (j !== 0 && (this.bgcBuffer[i][j] !== bgc || this.colBuffer[i][j] !== col))
                {
                    bgc = this.bgcBuffer[i][j];
                    col = this.colBuffer[i][j];
                    style = `background-color: ${bgc}; color: ${col};`
                        + ` border-top: ${this.lineBorder}px solid ${bgc};`
                        + ` border-bottom: ${this.lineBorder}px solid ${bgc};`;
                    this.renderBuffer += `max-width: ${charDim.width * count}px;">${tempBuf}</div><div style="${style} `;
                    tempBuf = "";
                    count = 0;
                }
                // Write cell content
                tempBuf += this.charBuffer[i][j];
                count++;
            }
            this.renderBuffer += `max-width: ${charDim.width * count}px;">${tempBuf}</div>`;
            tempBuf = "";
            count = 0;
        }

        this.windowlet.render(this.renderBuffer);
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    write(x, y, str, col = "init", bgc = "init")
    {
        // Exit if obiously out of bounds
        if (y >= this.height || x >= this.width) return;

        // Process chars and colors
        for (let i = 0; i < str.length; i++)
        {
            let chr = str.charAt(i);

            switch (chr)
            {
                case " ":
                    chr = ["&nbsp;"];
                    break;
                case "\t":
                    // TODO: maybe make tab size configurable
                    //       and / or use an external detab() function on the str
                    //       and / or remove tab support from here then for performance
                    chr = ["&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;"];
                    break;
                default:
                    chr = [chr];
                    break;
            }

            // Support for multiple chars, e.g. for tab
            for (let k = 0; k < chr.length; k++)
            {
                // Clip invisible areas - no scrolling by default
                if (x + k + i < this.width)
                {
                    this.charBuffer[y][x + k + i] = chr[k];
                    if (col !== "init")
                    {
                        this.colBuffer[y][x + k + i] = col;
                    }
                    if (bgc !== "init")
                    {
                        this.bgcBuffer[y][x + k + i] = bgc;
                    }
                    if (k > 0) x++;
                }
                // Out of bounds
                else
                {
                    return;
                }
            }
        }
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Sets and displays a new window title.
    setTitle(title) 
    {
        if (this.width < 2 || this.height < 1)
        {
            return;
        }

        this.title = title;

        this.write(0, 0, title);
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // DPI fix for the canvas
    // Private
    fixCanvasDPI() {    
        const height = window.getComputedStyle(this.canvas).getPropertyValue('height').slice(0, -2);
        const width = window.getComputedStyle(this.canvas).getPropertyValue('width').slice(0, -2);
        
        this.canvas.setAttribute('width', simpleUtils.fixDPI(width));
        this.canvas.setAttribute('height', simpleUtils.fixDPI(height));
    }
    
    //------------------------------------------------------------------------

    // RedSandWindow
    // ***
    // Utility function
    // Add canvas in case of graphics mode
    addCanvas(width, height) {
        this.canvas = document.createElement('canvas');

        this.canvas.id               = this.windowlet.DOMContainer.id + "Canvas";
        this.canvas.style.width      = width  + "px";    // "px" for HTML5
        this.canvas.style.height     = height + "px";
        this.canvas.style.background = this.art.contentBgColor;

        this.ctx = this.canvas.getContext("2d");
        
        this.windowlet.DOMContainer.insertAdjacentElement('beforeend', this.canvas);

        this.fixCanvasDPI();
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // ***
    // Utility function
    // Add canvas in case of graphics mode
    // with the correct size according to the original window dimensions
    addSizedCanvas() {
        this.addCanvas(this.windowlet.width, this.windowlet.height - this.windowlet.handleHeight);
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // ***
    // Utility function
    // Add a general-purpose div in case of graphics mode
    addDiv(width, height) {
        this.div = document.createElement('div');

        this.div.id               = this.windowlet.DOMContainer.id + "Div";
        this.div.style.width      = width  + "px";    // "px" for HTML5
        this.div.style.height     = height + "px";
        this.div.style.background = this.art.contentBgColor;

        this.windowlet.DOMContainer.insertAdjacentElement('beforeend', this.div);
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // ***
    // Utility function
    // Add a general-purpose div in case of graphics mode
    // with the correct size according to the original window dimensions
    addSizedDiv() {
        this.addDiv(this.windowlet.width, this.windowlet.height - this.windowlet.handleHeight);
    }

    //========================================================================

    // Cursor functions 

    // RedSandWindow
    cursorOn() 
    {
        if (this.cursorTimer === undefined)
        {
            this.cursorTimer = new RedSandTimer(this, this.cursorAnim, 1000);
        }
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    cursorOff() 
    {
        this.cursorTimer.off();
        this.cursorTimer = undefined;
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // (Maybe an option for a custom anim callback will be added in the future.)
    cursorAnim() 
    {
        this.write(this.cursorX, this.cursorY, "#");
        // TODO: Change this into a blinking cursor. Blink background (and foreground?)
        // color at he given position. Black and white or inverted colors.
        this.render();
    }

}

//----------------------------------------------------------------------------
// RedSandTimer
//----------------------------------------------------------------------------

class RedSandTimer
{
    //------------------------------------------------------------------------

    // context: context class
    // callback: to call when tick
    // interval: in milliseconds
    constructor(context, callback, interval) 
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandTimer                                        Class variables
        //////////////////////////////////////////////////////////////////////

        this.context = context;
        this.callback = callback;
        this.interval = interval;

        this.on();  // It is on by default at creation

        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandTimer
    on()
    {
        if (this.timeout === undefined)
        {
            let that = this.context;
            this.timeout = setTimeout(this.callback.bind(that), this.interval);
        }
    }

    //------------------------------------------------------------------------

    // RedSandTimer
    off()
    {
        clearTimeout(this.timeout);
        this.timeout = undefined;
    }

}

//----------------------------------------------------------------------------

// TODO: 
//
//     Window launcher / dock window
//     Virtual cursor, insert and overwrite
//     Buttons
//     Arbitrary editable boxes and areas in the window - input areas
//
//     About window
//     Scrollable textmode window w/ textmode scrollbar
//     Maybe graphical window / canvas
//     Textmode Tetris
//     Specialized windows like a color palette
//     Character table
//     Calculator
//     Card game

//----------------------------------------------------------------------------
// Instances
// GLOBAL
//----------------------------------------------------------------------------

const redSandDesktop  = new RedSandDesktop();
const redSandLauncher = new RedSandLauncher();

//----------------------------------------------------------------------------
