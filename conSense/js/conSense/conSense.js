//////////////////////////////////////////////////////////////////////////////
// ConSense by Toth, Balazs Aladar (c) 2005-2018, comes under the terms of the
// MIT License (http://www.opensource.org/licenses/mit-license.html)
// See conSense.version and the Changelog for detailed version info.
// Currently supported browsers: latest Firefox, Chrome, Edge and probably all
// else. See the Documentation for details.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////
//
// Classes                              Instances
// ---------------------------------------------------------------------------
//
// ConSense.                            conSense
//      version                  c
//      debug
//      echo
//      verbose
//      commandLine
//      oldCommandLine
//      conSenseContainer
//      conSenseInnerContainer
//      conSenseHeader
//      conSenseHeaderSwitch
//      conSenseOut
//      conSenseIn
//      conSenseCounter
//      containerHeight
//      containerScrollTop
//      zTop                     c
//      scrollInfinite           c
//      visible
//      globalVisible
//      show                     c
//      hide                     c
//      toggle                   c
//      interfaceText
//      outlineColor
//      lastKeyEventType
//      commandHistory
//      commandHistoryPosition
//      currentlyTypedCommand
//      tabPixelSize             c
//      mapResultBuffer
//      mapTempObjects
//      mapTempObjectCounter
//      mapExcerptSize           c
//      mapShowConSense
//      mapShowEmptyTexts
//      lastWriteLn
//      separatorString
//      --------------------------
//      writeTitle()
//      clearScreen()
//      write()
//      writeLn()
//      writeManualEntry()
//      separator()
//      debugLn()
//      echoLn()
//      verboseLn()
//      getInput()
//      setInput()
//      appendInput()
//      highlight()
//      highlightAppendLink()
//      highlightLabelledAppendLink()
//      --------------------------
//      init()
//      updateCounter()
//      handleInput()
//      handleCommand()
//      showConsole()
//      scrollToBottomFocusInput()
//      globalShowConsole()
//      --------------------------
//      toObject()
//      listObject()
//      listObjectStyle()
//      outlineDOMElement()
//      outlineDOMElementsByTag()
//      outlineDOMSubtree()
//      tabulator()
//      mapAppendObjectLink()
//      mapDOMSubtree()
//      mapDynamicCSS()
//      listCSS()
//      listCSS_getFormattedRule()
//      listCSS_HandleStyleNode()
//      listCSS_HandleLinkNode()
//      license()
//      help()
//
// clear()
// debug()
// help()
// license()
// list()
// inspect()
// listCSS()
// listStyle()
// load()
// map()
// mapCSS()
// outline()
// outlineAll()
// outlineSub()
// write()
//
// (* stands for constructor parameter) 
// (c stands for constant)
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// KNOWN BUGS
//////////////////////////////////////////////////////////////////////////////
//
// B0 The ignorance of IE regarding z-indexes causes severe rendering bugs
//    here and there (widgets float on top of the console). Since it is
//    hardcoded into IE6 nothing can be done.
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Notes:
//////////////////////////////////////////////////////////////////////////////
//
// Uses
//      (look in conSenseStub*.js)
//
//////////////////////////////////////////////////////////////////////////////
//
// HTML elements and corresponding CSS ids/classes:
//
// id                           field
// --------------------------------------------------------
// conSenseContainer
// conSenseInnerContainer
// conSenseHeader
// conSenseHeaderSwitch
// conSenseOut                  output
// conSenseIn                   command line
// conSenseCounter              command line length counter
// conSenseHighlight
// conSenseHighlightAppendLink
// conSenseManualEntry
// conSenseManualEntryHead
//
//////////////////////////////////////////////////////////////////////////////
//
// Incremental text search not needed due to existing browser functionality.
//
//////////////////////////////////////////////////////////////////////////////

'use strict';

//----------------------------------------------------------------------------
// ConSense class
//----------------------------------------------------------------------------

class ConSense
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // ConSense                                            Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = "1.16";

        // Toggle debug operation
        this.debug = true;

        // Toggle echo mode
        this.echo = true;

        // Toggle verbose mode
        this.verbose = true;

        // Command string
        this.commandLine = "";
        // For handleInput()
        this.oldCommandLine = "";

        // UI DOM elements
        this.conSenseContainer = undefined;
        this.conSenseInnerContainer = undefined;
        this.conSenseHeader = undefined;
        this.conSenseHeaderSwitch = undefined;
        this.conSenseOut = undefined;
        this.conSenseIn = undefined;
        this.conSenseCounter = undefined;

        this.containerHeight = undefined;
        this.containerScrollTop = undefined;

        // Top Z index
        this.zTop = 2000000001;
        this.scrollInfinite = 1000000000;

        this.show = true;
        this.hide = false;

        // Indicates ConSense visibility - show by default
        this.visible = this.show;
        this.globalVisible = this.show;

        // Indicates toggle mode for show functions
        this.toggle = "toggle";

        // Array of all interface texts
        this.interfaceText =
            {
                showConsoleButton: "Show",
                hideConsoleButton: "Hide"
            };

        // Used for DOM element outlining
        this.outlineColor = "red";

        // Used in handleInput()
        this.lastKeyEventType = "deadbeef";

        this.commandHistory = [];
        this.commandHistoryPosition = 0;
        this.currentlyTypedCommand = "";

        this.tabPixelSize = 20;

        // mapDOMSubtree() variables
        // noinspection JSUnusedGlobalSymbols
        this.mapResultBuffer = undefined;
        this.mapTempObjects = undefined;
        this.mapTempObjectCounter = 0;
        this.mapExcerptSize = 40;
        this.mapShowConSense = false;       // Details in help()
        this.mapShowEmptyTexts = false;

        this.lastWriteLn = "";
        this.separatorString = "===============================";
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------
    // Fields
    //------------------------------------------------------------------------


    //------------------------------------------------------------------------
    // Input/Output methods
    //------------------------------------------------------------------------

    // ConSense
    writeTitle()
    {
        this.writeLn("Type " + conSense.highlightAppendLink("help()")
            + " + Enter for usage information.");
    }

    //------------------------------------------------------------------------

    // ConSense
    clearScreen()
    {
        this.conSenseOut.innerHTML = "";
        this.writeTitle();
    }

    //------------------------------------------------------------------------

    // ConSense
    write(str)
    {
        this.conSenseOut.innerHTML += str;
    }

    //------------------------------------------------------------------------

    // ConSense
    writeLn(str)
    {
        this.lastWriteLn = str;
        this.conSenseOut.innerHTML += str + "<br />";
    }

    //------------------------------------------------------------------------

    // ConSense
    writeManualEntry(name, str)
    {
        if (name !== "")
        {
            this.conSenseOut.innerHTML
                += "<div class='conSenseManualEntry'>"
                + "<span class='conSenseManualEntryHead'>"
                + conSense.highlightAppendLink(name)
                + "</span> " + str + "</div>";
        }
        else
        {
            this.conSenseOut.innerHTML
                += "<div class='conSenseManualEntry'>"
                + "<span class='conSenseManualEntryHead'>"
                + "</span> " + str + "</div>";
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    separator()
    {
        if (this.lastWriteLn !== this.separatorString)
        {
            this.writeLn(this.separatorString);
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    debugLn(value0, value1)
    {
        if (this.debug)
        {
            let now = new Date();

            if (value0 === undefined)
            {
                value0 = "";
            }
            if (value1 === undefined)
            {
                value1 = "";
            }

            this.writeLn(
                "("
                + now.format("HH:mm:ss")
                + ") *" + value0
                + "* *" + value1 + "*");
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    echoLn(str)
    {
        if (this.echo)
        {
            this.writeLn("[echo: " + this.highlightAppendLink(str) + "]");
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    verboseLn(str)
    {
        if (this.verbose && str !== undefined)
        {
            this.writeLn("[result: " + str + "]");
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    getInput()
    {
        return simpleUtils.trimString(this.conSenseIn.value);
    }

    //------------------------------------------------------------------------

    // ConSense
    setInput(str)
    {
        this.conSenseIn.value = str;
    }

    //------------------------------------------------------------------------

    // ConSense
    // Not just generic append string!
    // noinspection JSUnusedGlobalSymbols
    appendInput(str)
    {
        if (this.conSenseIn.value.length === 0)
        {
            this.conSenseIn.value += str;
        }
        else
        {
            this.conSenseIn.value += " " + str;
        }
        this.scrollToBottomFocusInput();
    }

    //------------------------------------------------------------------------

    // ConSense
    // Return highlighted HTML string.
    // Uses conSenseHighlight style.
    highlight(str)
    {
        return "<span class='conSenseHighlight'>&nbsp;" + str
                    + "&nbsp;</span>";
    }

    //------------------------------------------------------------------------

    // ConSense
    // Return highlighted HTML append link string.
    // Uses conSenseHighlightAppendLink style.
    highlightAppendLink(str)
    {
        // *ENV* stub.relativeConSensePath
        return "<a class='conSenseHighlightAppendLink' href='javascript:conSense.appendInput(\""
                    + str.replace(/"/g, "\\\"") + "\")'>"
                    + "<img src='" + stub.relativeConSensePath + "conSense/images/orangeArrow.png' style='border: 0;'>"
                    + simpleUtils.HTML2Source(str) + "</a>";
    }

    //------------------------------------------------------------------------

    // ConSense
    // Return highlighted HTML append link string.
    // Uses conSenseHighlightAppendLink style.
    highlightLabelledAppendLink(label, str)
    {
        return "<a class='conSenseHighlightAppendLink' href='javascript:conSense.appendInput(\""
                    + str.replace(/"/g, "\\\"") + "\")'>"
                    + label + "</a>";
    }

    //------------------------------------------------------------------------
    // Core methods
    //------------------------------------------------------------------------

    // ConSense
    init(show, startXPos, startYPos)
    {
        simpleUtils.checkBrowser();

        //--------------------------------------------------------------------
        // Non-ConSense init
        
        // For RedSandGenericLoader load indication
        // *ENV* stub.relativeConSensePath
        document.body.innerHTML +=
            '<!-- RedSand -->\
            <div id="loadIndicator" class="loadIndicator">\
                <img src="' + stub.relativeConSensePath + 'conSense/images/loader.gif" style="border: 0;">\
            </div>\
            <div id="inputBlocker" class="inputBlocker">\
            </div>\
            <!-- End of RedSand -->';
        
        //--------------------------------------------------------------------
        // Con-Sense-specific init
        
        if (startXPos === undefined)
        {
            startXPos = "20px";
        }
        if (startYPos === undefined)
        {
            startYPos = "20px";
        }

        //--------------------------------------------------------------------
        
        // Interface created with innerHTML instead of createElement() because
        // of maintainability reasons
        document.body.innerHTML +=
            '<!-- ConSense -->\
            <div id="conSenseContainer" class="conSenseContainer">\
                <div id="conSenseHeader" class="conSenseHeader">\
                    Loading ConSense...\
                </div>\
                <div id="conSenseHeaderSwitch" class="conSenseHeaderSwitch"\
                    onClick="conSense.showConsole(conSense.toggle)"\
                >\
                    &nbsp;\
                </div>\
                <div id="conSenseInnerContainer" class="conSenseInnerContainer"\
                    onScroll="conSense.containerScrollTop = conSense.conSenseInnerContainer.scrollTop"\
                >\
                    <form>\
                        <div id="conSenseOut" class="conSenseOut"\
                            onDblClick="conSense.scrollToBottomFocusInput()"\
                        >\
                        </div>\
                        <input id="conSenseIn" class="conSenseIn"\
                            onKeyDown="conSense.handleInput(event, \'down\')"\
                            onKeyPress="conSense.handleInput(event, \'press\')"\
                            onKeyUp="conSense.handleInput(event, \'up\')"\
                            type="text" maxlength="1000" size="1000" />\
                        <input id="conSenseCounter" class="conSenseCounter" type="text" maxlength="4" size="4" readonly />\
                    </form>\
                </div>\
            </div>\
            <!-- End of ConSense -->';

        //--------------------------------------------------------------------

        // Interface elements
        // *NAMING*
        
        this.conSenseContainer
                = simpleUtils.getDOMElement("conSenseContainer");
        this.conSenseInnerContainer
                = simpleUtils.getDOMElement("conSenseInnerContainer");
        this.conSenseHeader
                = simpleUtils.getDOMElement("conSenseHeader");
        this.conSenseHeaderSwitch
                = simpleUtils.getDOMElement("conSenseHeaderSwitch");
        this.conSenseOut     = simpleUtils.getDOMElement("conSenseOut");
        this.conSenseIn      = simpleUtils.getDOMElement("conSenseIn");
        this.conSenseCounter = simpleUtils.getDOMElement("conSenseCounter");

        //--------------------------------------------------------------------

        // Used for show/hide
        this.containerHeight = this.conSenseInnerContainer.style.height;
        // this.innerContainerHeight = this.conSenseInnerContainer.style.height;

        this.conSenseHeader.innerHTML = "ConSense v" + this.version;
        this.showConsole(show);
        this.globalShowConsole(show);

        this.writeTitle();
        this.separator();
        this.updateCounter();

        this.scrollToBottomFocusInput();

        this.conSenseContainer.style.zIndex = "" + this.zTop;
        this.conSenseContainer.style.left = startXPos + "px";    // "px" for HTML5
        this.conSenseContainer.style.top = startYPos + "px";
        
        //--------------------------------------------------------------------

        // Make conSenseContainer draggable in the range of
        simpleUtils.draggable(this.conSenseHeader, this.conSenseContainer);

        //--------------------------------------------------------------------

        // Keyboard shortcut to show/hide the ConSense console
        kd.K.press(function (evt) {
            if (evt.altKey && evt.shiftKey)
            {
                conSense.showConsole(conSense.toggle);
                conSense.globalShowConsole(conSense.toggle);
                conSense.scrollToBottomFocusInput();
            }
        });
    }

    //------------------------------------------------------------------------

    // ConSense
    updateCounter()
    {
        this.conSenseCounter.value = this.conSenseIn.value.length;
    }

    //------------------------------------------------------------------------

    // ConSense
    // Valid key event types: down, press, up
    handleInput(event, type)
    {
        let thisEvent = (simpleUtils.getKeyName(event));

        //--------------------------------------------------------------------
        if (thisEvent === "Enter"
            && this.lastKeyEventType === "press")
        {
            this.handleCommand();
        }
        //--------------------------------------------------------------------
        else if (thisEvent === "Arrow Up"
            && this.lastKeyEventType === "down")
        {
            if (this.commandHistoryPosition === this.commandHistory.length)
            {
                this.currentlyTypedCommand = this.getInput();
            }
            if (this.commandHistoryPosition > 0)
            {
                this.commandHistoryPosition--;
                this.setInput(
                    this.commandHistory[this.commandHistoryPosition]);
            }
        }
        //--------------------------------------------------------------------
        else if (thisEvent === "Arrow Down"
            && this.lastKeyEventType === "down")
        {
            if (this.commandHistoryPosition === this.commandHistory.length-1)
            {
                this.commandHistoryPosition++;
                this.setInput(this.currentlyTypedCommand);
            }
            else if (this.commandHistoryPosition < this.commandHistory.length-1)
            {
                this.commandHistoryPosition++;
                this.setInput(
                    this.commandHistory[this.commandHistoryPosition]);
            }
        }
        //--------------------------------------------------------------------
        // Typing
        else if (this.getInput() !== this.oldCommandLine)
        {
            this.commandHistoryPosition = this.commandHistory.length;
        }

        this.updateCounter();
        this.lastKeyEventType = type;
        this.oldCommandLine = this.getInput();
    }

    //------------------------------------------------------------------------

    // ConSense
    handleCommand()
    {
        // Split the trimmed input line by whitespaces
        // this.commandLine = this.getInput().split(/\s+/);

        // Simply copy trimmed input line
        this.commandLine = this.getInput();
        
        // Maintain command history
        this.commandHistory.push(this.commandLine);
        this.commandHistoryPosition = this.commandHistory.length;

        this.setInput("");
        this.updateCounter();

        this.echoLn(this.commandLine);

        // Evaluate command line as JavaScript code
        try
        {
            let result = eval(this.commandLine);
            this.verboseLn(result);
        }
        catch(ex)
        {
            this.writeLn(">>> JavaScript exception: " + ex);
            this.listObject(ex);
        }

        this.separator();

        this.scrollToBottomFocusInput();
    }

    //------------------------------------------------------------------------

    // ConSense
    // *VALUES*
    showConsole(show)
    {
        // Toggle
        if (show === conSense.toggle)
        {
            if (this.visible)
            {
                this.showConsole(this.hide);
            }
            else
            {
                this.showConsole(this.show);
            }
        }
        // Show
        else if (show)
        {
            this.visible = show;
            this.conSenseHeaderSwitch.innerHTML
                = this.interfaceText.hideConsoleButton;
            this.conSenseContainer.style.height = this.containerHeight;
            this.conSenseInnerContainer.style.display = "block";
            this.conSenseInnerContainer.scrollTop = this.containerScrollTop;
        }
        // Hide
        else
        {
            this.visible = show;
            this.conSenseHeaderSwitch.innerHTML
                = this.interfaceText.showConsoleButton;
            this.conSenseInnerContainer.style.display = "none";
            // According to header background pixmap dimensions
            // *VALUES*
            this.conSenseContainer.style.height = "21px";
        }
    }
    
    //------------------------------------------------------------------------

    // ConSense
    scrollToBottomFocusInput()
    {
        // For the case of appended commands or any other kind of input line
        // manipulation
        this.updateCounter();

        // *WORKAROUND*
        // Double scroll before and after focus to avoid IE flickering
        this.conSenseInnerContainer.scrollTop = this.scrollInfinite;
        if (this.visible && this.globalVisible)
        {
            this.conSenseIn.focus();
            this.conSenseInnerContainer.scrollTop = this.scrollInfinite;
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    globalShowConsole(show)
    {
        // Toggle
        if (show === conSense.toggle)
        {
            if (this.globalVisible)
            {
                this.globalShowConsole(this.hide);
            }
            else
            {
                this.globalShowConsole(this.show);
            }
        }
        // Show
        else if (show)
        {
            this.globalVisible = show;
            this.conSenseContainer.style.display = "block";
            this.conSenseInnerContainer.scrollTop = this.containerScrollTop;
        }
        // Hide
        else
        {
            this.globalVisible = show;
            this.containerScrollTop = this.conSenseInnerContainer.scrollTop;
            this.conSenseContainer.style.display = "none";
        }
    }

    //------------------------------------------------------------------------
    // Utility methods
    //------------------------------------------------------------------------

    // Replacement of newlines and the like is not necessary in code listing
    // functions.

    //------------------------------------------------------------------------
    
    // ConSense
    listObject(obj)
    {
        obj = simpleUtils.toObject(obj);

        // List object
        for (let i in obj)
        {
            // Fix for exceptions caused by protected(?) items which would
            // stop listing (eg. in the document object)
            try
            {
                // noinspection JSUnfilteredForInLoop
                this.writeLn(this.highlight(i) + " - "
                    + simpleUtils.HTML2Source(obj[i]));
            }
            catch(ex)
            {
            }
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    listObjectStyle(obj)
    {
        obj = simpleUtils.toObject(obj);
        this.listObject(obj.style);
    }

    //------------------------------------------------------------------------
    
    // ConSense
    outlineDOMElement(obj)
    {
        obj = simpleUtils.toObject(obj);
        obj.style.border = "1px solid " + this.outlineColor;
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // tagName: eg. "div"
    outlineDOMElementsByTag(tagName)
    {
        let elements = document.getElementsByTagName(tagName);

        // Does not work as (let i in elements) in IE
        for (let i=0; i < elements.length; i++)
        {
            elements[i].style.border = "1px solid " + this.outlineColor;
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    outlineDOMSubtree(obj, level)
    {
        obj = simpleUtils.toObject(obj);
        if (level === undefined)
        {
            level = 0;
        }

        // Outline root node
        if (level === 0)
        {
            obj.style.border = "1px solid " + this.outlineColor;
        }

        // Outline children
        for (let i=0; i < obj.childNodes.length; i++)
        {
            let childNode = obj.childNodes[i];

            // Element nodes
            if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE)
            {
                childNode.style.border = "1px solid " + this.outlineColor;
            }

            // Dive further
            this.outlineDOMSubtree(childNode, level+1);
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // Private
    tabulator(times)
    {
        return "<span style='margin-left: "
            + times * this.tabPixelSize + "px'></span>";
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // Private
    // *GLOBAL*
    mapAppendObjectLink(childNode, level, i)
    {
        let index = "l" + level + "n" + i + "_" + this.mapTempObjectCounter++;
        this.mapTempObjects[index] = childNode;
        // noinspection JSUnusedGlobalSymbols
        this.mapResultBuffer
            += this.tabulator(level)
                + this.highlightLabelledAppendLink(
                    "(o)",
                    "conSense.mapTempObjects[\"" + index + "\"]")
                + (" ");
    }
    
    //------------------------------------------------------------------------
    
    // ConSense
    // *NAMING*, *GLOBAL*
    mapDOMSubtree(obj, level)
    {
        obj = simpleUtils.toObject(obj);
        if (level === undefined)
        {
            level = 0;
            // *GLOBAL*
            // noinspection JSUnusedGlobalSymbols
            this.mapResultBuffer = "";
            this.mapTempObjects = [];
            this.mapTempObjectCounter = 0;
        }

        for (let i=0; i < obj.childNodes.length; i++)
        {
            let childNode = obj.childNodes[i];
            // *GLOBAL*
            this.mapTempObjectCounter++;

            //----------------------------------------------------------------

            // Element node
            if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE)
            {
                let id = "";
                let className = "";

                // Temp object link
                this.mapAppendObjectLink(childNode, level, i);
                
                // id and class
                if (childNode.id)
                {
                    id = " id: " + this.highlightAppendLink(childNode.id);
                }

                if (childNode.className)
                {
                    className = " class: " + childNode.className;
                }

                // First line to display: tagname, id, class
                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer
                    += this.highlight(childNode.nodeName)
                        + id
                        + className
                        + "<br />";

                // Skip mapping conSenseContainer if indicated
                // *NAMING*
                if (childNode.id === "conSenseContainer"
                    && !this.mapShowConSense)
                {
                    // noinspection JSUnusedGlobalSymbols
                    this.mapResultBuffer
                        += this.tabulator(level)
                            + "(...)<br />";
                    continue;
                }

                // Display attributes if present - except id and class
                if (childNode.attributes)
                {
                    for (let j=0; j < childNode.attributes.length; j++)
                    {
                        if (childNode.attributes[j].specified)
                        {
                            if (childNode.attributes[j].nodeName !== "id"
                                && childNode.attributes[j].nodeName !== "class")
                            {
                                // noinspection JSUnusedGlobalSymbols
                                this.mapResultBuffer
                                    += this.tabulator(level)
                                        + childNode.attributes[j].nodeName
                                        + ": "
                                        + simpleUtils.HTML2Source(childNode.attributes[j].nodeValue)
                                        + "<br />";
                            }
                        }
                    }
                }
            }

            //----------------------------------------------------------------
            
            // Text node
            if (childNode.nodeType === simpleUtils.DOM_TEXT_NODE)
            {
                let excerpt = "";

                // Hide empty text nodes if indicated
                if (!this.mapShowEmptyTexts)
                {
                    let hide = true;
                    for (let j=0; j < childNode.nodeValue.length; j++)
                    {
                        if (childNode.nodeValue.charAt(j) !== "\n"
                            && childNode.nodeValue.charAt(j) !== "\t"
                            && childNode.nodeValue.charAt(j) !== " ")
                        {
                            hide = false;
                            break;
                        }
                    }
                    if (hide) continue;
        		}

                // Temp object link
                this.mapAppendObjectLink(childNode, level, i);
                
                // Show text
                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer += this.highlight("text");
                
                if (childNode.nodeValue.length > this.mapExcerptSize)
                {
                    excerpt
                        = childNode.nodeValue.substring(0, this.mapExcerptSize)
                            + " (...)";
                }
                else
                {
                    excerpt = childNode.nodeValue;
                }

                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer += " \"" + excerpt + "\"<br />";
            }

            //----------------------------------------------------------------

            // Comment node
            if (childNode.nodeType === simpleUtils.DOM_COMMENT_NODE)
            {
                let excerpt = "";

                // Temp object link
                this.mapAppendObjectLink(childNode, level, i);

                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer += this.highlight("comment");
                
                if (childNode.nodeValue.length > this.mapExcerptSize)
                {
                    excerpt
                        = childNode.nodeValue.substring(0, this.mapExcerptSize)
                            + " (...)";
                }
                else
                {
                    excerpt = childNode.nodeValue;
                }

                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer += " \"" + excerpt + "\"<br />";
            }

            //----------------------------------------------------------------

            // Document type node
            if (childNode.nodeType === simpleUtils.DOM_DOCUMENT_TYPE_NODE)
            {
                // Temp object link
                this.mapAppendObjectLink(childNode, level, i);

                // noinspection JSUnusedGlobalSymbols
                this.mapResultBuffer
                    += this.highlight("DOCTYPE")
                        + " "
                        + childNode.nodeName
                        + " PUBLIC \""
                        + childNode.publicId
                        + "\"<br />";
            }

            //----------------------------------------------------------------

            // Dive deeper
            this.mapDOMSubtree(childNode, level+1);
        }

        if (level === 0)
        {
            this.write(this.mapResultBuffer);
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // Lists all inline and dynamic style definitions of an object.
    // *GLOBAL*
    mapDynamicCSS(obj, level)
    {
        obj = simpleUtils.toObject(obj);
        let id = "";
        let className = "";
        let cssTextRows;

        // First iteration only
        if (level === undefined)
        {
            level = 0;
        }

        let deepestLevel;
        
        // Iterate until root
        if (obj !== document.body
            && obj.parentNode)
        {
            this.mapDynamicCSS(obj.parentNode, level+1);
        }
        else
        {
            // Global variable
            deepestLevel = level;
        }

        // Text nodes have no style properties
        if (obj.nodeName.toUpperCase() === "#TEXT")
        {
            this.writeLn(this.tabulator(deepestLevel - level)
                + this.highlight(obj.nodeName));
            return;
        }

        //--------------------------------------------------------------------

        // Write nodeName, id, class and dynamic style info from root down to
        // the parameter element

        this.write(this.tabulator(deepestLevel - level)
            + this.highlight(obj.nodeName));

        if (obj.id)
        {
            id = " id: " + this.highlightAppendLink(obj.id);
        }

        if (obj.className)
        {
            className = " class: " + obj.className;
        }

        this.writeLn(id + className);

        //--------------------------------------------------------------------

        // Dynamic style settings
        if (obj.style.cssText)
        {
            cssTextRows = obj.style.cssText.split(";");
            for (let i=0; i < cssTextRows.length; i++)
            {
                if (cssTextRows[i].length)
                {
                    this.writeLn(this.tabulator(deepestLevel - level)
                        + cssTextRows[i] + ";");
                }
            }
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    // Lists full static CSS info of the page
    listCSS()
    {
        // Looking up CSS definitions in document

        let headNode = false;

        // Locate document/HTML/HEAD
        for (let i=0; i < document.childNodes.length; i++)
        {
            let childNode = document.childNodes[i];

            if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE
                && childNode.nodeName.toUpperCase() === "HTML")
            {
                // HTML found
                let foundNode = childNode;

                for (let j=0; j < foundNode.childNodes.length; j++)
                {
                    childNode = foundNode.childNodes[j];

                    if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE
                        && childNode.nodeName.toUpperCase() === "HEAD")
                    {
                        // HEAD found, headNode set
                        headNode = childNode;
                    }
                }
            }
        }

        // Browse head for css link and style entries
        if (headNode)
        {
            for (let i=0; i < headNode.childNodes.length; i++)
            {
                let childNode = headNode.childNodes[i];

                if (childNode.nodeType === simpleUtils.DOM_ELEMENT_NODE)
                {
                    if (childNode.nodeName.toUpperCase() === "STYLE")
                    {
                        this.listCSS_HandleStyleNode(childNode);
                    }

                    if (childNode.nodeName.toUpperCase() === "LINK")
                    {
                        this.listCSS_HandleLinkNode(childNode);
                    }
                }
            }
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    // Returns array of formatted CSS rule block lines.
    // Private
    listCSS_getFormattedRule(ruleString)
    {
        let lines = [];

        // For STYLE blocks
        if (simpleUtils.trimString(ruleString).search("\n") > 0)
        {
            lines = simpleUtils.trimString(ruleString).split(/\n/);
        }
        // For LINK blocks
        else
        {
            lines = simpleUtils.trimString(ruleString).split(/;/);
        }

        for (let i=0; i < lines.length; i++)
        {
            let tab = "";

            if (lines[i].search(/{/) > 0)
            {
            }
            else if (simpleUtils.trimString(lines[i]) === "}")
            {
            }
            else
            {
                tab = this.tabulator(1);
            }
            
            lines[i] = tab + lines[i];
        }

        return lines;
    }

    //------------------------------------------------------------------------

    // ConSense
    // Private
    listCSS_HandleStyleNode(node)
    {
        let lines;

        // Firefox
        if (node.textContent)
        {
            lines = this.listCSS_getFormattedRule(node.textContent);
        }
        // IE
        else if (node.innerHTML)
        {
            lines = this.listCSS_getFormattedRule(node.innerHTML);
        }
        else
        {
            return;
        }
            
        this.writeLn("/* STYLE node */");

        for (let i=0; i < lines.length; i++)
        {
            this.writeLn(lines[i]);
        }
    }

    //------------------------------------------------------------------------

    // ConSense
    // Private
    listCSS_HandleLinkNode(node)
    {
        if (node.rel.toUpperCase() === "STYLESHEET"
            || node.type.toUpperCase() === "TEXT/CSS")
        {
            this.writeLn("/* LINK node: " + node.href + " */");

            //----------------------------------------------------------------
            // Firefox
            if (node.sheet)
            {
                for (let i=0; i < node.sheet.cssRules.length; i++)
                {
                    let lines = this.listCSS_getFormattedRule(
                                    node.sheet.cssRules[i].cssText);

                    for (let j=0; j < lines.length; j++)
                    {
                        if (lines[j].search("{") > 0)
                        {
                            let sublines = lines[j].split(/{/);

                            // Bad entry, simply dump to the screen
                            if (sublines.length !== 2)
                            {
                                this.writeLn(lines[j] + ";");
                            }

                            // Good entry
                            this.writeLn(sublines[0] + " {");
                            this.writeLn(this.tabulator(1)
                                + simpleUtils.trimString(sublines[1]) + ";");
                        }
                        else
                        {
                            if (simpleUtils.trimString(lines[j]) === "}")
                            {
                                this.writeLn(lines[j]);
                            }
                            else
                            {
                                this.writeLn(lines[j] + ";");
                            }
                        }
                    }
                }
            }
            //----------------------------------------------------------------
            // IE
            else if (node.styleSheet)
            {
                // Deprecated symbol intentionally used for IE
                // noinspection JSDeprecatedSymbols
                let lines = this.listCSS_getFormattedRule(
                                node.styleSheet.cssText);

                for (let i=0; i < lines.length; i++)
                {
                    if (lines[i].search("{") > 0)
                    {
                        let sublines = lines[i].split(/{/);

                        this.writeLn(sublines[0] + " {");
                    }
                    else
                    {
                        if (simpleUtils.trimString(lines[i]) === "}")
                        {
                            this.writeLn(lines[i]);
                        }
                        else
                        {
                            let sublines =
                                simpleUtils.trimString(lines[i]).split(/;/);

                            for (let j=0; j < sublines.length; j++)
                            {
                                let tab = "";

                                if (j > 0)
                                {
                                    tab = this.tabulator(1);
                                }

                                this.writeLn(tab + sublines[j] + ";");
                            }
                        }
                    }
                }
            }
        }
    }

    //------------------------------------------------------------------------
    
    // ConSense
    license()
    {
        this.writeLn("The ConSense MIT-like license:<br />");
        this.writeLn("---license---");
        this.writeLn("Copyright (c) 2005-2008 Bal&aacute;zs T&oacute;th (contact dot consense at gmail dot com)<br />");
        this.writeLn("Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br />");
        this.writeLn("The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br />");
        this.writeLn("THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.");
        this.writeLn("---end of license---<br />");
        this.writeLn("For the third-party library licenses please see the documentation.");
    }

    //------------------------------------------------------------------------

    // ConSense
    help()
    {
        this.writeLn("Command shorthands:");
        this.writeManualEntry("", "All obj parameters may be JavaScript/DOM object references or DOM id strings (eg. conSenseIn or \"conSenseIn\").");
        this.writeManualEntry("clear()", "clears screen");
        this.writeManualEntry("debug(value0, value1)", "shorthand for conSense.debugLn(value0, value1), writes a minimal, timestamped debug message. " + this.highlightAppendLink("conSense.debug") + " toggles output.");
        this.writeManualEntry("help()", "");
        this.writeManualEntry("list(obj)", " or " + this.highlightAppendLink("inspect(obj)") + " shorthand for conSense.listObject(obj), lists object members");
        this.writeManualEntry("listCSS()", "shorthand for conSense.listCSS(), lists full static CSS info of the page");
        this.writeManualEntry("listStyle(obj)", "shorthand for conSense.listObjectStyle(obj), lists the style member of an object");
        this.writeManualEntry("load(uri, callback)", "shorthand for redSandGenericLoader.load(uri, callback), loads external content identified by uri. If no callback is defined, redSandGenericLoader.JavaScriptEvaluatorCallback() is invoked. Asynchronous operation, execution takes place on finished loading. Use \"browsable\" file extensions, eg. .txt for your external files.");
        this.writeManualEntry("map(obj)", "shorthand for conSense.mapDOMSubtree(obj), maps the subtree of a DOM element. Set " + conSense.highlightAppendLink("conSense.mapShowEmptyTexts") + " to display empty text nodes. Set " + conSense.highlightAppendLink("conSense.mapShowConSense") + " to expand conSenseContainer in higher level perspectives. Click (o) for a temporary representation of an object valid until next mapping. map() defaults to document if no parameter is passed.");
        this.writeManualEntry("mapCSS(obj)", "shorthand for conSense.mapDynamicCSS(obj), lists the element's and its predecessors' inline and dynamic style info up to the root");
        this.writeManualEntry("outline(obj)", "shorthand for conSense.outlineDOMElement(obj), draws with " + this.highlightAppendLink("conSense.outlineColor"));
        this.writeManualEntry("outlineAll(tagName)", "shorthand for conSense.outlineDOMElementsByTag(tagName), draws with " + this.highlightAppendLink("conSense.outlineColor") + ", tagName stands for an HTML tag");
        this.writeManualEntry("outlineSub(obj)", "shorthand for conSense.outlineDOMSubtree(obj), outlines a subtree of the DOM rooting out of the parameter element. Draws with " + this.highlightAppendLink("conSense.outlineColor") + ".");
        this.writeManualEntry("write(value)", "");
        this.writeLn("To enumerate ConSense functions call " + this.highlightAppendLink("list(conSense)") + ".");
        this.writeLn("To enumerate SimpleDebug functions call " + this.highlightAppendLink("list(simpleDebug)") + ".");
        this.writeLn("To enumerate SimpleUtilities functions call " + this.highlightAppendLink("list(simpleUtils)") + ".");
        this.writeLn("To enumerate SimpleCryptography functions call " + this.highlightAppendLink("list(simpleCrypto)") + ".");
        this.writeLn("Otherwise all JavaScript expressions are accepted.");
        this.writeLn(this.highlight("This") + " style is used for simple highlighting and " + this.highlightAppendLink("this") + " is a clickable autoappend input string.");
        this.writeLn("Doubleclicking the output area focuses the input line. Up/down arrow keys control command history.");
        this.writeLn("Works best with Firefox 1.5+ and IE 6.0+.");
        this.writeLn("ConSense is (c) 2005-2007 Bal&aacute;zs T&oacute;th. See " + this.highlightAppendLink("license()") + " for details.");
    }

}

//----------------------------------------------------------------------------
// Initialization
//----------------------------------------------------------------------------

// Instantiate ConSense
const conSense = new ConSense();

//----------------------------------------------------------------------------
// Commands
//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function clear()
{
    conSense.clearScreen();
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function debug(value0, value1)
{
    conSense.debugLn(value0, value1);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function help()
{
    conSense.help();
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
function license()
{
    conSense.license();
}

//----------------------------------------------------------------------------

// Both commands for the same function

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function list(obj)
{
    conSense.listObject(obj);
}

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function inspect(obj)
{
    conSense.listObject(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function listCSS()
{
    conSense.listCSS();
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function listStyle(obj)
{
    conSense.listObjectStyle(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// *DEPENDENCY*
// GLOBAL
// redSandGenericLoader
function load(uri, callback)
{
    redSandGenericLoader.load(uri, callback);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function map(obj)
{
    if (obj === undefined)
    {
        obj = document;
    }
    conSense.mapDOMSubtree(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function mapCSS(obj)
{
    conSense.mapDynamicCSS(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function outline(obj)
{
    conSense.outlineDOMElement(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function outlineAll(tagName)
{
    conSense.outlineDOMElementsByTag(tagName);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
// noinspection JSUnusedGlobalSymbols
function outlineSub(obj)
{
    conSense.outlineDOMSubtree(obj);
}

//----------------------------------------------------------------------------

// ConSense command
// GLOBAL
function write(value)
{
    conSense.writeLn(value);
}
