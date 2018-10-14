
// Sample commands
var sampleCommands = [];
sampleCommands.push('help()');
sampleCommands.push('map(document)');
sampleCommands.push('list("contentContainer")');
sampleCommands.push('listStyle("contentContainer")');
sampleCommands.push('mapCSS("conSenseOut")');
sampleCommands.push('listCSS()');
sampleCommands.push('outline("wrapper2")');
sampleCommands.push('outlineSub("conSenseOut")');
sampleCommands.push('outlineAll("p")');
sampleCommands.push('load("fox.txt")');
sampleCommands.push('var callback = new Function("content", "alert(content)"); load("fox.txt", callback);');
sampleCommands.push('write(simpleCrypto.base64Decode(simpleCrypto.RC4Decrypt("weakpassitsme", simpleCrypto.RC4Encrypt("weakpassitsme", simpleCrypto.base64Encode("Very secret message (or timestamped password to be sent to the server or whatever).")))))');

// Injects a parameter string into ConSense command line and focuses it
// noinspection JSUnusedGlobalSymbols
function injectCommand(i)
{
    conSense.showConsole(conSense.show);
    conSense.globalShowConsole(conSense.show);
    conSense.setInput(sampleCommands[i]);
    conSense.scrollToBottomFocusInput();
}
