
console.log("Hello");

const win1 = redSandLauncher.addWindow(0, 0, 80, 10, "Test Baby");
const win2 = redSandLauncher.addWindow(100, 100, 80, 25, "Test", redSandLauncher.ART["PICO_indigo"]);
const win3 = redSandLauncher.addWindow(300, 300, 40, 10, "Norton", redSandLauncher.ART["PICO_blue"]);

// win2.windowlet.selectOff();
win2.write(10, 2, "Quick brown fox");
win2.write(10, 3, "jumps over a lazy dog", redSandDesktop.palette.PICO_red);
win2.write(10, 5, "TEST", redSandDesktop.palette.PICO_white, redSandDesktop.palette.PICO_red);
win2.write(10, 6, "TEST", redSandDesktop.palette.PICO_white, redSandDesktop.palette.PICO_black);
win2.write(0, 22, "Tab\ttest");
win2.write(74, 1, "Clip_test");
win2.write(67, 24, "Tab\tedge\ttest");

for (let i = 0; i < 80; i++)
{
    win2.write(i, 10, "W", "rgb(" + (255 - i * 6) + ", " + i * 6 + ", " + 0 + ")");
}
win2.render();

for (let i = 0; i < 40; i++)
{
    win3.write(i, 2, "W", "rgb(" + (255 - i * 6) + ", " + i * 6 + ", " + 0 + ")");
}
win3.render();

// redSandWindowletManager.delete(win2.windowlet);

// win3.cursorOn();
