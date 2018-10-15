//////////////////////////////////////////////////////////////////////////////
// RedSand/GL by Toth, Balazs Aladar (c) 2005-2018
// For detailed licensing information see conSense.js.
// See redSandGLVersion and the changelog for detailed version info.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Remarks
//////////////////////////////////////////////////////////////////////////////
//
// Color array structure:
//      eg. {r:0, g:0, b:0, a:100}
//      defines black with 100% opacity.
//
//////////////////////////////////////////////////////////////////////////////

'use strict';

const redSandGLVersion = "0.04";

//----------------------------------------------------------------------------
// RedSandGLScene
//----------------------------------------------------------------------------

class RedSandGLViewport
{
    //------------------------------------------------------------------------

    // Params:
    //     viewport origin coordinates
    constructor(originX = 0, originY = 0)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandGLViewport                                   Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandGLVersion;
        //////////////////////////////////////////////////////////////////////

        this.originX = originX;
        this.originY = originY;
    }

    //------------------------------------------------------------------------
    // Methods
    //------------------------------------------------------------------------

    // RedSandGLScene
    setOrigin(originX, originY)
    {
        this.originX = originX;
        this.originY = originY;
    }
}

//----------------------------------------------------------------------------
// RedSandGLPrimitive
//----------------------------------------------------------------------------

class RedSandGLPrimitive
{
    //------------------------------------------------------------------------

    constructor(viewport)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandGLViewport                                   Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandGLVersion;

        this.viewport = viewport;
        //////////////////////////////////////////////////////////////////////

        if (viewport === undefined)
        {
            alert("RedSandGLViewport should be specified for RedSandGLPrimitive() call.");
        }
    }
    
    //------------------------------------------------------------------------
    // Methods
    //------------------------------------------------------------------------

    // RedSandGLPrimitive
    plot(x, y, color)
    {
    }

    //------------------------------------------------------------------------

    // RedSandGLPrimitive
    line(x1, y1, x2, y2, color, antialias)
    {
    }

    //------------------------------------------------------------------------

    // RedSandGLPrimitive
    // Erases current primitive graphics.
    erase()
    {
    }
    
}
