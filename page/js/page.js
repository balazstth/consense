
let fibonacci = {
    [Symbol.iterator]() {
        let pre = 0, cur = 1;
        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                return {done: false, value: cur}
            }
        }
    }
};

for (let n of fibonacci) {
    if (n > 1000)
        break;
    console.log(n)
}

// $("#myModal").draggable({
//     handle: ".modal-header"
// });

Drag.init(simpleUtils.getDOMElement("myModal"), simpleUtils.getDOMElement("myModalHeader"),
    0, 1000000000, 0, 1000000000);
