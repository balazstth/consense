@ECHO OFF
ECHO ------------------------------------------------------------------
ECHO   ConSense minify script
ECHO   Version in Changelog.txt
ECHO ------------------------------------------------------------------
ECHO[
REM  this produces the best compression rate
REM  to install babel-minify: npm install -g babel-minify
@ECHO ON
minify conSense\js\release\conSense_release_raw.js -o conSense\js\release\conSense_release_compressed.js
@ECHO OFF
REM  OR
REM  terser: a minify alternative
REM  to install terser: npm install terser -g
REM  either compress or beautify:
REM  terser -c -o conSense\js\release\conSense_release_compressed.js conSense\js\release\conSense_release_raw.js
REM  terser -b -o conSense\js\release\conSense_release_compressed.js conSense\js\release\conSense_release_raw.js
