//////////////////////////////////////////////////////////////////////////////
// RedSand dynamic JavaScript toolkit by Toth, Balazs Aladar (c) 2005-2018
// For detailed licensing information see conSense.js.
// See redSandVersion and the changelog for detailed version info.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

'use strict';

//----------------------------------------------------------------------------
// Globals
//----------------------------------------------------------------------------

const redSandVersion = "0.46";

//----------------------------------------------------------------------------
// RedSandUtilities
//----------------------------------------------------------------------------

class RedSandUtilities
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandUtilities                                    Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandUtilities
    // The second password is optional
    generateCredentials(encodePassword, packetPassword)
    {
        if (packetPassword === undefined) {
            packetPassword = encodePassword;
        }
        let encodePasswordHash = simpleCrypto.SHA1(encodePassword);
        let packetPasswordHash = simpleCrypto.SHA1(packetPassword);
        let thisDate = new Date().format("YYYY-MM-DD HH:mm:ss");
        let randomString = simpleCrypto.generateRandomString(16);

        let credentialsPackage
            = simpleCrypto.base64Encode(
                simpleCrypto.RC4Encrypt(
                    encodePasswordHash, packetPasswordHash + thisDate + randomString));

        return credentialsPackage;
    }

    //------------------------------------------------------------------------

    // RedSandUtilities
    // Appends userId and RC4 encrypted, URL encoded credentials parameter to
    // the params list and returns URI.
    // Params:
    //      uri - base URI
    //      params - existing parameter list, may be null
    //      userIdentifier
    //      password
    // Returns "deadbeef" on error.
    formAuthenticatedURI(uri, params, userId, password)
    {
        let credentialsPackage = this.generateCredentials(password, password);

        if (params === null)
        {
            uri = simpleUtils.formURI(uri,
                {
                    "userIdentifier": userId,
                    "credentials": credentialsPackage
                });
        }
        else
        {
            // TODO: more thorough params list type/format checking
            if (typeof(params) !== "object")
            {
                return uri;
            }
            params.userIdentifier = userId;
            params.credentials = credentialsPackage;
            uri = simpleUtils.formURI(uri, params);
        }

        return uri;
    }

    //------------------------------------------------------------------------

    // RedSandUtilities
    // Screen blocker div
    blockInput(color)
    {
        if (color === undefined) {
            color = "blue";
        }
        simpleUtils.getDOMElement("inputBlocker").style.background = color;
        simpleUtils.getDOMElement("inputBlocker").style.display = "block";
    }

    //------------------------------------------------------------------------

    // RedSandUtilities
    // Remove screen blocker div
    unblockInput()
    {
        simpleUtils.getDOMElement("inputBlocker").style.display = "none";
    }
}

//----------------------------------------------------------------------------
// RedSandGenericLoader
//----------------------------------------------------------------------------

// *DEPENDENCY*
// Uses conSenseContainer as parent for loader divs.
// Uses conSense console methods.
class RedSandGenericLoader
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandGenericLoader                                Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.containers = [];
        this.frameNames = [];
        this.callbacks = [];
        // Loading process counter
        this.lastProcess = 0;

        // Green point. To recycle already used loader divs.
        this.oldContainerPool = [];

        //------------------------------------------------------------------------
        // Load indication

        // Trigger
        this.indicate = true;

        // Number of loading processes in queue
        this.loadsInProgress = 0;
        //////////////////////////////////////////////////////////////////////
    }

    showIndicator() {
        if (!redSandGenericLoader.indicate) {
            return;
        }
        redSandGenericLoader.loadsInProgress++;
        if (redSandGenericLoader.loadsInProgress === 1)
        {
            simpleUtils.getDOMElement("loadIndicator").style.display = "block";
        }
    }

    hideIndicator() {
        if (!redSandGenericLoader.indicate) {
            return;
        }
        redSandGenericLoader.loadsInProgress--;
        if (redSandGenericLoader.loadsInProgress === 0)
        {
            simpleUtils.getDOMElement("loadIndicator").style.display = "none";
        }
    }

    //------------------------------------------------------------------------

    // RedSandGenericLoader
    // If no callback is given, loaded content is evaluated as JavaScript
    // source
    load(uri, callback)
    {
        this.showIndicator();

        conSense.writeLn("[load request: " + uri + "]");
        
        // Evaluate loaded content as JavaScript source
        if (callback === undefined)
        {
            callback = redSandGenericLoader.javaScriptEvaluatorCallback;
        }

        // Callbacks
        this.callbacks.push(callback);

        if (this.oldContainerPool.length)
        {
            // Recycle old loader div if possible
            this.containers.push(this.oldContainerPool.pop());
        }
        else
        {
            // Create loader div "RedSandRegistryContainerNNN" if necessary
            let newContainer = document.createElement('div');
            newContainer.setAttribute(
                "id", "RedSandRegistryContainer" + this.lastProcess);
            newContainer.style.display = "none";
            conSense.conSenseContainer.appendChild(newContainer);

            this.containers.push(newContainer);
        }

        let uriRandom = uri + simpleUtils.randomSuffix();

        // Create loader IFrame "RedSandRegistryNNN" if necessary
        this.frameNames.push("RedSandRegistry" + this.lastProcess);

        this.containers[this.lastProcess].innerHTML
            = "<iframe name='"
            + this.frameNames[this.lastProcess]
            + "' id='"
            + this.frameNames[this.lastProcess]
            + "' onLoad='parent.redSandGenericLoader.loadedCallback("
            + this.lastProcess
            + ")' src='"
            + uriRandom
            + "' style='width: 0px; height: 0px; border: 0px;'></iframe>";
    }
    
    //------------------------------------------------------------------------

    // RedSandGenericLoader
    // Receives an index of loader arrays
    loadedCallback(processNum)
    {
        let content = "deadbeef";

        // Firefox
        if (window.frames[this.frameNames[processNum]].document.body.innerText === undefined)
        {
            // Firefox 1.5
            if (window.frames[this.frameNames[processNum]].document.body.textContent === undefined)
            {
                content = window.frames[this.frameNames[processNum]].document.body.innerHTML;
            }
            // Firefox 2.0
            else
            {
                content = window.frames[this.frameNames[processNum]].document.body.textContent;
            }
        }
        // IE
        else
        {
            content = window.frames[this.frameNames[processNum]].document.body.innerText;
        }

        let callback = this.callbacks[processNum];
        this.callbacks[processNum] = undefined;

        // Recycle old loader container DOM elements
        this.oldContainerPool.push(this.containers[processNum]);
        this.containers[processNum] = undefined;
        this.frameNames[processNum] = undefined;

        // Process counter increment, now that the loading finished
        this.lastProcess++;

        // Handle content
        conSense.scrollToBottomFocusInput();
        // User callback with loaded content as parameter
        callback(content);

        this.hideIndicator();

        conSense.separator();
        conSense.scrollToBottomFocusInput();
    }

    //------------------------------------------------------------------------

    // RedSandGenericLoader
    javaScriptEvaluatorCallback(content)
    {
        try
        {
            eval(content);
        }
        catch(ex)
        {
            conSense.writeLn(">>> JavaScript exception: " + ex);
            conSense.listObject(ex);
        }

        conSense.separator();
        conSense.scrollToBottomFocusInput();
    }
}

//----------------------------------------------------------------------------
// RedSandHashHandler
//----------------------------------------------------------------------------

class RedSandHashHandler
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandHashHandler                                  Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.hashSeparator = "#";
        this.paramSeparator = ";";
        this.equalsString = "=";

        this.lastHash = "deadbeef";

        this.defaultHash = "deadbeef";

        // onHashChanged() event registry
        // Format: "hashParameterName": callbackFunction
        this.eventRegistry = [];

        // Indicate if it is the first RedSandHashHandler.onHashChanged() call
        this.firstRun = true;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    addEvent(hashParameterName, callbackFunction)
    {
    	this.eventRegistry[hashParameterName] = callbackFunction;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    callback()
    {
        if (redSandHashHandler.changed())
        {
            redSandHashHandler.onHashChanged();
        }
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    onHashChanged()
    {
	    let params = this.processCurrentURIHash();
	    if (params === undefined) {
	        return;
	    }

        redSandHashHandler.updateNodeStyles();
	    
        for (let i in params) {
			// Bloody forEach()...
            // 2018: so many things that do work but might need beautifying
			if (i === "each" || i === "forEach") continue;
			for (let j in this.eventRegistry) {
				if (j === i) {
					// Callback found - do it for each found param -
					// passing along full parameter list every time
					this.eventRegistry[j](params);
				}
			}
		}

        //------------------------------------------------------------------------
        // Continuous hash change checking from the first run on
		if (this.firstRun !== undefined || this.firstRun === true)
		{
		    this.firstRun = false;

            // For IE8+, this is the current mode
            if (typeof(window.onhashchange) !== "undefined"
                && (document.documentMode === undefined || document.documentMode > 7))
            {
                window.onhashchange = this.callback;
            } else {
                // IE8- or IE8 compatibility mode
                window.setInterval(this.callback, 500);     // Used to be 100
            }
        }
    }
    
    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Returns a boolean.
    changed()
    {
        if (window.location.hash !== this.lastHash)
        {
            this.lastHash = window.location.hash;
            return true;
        }
        else
        {
            return false;
        }
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    setDefaultHash(hash)
    {
        this.defaultHash = hash;
        if (window.location.hash.length === 0)
        {
            // To avoid double loading when reloading with #
            this.lastHash = hash;
            // Setting window location hash
            window.location.hash = hash;
        }
        else
        {
            // To avoid double loading when reloading with #something
            this.lastHash = window.location.hash;
        }
        this.updateNodeStyles();
        this.onHashChanged();
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // {param0: "value0", param1: "value1", ...}
    //      --> "#param0=value0;param1=value1;..."
    array2Hash(params)
    {
        let hash = this.hashSeparator;   // hash = "#"

        for (let i in params)
        {
            // hash += "paramN=valueN;"
            // noinspection JSUnfilteredForInLoop
            hash += "" + i + this.equalsString + params[i] + this.paramSeparator;
        }

        // Cut trailing ; if present
        if (hash.length > 2)
        {
            hash = hash.substr(0, hash.length - this.paramSeparator.length);
        }

        return hash;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // "#param0=value0;param1=value1;..."
    //      --> {param0: "value0", param1: "value1", ...}
    // TODO: eliminate duplicated parameters
    hash2Array(hash)
    {
        // remove trailing paramSeparator if present
        if (hash.substr(hash.length - this.paramSeparator.length) === this.paramSeparator)
        {
            hash = hash.substr(0, hash.length - this.paramSeparator.length);
        }

        let params = [];
        // "#param0=value0;param1=value1;..."
        //      --> {"param0=value0", "param1=value1", ...}
        let paramsTemp
            = hash.substr(this.hashSeparator.length).split(this.paramSeparator);

        // {"param0=value0", "param1=value1", ...}
        //      --> {param0: "value0", param1: "value1", ...}
        for (let i = 0; i < paramsTemp.length; i++)
        {
            let splitInTwo = paramsTemp[i].split(this.equalsString);
            params[splitInTwo[0]] = splitInTwo[1];
        }

        return params;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Returns an array of anchors present in the document.
    getDocumentAnchors()
    {
        let anchors = [];

        for (let i = 0; i < document.anchors.length; i++)
        {
            anchors[this.hashSeparator + document.anchors[i].name] = true;
        }

        return anchors;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Verifies if the current URI hash is present in the document as an
    // anchor name. If not, the hash is processed as a URI parameter list and
    // the resulting *associative array* of parameter name-value pairs is
    // returned.
    // Otherwise the resulting value will be *undefined*.
    processCurrentURIHash()
    {
        let anchors = this.getDocumentAnchors();

        if (anchors[window.location.hash] === undefined)
        {
            // Return array
            return this.hash2Array(window.location.hash);
        }

        return undefined;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Helper function
    // Returns with the first matching menu item for which:
    // all link parameters are present in the menu item link.
    // *PRIVATE*
    menuContainsLink(menu, link)
    {
        for (let i in menu.items)
        {
            if (i === "each" || i === "forEach") continue;
            // noinspection JSUnfilteredForInLoop
            let itemParamArray = this.hash2Array(menu.items[i].link);
            let linkParamArray = this.hash2Array(link);
            let itemParamCount = 0;
            let matchCount = 0;
            // Parse through current item params
            for (let j in itemParamArray) {
            	if (j === "each"  || j === "forEach") continue;
            	itemParamCount++;
            	// Parse through link params
	            for (let k in linkParamArray) {
	                if (k === "each" || k === "forEach") continue;
                    // noinspection JSUnfilteredForInLoop
	                if (j === k && itemParamArray[j] === linkParamArray[k]) {
	                	matchCount++;
	                }
	            }
            }
            if (itemParamCount === matchCount) {
                // noinspection JSUnfilteredForInLoop
                return menu.items[i];
            }
        }
        
        return undefined;
    }

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Trigger visual effects defined by node.deselectedClassName and
    // node.selectedClassName
    updateNodeStyles()
    {
        for (let i in redSandRegistry.menus)
        {
            let menu = redSandRegistry.menus[i];
            if (!menu.items) continue;
            
            let item = this.menuContainsLink(menu, window.location.hash);
            if (item === undefined) continue;
            // Select new node
            simpleUtils.getDOMElement(item.DOMid).className = item.selectedClassName;
            // Deselect last node
            if ((menu.lastSelectedNode !== undefined)
                && (menu.lastSelectedNode !== item)) {
                    simpleUtils.getDOMElement(menu.lastSelectedNode.DOMid).className
                    	= menu.lastSelectedNode.deselectedClassName;
            }
            // Register new node as lastly selected
            menu.lastSelectedNode = item;
        }
    }

}

//----------------------------------------------------------------------------
// RedSandRegistry
//----------------------------------------------------------------------------

// Mainly a register class for load operations - the whole loading framework
// is fully functional without it.
class RedSandRegistry
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandRegistry                                     Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.menus = [];
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandRegistry
    // Returns a two dimensional array of RedSandNodes or undefined if no result.
    // Return format: nodes[menu] --> nodeArray
    findMenuNodesByLink(link)
    {
        let menuNodes = [];
        let empty = true;

        for (let i in this.menus)
        {
            let menu = this.menus[i];
            if (!menu.items) continue;
            let nodes = [];
            for (let j in menu.items)
            {
                // noinspection JSUnfilteredForInLoop
                let item = menu.items[j];
                if (!item.link) continue;
                if (item.link === link)
                {
                    nodes.push(item);
                }
            }
            if (nodes.length > 0) {
                menuNodes[menu.id] = nodes;
                empty = false;
            }
        }
        
        if (!empty) {
            return menuNodes;
        }
        return undefined;
    }

    //------------------------------------------------------------------------

    // RedSandRegistry
    addMenu(obj)
    {
        this.menus[obj.id] = obj;
    }

}

//----------------------------------------------------------------------------
// RedSandUITextManager
//----------------------------------------------------------------------------

// Class for handling dynamic UI text changes
class RedSandUITextManager
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandRegistry                                     Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        // Private
        // UI text registry with items like "DOMid; field; textId": textTable
        // eg.: "aboutBox; innerHTML; aboutUs": interfaceTexts
        this.registry = [];
        // Default UI text table. Used when creating new RedSandNodes.
        this.currentTable = undefined;

        // Text table field names
        this.fieldId = "id";
        this.fieldText = "text";
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandUITextManager
    // Initializes a text table to be used from/with UI text registry.
    // Changes table format from:  [{id, text}, ...]
    // to: [id: {id, text}, ...]
    // The table parameter may directly come as a result of a
    /*
        load(
            simpleUtils.formURI(
                "ConSense/server/php/scripts/dbSelectJSOutput.php",
                {
                    table: "rsuitexts",
                    id: "",
                    lang: globals.uiLanguage,
                    text: "",
                    resultName: "rsuitexts",
                    userIdentifier: "guest"
                }
            ),
            refreshUITextsCallback
        );
    */
    // call.
    initTextTable(table)
    {
        let newTable = simpleUtils.objectArray2objectHashTable(table, this.fieldId);

        // Mass liteDown()
        for (let i in newTable) {
            // noinspection JSUnfilteredForInLoop
            if (newTable[i][this.fieldText]) {
                // noinspection JSUnfilteredForInLoop
                newTable[i][this.fieldText] = simpleUtils.liteDown(newTable[i][this.fieldText]);
            }
        }

        return newTable;
    }

    //------------------------------------------------------------------------

    // RedSandUITextManager
    // Sets new UI text array for registry items and redisplays them
    setTextTable(table)
    {
        for (let i in this.registry) {
            // Skip if the textTable is empty
            if (this.registry[i] === undefined || typeof(this.registry[i]) !== "object") {
                continue;
            }
            this.registry[i] = table;
        }
        this.currentTable = table;
        this.refresh();
    }

    //------------------------------------------------------------------------

    // RedSandUITextManager
    setText(DOMid, field, textId)
    {
        // Skip display if textId is empty
        if (textId !== "") {
            let domElem = simpleUtils.getDOMElement(DOMid);
            if (domElem === undefined) return;
            domElem[field] = this.currentTable[textId][this.fieldText];
        }
        this.registry[DOMid + "; " + field + "; " + textId] = this.currentTable;
    }

    //------------------------------------------------------------------------

    // RedSandUITextManager
    // Reparses and redisplays UI text registry items
    refresh()
    {
        for (let i in this.registry) {
            // Skip if the textTable is empty
            if (this.registry[i] === undefined || typeof(this.registry[i]) !== "object") {
                continue;
            }
            let elem = i;
            elem = elem.split(";");
            elem[0] = simpleUtils.trimString(elem[0]);	// DOMid
            elem[1] = simpleUtils.trimString(elem[1]);	// field
            elem[2] = simpleUtils.trimString(elem[2]);	// textId
            // Skip invalid reg entries
            if (simpleUtils.getDOMElement(elem[0]) === undefined) {
                // Entries with non-existent DOMids will be removed
                this.registry[i] = undefined;
                continue;
            }
            simpleUtils.getDOMElement(elem[0])[elem[1]] = this.registry[i][elem[2]][this.fieldText];
        }
    }
}

//----------------------------------------------------------------------------
// RedSandNode
//----------------------------------------------------------------------------

// Common RedSandNode class
// Special custom parameters:
//      "fullPageload" - denotes a node which should be rendered as full page
//          contents
class RedSandNode
{
    //------------------------------------------------------------------------

    constructor(DOMid, textId, deselectedClassName, selectedClassName, link, custom)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandNode                                         Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        // Constructor parameters
        this.DOMid = DOMid;
        this.textId = textId;           // Node label UI text id
        this.selectedClassName = selectedClassName;     // CSS class name in case node is activated
        this.deselectedClassName = deselectedClassName; // CSS class name in case node is deactivated
        this.className = this.deselectedClassName;      // CSS class name
        this.link = link;               // link URI
        this.custom = custom;           // Custom parameter object
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandNode
    renderString()
    {
    	// Creating node *without* text content yet! Content is added in
    	// RedSand*.render() or manually.
        let result = "<a "
            + "id='"
            + this.DOMid
            + "' class='"
            + this.className
            + "' href='"
            + this.link
            + "'></a>";

        return result;
    }

    //------------------------------------------------------------------------

    // RedSandNode
    render(container)
    {
        container.innerHTML += this.renderString();
        // Auto UI text registration, no manual UI text registry entry needed
        redSandUITextManager.setText(
            this.DOMid,
            "innerHTML",
            this.textId
        );
    }
}

//----------------------------------------------------------------------------
// RedSandMenu
//----------------------------------------------------------------------------

// name - menu name, used for referral in RedSandRegistry
// items - an array of redSandNodes
// menuContainer - DOM id
// *DEPENDENCY* with redSandRegistry
class RedSandMenu
{
    //------------------------------------------------------------------------

    constructor(id, items, menuContainer)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandMenu                                         Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.id = id;
        this.items = items;
        this.menuContainer = simpleUtils.getDOMElement(menuContainer);

        // For RedSandHashHandler.updateNodeStyles()
        this.lastSelectedNode = undefined;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandMenu
    render()
    {
        if (!this.items.length) return "";

        for (let i=0; i < this.items.length; i++)
        {
        	if (this.items[i].DOMid === undefined) continue;
            this.menuContainer.innerHTML += this.items[i].renderString();
            // Auto UI text registration, no manual UI text registry entry needed
            redSandUITextManager.setText(
                this.items[i].DOMid,
                "innerHTML",
                this.items[i].textId
            );
        }
    }
}

//----------------------------------------------------------------------------
// RedSandWindowlet
//----------------------------------------------------------------------------

// Used for RedSandNode Id assignment
// GLOBAL
// TODO: make it a static class variable as soon as supported by EcmaScript
let staticRedSandId = 0;

// Creates a basic draggable window
class RedSandWindowlet
{

    //------------------------------------------------------------------------

    constructor(left, top, width, height, background, border, draggable)
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandWindowlet                                    Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        // Constructor params

        // Defaults
        if (background === undefined || background === "default")
        {
            background = "white";
        }
        if (border === undefined || border === "default")
        {
            border = "1px solid gray";
        }
        if (draggable === undefined)
        {
            draggable = true;
        }

        // Fields
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.background = background;
        this.border = border;
        this.draggable = draggable;     // Flag

        this.DOMContainer = undefined;
        this.id = "RedSandId" + staticRedSandId++;

        this.borderVisible = true;
        //////////////////////////////////////////////////////////////////////
        
        this.DOMContainer = document.createElement('div');

        this.DOMContainer.id = this.id;
        this.DOMContainer.style.display = "block";
        this.DOMContainer.style.position = "absolute";
        this.DOMContainer.style.overflow = "auto";
        this.DOMContainer.style.width  = this.width  + "px";    // "px" for HTML5
        this.DOMContainer.style.height = this.height + "px";
        this.DOMContainer.style.left   = this.left   + "px";
        this.DOMContainer.style.top    = this.top    + "px";
        this.DOMContainer.style.background = background;
        this.DOMContainer.style.border = this.border;
        redSandWindowletManager.initZIndex(this);

        document.body.appendChild(this.DOMContainer);

        if (this.draggable)
        {
            // Make it draggable
            simpleUtils.draggable(this.DOMContainer);
            // Update Z-index
            let windowlet = this;
            this.DOMContainer.onDragStart = function()
            {
                redSandWindowletManager.updateZIndex(windowlet);
            }
        }
    }

    //------------------------------------------------------------------------

    // RedSandWindowlet
    show()
    {
        this.DOMContainer.style.display = "block";
    }

    //------------------------------------------------------------------------

    // RedSandWindowlet
    hide()
    {
        this.DOMContainer.style.display = "none";
    }

    //------------------------------------------------------------------------

    // RedSandWindowlet
    borderOn()
    {
        this.DOMContainer.style.border = this.border;
    }

    //------------------------------------------------------------------------

    // RedSandWindowlet
    borderOff()
    {
        this.DOMContainer.style.border = "none";
    }
}

//----------------------------------------------------------------------------
// RedSandWindowletManager
//----------------------------------------------------------------------------

class RedSandWindowletManager
{
    //------------------------------------------------------------------------

    constructor()
    {
        //////////////////////////////////////////////////////////////////////
        // RedSandWindowletManager                             Class variables
        //////////////////////////////////////////////////////////////////////
        this.version = redSandVersion;

        this.topmostWindowlet = undefined;
        this.highestZIndex = 1000000;
        //////////////////////////////////////////////////////////////////////
    }

    //------------------------------------------------------------------------

    // RedSandWindowletManager
    // Assigns new z-index and sets topmostWindowlet
    initZIndex(windowlet)
    {
        // Set new z-index
        windowlet.DOMContainer.style.zIndex = "" + this.highestZIndex++;
        // Set topmost windowlet
        this.topmostWindowlet = windowlet;
    }

    //------------------------------------------------------------------------

    // RedSandWindowletManager
    updateZIndex(windowlet)
    {
        // Switch z-index with that of the topmost windowlet and update
        // topmostWindowlet to windowlet
        let windowletZIndex = windowlet.DOMContainer.style.zIndex;
        windowlet.DOMContainer.style.zIndex
            = this.topmostWindowlet.DOMContainer.style.zIndex;
        this.topmostWindowlet.DOMContainer.style.zIndex = windowletZIndex;
        this.topmostWindowlet = windowlet;
    }
}

//----------------------------------------------------------------------------
// Instances
// GLOBAL
//----------------------------------------------------------------------------

const redSandUtils = new RedSandUtilities();
// This class is used in ConSense, gives an error if "let" or "const"
// noinspection ES6ConvertVarToLetConst
var   redSandGenericLoader = new RedSandGenericLoader();
const redSandHashHandler = new RedSandHashHandler();
const redSandRegistry = new RedSandRegistry();
const redSandUITextManager = new RedSandUITextManager();
const redSandWindowletManager = new RedSandWindowletManager();

//----------------------------------------------------------------------------
