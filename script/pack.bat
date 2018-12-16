@ECHO OFF
ECHO ------------------------------------------------------------------
ECHO   ConSense pack script
ECHO   Version in Changelog.txt
ECHO ------------------------------------------------------------------
ECHO[
@ECHO ON
del release\*.7z
conSense\tools\7za a -r -xr!.git release\ConSense.7z .
@ECHO OFF
