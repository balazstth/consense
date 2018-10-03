
REM ConSense build script
REM 1.18

del ..\releases\*.zip
del ..\releases\*.7z
type ..\lib\dom-drag.js ..\lib\md5.js ..\lib\sha1.js ..\lib\DateFormat.js ..\lib\sorttable.js ..\lib\shortcut.js ..\lib\cash.js ..\lib\underscore.js ..\lib\backbone.js ..\js\redSand\simpleClasses.js ..\js\redSand\redSandCore.js ..\js\redSand\redSandGL.js ..\js\conSense\conSense.js > ..\js\releases\conSense_release_raw.js
java -jar ..\tools\shrinksafe\shrinksafe.jar -Dfile.encoding=UTF8 ..\js\releases\conSense_release_raw.js > ..\js\releases\conSense_release_compressed.js 2>&1
..\tools\7za a -r -xr!.git ..\releases\ConSense.7z ..
