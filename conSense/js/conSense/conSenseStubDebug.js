//////////////////////////////////////////////////////////////////////////////
// ConSense by Toth, Balazs Aladar (c) 2005-2018, for detailed licensing
// information see conSense.js.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

// REDUNDANCY AND INCONSISTENCY WARNING WITH SIBLING STUB!

'use strict';

//----------------------------------------------------------------------------
// Stub class
//----------------------------------------------------------------------------

// A subset of SimpleUtilities hence it still is not loaded.
// *ENV* relativeConSensePath
function Stub()
{
    this.version = "1.20";
    
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
stub.includeCSSFile("conSense/css/conSense.css");
stub.includeJavaScriptFile("conSense/lib/dom-drag.js");
stub.includeJavaScriptFile("conSense/lib/md5.js");
stub.includeJavaScriptFile("conSense/lib/sha1.js");
stub.includeJavaScriptFile("conSense/lib/DateFormat.js");
stub.includeJavaScriptFile("conSense/lib/sorttable.js");
stub.includeJavaScriptFile("conSense/lib/shortcut.js");
// Removed since full jQuery is included in the dependencies
// stub.includeJavaScriptFile("lib/prototype.lite.js");

stub.includeJavaScriptFile("conSense/lib/cash.js");
stub.includeJavaScriptFile("conSense/lib/underscore.js");
stub.includeJavaScriptFile("conSense/lib/backbone.js");

stub.includeJavaScriptFile("conSense/js/redSand/simpleClasses.js");
stub.includeJavaScriptFile("conSense/js/redSand/redSandCore.js");
stub.includeJavaScriptFile("conSense/js/redSand/redSandGL.js");
stub.includeJavaScriptFile("conSense/js/conSense/conSense.js");
