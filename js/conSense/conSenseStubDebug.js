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
            + filename + "?random_suffix=" + Math.floor((Math.random() * 0xdeadbeef) + 1)
            + '"></script>');
    };

    //------------------------------------------------------------------------

    this.includeCSSFile = function(filename)
    {
        document.write('<link href="'
            + relativeConSensePath
            + filename + "?random_suffix=" + Math.floor((Math.random() * 0xdeadbeef) + 1)
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
stub.includeJavaScriptFile("lib/dom-drag.js");
stub.includeJavaScriptFile("lib/md5.js");
stub.includeJavaScriptFile("lib/sha1.js");
stub.includeJavaScriptFile("lib/DateFormat.js");
stub.includeJavaScriptFile("lib/sorttable.js");
stub.includeJavaScriptFile("lib/shortcut.js");
// Removed since full jQuery is included in the dependencies
// stub.includeJavaScriptFile("lib/prototype.lite.js");

stub.includeJavaScriptFile("lib/cash.js");
stub.includeJavaScriptFile("lib/underscore.js");
stub.includeJavaScriptFile("lib/backbone.js");

stub.includeJavaScriptFile("js/redSand/simpleClasses.js");
stub.includeJavaScriptFile("js/redSand/redSandCore.js");
stub.includeJavaScriptFile("js/redSand/redSandGL.js");
stub.includeJavaScriptFile("js/conSense/conSense.js");
