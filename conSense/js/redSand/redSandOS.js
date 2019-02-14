//////////////////////////////////////////////////////////////////////////////
// RedSand dynamic JavaScript toolkit by Toth, Balazs Aladar (c) 2005-2018
// For detailed licensing information see conSense.js.
// See redSandOSVersion and the changelog for detailed version info.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

'use strict';

//----------------------------------------------------------------------------
// Globals
//----------------------------------------------------------------------------

const redSandOSVersion = "0.03";

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
        // Bulma grayscale colors (grey = gray in my notation)
        this.palette.black_bis        = "hsl(0, 0%,  7%)";
        this.palette.black_ter        = "hsl(0, 0%, 14%)";
        this.palette.gray_darker      = "hsl(0, 0%, 21%)";
        this.palette.gray_dark        = "hsl(0, 0%, 29%)";
        this.palette.gray_light       = "hsl(0, 0%, 71%)";
        this.palette.gray_lighter     = "hsl(0, 0%, 86%)";
        this.palette.white_ter        = "hsl(0, 0%, 96%)";
        this.palette.white_bis        = "hsl(0, 0%, 98%)";
        // CGA colors (DOS
        this.palette.CGA_black        = "#000000";
        this.palette.CGA_blue         = "#0000AA";
        this.palette.CGA_green        = "#00AA00";
        this.palette.CGA_cyan         = "#00AAAA";
        this.palette.CGA_red          = "#AA0000";
        this.palette.CGA_magenta      = "#AA00AA";
        this.palette.CGA_brown        = "#AA5500";
        this.palette.CGA_silver       = "#AAAAAA";
        this.palette.CGA_gray         = "#555555";
        this.palette.CGA_light_blue   = "#5555FF";
        this.palette.CGA_light_green  = "#55FF55";
        this.palette.CGA_light_cyan   = "#55FFFF";
        this.palette.CGA_light_red    = "#FF5555";
        this.palette.CGA_pink         = "#FF55FF";
        this.palette.CGA_yellow       = "#FFFF55";
        this.palette.CGA_white        = "#FFFFFF";

        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

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

        return dim;
    }

    //------------------------------------------------------------------------

    // RedSandDesktop
    // Returns desktop size in characters.
    // Returns {width: __, height: __} in characters
    getDimensions(elem) 
    {
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
        this.blueprint = {};

        this.ART = {
            0: {
                headerBgColor:  redSandDesktop.palette.CGA_black,
                headerColor:    redSandDesktop.palette.CGA_white,
                contentBgColor: redSandDesktop.palette.CGA_white,
                contentColor:   redSandDesktop.palette.CGA_black,
                decoration:     "↑↓↕■",
            }            
        };
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    addWindow(x, y, width, height, title = "", art = this.ART[0])
    {
        const window = new RedSandWindow(x, y, width, height, title, art);

        // TODO: add to blueprint
    }

}

//----------------------------------------------------------------------------
// RedSandWindow
//----------------------------------------------------------------------------

class RedSandWindow
{
    //------------------------------------------------------------------------

    constructor(x, y, width, height, title, art) 
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandWindow                                       Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandOSVersion;

        this.NBSP = "\u00A0";
        this.art = art;

        this.width  = width;                    // Valid >= 2
        this.height = height;                   // Valid >= 2
        this.clientWidth  = this.width  - 2;    // Valid >= 0
        this.clientHeight = this.height - 2;    // Valid >= 0
        this.title = title;

        // Character buffer for the whole page
        this.buffer      = "";    // 1D variant
        this.buffer2D    = [];    // 2D variant
        // Color of each char
        this.cBuffer     = "";    
        this.cBuffer2D   = [];   
        // Background color of each char
        this.bgcBuffer   = "";    
        this.bgcBuffer2D = [];   

        this.createCharacterWindow(x, y);
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Creates a window, sets size in characters.
    // Returns undefined on invalid params.
    createCharacterWindow(x, y) 
    {
        if (this.width < 2 || this.height < 2)
        {
            return;
        }

        const charDim = redSandDesktop.getCharDimensions();
        this.window = new RedSandWindowlet(
            x, y, charDim.width * this.width, charDim.height * this.height, "default", "default", true);
        // Same character proportions for the shadow as in the 90s
        this.window.DOMContainer.style["box-shadow"] = `${charDim.width}px ${charDim.height}px 2px rgba(0, 0, 0, .75)`;

        // Render colors
        this.buffer2D[0]
            = `<span style='background-color: ${this.art.headerBgColor}; color: ${this.art.headerColor};'>` 
            + _.pad("", this.width, this.NBSP) 
            + "</span><br>";

        for (let i = 1; i < this.height; i++)
        {
            this.buffer2D[i]
                = `<span style='background-color: ${this.art.contentBgColor}; color: ${this.art.contentColor};'>` 
                + _.pad("", this.width, this.NBSP) 
                + "</span><br>";
        }

        this.render2D();
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Renders this.buffer to the window. Updates this.buffer2D accordingly.
    render() 
    {
        if (this.width < 2 || this.height < 2)
        {
            return;
        }

        this.buffer2D = _.split(this.buffer, "<br>");
        for (let i = 0; i < this.height; i++)
        {
            this.buffer2D[i] += "<br>";
        }
        this.window.DOMContainer.innerHTML = this.buffer;
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Renders this.buffer2D to the window. Updates this.buffer accordingly.
    render2D() 
    {
        if (this.width < 2 || this.height < 2)
        {
            return;
        }

        this.buffer = _.map(this.buffer2D).join('');
        this.window.DOMContainer.innerHTML = this.buffer;
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Sets new window title
    setTitle(title) 
    {
        if (this.width < 2 || this.height < 2)
        {
            return;
        }

        this.title = title;

        // TODO: display
    }

}

// TODO: more specialized windows
// E.g.:

//----------------------------------------------------------------------------
// RedSandPalette - A specialized RedSandWindow
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
// Instances
// GLOBAL
//----------------------------------------------------------------------------

const redSandDesktop  = new RedSandDesktop();
const redSandLauncher = new RedSandLauncher();

//----------------------------------------------------------------------------
