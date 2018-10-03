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

var redSandGLVersion = "0.02";

//----------------------------------------------------------------------------
// RedSandGLScene
//----------------------------------------------------------------------------

// Parameters:
//      viewport origin coordinates
function RedSandGLViewport(originX, originY)
{
    //------------------------------------------------------------------------
    // Fields
    //------------------------------------------------------------------------

    this.version = redSandGLVersion;
    
    // Default origin is (0, 0)
    if (originX === undefined) originX = 0;
    if (originY === undefined) originY = 0;
    // noinspection JSUnusedGlobalSymbols
    this.originX = originX;
    // noinspection JSUnusedGlobalSymbols
    this.originY = originY;

    //------------------------------------------------------------------------
    // Methods
    //------------------------------------------------------------------------

    // RedSandGLScene
    this.setOrigin = function(originX, originY)
    {
        // noinspection JSUnusedGlobalSymbols
        this.originX = originX;
        // noinspection JSUnusedGlobalSymbols
        this.originY = originY;
    }
}

//----------------------------------------------------------------------------
// RedSandGLPrimitive
//----------------------------------------------------------------------------

function RedSandGLPrimitive(viewport)
{
    //------------------------------------------------------------------------
    // Fields
    //------------------------------------------------------------------------

    this.version = redSandGLVersion;
    if (viewport === undefined)
    {
        alert("RedSandGLViewport should be specified for RedSandGLPrimitive() call.");
    }
    // noinspection JSUnusedGlobalSymbols
    this.viewport = viewport;

    //------------------------------------------------------------------------
    // Methods
    //------------------------------------------------------------------------

    // RedSandGLPrimitive
    this.plot = function(x, y, color)
    {
    };

    //------------------------------------------------------------------------

    // RedSandGLPrimitive
    this.line = function(x1, y1, x2, y2, color, antialias)
    {
    };

    //------------------------------------------------------------------------

    // RedSandGLPrimitive
    // Erases current primitive graphics.
    this.erase = function()
    {
    };
}
