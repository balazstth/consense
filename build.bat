@ECHO OFF
CLS
ECHO ------------------------------------------------------------------
ECHO   ConSense build script
ECHO   Version in Changelog.txt
ECHO ------------------------------------------------------------------
ECHO[
@ECHO ON
type conSense\lib\dom-drag.js conSense\lib\md5.js conSense\lib\sha1.js^
 conSense\lib\DateFormat.js conSense\lib\keydrown.js conSense\lib\lodash.js^
 conSense\lib\luxon.js conSense\lib\sorttable.js conSense\lib\cash.js^
 conSense\lib\dragula.js conSense\js\redSand\simpleClasses.js^
 conSense\js\redSand\redSandCore.js conSense\js\redSand\redSandGL.js^
 conSense\js\redSand\redSandOS.js conSense\js\conSense\conSense.js^
 > conSense\js\release\conSense_release_raw.js
@ECHO OFF
ECHO[
call script\minify-sources.bat
ECHO[
call script\pack.bat
ECHO[
ECHO ------------------------------------------------------------------
ECHO   Done.
ECHO ------------------------------------------------------------------
