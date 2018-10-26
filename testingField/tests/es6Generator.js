
function *calculator(input) {
    let doubleThat = 2 * (yield (input / 2));
    let another = yield (doubleThat);
    return (input * doubleThat * another);
}

const calc = calculator(10);

calc.next();
calc.next(7);
calc.next(100);
