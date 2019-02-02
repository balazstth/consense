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
        this.palette.black           = "rgb(0, 0, 0)";
        this.palette.dark_blue       = "rgb(29, 43, 83)";
        this.palette.dark_purple     = "rgb(126, 37, 83)";
        this.palette.dark_green      = "rgb(0, 135, 81)";
        this.palette.brown           = "rgb(171, 82, 54)";
        this.palette.dark_gray       = "rgb(95, 87, 79)";
        this.palette.light_gray      = "rgb(194, 195, 199)";
        this.palette.white           = "rgb(255, 241, 232)";
        this.palette.red             = "rgb(255, 0, 77)";
        this.palette.orange          = "rgb(255, 163, 0)";
        this.palette.yellow          = "rgb(255, 236, 39)";
        this.palette.green           = "rgb(0, 228, 54)";
        this.palette.blue            = "rgb(41, 173, 255)";
        this.palette.indigo          = "rgb(131, 118, 156)";
        this.palette.pink            = "rgb(255, 119, 168)";
        this.palette.peach           = "rgb(255, 204, 170)";
        // Bulma grayscale colors (grey = gray in my notation)
        this.palette.black_bis       = "hsl(0, 0%,  7%)";
        this.palette.black_ter       = "hsl(0, 0%, 14%)";
        this.palette.gray_darker     = "hsl(0, 0%, 21%)";
        this.palette.gray_dark       = "hsl(0, 0%, 29%)";
        this.palette.gray_light      = "hsl(0, 0%, 71%)";
        this.palette.gray_lighter    = "hsl(0, 0%, 86%)";
        this.palette.white_ter       = "hsl(0, 0%, 96%)";
        this.palette.white_bis       = "hsl(0, 0%, 98%)";
        // CGA colors (DOS)
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

        // CONST
        // These are to define different window decoration arts
        this.WIN_TYPE_0 = 0;

        // Window registry
        this.blueprint = {};
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    addWindow(x, y, width, height, title = "", type = this.WIN_TYPE_0)
    {
        const window = new RedSandWindow(x, y, width, height, title, type);

        // TODO: add to blueprint
    }

}

//----------------------------------------------------------------------------
// RedSandWindow
//----------------------------------------------------------------------------

class RedSandWindow
{
    //------------------------------------------------------------------------

    constructor(x, y, width, height, title, type) 
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandWindow                                       Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandOSVersion;

        //--------------------------------------------------------------------
        // Config

        this.title = title;
        this.charWidth  = width;
        this.charHeight = height;
        this.type = type;

        // Generated in createCharacterWindow() after drawing window decoration
        this.clientCharWidth  = 0;
        this.clientCharHeight = 0;

        this.window = this.createCharacterWindow(x, y, width, height, title, type);
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Creates a window, sets size in characters.
    createCharacterWindow(x, y, width, height, title, type) 
    {
        const charDim = redSandDesktop.getCharDimensions();
        const window = new RedSandWindowlet(x, y, charDim.width * width, charDim.height * height, "default", "default", true);
        // Same character proportions for the shadow as in the 90s
        // INTERMEDIATE
        window.DOMContainer.style["box-shadow"] = `${charDim.width}px ${charDim.height}px 2px rgba(0, 0, 0, .75)`;

        // TODO: render window according to title, type
        // TODO: client area in window, and according this.clientChar* setting
        // TODO: refactor as necessary: in the future drag should be with a handle / header only, 
        //       maybe RedSandWindowlet refactor also necessary

        return window;
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Sets new window title
    setTitle(title) 
    {
        this.title = title;

        // TODO: display
    }

}

//----------------------------------------------------------------------------
// Instances
// GLOBAL
//----------------------------------------------------------------------------

const redSandDesktop  = new RedSandDesktop();
const redSandLauncher = new RedSandLauncher();

//----------------------------------------------------------------------------
