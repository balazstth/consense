
REM ------------------------------------------------------------------
REM ConSense minify script
REM 1.25
REM ------------------------------------------------------------------

REM ------------------------------------------------------------------
REM minify
REM this produces the best compression rate
REM to install babel-minify: npm install -g babel-minify
minify ..\js\releases\conSense_release_raw.js -o ..\js\releases\conSense_release_compressed.js

REM ------------------------------------------------------------------
REM terser either compress or beautify
REM a minify alternative: npm install terser -g
REM terser -c -o ..\js\releases\conSense_release_compressed.js ..\js\releases\conSense_release_raw.js
REM terser -b -o ..\js\releases\conSense_release_compressed.js ..\js\releases\conSense_release_raw.js
