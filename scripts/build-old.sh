
# ConSense build script
# 1.14

rm ../releases/*.zip
cat ../js/redSand/lib/dom-drag.js ../js/redSand/lib/md5.js ../js/redSand/lib/sha1.js ../js/redSand/lib/DateFormat.js ../js/redSand/lib/sorttable.js ../js/redSand/lib/shortcut.js ../js/redSand/lib/prototype.lite.js ../js/redSand/simpleClasses.js ../js/redSand/redSandCore.js ../js/redSand/redSandGL.js ../js/conSense/conSense.js > ../js/releases/conSense_release_raw.js
java -jar ../tools/custom_rhino.jar -c ../js/releases/conSense_release_raw.js > ../js/releases/conSense_release_compressed.js 2>&1
cd ../..
zip -r ConSense/releases/ConSense.zip ConSense
cd ConSense/scripts
