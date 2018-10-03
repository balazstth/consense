//////////////////////////////////////////////////////////////////////////////
// ConSense by Toth, Balazs Aladar (c) 2005-2018, for detailed licensing
// information see conSense.js.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

// REDUNDANCY AND INCONSISTENCY WARNING WITH SIBLING STUB!

//----------------------------------------------------------------------------
// Stub class
//----------------------------------------------------------------------------

// A subset of SimpleUtilities hence it still is not loaded.
// *ENV* relativeConSensePath
function Stub()
{
    this.version = "1.18";
    
    //------------------------------------------------------------------------

    this.includeJavaScriptFile = function(filename)
    {
        document.write('<script charset="UTF-8" type="text/javascript" src="'
            + relativeConSensePath
            + filename
            + '"></script>');
    };

    //------------------------------------------------------------------------

    this.includeCSSFile = function(filename)
    {
        document.write('<link href="'
            + relativeConSensePath
            + filename
            + '" rel="stylesheet" type="text/css">');
    };

    //------------------------------------------------------------------------

    this.isDefined = function(variable)
    {
        return (typeof(window[variable]) === "undefined") ? false : true;
    };
}

//----------------------------------------------------------------------------

var stub = new Stub();

//----------------------------------------------------------------------------

// relativeConSensePath init
// If already present
if (stub.isDefined("relativeConSensePath"))
{
    // noinspection JSUnusedAssignment
    if (relativeConSensePath.substr(-1) !== "/")
    {
        // noinspection JSUnusedAssignment
        relativeConSensePath += "/";
    }
}
// Default
else
{
    var relativeConSensePath = "./";
}

//----------------------------------------------------------------------------

// Load JS and CSS dependencies
stub.includeCSSFile("css/conSense.css");
stub.includeJavaScriptFile("js/releases/conSense_release_compressed.js");
