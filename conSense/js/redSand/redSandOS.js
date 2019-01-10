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

const redSandOSVersion = "0.02";

//----------------------------------------------------------------------------
// RedSandDesktop
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

        // A map of all elements in the page
        this.blueprint = {};
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandDesktop
    // Returns text size in pixels.
    // Params: fontSize: font size to use
    //         text: string to measure
    // Returns {width: __, height: __} in pixels
    getTextDimensions(fontSize, text) 
    {
        // redSandTextMeasureBox is already present, was created in conSense.js
        const textMeasureBox = document.getElementById("redSandTextMeasureBox");
        textMeasureBox.style.fontSize = fontSize;
        textMeasureBox.innerHTML = text;

        let ret = {};
        ret.width  = textMeasureBox.clientWidth;
        ret.height = textMeasureBox.clientHeight;

        textMeasureBox.innerHTML = "";

        return ret;        
    }

    //------------------------------------------------------------------------

    // RedSandDesktop
    // Returns the size of a monospaced character in pixels.
    // Params: fontSize: font size to use
    // Returns {width: __, height: __} in pixels
    getCharDimensions(fontSize) 
    {
        let dim = this.getTextDimensions(
            fontSize,
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
    // Returns elem (typically div) size in characters.
    // Returns {width: __, height: __} in characters
    getDimensions(elem) 
    {
        // TODO
    }

    //------------------------------------------------------------------------

    // RedSandDesktop
    // Renders the desktop according to the blueprint
    render() 
    {

    }

}

//----------------------------------------------------------------------------
// Instances
// GLOBAL
//----------------------------------------------------------------------------

const redSandDesktop = new RedSandDesktop();

//----------------------------------------------------------------------------
