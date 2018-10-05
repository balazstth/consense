
//-----------------------------------------------------------------------------
// Languages

var uiEng = [
    {id: "intro",     text: "Intro"},
    {id: "changelog", text: "Changelog"},
    {id: "todo",      text: "TODO"},
    {id: "docs",      text: "Documentation"},
    {id: "tests",     text: "Tests"},
    {id: "contact",   text: "Contact"}
];

uiEng = redSandUITextManager.initTextTable(uiEng);

// Default language
redSandUITextManager.setTextTable(uiEng);

//-----------------------------------------------------------------------------
// Menus

// Main menu
var items = [];

items.push(new RedSandNode("mainMenuIntro",     "intro",     "mainMenuItem", "mainMenuItemSelected", "#article=intro"));
items.push(new RedSandNode("mainMenuChangelog", "changelog", "mainMenuItem", "mainMenuItemSelected", "#article=changelog"));
items.push(new RedSandNode("mainMenuTodo",      "todo",      "mainMenuItem", "mainMenuItemSelected", "#article=todo"));
items.push(new RedSandNode("mainMenuDocs",      "docs",      "mainMenuItem", "mainMenuItemSelected", "#article=docs"));
items.push(new RedSandNode("mainMenuTests",     "tests",     "mainMenuItem", "mainMenuItemSelected", "#article=tests"));
items.push(new RedSandNode("mainMenuContact",   "contact",   "mainMenuItem", "mainMenuItemSelected", "#article=contact"));

var mainMenu = new RedSandMenu("mainMenu", items, "mainMenuContainer");
redSandRegistry.addMenu(mainMenu);
mainMenu.render();

//-----------------------------------------------------------------------------
// Page

// Events
redSandHashHandler.addEvent("article", handleArticleEvent);

// Default hash, for when the page loads without URL params.
// This should come AFTER the addEvent(), so the event can already fire for the
// default hash.
redSandHashHandler.setDefaultHash("#article=intro");

function handleArticleEvent(params)
{
    // It is 2018... speeds are better now, maybe no UI blocking necessary any more
    // redSandUtils.blockInput();

    if (params.article === "intro") {
        redSandGenericLoader.load("page-2018-10-05/articles/eng/Intro.txt", contentRenderer);
    }
    else if (params.article === "changelog") {
        redSandGenericLoader.load("conSense/doc/Changelog.txt", contentRenderer);
    }
    else if (params.article === "todo") {
        redSandGenericLoader.load("conSense/doc/TODO.txt", contentRenderer);
    }
    else if (params.article === "docs") {
        redSandGenericLoader.load("conSense/doc/Documentation.txt", contentRenderer);
    }
    else if (params.article === "tests") {
        redSandGenericLoader.load("page-2018-10-05/articles/eng/Tests.txt", contentRenderer);
    }
    else if (params.article === "contact") {
        redSandGenericLoader.load("page-2018-10-05/articles/eng/Contact.txt", contentRenderer);
    }
}

//-----------------------------------------------------------------------------
// Custom renderer for this page
// In this case puts the loaded articles into the contentContainer
// Called by handleArticleEvent(params)

function contentRenderer(content)
{
    var domElem = simpleUtils.getDOMElement("contentContainer");

    content = simpleUtils.liteDown(content);
    
    // Firefox
    if (domElem.innerText === undefined) {
        domElem.innerHTML = content;
        // IE
    } else {
        // IE7 pre bug
        if (content.length > 7 && content.substr(2, 5) === "/////") {
            domElem.innerHTML = "<pre>" + content + "</pre>";
        } else {
            domElem.innerHTML = content;
        }
    }

    // redSandUtils.unblockInput();
}

//-----------------------------------------------------------------------------
