//////////////////////////////////////////////////////////////////////////////
// RedSand dynamic JavaScript toolkit by Toth, Balazs Aladar (c) 2005-2019
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
        this.blueprint = new Set();

        this.ART = {
            "bw": {
                // Handle or header
                handleBgColor:  redSandDesktop.palette.CGA_black,
                handleColor:    redSandDesktop.palette.CGA_white,
                // Content
                contentBgColor: redSandDesktop.palette.CGA_white,
                contentColor:   redSandDesktop.palette.CGA_black,
                // Selection
                selectBgColor:  redSandDesktop.palette.CGA_light_red,
                selectColor:    redSandDesktop.palette.CGA_white
            },            
            "indigo": {
                // Handle or header
                handleBgColor:  redSandDesktop.palette.PICO_indigo,
                handleColor:    redSandDesktop.palette.PICO_white,
                // Content
                contentBgColor: redSandDesktop.palette.PICO_white,
                contentColor:   redSandDesktop.palette.PICO_dark_gray,
                // Selection
                selectBgColor:  redSandDesktop.palette.PICO_red,
                selectColor:    redSandDesktop.palette.PICO_white
            },
            "blue": {
                // Handle or header
                handleBgColor:  redSandDesktop.palette.PICO_blue,
                handleColor:    redSandDesktop.palette.PICO_white,
                // Content
                contentBgColor: redSandDesktop.palette.PICO_white,
                contentColor:   redSandDesktop.palette.PICO_dark_gray,
                // Selection
                selectBgColor:  redSandDesktop.palette.PICO_red,
                selectColor:    redSandDesktop.palette.PICO_white
            }            
        };
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    addWindow(x, y, width, height, title = "", art = this.ART["bw"])
    {
        const window = new RedSandWindow(x, y, width, height, title, art);
        
        this.blueprint.add(window);

        return window;
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
        //////////////////////////////////////////////////////////////////////

        this.createCharacterWindow(x, y);
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
        this.lineBorder = Math.floor(charDim.height / 4);
        this.lineHeight = charDim.height + 2 * this.lineBorder;

        // TODO: scaling issue here when zooming the page, fix the size setting
        this.windowlet = new RedSandWindowlet(
            x, y, charDim.width * this.width, this.lineHeight * this.height, "default", "default", true, this.lineHeight);

        console.log(this.lineHeight);
        console.log(this.height);
        console.log(this.lineHeight * this.height);

        // Same character proportions for the shadow as in the 90s
        this.windowlet.DOMContainer.style["box-shadow"] 
            = `${2 * charDim.width}px ${this.lineHeight}px 2px rgba(0, 0, 0, .75)`;
        this.windowlet.DOMContainer.style["overflow-x"] = "hidden";
        this.windowlet.DOMContainer.style["overflow-y"] = "hidden";
        this.windowlet.DOMContainer.style["display"] = "flex";
        this.windowlet.DOMContainer.style["flex-direction"] = "row";
        this.windowlet.DOMContainer.style["flex-wrap"] = "wrap";
        this.windowlet.DOMContainer.style["align-content"] = "flex-start";
        // TODO: custom select color, already defined in art

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

        this.setTitle(" C:\\> " + this.title);
        this.render();
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

        this.renderBuffer = "<div>";
        let bgc = "init";
        let col = "init";

        let style = "";

        for (let i = 0; i < this.height; i++)
        {
            for (let j = 0; j < this.width; j++) 
            {
                // A change in style = new div
                if (this.bgcBuffer[i][j] !== bgc || this.colBuffer[i][j] !== col)
                {
                    bgc = this.bgcBuffer[i][j];
                    col = this.colBuffer[i][j];
                    style = `background-color: ${bgc}; color: ${col};`
                        + ` border-top: ${this.lineBorder}px solid ${bgc};`
                        + ` border-bottom: ${this.lineBorder}px solid ${bgc};>`;
                    this.renderBuffer += `</div><div style="${style}">`;
                }
                // Write cell content
                this.renderBuffer += this.charBuffer[i][j];
            }
            this.renderBuffer += `</div><br><div style="${style}">`;
        }
        // Close the last span
        this.renderBuffer += "</div>";

        this.windowlet.render(this.renderBuffer);
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // TODO:
    //     Clipping and wrapping write
    write(x, y, str)
    {
        for (let i = 0; i < str.length; i++)
        {
            let chr = str.charAt(i);

            switch (chr)
            {
                case " ":
                    chr = "&nbsp;";
                    break;
                case "\t":
                    chr = "&nbsp;&nbsp;&nbsp;&nbsp;";
                    break;
            }

            this.charBuffer[y][x + i] = chr;
        }
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // TODO: fix according to write()
    colorWrite(x, y, str, bgc, col)
    {
        for (let i = 0; i < str.length; i++)
        {
            this.charBuffer[y][x + i] = str.charAt(i);
            this.bgcBuffer[y][x + i] = bgc;
            this.colBuffer[y][x + i] = col;
        }
    }

    //------------------------------------------------------------------------

    // RedSandWindow
    // Sets and displays a new window title
    setTitle(title) 
    {
        if (this.width < 2 || this.height < 2)
        {
            return;
        }

        this.title = title;

        this.write(0, 0, title);
    }

}

// TODO: 
//     Visual window launcher / dock
//     Specialized windows, e.g.: RedSandPalette

//----------------------------------------------------------------------------
// Instances
// GLOBAL
//----------------------------------------------------------------------------

const redSandDesktop  = new RedSandDesktop();
const redSandLauncher = new RedSandLauncher();

//----------------------------------------------------------------------------
