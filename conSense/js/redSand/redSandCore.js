//////////////////////////////////////////////////////////////////////////////
// RedSand dynamic JavaScript toolkit by Toth, Balazs Aladar (c) 2005-2018
// For detailed licensing information see conSense.js.
// See redSandVersion and the changelog for detailed version info.
// https://aladar.me/
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
// Globals
//----------------------------------------------------------------------------

var redSandVersion = "0.43";
// Used for RedSandNode Id assignment
var redSandId = 0;

//----------------------------------------------------------------------------
// RedSandUtilities
//----------------------------------------------------------------------------

function RedSandUtilities()
{
    this.version = redSandVersion;
    
    //------------------------------------------------------------------------

    // RedSandUtilities
    // The second password is optional
    this.generateCredentials = function(encodePassword, packetPassword)
    {
        if (packetPassword === undefined) {
            packetPassword = encodePassword;
        }
        var encodePasswordHash = simpleCrypto.SHA1(encodePassword);
        var packetPasswordHash = simpleCrypto.SHA1(packetPassword);
        var thisDate = new Date().format("YYYY-MM-DD HH:mm:ss");
        var randomString = simpleCrypto.generateRandomString(16);

        var credentialsPackage
            = simpleCrypto.base64Encode(
                simpleCrypto.RC4Encrypt(
                    encodePasswordHash, packetPasswordHash + thisDate + randomString));

        return credentialsPackage;
    };

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
    this.formAuthenticatedURI = function(uri, params, userId, password)
    {
        var credentialsPackage = this.generateCredentials(password, password);

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
    };

    //------------------------------------------------------------------------

    // RedSandUtilities
    // Screen blocker div
    this.blockInput = function(color)
    {
        if (color === undefined) {
            color = "blue";
        }
        simpleUtils.getDOMElement("inputBlocker").style.background = color;
        simpleUtils.getDOMElement("inputBlocker").style.display = "block";
    };

    //------------------------------------------------------------------------

    // RedSandUtilities
    // Remove screen blocker div
    this.unblockInput = function()
    {
        simpleUtils.getDOMElement("inputBlocker").style.display = "none";
    };
}

//----------------------------------------------------------------------------
// RedSandGenericLoader
//----------------------------------------------------------------------------

// *DEPENDENCY*
// Uses conSenseContainer as parent for loader divs.
// Uses conSense console methods.
function RedSandGenericLoader()
{
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

    this.showIndicator = function() {
        if (!redSandGenericLoader.indicate) {
            return;
        }
        redSandGenericLoader.loadsInProgress++;
        if (redSandGenericLoader.loadsInProgress === 1)
        {
            simpleUtils.getDOMElement("loadIndicator").style.display = "block";
        }
    };

    this.hideIndicator = function() {
        if (!redSandGenericLoader.indicate) {
            return;
        }
        redSandGenericLoader.loadsInProgress--;
        if (redSandGenericLoader.loadsInProgress === 0)
        {
            simpleUtils.getDOMElement("loadIndicator").style.display = "none";
        }
    };

    //------------------------------------------------------------------------

    // RedSandGenericLoader
    // If no callback is given, loaded content is evaluated as JavaScript
    // source
    this.load = function(uri, callback)
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
            var newContainer = document.createElement('div');
            newContainer.setAttribute(
                "id", "RedSandRegistryContainer" + this.lastProcess);
            newContainer.style.display = "none";
            conSense.conSenseContainer.appendChild(newContainer);

            this.containers.push(newContainer);
        }

        var uriRandom = uri + simpleUtils.randomSuffix();

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
    };
    
    //------------------------------------------------------------------------

    // RedSandGenericLoader
    // Receives an index of loader arrays
    this.loadedCallback = function(processNum)
    {
        var content = "deadbeef";

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

        var callback = this.callbacks[processNum];
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
    };

    //------------------------------------------------------------------------

    // RedSandGenericLoader
    this.javaScriptEvaluatorCallback = function(content)
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

function RedSandHashHandler()
{
    this.version = redSandVersion;

    this.hashSeparator = "#";
    this.paramSeparator = ";";
    this.equalsString = "=";

    this.lastHash = "deadbeef";

    // noinspection JSUnusedGlobalSymbols
    this.defaultHash = "deadbeef";

    // onHashChanged() event registry
    // Format: "hashParameterName": callbackFunction
    this.eventRegistry = [];

    // Indicate if it is the first RedSandHashHandler.onHashChanged() call
    this.firstRun = true;

    //------------------------------------------------------------------------

    // RedSandHashHandler
    this.addEvent = function(hashParameterName, callbackFunction)
    {
    	this.eventRegistry[hashParameterName] = callbackFunction;
    };

    //------------------------------------------------------------------------

    // RedSandHashHandler
    this.onHashChanged = function()
    {
	    var params = this.processCurrentURIHash();
	    if (params === undefined) {
	        return;
	    }

        redSandHashHandler.updateNodeStyles();
	    
        for (var i in params) {
			// Bloody forEach()...
			if (i === "each" || i === "forEach") continue;
			for (var j in this.eventRegistry) {
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
            window.setInterval(function() { if (redSandHashHandler.changed()) redSandHashHandler.onHashChanged(); }, 100);
        }
    };
    
    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Returns a boolean.
    this.changed = function()
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
    };

    //------------------------------------------------------------------------

    // RedSandHashHandler
    this.setDefaultHash = function(hash)
    {
        // noinspection JSUnusedGlobalSymbols
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
    };

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // {param0: "value0", param1: "value1", ...}
    //      --> "#param0=value0;param1=value1;..."
    this.array2Hash = function(params)
    {
        var hash = this.hashSeparator;   // hash = "#"

        for (var i in params)
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
    };

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // "#param0=value0;param1=value1;..."
    //      --> {param0: "value0", param1: "value1", ...}
    // TODO: eliminate duplicated parameters
    this.hash2Array = function(hash)
    {
        // remove trailing paramSeparator if present
        if (hash.substr(hash.length - this.paramSeparator.length) === this.paramSeparator)
        {
            hash = hash.substr(0, hash.length - this.paramSeparator.length);
        }

        var params = [];
        // "#param0=value0;param1=value1;..."
        //      --> {"param0=value0", "param1=value1", ...}
        var paramsTemp
            = hash.substr(this.hashSeparator.length).split(this.paramSeparator);

        // {"param0=value0", "param1=value1", ...}
        //      --> {param0: "value0", param1: "value1", ...}
        for (var i = 0; i < paramsTemp.length; i++)
        {
            var splitInTwo = paramsTemp[i].split(this.equalsString);
            params[splitInTwo[0]] = splitInTwo[1];
        }

        return params;
    };

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Returns an array of anchors present in the document.
    this.getDocumentAnchors = function()
    {
        var anchors = [];

        for (var i = 0; i < document.anchors.length; i++)
        {
            anchors[this.hashSeparator + document.anchors[i].name] = true;
        }

        return anchors;
    };

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Verifies if the current URI hash is present in the document as an
    // anchor name. If not, the hash is processed as a URI parameter list and
    // the resulting *associative array* of parameter name-value pairs is
    // returned.
    // Otherwise the resulting value will be *undefined*.
    this.processCurrentURIHash = function()
    {
        var anchors = this.getDocumentAnchors();

        if (anchors[window.location.hash] === undefined)
        {
            // Return array
            return this.hash2Array(window.location.hash);
        }

        return undefined;
    };

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Helper function
    // Returns with the first matching menu item for which:
    // all link parameters are present in the menu item link.
    // *PRIVATE*
    this.menuContainsLink = function(menu, link)
    {
        for (var i in menu.items)
        {
            if (i === "each" || i === "forEach") continue;
            // noinspection JSUnfilteredForInLoop
            var itemParamArray = this.hash2Array(menu.items[i].link);
            var linkParamArray = this.hash2Array(link);
            var itemParamCount = 0;
            var matchCount = 0;
            // Parse through current item params
            for (var j in itemParamArray) {
            	if (j === "each"  || j === "forEach") continue;
            	itemParamCount++;
            	// Parse through link params
	            for (var k in linkParamArray) {
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
    };

    //------------------------------------------------------------------------

    // RedSandHashHandler
    // Trigger visual effects defined by node.deselectedClassName and
    // node.selectedClassName
    this.updateNodeStyles = function()
    {
        for (var i in redSandRegistry.menus)
        {
            var menu = redSandRegistry.menus[i];
            if (!menu.items) continue;
            
            var item = this.menuContainsLink(menu, window.location.hash);
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
    };

}

//----------------------------------------------------------------------------
// RedSandRegistry
//----------------------------------------------------------------------------

// Mainly a register class for load operations - the whole loading framework
// is fully functional without it.
function RedSandRegistry()
{
    this.version = redSandVersion;

    this.menus = [];

    //------------------------------------------------------------------------

    // RedSandRegistry
    // Returns a two dimensional array of RedSandNodes or undefined if no result.
    // Return format: nodes[menu] --> nodeArray
    // noinspection JSUnusedGlobalSymbols
    this.findMenuNodesByLink = function(link)
    {
        var menuNodes = [];
        var empty = true;

        for (var i in this.menus)
        {
            var menu = this.menus[i];
            if (!menu.items) continue;
            var nodes = [];
            for (var j in menu.items)
            {
                // noinspection JSUnfilteredForInLoop
                var item = menu.items[j];
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
    };

    //------------------------------------------------------------------------

    // RedSandRegistry
    this.addMenu = function(obj)
    {
        this.menus[obj.id] = obj;
    };

}

//----------------------------------------------------------------------------
// RedSandUITextManager
//----------------------------------------------------------------------------

// Class for handling dynamic UI text changes
function RedSandUITextManager()
{
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
    this.initTextTable = function(table)
    {
        var newTable = simpleUtils.objectArray2objectHashTable(table, this.fieldId);

        // Mass liteDown()
        for (var i in newTable) {
            // noinspection JSUnfilteredForInLoop
            if (newTable[i][this.fieldText]) {
                // noinspection JSUnfilteredForInLoop
                newTable[i][this.fieldText] = simpleUtils.liteDown(newTable[i][this.fieldText]);
            }
        }

        return newTable;
    };

    //------------------------------------------------------------------------

    // RedSandUITextManager
    // Sets new UI text array for registry items and redisplays them
    this.setTextTable = function(table)
    {
        for (var i in this.registry) {
            // Skip if the textTable is empty
            if (this.registry[i] === undefined || typeof(this.registry[i]) !== "object") {
                continue;
            }
            this.registry[i] = table;
        }
        this.currentTable = table;
        this.refresh();
    };

    //------------------------------------------------------------------------

    // RedSandUITextManager
    this.setText = function(DOMid, field, textId)
    {
        // Skip display if textId is empty
        if (textId !== "") {
            var domElem = simpleUtils.getDOMElement(DOMid);
            if (domElem === undefined) return;
            domElem[field] = this.currentTable[textId][this.fieldText];
        }
        this.registry[DOMid + "; " + field + "; " + textId] = this.currentTable;
    };

    //------------------------------------------------------------------------

    // RedSandUITextManager
    // Reparses and redisplays UI text registry items
    this.refresh = function()
    {
        for (var i in this.registry) {
            // Skip if the textTable is empty
            if (this.registry[i] === undefined || typeof(this.registry[i]) !== "object") {
                continue;
            }
            var elem = i;
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
    };
}

//----------------------------------------------------------------------------
// RedSandNode
//----------------------------------------------------------------------------

// Common RedSandNode class
// Special custom parameters:
//      "fullPageload" - denotes a node which should be rendered as full page
//          contents
function RedSandNode(DOMid, textId, deselectedClassName, selectedClassName, link, custom)
{
    this.version = redSandVersion;

    // Constructor parameters
    this.DOMid = DOMid;
    this.textId = textId;           // Node label UI text id
    this.selectedClassName = selectedClassName;     // CSS class name in case node is activated
    this.deselectedClassName = deselectedClassName; // CSS class name in case node is deactivated
    this.className = this.deselectedClassName;      // CSS class name
    this.link = link;               // link URI
    // noinspection JSUnusedGlobalSymbols
    this.custom = custom;           // Custom parameter object

    //------------------------------------------------------------------------

    // RedSandNode
    this.renderString = function()
    {
    	// Creating node *without* text content yet! Content is added in
    	// RedSand*.render() or manually.
        var result = "<a "
            + "id='"
            + this.DOMid
            + "' class='"
            + this.className
            + "' href='"
            + this.link
            + "'></a>";

        return result;
    };

    //------------------------------------------------------------------------

    // RedSandNode
    this.render = function(container)
    {
        container.innerHTML += this.renderString();
        // Auto UI text registration, no manual UI text registry entry needed
        redSandUITextManager.setText(
            this.DOMid,
            "innerHTML",
            this.textId
        );
    };
}

//----------------------------------------------------------------------------
// RedSandMenu
//----------------------------------------------------------------------------

// name - menu name, used for referral in RedSandRegistry
// items - an array of redSandNodes
// menuContainer - DOM id
// *DEPENDENCY* with redSandRegistry
function RedSandMenu(id, items, menuContainer)
{
    this.version = redSandVersion;

    // noinspection JSUnusedGlobalSymbols
    this.id = id;
    this.items = items;
    this.menuContainer = simpleUtils.getDOMElement(menuContainer);

    // For RedSandHashHandler.updateNodeStyles()
    // noinspection JSUnusedGlobalSymbols
    this.lastSelectedNode = undefined;
    
    //------------------------------------------------------------------------

    // RedSandMenu
    this.render = function()
    {
        if (!this.items.length) return "";

        for (var i=0; i < this.items.length; i++)
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
    };
}

//----------------------------------------------------------------------------
// RedSandWindowlet
//----------------------------------------------------------------------------

// Creates a basic draggable window
function RedSandWindowlet(left, top, width, height, background, border,
                            draggable)
{
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
    // noinspection JSUnusedGlobalSymbols
    this.background = background;
    this.border = border;
    this.draggable = draggable;     // Flag

    this.DOMContainer = undefined;
    this.id = "RedSandId" + redSandId++;
        
    // noinspection JSUnusedGlobalSymbols
    this.borderVisible = true;

    //------------------------------------------------------------------------
    // Constructor code
    //------------------------------------------------------------------------

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
        Drag.init(this.DOMContainer, null, 0, 1000000000, 0, 1000000000);
        // Update Z-index
        var windowlet = this;
        this.DOMContainer.onDragStart = function()
        {
            redSandWindowletManager.updateZIndex(windowlet);
        }
    }

    //------------------------------------------------------------------------

    // RedSandWindowlet
    this.show = function()
    {
        this.DOMContainer.style.display = "block";
    };

    //------------------------------------------------------------------------

    // RedSandWindowlet
    this.hide = function()
    {
        this.DOMContainer.style.display = "none";
    };

    //------------------------------------------------------------------------

    // RedSandWindowlet
    this.borderOn = function()
    {
        this.DOMContainer.style.border = this.border;
    };

    //------------------------------------------------------------------------

    // RedSandWindowlet
    this.borderOff = function()
    {
        this.DOMContainer.style.border = "none";
    };
}

//----------------------------------------------------------------------------
// RedSandWindowletManager
//----------------------------------------------------------------------------

function RedSandWindowletManager()
{
    this.version = redSandVersion;

    this.topmostWindowlet = undefined;
    this.highestZIndex = 1000000;

    //------------------------------------------------------------------------

    // RedSandWindowletManager
    // Assigns new z-index and sets topmostWindowlet
    this.initZIndex = function(windowlet)
    {
        // Set new z-index
        windowlet.DOMContainer.style.zIndex = "" + this.highestZIndex++;
        // Set topmost windowlet
        this.topmostWindowlet = windowlet;
    };

    //------------------------------------------------------------------------

    // RedSandWindowletManager
    this.updateZIndex = function(windowlet)
    {
        // Switch z-index with that of the topmost windowlet and update
        // topmostWindowlet to windowlet
        var windowletZIndex = windowlet.DOMContainer.style.zIndex;
        windowlet.DOMContainer.style.zIndex
            = this.topmostWindowlet.DOMContainer.style.zIndex;
        this.topmostWindowlet.DOMContainer.style.zIndex = windowletZIndex;
        this.topmostWindowlet = windowlet;
    };
}

//----------------------------------------------------------------------------
// Instances
//----------------------------------------------------------------------------

// noinspection JSUnusedGlobalSymbols
var redSandUtils = new RedSandUtilities();
var redSandGenericLoader = new RedSandGenericLoader();
var redSandHashHandler = new RedSandHashHandler();
var redSandRegistry = new RedSandRegistry();
var redSandUITextManager = new RedSandUITextManager();
var redSandWindowletManager = new RedSandWindowletManager();

//----------------------------------------------------------------------------
