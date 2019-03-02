
console.log("Hello");

redSandGenericLoader.indicate = false;

const win1 = redSandLauncher.addWindow(0, 0, 80, 10, "Test Baby");
const win2 = redSandLauncher.addWindow(100, 100, 80, 25, "Test", redSandLauncher.ART["indigo"]);
const win3 = redSandLauncher.addWindow(300, 300, 40, 10, "Norton", redSandLauncher.ART["blue"]);

// win2.windowlet.selectOff();
win2.write(10, 2, "Quick brown fox");
win2.write(10, 3, "jumps over a lazy dog", redSandDesktop.palette.PICO_red);
win2.write(10, 5, "TEST", redSandDesktop.palette.PICO_white, redSandDesktop.palette.PICO_red);
win2.write(10, 6, "TEST", redSandDesktop.palette.PICO_white, redSandDesktop.palette.PICO_black);
win2.render();

for (let i = 0; i < 40; i++)
{
    win3.write(i, 2, "W", "rgb(" + (255 - i * 6) + ", " + i * 6 + ", " + 0 + ")");
}
win3.render();

// redSandWindowletManager.delete(win2.windowlet);
