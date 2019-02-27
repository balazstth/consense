
console.log("Hello");

redSandGenericLoader.indicate = false;

const win1 = redSandLauncher.addWindow(0, 0, 80, 10, "Test Baby");
const win2 = redSandLauncher.addWindow(100, 100, 80, 25, "Test", redSandLauncher.ART["indigo"]);
const win3 = redSandLauncher.addWindow(300, 300, 40, 10, "Norton", redSandLauncher.ART["blue"]);

// win2.windowlet.selectOff();
// win2.colorWrite(0, 1, "Quick brown fox", "yellow", "grey");
// win2.colorWrite(10, 2, "Quick brown fox", "green", "grey");
win2.write(10, 2, "Quick brown fox");
win2.render();
