
REM ------------------------------------------------------------------
REM ConSense build script
REM 1.23
REM ------------------------------------------------------------------

del ..\releases\*.zip
del ..\releases\*.7z
type ..\lib\dom-drag.js ..\lib\md5.js ..\lib\sha1.js ..\lib\DateFormat.js ..\lib\sorttable.js ..\lib\keydrown.js ..\lib\cash.js ..\lib\underscore.js ..\lib\backbone.js ..\js\redSand\simpleClasses.js ..\js\redSand\redSandCore.js ..\js\redSand\redSandGL.js ..\js\conSense\conSense.js > ..\js\releases\conSense_release_raw.js

REM ------------------------------------------------------------------
REM minify
REM this produces the best compression rate
REM to install babel-minify: npm install -g babel-minify
minify ..\js\releases\conSense_release_raw.js -o ..\js\releases\conSense_release_compressed.js

REM ------------------------------------------------------------------
REM terser either compress or beautify
REM a minify alternative
REM terser -c -o ..\js\releases\conSense_release_compressed.js ..\js\releases\conSense_release_raw.js
REM terser -b -o ..\js\releases\conSense_release_compressed.js ..\js\releases\conSense_release_raw.js

REM ------------------------------------------------------------------
REM 7z
..\tools\7za a -r -xr!.git ..\releases\ConSense.7z ..\..
