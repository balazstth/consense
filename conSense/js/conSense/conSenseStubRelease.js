//////////////////////////////////////////////////////////////////////////////
// ConSense by Toth, Balazs Aladar (c) 2005-2019, for detailed licensing
// information see conSense.js.
// https://aladar.me/
// Version in Changelog.txt
//////////////////////////////////////////////////////////////////////////////

// REDUNDANCY AND INCONSISTENCY WARNING WITH SIBLING STUB!

'use strict';

//----------------------------------------------------------------------------
// Stub class
//----------------------------------------------------------------------------

// A subset of SimpleUtilities since it is not yet loaded.
// *ENV* Stub.relativeConSensePath
class Stub
{
    //------------------------------------------------------------------------

    // Optional relativeConSensePath
    constructor(relativeConSensePath = "./")
    {
        //////////////////////////////////////////////////////////////////////
        // Stub                                                Class variables
        //////////////////////////////////////////////////////////////////////
        this.relativeConSensePath = relativeConSensePath;
        //////////////////////////////////////////////////////////////////////

        // Make sure there is a trailing /
        if (this.relativeConSensePath.substr(-1) !== "/")
        {
            this.relativeConSensePath += "/";
        }
    }

    //------------------------------------------------------------------------

    includeJavaScriptFile(filename)
    {
        document.write('<script charset="UTF-8" type="text/javascript" src="'
            + this.relativeConSensePath
            + filename + "?random_suffix=" + Math.floor((Math.random() * 0xdeadbeef) + 1)
            + '"></script>');
    }

    //------------------------------------------------------------------------

    includeCSSFile(filename)
    {
        document.write('<link href="'
            + this.relativeConSensePath
            + filename + "?random_suffix=" + Math.floor((Math.random() * 0xdeadbeef) + 1)
            + '" rel="stylesheet" type="text/css">');
    }

    //------------------------------------------------------------------------

    static isDefined(variable)
    {
        return (typeof(window[variable]) === "undefined") ? false : true;
    }
}

//----------------------------------------------------------------------------

let stub;
if (!Stub.isDefined("relativeConSensePath"))
{
    stub = new Stub();
} else {
    stub = new Stub(relativeConSensePath);
}

// Load JS and CSS dependencies
stub.includeCSSFile("conSense/lib/dragula.css");
stub.includeCSSFile("conSense/style/conSense.css");

stub.includeJavaScriptFile("conSense/js/_releases/conSense_release_compressed.js");
