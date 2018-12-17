//////////////////////////////////////////////////////////////////////////////
// Simple Classes by Toth, Balazs Aladar (c) 2005-2018
// For detailed licensing information see conSense.js.
// See simpleClassesVersion and the changelog for detailed version info.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Notes:
//////////////////////////////////////////////////////////////////////////////
//
// Uses lib/sha1.js and lib/md5.js by Paul Johnston 2000-2002, BSD license.
//
//////////////////////////////////////////////////////////////////////////////

'use strict';

//----------------------------------------------------------------------------
// Version
//----------------------------------------------------------------------------

const simpleClassesVersion = "1.30";

//----------------------------------------------------------------------------
// Debug class
//----------------------------------------------------------------------------

class SimpleDebug
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // SimpleDebug                                         Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = simpleClassesVersion;

        this.messages = "";
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------
    // Batch debug
    //------------------------------------------------------------------------

    // SimpleDebug
    add(description, value)
    {
        this.messages += description + ": " + value + "\n";
    }

    //------------------------------------------------------------------------

    // SimpleDebug
    print()
    {
        alert(this.messages);
        this.messages = "";
    }

    //------------------------------------------------------------------------
    // Simple debug
    //------------------------------------------------------------------------

    // SimpleDebug
    alert(description, value)
    {
        alert(description + ": " + value);
    }

}

//----------------------------------------------------------------------------
// Utilities class
//----------------------------------------------------------------------------

class SimpleUtilities
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // SimpleUtilities                                     Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = simpleClassesVersion;

        // DOM nodeType-s
        this.DOM_ELEMENT_NODE = 1;
        this.DOM_ATTRIBUTE_NODE = 2;
        this.DOM_TEXT_NODE = 3;
        this.DOM_CDATA_SECTION_NODE = 4;
        this.DOM_ENTITY_REFERENCE_NODE = 5;
        this.DOM_ENTITY_NODE = 6;
        this.DOM_PROCESSING_INSTRUCTION_NODE = 7;
        this.DOM_COMMENT_NODE = 8;
        this.DOM_DOCUMENT_NODE = 9;
        this.DOM_DOCUMENT_TYPE_NODE = 10;
        this.DOM_DOCUMENT_FRAGMENT_NODE = 11;
        this.DOM_NOTATION_NODE = 12;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // Example:
    // const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
    // const newFunc = pipe(fn1, fn2, fn3);
    // const result = newFunc(arg);
    pipe(...fns)
    {
        return x => fns.reduce((y, f) => f(y), x);
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Can be used to copy a string to clipboard, and only triggered by actual user input.
    // (e.g. in a click event)
    copyToClipboard(str)
    {
        const el = document.createElement('textarea');    // Create a <textarea> element
        el.value = str;                                   // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                  // Make it readonly to be tamper-proof
        el.style.position = 'absolute';
        el.style.left = '-9999px';                        // Move outside the screen to make it invisible
        document.body.appendChild(el);                    // Append the <textarea> element to the HTML document
        const selected =
            document.getSelection().rangeCount > 0        // Check if there is any content selected previously
                ? document.getSelection().getRangeAt(0)   // Store selection if found
                : false;                                  // Mark as false to know no selection existed before
        el.select();                                      // Select the <textarea> content
        document.execCommand('copy');                     // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el);                    // Remove the <textarea> element
        if (selected) {                                   // If a selection existed before copying
            document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
            document.getSelection().addRange(selected);   // Restore the original selection
        }
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Returns current vertical scroll percentage on page.
    getScrollPercent()
    {
        const h = document.documentElement;
        const b = document.body;
        const st = 'scrollTop';
        const sh = 'scrollHeight';
        return Math.floor((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Returns Y coordinate according to a scroll percentage. Used to quickly
    // position in the page.
    getYFromScrollPercent(percent)
    {
        const h = document.documentElement;
        const b = document.body;
        const sh = 'scrollHeight';

        return Math.floor((percent * ((h[sh]||b[sh]) - h.clientHeight)) / 100);
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Used for generating random number URL parameters to force fresh loading
    // of content.
    // Generating only if conSense.debug!
    randomSuffix()
    {
        if (!conSense.debug) return "";
        return "?random_suffix=" + this.random(0xdeadbeef);
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Generate random integer from 1 to limit
    random(limit)
    {
        if (limit < 1) return 1;
        return Math.floor((Math.random() * limit) + 1);
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    replaceAll(search, replacement)
    {
        let target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    }

    //------------------------------------------------------------------------

    // Example: onClick="linkTo(formURI('main.jsp', {'lang': 'hun'}))"

    // SimpleUtilities
    linkTo(dest)
    {
        document.location.href = dest;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    formURI(target, paramArray)
    {
        let result = target + "?";
        let andSign = "";

        // No parameters to add
        if (paramArray.length === 0)
        {
            return target;
        }

        for (let i in paramArray)
        {
            // noinspection JSUnfilteredForInLoop
            result += andSign + i + "=" + paramArray[i];
            andSign = "&";
        }

        return result;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Basic browser capabilities test
    checkBrowser()
    {
        if (!(document.all || document.getElementById))
        {
            alert("SimpleUtilities.checkBrowser() error: Please upgrade to a more modern browser. This interactive web page will not operate properly.");
        }
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Accepts DOM element id as parameter
    getDOMElement(elemId)
    {
        let result = document.all
                        ? document.all[elemId]
                        : document.getElementById(elemId);
        return result;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Helper function to handle onKeyDown, onKeyPress and onKeyUp events.
    // Gets event parameter, brings back key name or "Unknown".
    getKeyName(keyEvent)
    {
        if (!keyEvent)
        {
            keyEvent = window.event;
        }

        let keyCode = keyEvent.keyCode;
        let keyName = "Unknown";

        switch(keyCode)
        {
            case 13:
                keyName = "Enter";
                break;
            case 16:
                keyName = "Shift";
                break;
            case 17:
                keyName = "Ctrl";
                break;
            case 18:
                keyName = "Alt";
                break;
            case 19:
                keyName = "Pause";
                break;
            case 32:
                keyName = "Space";
                break;
            case 8:
                keyName = "Backspace";
                break;
            case 9:
                keyName = "Tab";
                break;
            case 37:
                keyName = "Arrow Left";
                break;
            case 38:
                keyName = "Arrow Up";
                break;
            case 39:
                keyName = "Arrow Right";
                break;
            case 40:
                keyName = "Arrow Down";
                break;
            case 33:
                keyName = "Page Up";
                break;
            case 34:
                keyName = "Page Down";
                break;
            case 36:
                keyName = "Home";
                break;
            case 35:
                keyName = "End";
                break;
            case 45:
                keyName = "Insert";
                break;
            case 46:
                keyName = "Delete";
                break;
            case 91:
            case 92:
                keyName = "Win";
                break;
            case 93:
                keyName = "Select";
                break;
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
            case 123:
                // Group code for F1-F12
                keyName = "Fxx";
                break;
            case 144:
                keyName = "Num Lock";
                break;
            case 145:
                keyName = "Scroll Lock";
                break;
            case 20:
                keyName = "Caps Lock";
                break;
            case 27:
                keyName = "Esc";
                break;
        }

        return keyName;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    trimString(str)
    {
        // To force auto-conversion to string
        return (str + "").replace(/^\s*|\s*$/g, "");
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Avoids rendering of HTML strings when displayed.
    HTML2Source(str)
    {
        // To force auto-conversion to string
        return (str + "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    //------------------------------------------------------------------------

    // HtmlDecode http://lab.msdn.microsoft.com/annotations/htmldecode.js
    //   client side version of the useful Server.HtmlDecode method
    //   takes one string (encoded) and returns another (decoded)
    //   by Andy Oakley
    HTMLDecode(s) {
        let out = "";
        if (s==null) return;

        let l = s.length;
        for (let i=0; i<l; i++) {
            let ch = s.charAt(i);

            if (ch === '&') {
                let semicolonIndex = s.indexOf(';', i+1);

                if (semicolonIndex > 0) {
                    let entity = s.substring(i + 1, semicolonIndex);
                    if (entity.length > 1 && entity.charAt(0) === '#') {
                        if (entity.charAt(1) === 'x' || entity.charAt(1) === 'X')
                            ch = String.fromCharCode(eval('0'+entity.substring(1)));
                        else
                            ch = String.fromCharCode(eval(entity.substring(1)));
                    } else {
                        switch (entity) {
                            case 'quot': ch = String.fromCharCode(0x0022); break;
                            case 'amp': ch = String.fromCharCode(0x0026); break;
                            case 'lt': ch = String.fromCharCode(0x003c); break;
                            case 'gt': ch = String.fromCharCode(0x003e); break;
                            case 'nbsp': ch = String.fromCharCode(0x00a0); break;
                            case 'iexcl': ch = String.fromCharCode(0x00a1); break;
                            case 'cent': ch = String.fromCharCode(0x00a2); break;
                            case 'pound': ch = String.fromCharCode(0x00a3); break;
                            case 'curren': ch = String.fromCharCode(0x00a4); break;
                            case 'yen': ch = String.fromCharCode(0x00a5); break;
                            case 'brvbar': ch = String.fromCharCode(0x00a6); break;
                            case 'sect': ch = String.fromCharCode(0x00a7); break;
                            case 'uml': ch = String.fromCharCode(0x00a8); break;
                            case 'copy': ch = String.fromCharCode(0x00a9); break;
                            case 'ordf': ch = String.fromCharCode(0x00aa); break;
                            case 'laquo': ch = String.fromCharCode(0x00ab); break;
                            case 'not': ch = String.fromCharCode(0x00ac); break;
                            case 'shy': ch = String.fromCharCode(0x00ad); break;
                            case 'reg': ch = String.fromCharCode(0x00ae); break;
                            case 'macr': ch = String.fromCharCode(0x00af); break;
                            case 'deg': ch = String.fromCharCode(0x00b0); break;
                            case 'plusmn': ch = String.fromCharCode(0x00b1); break;
                            case 'sup2': ch = String.fromCharCode(0x00b2); break;
                            case 'sup3': ch = String.fromCharCode(0x00b3); break;
                            case 'acute': ch = String.fromCharCode(0x00b4); break;
                            case 'micro': ch = String.fromCharCode(0x00b5); break;
                            case 'para': ch = String.fromCharCode(0x00b6); break;
                            case 'middot': ch = String.fromCharCode(0x00b7); break;
                            case 'cedil': ch = String.fromCharCode(0x00b8); break;
                            case 'sup1': ch = String.fromCharCode(0x00b9); break;
                            case 'ordm': ch = String.fromCharCode(0x00ba); break;
                            case 'raquo': ch = String.fromCharCode(0x00bb); break;
                            case 'frac14': ch = String.fromCharCode(0x00bc); break;
                            case 'frac12': ch = String.fromCharCode(0x00bd); break;
                            case 'frac34': ch = String.fromCharCode(0x00be); break;
                            case 'iquest': ch = String.fromCharCode(0x00bf); break;
                            case 'Agrave': ch = String.fromCharCode(0x00c0); break;
                            case 'Aacute': ch = String.fromCharCode(0x00c1); break;
                            case 'Acirc': ch = String.fromCharCode(0x00c2); break;
                            case 'Atilde': ch = String.fromCharCode(0x00c3); break;
                            case 'Auml': ch = String.fromCharCode(0x00c4); break;
                            case 'Aring': ch = String.fromCharCode(0x00c5); break;
                            case 'AElig': ch = String.fromCharCode(0x00c6); break;
                            case 'Ccedil': ch = String.fromCharCode(0x00c7); break;
                            case 'Egrave': ch = String.fromCharCode(0x00c8); break;
                            case 'Eacute': ch = String.fromCharCode(0x00c9); break;
                            case 'Ecirc': ch = String.fromCharCode(0x00ca); break;
                            case 'Euml': ch = String.fromCharCode(0x00cb); break;
                            case 'Igrave': ch = String.fromCharCode(0x00cc); break;
                            case 'Iacute': ch = String.fromCharCode(0x00cd); break;
                            case 'Icirc': ch = String.fromCharCode(0x00ce); break;
                            case 'Iuml': ch = String.fromCharCode(0x00cf); break;
                            case 'ETH': ch = String.fromCharCode(0x00d0); break;
                            case 'Ntilde': ch = String.fromCharCode(0x00d1); break;
                            case 'Ograve': ch = String.fromCharCode(0x00d2); break;
                            case 'Oacute': ch = String.fromCharCode(0x00d3); break;
                            case 'Ocirc': ch = String.fromCharCode(0x00d4); break;
                            case 'Otilde': ch = String.fromCharCode(0x00d5); break;
                            case 'Ouml': ch = String.fromCharCode(0x00d6); break;
                            case 'times': ch = String.fromCharCode(0x00d7); break;
                            case 'Oslash': ch = String.fromCharCode(0x00d8); break;
                            case 'Ugrave': ch = String.fromCharCode(0x00d9); break;
                            case 'Uacute': ch = String.fromCharCode(0x00da); break;
                            case 'Ucirc': ch = String.fromCharCode(0x00db); break;
                            case 'Uuml': ch = String.fromCharCode(0x00dc); break;
                            case 'Yacute': ch = String.fromCharCode(0x00dd); break;
                            case 'THORN': ch = String.fromCharCode(0x00de); break;
                            case 'szlig': ch = String.fromCharCode(0x00df); break;
                            case 'agrave': ch = String.fromCharCode(0x00e0); break;
                            case 'aacute': ch = String.fromCharCode(0x00e1); break;
                            case 'acirc': ch = String.fromCharCode(0x00e2); break;
                            case 'atilde': ch = String.fromCharCode(0x00e3); break;
                            case 'auml': ch = String.fromCharCode(0x00e4); break;
                            case 'aring': ch = String.fromCharCode(0x00e5); break;
                            case 'aelig': ch = String.fromCharCode(0x00e6); break;
                            case 'ccedil': ch = String.fromCharCode(0x00e7); break;
                            case 'egrave': ch = String.fromCharCode(0x00e8); break;
                            case 'eacute': ch = String.fromCharCode(0x00e9); break;
                            case 'ecirc': ch = String.fromCharCode(0x00ea); break;
                            case 'euml': ch = String.fromCharCode(0x00eb); break;
                            case 'igrave': ch = String.fromCharCode(0x00ec); break;
                            case 'iacute': ch = String.fromCharCode(0x00ed); break;
                            case 'icirc': ch = String.fromCharCode(0x00ee); break;
                            case 'iuml': ch = String.fromCharCode(0x00ef); break;
                            case 'eth': ch = String.fromCharCode(0x00f0); break;
                            case 'ntilde': ch = String.fromCharCode(0x00f1); break;
                            case 'ograve': ch = String.fromCharCode(0x00f2); break;
                            case 'oacute': ch = String.fromCharCode(0x00f3); break;
                            case 'ocirc': ch = String.fromCharCode(0x00f4); break;
                            case 'otilde': ch = String.fromCharCode(0x00f5); break;
                            case 'ouml': ch = String.fromCharCode(0x00f6); break;
                            case 'divide': ch = String.fromCharCode(0x00f7); break;
                            case 'oslash': ch = String.fromCharCode(0x00f8); break;
                            case 'ugrave': ch = String.fromCharCode(0x00f9); break;
                            case 'uacute': ch = String.fromCharCode(0x00fa); break;
                            case 'ucirc': ch = String.fromCharCode(0x00fb); break;
                            case 'uuml': ch = String.fromCharCode(0x00fc); break;
                            case 'yacute': ch = String.fromCharCode(0x00fd); break;
                            case 'thorn': ch = String.fromCharCode(0x00fe); break;
                            case 'yuml': ch = String.fromCharCode(0x00ff); break;
                            case 'OElig': ch = String.fromCharCode(0x0152); break;
                            case 'oelig': ch = String.fromCharCode(0x0153); break;
                            case 'Scaron': ch = String.fromCharCode(0x0160); break;
                            case 'scaron': ch = String.fromCharCode(0x0161); break;
                            case 'Yuml': ch = String.fromCharCode(0x0178); break;
                            case 'fnof': ch = String.fromCharCode(0x0192); break;
                            case 'circ': ch = String.fromCharCode(0x02c6); break;
                            case 'tilde': ch = String.fromCharCode(0x02dc); break;
                            case 'Alpha': ch = String.fromCharCode(0x0391); break;
                            case 'Beta': ch = String.fromCharCode(0x0392); break;
                            case 'Gamma': ch = String.fromCharCode(0x0393); break;
                            case 'Delta': ch = String.fromCharCode(0x0394); break;
                            case 'Epsilon': ch = String.fromCharCode(0x0395); break;
                            case 'Zeta': ch = String.fromCharCode(0x0396); break;
                            case 'Eta': ch = String.fromCharCode(0x0397); break;
                            case 'Theta': ch = String.fromCharCode(0x0398); break;
                            case 'Iota': ch = String.fromCharCode(0x0399); break;
                            case 'Kappa': ch = String.fromCharCode(0x039a); break;
                            case 'Lambda': ch = String.fromCharCode(0x039b); break;
                            case 'Mu': ch = String.fromCharCode(0x039c); break;
                            case 'Nu': ch = String.fromCharCode(0x039d); break;
                            case 'Xi': ch = String.fromCharCode(0x039e); break;
                            case 'Omicron': ch = String.fromCharCode(0x039f); break;
                            case 'Pi': ch = String.fromCharCode(0x03a0); break;
                            case 'Rho': ch = String.fromCharCode(0x03a1); break;
                            case 'Sigma': ch = String.fromCharCode(0x03a3); break;
                            case 'Tau': ch = String.fromCharCode(0x03a4); break;
                            case 'Upsilon': ch = String.fromCharCode(0x03a5); break;
                            case 'Phi': ch = String.fromCharCode(0x03a6); break;
                            case 'Chi': ch = String.fromCharCode(0x03a7); break;
                            case 'Psi': ch = String.fromCharCode(0x03a8); break;
                            case 'Omega': ch = String.fromCharCode(0x03a9); break;
                            case 'alpha': ch = String.fromCharCode(0x03b1); break;
                            case 'beta': ch = String.fromCharCode(0x03b2); break;
                            case 'gamma': ch = String.fromCharCode(0x03b3); break;
                            case 'delta': ch = String.fromCharCode(0x03b4); break;
                            case 'epsilon': ch = String.fromCharCode(0x03b5); break;
                            case 'zeta': ch = String.fromCharCode(0x03b6); break;
                            case 'eta': ch = String.fromCharCode(0x03b7); break;
                            case 'theta': ch = String.fromCharCode(0x03b8); break;
                            case 'iota': ch = String.fromCharCode(0x03b9); break;
                            case 'kappa': ch = String.fromCharCode(0x03ba); break;
                            case 'lambda': ch = String.fromCharCode(0x03bb); break;
                            case 'mu': ch = String.fromCharCode(0x03bc); break;
                            case 'nu': ch = String.fromCharCode(0x03bd); break;
                            case 'xi': ch = String.fromCharCode(0x03be); break;
                            case 'omicron': ch = String.fromCharCode(0x03bf); break;
                            case 'pi': ch = String.fromCharCode(0x03c0); break;
                            case 'rho': ch = String.fromCharCode(0x03c1); break;
                            case 'sigmaf': ch = String.fromCharCode(0x03c2); break;
                            case 'sigma': ch = String.fromCharCode(0x03c3); break;
                            case 'tau': ch = String.fromCharCode(0x03c4); break;
                            case 'upsilon': ch = String.fromCharCode(0x03c5); break;
                            case 'phi': ch = String.fromCharCode(0x03c6); break;
                            case 'chi': ch = String.fromCharCode(0x03c7); break;
                            case 'psi': ch = String.fromCharCode(0x03c8); break;
                            case 'omega': ch = String.fromCharCode(0x03c9); break;
                            case 'thetasym': ch = String.fromCharCode(0x03d1); break;
                            case 'upsih': ch = String.fromCharCode(0x03d2); break;
                            case 'piv': ch = String.fromCharCode(0x03d6); break;
                            case 'ensp': ch = String.fromCharCode(0x2002); break;
                            case 'emsp': ch = String.fromCharCode(0x2003); break;
                            case 'thinsp': ch = String.fromCharCode(0x2009); break;
                            case 'zwnj': ch = String.fromCharCode(0x200c); break;
                            case 'zwj': ch = String.fromCharCode(0x200d); break;
                            case 'lrm': ch = String.fromCharCode(0x200e); break;
                            case 'rlm': ch = String.fromCharCode(0x200f); break;
                            case 'ndash': ch = String.fromCharCode(0x2013); break;
                            case 'mdash': ch = String.fromCharCode(0x2014); break;
                            case 'lsquo': ch = String.fromCharCode(0x2018); break;
                            case 'rsquo': ch = String.fromCharCode(0x2019); break;
                            case 'sbquo': ch = String.fromCharCode(0x201a); break;
                            case 'ldquo': ch = String.fromCharCode(0x201c); break;
                            case 'rdquo': ch = String.fromCharCode(0x201d); break;
                            case 'bdquo': ch = String.fromCharCode(0x201e); break;
                            case 'dagger': ch = String.fromCharCode(0x2020); break;
                            case 'Dagger': ch = String.fromCharCode(0x2021); break;
                            case 'bull': ch = String.fromCharCode(0x2022); break;
                            case 'hellip': ch = String.fromCharCode(0x2026); break;
                            case 'permil': ch = String.fromCharCode(0x2030); break;
                            case 'prime': ch = String.fromCharCode(0x2032); break;
                            case 'Prime': ch = String.fromCharCode(0x2033); break;
                            case 'lsaquo': ch = String.fromCharCode(0x2039); break;
                            case 'rsaquo': ch = String.fromCharCode(0x203a); break;
                            case 'oline': ch = String.fromCharCode(0x203e); break;
                            case 'frasl': ch = String.fromCharCode(0x2044); break;
                            case 'euro': ch = String.fromCharCode(0x20ac); break;
                            case 'image': ch = String.fromCharCode(0x2111); break;
                            case 'weierp': ch = String.fromCharCode(0x2118); break;
                            case 'real': ch = String.fromCharCode(0x211c); break;
                            case 'trade': ch = String.fromCharCode(0x2122); break;
                            case 'alefsym': ch = String.fromCharCode(0x2135); break;
                            case 'larr': ch = String.fromCharCode(0x2190); break;
                            case 'uarr': ch = String.fromCharCode(0x2191); break;
                            case 'rarr': ch = String.fromCharCode(0x2192); break;
                            case 'darr': ch = String.fromCharCode(0x2193); break;
                            case 'harr': ch = String.fromCharCode(0x2194); break;
                            case 'crarr': ch = String.fromCharCode(0x21b5); break;
                            case 'lArr': ch = String.fromCharCode(0x21d0); break;
                            case 'uArr': ch = String.fromCharCode(0x21d1); break;
                            case 'rArr': ch = String.fromCharCode(0x21d2); break;
                            case 'dArr': ch = String.fromCharCode(0x21d3); break;
                            case 'hArr': ch = String.fromCharCode(0x21d4); break;
                            case 'forall': ch = String.fromCharCode(0x2200); break;
                            case 'part': ch = String.fromCharCode(0x2202); break;
                            case 'exist': ch = String.fromCharCode(0x2203); break;
                            case 'empty': ch = String.fromCharCode(0x2205); break;
                            case 'nabla': ch = String.fromCharCode(0x2207); break;
                            case 'isin': ch = String.fromCharCode(0x2208); break;
                            case 'notin': ch = String.fromCharCode(0x2209); break;
                            case 'ni': ch = String.fromCharCode(0x220b); break;
                            case 'prod': ch = String.fromCharCode(0x220f); break;
                            case 'sum': ch = String.fromCharCode(0x2211); break;
                            case 'minus': ch = String.fromCharCode(0x2212); break;
                            case 'lowast': ch = String.fromCharCode(0x2217); break;
                            case 'radic': ch = String.fromCharCode(0x221a); break;
                            case 'prop': ch = String.fromCharCode(0x221d); break;
                            case 'infin': ch = String.fromCharCode(0x221e); break;
                            case 'ang': ch = String.fromCharCode(0x2220); break;
                            case 'and': ch = String.fromCharCode(0x2227); break;
                            case 'or': ch = String.fromCharCode(0x2228); break;
                            case 'cap': ch = String.fromCharCode(0x2229); break;
                            case 'cup': ch = String.fromCharCode(0x222a); break;
                            case 'int': ch = String.fromCharCode(0x222b); break;
                            case 'there4': ch = String.fromCharCode(0x2234); break;
                            case 'sim': ch = String.fromCharCode(0x223c); break;
                            case 'cong': ch = String.fromCharCode(0x2245); break;
                            case 'asymp': ch = String.fromCharCode(0x2248); break;
                            case 'ne': ch = String.fromCharCode(0x2260); break;
                            case 'equiv': ch = String.fromCharCode(0x2261); break;
                            case 'le': ch = String.fromCharCode(0x2264); break;
                            case 'ge': ch = String.fromCharCode(0x2265); break;
                            case 'sub': ch = String.fromCharCode(0x2282); break;
                            case 'sup': ch = String.fromCharCode(0x2283); break;
                            case 'nsub': ch = String.fromCharCode(0x2284); break;
                            case 'sube': ch = String.fromCharCode(0x2286); break;
                            case 'supe': ch = String.fromCharCode(0x2287); break;
                            case 'oplus': ch = String.fromCharCode(0x2295); break;
                            case 'otimes': ch = String.fromCharCode(0x2297); break;
                            case 'perp': ch = String.fromCharCode(0x22a5); break;
                            case 'sdot': ch = String.fromCharCode(0x22c5); break;
                            case 'lceil': ch = String.fromCharCode(0x2308); break;
                            case 'rceil': ch = String.fromCharCode(0x2309); break;
                            case 'lfloor': ch = String.fromCharCode(0x230a); break;
                            case 'rfloor': ch = String.fromCharCode(0x230b); break;
                            case 'lang': ch = String.fromCharCode(0x2329); break;
                            case 'rang': ch = String.fromCharCode(0x232a); break;
                            case 'loz': ch = String.fromCharCode(0x25ca); break;
                            case 'spades': ch = String.fromCharCode(0x2660); break;
                            case 'clubs': ch = String.fromCharCode(0x2663); break;
                            case 'hearts': ch = String.fromCharCode(0x2665); break;
                            case 'diams': ch = String.fromCharCode(0x2666); break;
                            default: ch = ''; break;
                        }
                    }
                    i = semicolonIndex;
                }
            }

            out += ch;
        }

        return out;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Includes a JavaScript source file. Must be called from document head!
    includeJavaScriptFile(filename)
    {
        document.write('<script charset="UTF-8" type="text/javascript" src="'
            + filename + this.randomSuffix()
            + '"></script>');
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Includes a CSS file. Must be called from document head!
    includeCSSFile(filename)
    {
        document.write('<link href="'
            + filename + this.randomSuffix()
            + '" rel="stylesheet" type="text/css">');
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    isDefined(variable)
    {
        return (typeof(window[variable]) === "undefined") ? false : true;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    regexpResultLength(regexp, text)
    {
        let len = text.length - text.replace(regexp, "").length;

        return len;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // TODO: add more accented characters
    accented2HTML(str)
    {
        let regexp;
        let replacement;

        // őŐ űŰ éÉ áÁ íÍ óÓ úÚ öÖ üÜ õÕ ûÛ äÄ ß

        regexp = new RegExp("ő", "g");
        replacement = "&odblac;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ő", "g");
        replacement = "&Odblac;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ű", "g");
        replacement = "&udblac;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ű", "g");
        replacement = "&Udblac;";
        str = str.replace(regexp, replacement);

        // --

        regexp = new RegExp("é", "g");
        replacement = "&eacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("É", "g");
        replacement = "&Eacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("á", "g");
        replacement = "&aacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Á", "g");
        replacement = "&Aacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("í", "g");
        replacement = "&iacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Í", "g");
        replacement = "&Iacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ó", "g");
        replacement = "&oacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ó", "g");
        replacement = "&Oacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ú", "g");
        replacement = "&uacute;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ú", "g");
        replacement = "&Uacute;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ö", "g");
        replacement = "&ouml;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ö", "g");
        replacement = "&Ouml;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ü", "g");
        replacement = "&uuml;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ü", "g");
        replacement = "&Uuml;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("õ", "g");
        replacement = "&otilde;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Õ", "g");
        replacement = "&Otilde;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("û", "g");
        replacement = "&ucirc;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Û", "g");
        replacement = "&Ucirc;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ä", "g");
        replacement = "&auml;";
        str = str.replace(regexp, replacement);

        regexp = new RegExp("Ä", "g");
        replacement = "&Auml;";
        str = str.replace(regexp, replacement);

        //--

        regexp = new RegExp("ß", "g");
        replacement = "&szlig;";
        str = str.replace(regexp, replacement);

        return str;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Used for string replace loops
    replaceLoop(regexp, replacement, text)
    {
        while (true)
        {
            const text2 = text.replace(regexp, replacement);
            if (text === text2) {
                break;
            } else {
                text = text2;
            }
        }
        return text;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Minimal plaintext --> HTML converter
    //
    // (rel)(str)relativePath --> <a href="relativePath">str</a>
    // (rel)relativePath --> <a href="relativePath">relativePath</a>
    // (str)x://y --> <a href="x://y">str</a>
    // x://y --> <a href="x://y">x://y</a>
    // x@y   --> <a href="mailto:x@y">x@y</a>
    // #str# --> <b>str</b>
    // *str* --> <em>str</em>
    // _str_ --> <cite>str</cite>
    // ==> --> <p>
    // <== --> </p>
    // == Headlines == --> <h2>Headlines</h2>, works from h1 to h6 as =, ==,... ======
    // __ --> <br>
    // (image)(CSSClass)relativePath --> <img class="CSSClass" src="relativePath"/>
    // (thumbnail)(CSSClass)relativePath >>> target
    //     --> <a href="target"><img class="CSSClass" src="relativePath"/></a>
    //
    // TODO: URL and email address patterns can be further improved
    liteDown(text)
    {
        let regexp;
        let replacement;

        // text = this.accented2HTML(text);

        //--------------------------------------------------------------------
        // texts between ==> and <== will be enclosed in a <p> paragraph </p>
        regexp = new RegExp("==>", "g");
        replacement = "<p>";
        text = text.replace(regexp, replacement);
        regexp = new RegExp("<==", "g");
        replacement = "</p>";
        text = text.replace(regexp, replacement);

        //--------------------------------------------------------------------

        // __ --> <br />
        // (____ --> <br /><br />, etc.)
        regexp = new RegExp("__", "g");
        replacement = "<br />";
        text = text.replace(regexp, replacement);

        //--------------------------------------------------------------------

        let text2;

        // (rel)(str)relativePath --> <a href="relativePath">str</a>
        regexp = new RegExp("(>|\\s|^)\\(rel\\)\\((.*)\\)([^<\\s]*)(<|\\s|$)", "");
        replacement = '$1<a href="$3">$2</a>$4';
        text = this.replaceLoop(regexp, replacement, text);

        //--------------------------------------------------------------------

        // (rel)relativePath --> <a href="relativePath">relativePath</a>
        regexp = new RegExp("(>|\\s|^)\\(rel\\)([^<\\s]*)(<|\\s|$)", "");
        replacement = '$1<a href="$2">$2</a>$3';
        text = this.replaceLoop(regexp, replacement, text);

        //--------------------------------------------------------------------

        // (str)url --> <a href="url">str</a>
        // Remark: watch out for > and < that are allowed before and after the
        // url string in this current regexp. May cause problems.
        regexp = new RegExp("(>|\\s|^)\\((.*)\\)(\\w+:\\/{2}[\\w-\.\\/]+)(<|\\s|$)", "");
        replacement = '$1<a href="$3">$2</a>$4';
        text = this.replaceLoop(regexp, replacement, text);

        //--------------------------------------------------------------------

        // url --> <a href="url">url</a>
        // (url) --> <a href="url">url</a>
        regexp = new RegExp("(\\(|\\s|^)(\\w+:\\/{2}[\\w-\.\\/]+)(\\)|\\s|$)", "");
        replacement = '$1<a href="$2">$2</a>$3';
        text = this.replaceLoop(regexp, replacement, text);

        //--------------------------------------------------------------------

        // x@y --> <a href="mailto:x@y">x@y</a>
        //
        // This should be further extended, according to the specification:
        //
        //     addr-spec   =  local-part "@" domain        ; global address
        //     local-part  =  word *("." word)             ; uninterpreted
        //                                                 ; case-preserved
        //
        //     domain      =  sub-domain *("." sub-domain)
        //     sub-domain  =  domain-ref / domain-literal
        //     domain-ref  =  atom                         ; symbolic reference
        //
        // The local-part of the email address may use any of these ASCII characters:
        //     ----------
        // uppercase and lowercase Latin letters A to Z and a to z;
        // digits 0 to 9;
        // special characters !#$%&'*+-/=?^_`{|}~;
        // dot ., provided that it is not the first or last character unless quoted,
        // and provided also that it does not appear consecutively unless quoted
        // (e.g. John..Doe@example.com is not allowed but "John..Doe"@example.com is allowed);
        // space and "(),:;<>@[\] characters are allowed with restrictions
        // (they are only allowed inside a quoted string, as described in the paragraph
        // below, and in addition, a backslash or double-quote must be preceded by a backslash);
        // comments are allowed with parentheses at either end of the local-part;
        // e.g. john.smith(comment)@example.com and (comment)john.smith@example.com
        // are both equivalent to john.smith@example.com.
        //
        // domain-part
        // -----------
        // The Internet standards (Request for Comments) for protocols mandate that
        // component hostname labels may contain only the ASCII letters a through z
        // (in a case-insensitive manner), the digits 0 through 9, and the hyphen (-).
        // The original specification of hostnames in RFC 952, mandated that labels
        // could not start with a digit or with a hyphen, and must not end with a hyphen.
        // However, a subsequent specification (RFC 1123) permitted hostname labels
        // to start with digits. No other symbols, punctuation characters, or blank
        // spaces are permitted.
        //
        // Something like this might work as well for a pattern:
        // function validateEmail(email) {
        //     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(String(email).toLowerCase());
        // }
        regexp = new RegExp("(\\s|^)([\\w-.]+@[\\w-.]+)(\\s|$)", "");
        replacement = '$1<a href="mailto:$2">$2</a>$3';
        text = this.replaceLoop(regexp, replacement, text);

        //--------------------------------------------------------------------

        // # --> bold
        //
        // Correct use: bla #bla habla# bla
        //              <tag>#bla habla#<tag>
        // 
        // Incorrect:   bla #bla habla#.
        //              bla # habla # bla        
        regexp = new RegExp("(>|\\s|^)#([^#\\s][^#]*[^#\\s]|[^#\\s])#(<|\\s|$)", "");
        replacement = "$1<b>$2</b>$3";
        text = this.replaceLoop(regexp, replacement, text);

        //--------------------------------------------------------------------

        // * --> em
        //
        // Correct use: bla *bla habla* bla
        //              <tag>*bla habla*<tag>
        //
        // Incorrect:   bla *bla habla*.
        //              bla * habla * bla
        regexp = new RegExp("(>|\\s|^)\\*([^\*\\s][^\*]*[^\*\\s]|[^\*\\s])\\*(<|\\s|$)", "");
        replacement = "$1<em>$2</em>$3";
        text = this.replaceLoop(regexp, replacement, text);

        //--------------------------------------------------------------------

        // _ --> cite
        //
        // Correct use: bla _bla habla_ bla
        //              <tag>_blabla_</tag>
        //
        // Incorrect:   bla _bla habla_.
        //              bla _ habla _ bla
        regexp = new RegExp("(>|\\s|^)_([^_\\s][^_]*[^_\\s]|[^_\\s])_(<|\\s|$)", "");
        replacement = "$1<cite>$2</cite>$3";
        text = this.replaceLoop(regexp, replacement, text);

        //--------------------------------------------------------------------
        // For single-line headers only
        // =bla= --> <h1>bla</h1>
        // ==bla== --> <h2>bla</h2>
        // ...
        for (let level = 1; level <= 6; level++)
        {
            regexp = new RegExp("^(\\s*)(=){"+level+"}([^=].*[^=])(=){"+level+"}(\\s*)$", "gm");
            replacement = "<h" + level + ">$3</h" + level + ">";
            text = text.replace(regexp, replacement);
        }

        //--------------------------------------------------------------------
        // (image)(CSSClass)relativePath --> <img class="CSSClass" src="relativePath"/>
        // requires a class definition in the document CSS (not mandatory)
        regexp = new RegExp("(>|\\s|^)\\(image\\)\\((.*)\\)([^<\\s]*)(<|\\s|$)", "");
        replacement = '$1<img class="$2" src="$3"/>$4';
        text = this.replaceLoop(regexp, replacement, text);

        //--------------------------------------------------------------------
        // (thumbnail)(CSSClass)relativePath >>> target
        //     --> <a href="target"><img class="CSSClass" src="relativePath"/></a>
        // requires a class definition in the document CSS (not mandatory)
        regexp = new RegExp("(>|\\s|^)\\(thumbnail\\)\\((.*)\\)([^<\\s]*)\\s+>>>\\s+(.*)(<|\\s|$)", "");
        replacement = '$1<a href="$4"><img class="$2" src="$3"/></a>$5';
        text2 = text;
        do {
            text = text2;
            text2 = text.replace(regexp, replacement);
        } while (text2 !== text);
        
        //--------------------------------------------------------------------

        return text;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Accepts either JavaScript/DOM objects or DOM id string as parameter.
    // Returns JavaScript/DOM object.
    toObject(obj)
    {
        // If obj is a string than it is handled as a DOM id
        if (typeof(obj) === "string")
        {
            obj = this.getDOMElement(obj);
        }
        return obj;
    }

    //------------------------------------------------------------------------

    // SimpleUtilities
    // Adds a custom event callback to a DOM element.
    // Params:
    //      element - DOM element
    //      eventName - event name
    //      callback - the function(param) triggered on event
    //      capturing -
    // "it is meant to state whether the event handler should be executed in the
    // capturing or in the bubbling phase. If you�re not certain whether you want
    // capturing or bubbling, use false (bubbling)."
    // Example:
    //      simpleUtils.attachEvent(newLink, "click", action);
    attachEvent(element, eventName, callback, capturing )
    {
        if ( element.addEventListener ) // the DOM2, W3C way
        {
            element.addEventListener( eventName, callback, capturing );
        }
        else if ( element.attachEvent ) // the IE way
        {
            element.attachEvent( "on" + eventName, callback );
        }
    };

    //------------------------------------------------------------------------

    // SimpleUtilities
    // eg.:
    // Given: arr = [{a:1, b:2}, {a:3, b:4}]
    // objectArray2objectHashTable(arr, "a") --> [1:{a:1, b:2}, 3:{a:3, b:4}]
    objectArray2objectHashTable(array, indexName)
    {
        let hashTable = [];

        for (let i in array) {
            // noinspection JSUnfilteredForInLoop
            hashTable[array[i][indexName]] = array[i];
        }

        return hashTable;
    }

    //------------------------------------------------------------------------

    // NOTE: since EcmaScript 6 there is native templating support for strings
    // Example:
    //     let soMany = 10;
    //     console.log(`This is ${soMany} times easier!`);
    //     // "This is 10 times easier!
    //     // Be aware that template strings are surrounded by backticks `
    //     // instead of (single) quotes.
    
    // SimpleUtilities
    // Supported params: %s
    microSprintf(format, ...args)
    {
        let i = 0;
        return format.replace(/%s/g, () => args[i++]);
    }

    //------------------------------------------------------------------------

    // Make container draggable by handle
    // Usage:
    //    simpleUtils.draggable(container);
    //    simpleUtils.draggable(handle, container);
    // Drag range: [(0, 0), (infinite, infinite))
    draggable(handle, container = null)
    {
        Drag.init(handle, container, 0, 1000000000, 0, 1000000000);
    }

}

//----------------------------------------------------------------------------
// Cryptography class
//----------------------------------------------------------------------------

class SimpleCryptography
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // SimpleCryptography                                  Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = simpleClassesVersion;

        // *Altered*, URL-safe base64 character palette
        this.base64KeyStr
            = "ABCDEFGHIJKLMNOP"
            + "QRSTUVWXYZabcdef"
            + "ghijklmnopqrstuv"
            + "wxyz0123456789-_"
            + ".";
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------
    // Methods
    //------------------------------------------------------------------------

    // SimpleCryptography
    base64Encode(input)
    {
        let output = "";
        let chr1, chr2, chr3 = "";
        let enc1, enc2, enc3, enc4 = "";
        let i = 0;

        do
        {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2))
            {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3))
            {
                enc4 = 64;
            }

            output = output
                + this.base64KeyStr.charAt(enc1)
                + this.base64KeyStr.charAt(enc2)
                + this.base64KeyStr.charAt(enc3)
                + this.base64KeyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    base64Decode(input)
    {
        let output = "";
        let chr1, chr2, chr3 = "";
        let enc1, enc2, enc3, enc4 = "";
        let i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, -, _, or .
        let base64Test = /[^A-Za-z0-9\-_.]/g;
        if (base64Test.exec(input))
        {
            alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '-', '_', and '.'\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\-_.]/g, "");

        do
        {
            enc1 = this.base64KeyStr.indexOf(input.charAt(i++));
            enc2 = this.base64KeyStr.indexOf(input.charAt(i++));
            enc3 = this.base64KeyStr.indexOf(input.charAt(i++));
            enc4 = this.base64KeyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64)
            {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64)
            {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    // Apparently RC4 cipher
    RC4Encrypt(password, data)
    {
        let buf = new Array(256);       // 256B cipher buffer

        let passwordLength = password.length;
        let dataLength = data.length;

        let i, j, k, n, tmp, cipher = "";

        for (i = 0; i < 256; i++)
        {
            buf[i] = i;
        }

        for (j = i = 0; i < 256; i++)
        {
            j = (j + buf[i] + password.charCodeAt(i % passwordLength)) % 256;
            tmp = buf[i];
            buf[i] = buf[j];
            buf[j] = tmp;
        }

        for (n = j = i = 0; i < dataLength; i++)
        {
            n = (n + 1) % 256;
            j = (j + buf[n]) % 256;

            tmp = buf[n];
            buf[n] = buf[j];
            buf[j] = tmp;

            k = buf[((buf[n] + buf[j]) % 256)];
            cipher += String.fromCharCode(data.charCodeAt(i) ^ k);
        }

        return cipher;
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    // Apparently RC4 cipher
    RC4Decrypt(password, data)
    {
        return this.RC4Encrypt(password, data);
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    SHA1(data)
    {
        return hex_sha1(data);
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    MD5(data)
    {
        return hex_md5(data);
    }

    //------------------------------------------------------------------------

    // SimpleCryptography
    generateRandomString(len)
    {
        let charBuffer =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";

        for (let i = 0; i < len; i++)
        {
            result
                += charBuffer[Math.floor(Math.random() * charBuffer.length)];
        }

        return result;
    }

}

//----------------------------------------------------------------------------
// Local storage class
//----------------------------------------------------------------------------

class SimpleStorage
{
    constructor()
    {
        this.polyfill();

        //////////////////////////////////////////////////////////////////////
        // SimpleStorage                                       Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = simpleClassesVersion;

        this.isError = false;

        try {
            this.localStorage = window.localStorage;
        } catch(error) {
            this.isError = true;
            console.log("Error: window.localStorage is inaccessible.\nSimpleStorage functions will not work.");
        }
        //////////////////////////////////////////////////////////////////////
    }

    polyfill()
    {
        //--------------------------------------------------------------------
        // Polyfill for browsers that do not support or allow local storage.
        if (!window.localStorage) {
            // Local storage simulation with cookies.
            console.log("Warning: Using polyfill for window.localStorage.");
            Object.defineProperty(window, "localStorage", new (function () {
                let aKeys = [], oStorage = {};
                Object.defineProperty(oStorage, "getItem", {
                    value: function (sKey) { return sKey ? this[sKey] : null; },
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
                Object.defineProperty(oStorage, "key", {
                    value: function (nKeyId) { return aKeys[nKeyId]; },
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
                Object.defineProperty(oStorage, "setItem", {
                    value: function (sKey, sValue) {
                        if(!sKey) { return; }
                        // noinspection JSDeprecatedSymbols
                        document.cookie = escape(sKey) + "=" + escape(sValue)
                            + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
                Object.defineProperty(oStorage, "length", {
                    get: function () { return aKeys.length; },
                    configurable: false,
                    enumerable: false
                });
                Object.defineProperty(oStorage, "removeItem", {
                    value: function (sKey) {
                        if(!sKey) { return; }
                        // noinspection JSDeprecatedSymbols
                        document.cookie = escape(sKey)
                            + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
                Object.defineProperty(oStorage, "clear", {
                    value: function () {
                        if(!aKeys.length) { return; }
                        for (let sKey in aKeys) {
                            // noinspection JSDeprecatedSymbols
                            document.cookie = escape(sKey)
                                + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                        }
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
                this.get = function () {
                    let iThisIndex;
                    for (let sKey in oStorage) {
                        // noinspection JSUnfilteredForInLoop
                        iThisIndex = aKeys.indexOf(sKey);
                        if (iThisIndex === -1)
                        {
                            // noinspection JSUnfilteredForInLoop
                            oStorage.setItem(sKey, oStorage[sKey]);
                        }
                        else { aKeys.splice(iThisIndex, 1); }
                        // noinspection JSUnfilteredForInLoop
                        delete oStorage[sKey];
                    }
                    for (aKeys; aKeys.length > 0; aKeys.splice(0, 1))
                    {
                        oStorage.removeItem(aKeys[0]);
                    }
                    for (
                        let aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/);
                        nIdx < aCouples.length;
                        nIdx++)
                    {
                        aCouple = aCouples[nIdx].split(/\s*=\s*/);
                        if (aCouple.length > 1) {
                            oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
                            aKeys.push(iKey);
                        }
                    }
                    return oStorage;
                };
                this.configurable = false;
                this.enumerable = true;
            })());
        }
        //--------------------------------------------------------------------
    }

    // SimpleStorage
    setItem(key, value)
    {
        if (this.isError) return;
        window.localStorage.setItem(key, value);
    }

    // SimpleStorage
    getItem(key)
    {
        // Returning the same on error as on an empty query
        if (this.isError) return null;
        return window.localStorage.getItem(key);
    }

    // SimpleStorage
    removeItem(key)
    {
        if (this.isError) return;
        window.localStorage.removeItem(key);
    }

    // SimpleStorage
    clear()
    {
        if (this.isError) return;
        window.localStorage.clear();
    }
}

//----------------------------------------------------------------------------

// GLOBAL
function rem(str)
{
}

//----------------------------------------------------------------------------
// Instances
//----------------------------------------------------------------------------

const simpleDebug   = new SimpleDebug();
const simpleUtils   = new SimpleUtilities();
const simpleCrypto  = new SimpleCryptography();
const simpleStorage = new SimpleStorage();
