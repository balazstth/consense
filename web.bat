@ECHO OFF
CLS
ECHO =======================
ECHO   STARTING WEB SERVER
ECHO =======================
ECHO[
web-server\miniweb\miniweb.exe -l ../log/web-log.txt -r . -p 80
