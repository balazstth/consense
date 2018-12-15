
REM ------------------------------------------------------------------
REM ConSense build script
REM 1.27
REM ------------------------------------------------------------------

type ..\lib\dom-drag.js ..\lib\md5.js ..\lib\sha1.js ..\lib\DateFormat.js ..\lib\keydrown.js ..\lib\lodash.js ..\lib\luxon.js ..\lib\sorttable.js ..\lib\cash.js ..\lib\dragula.js ..\js\redSand\simpleClasses.js ..\js\redSand\redSandCore.js ..\js\redSand\redSandGL.js ..\js\conSense\conSense.js > ..\js\_releases\conSense_release_raw.js

REM ------------------------------------------------------------------
REM minify
call minify-sources.bat

REM ------------------------------------------------------------------
REM 7z
call pack.bat
