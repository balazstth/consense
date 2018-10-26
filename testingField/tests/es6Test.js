//--------------------------------------------------------------------

class Shape {
    // version = "1.00";

    constructor(id, x, y) {
        this.id = id;
        this.move(x, y);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `Shape(${this.id})`;
    }
}

class Rectangle extends Shape {
    constructor(id, x, y, width, height) {
        super(id, x, y);
        this.width = width;
        this.height = height;
    }

    static defaultRectangle() {
        return new Rectangle("default", 0, 0, 100, 100);
    }

    toString() {
        return "Rectangle > " + super.toString();
    }
}

class Circle extends Shape {
    constructor(id, x, y, radius) {
        super(id, x, y);
        this.radius = radius;
    }

    static defaultCircle() {
        return new Circle("default", 0, 0, 100);
    }

    toString() {
        return "Circle > " + super.toString();
    }
}

let defRectangle = Rectangle.defaultRectangle();
let defCircle = Circle.defaultCircle();

//--------------------------------------------------------------------

// Prepending the async keyword to any function means that the function will return a promise.

const aFunction = async () => {
    return 'test';
};

aFunction().then(alert);                         // This will alert 'test'

const getFirstUserData = async () => {
    const response = await fetch('/users.json'); // get users list
    const users = await response.json();         // parse JSON
    const user = users[0];                       // pick first user
    const userResponse = await fetch(`/users/${user.name}`); // get user data
    const userData = await user.json();          // parse JSON
    return userData;
};

getFirstUserData();

//--------------------------------------------------------------------

const a = [1, 2, 3]

// You can create a new array using

const b = [...a, 4, 5, 6]

// You can also create a copy of an array using

const c = [...a]

// This works for objects as well. Clone an object with:

const newObj = { ...oldObj }

// Using strings, the spread operator creates an array with each char in the string:

    const hey = 'hey'
const arrayized = [...hey] // ['h', 'e', 'y']

// This operator has some pretty useful applications. The most important one is the ability to use an array as function argument in a very simple way:

const f = (foo, bar) => {}
const a = [1, 2]
f(...a)

/---------------------------------------------------------------------

var list = [ 7, 42 ] var [ a = 1, b = 2, c = 3, d ] = list a === 7 b === 42 c === 3 d === undefined

//--------------------------------------------------------------------

const person = {
    firstName: 'Tom',
    lastName: 'Cruise',
    actor: true,
    age: 54, //made up
}

const {firstName: name, age} = person

//--------------------------------------------------------------------

//iterate over the value
for (const v of ['a', 'b', 'c']) {
    console.log(v);
}

//get the index as well, using `entries()`
for (const [i, v] of ['a', 'b', 'c'].entries()) {
    console.log(i, v);
}

// EcmaScript 5

var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
    console.log(element);
});

// expected output: "a"
// expected output: "b"
// expected output: "c"

//--------------------------------------------------------------------

// Map

for (const [k, v] of m) {
    console.log(k, v)
}

// Convert the map keys into an array

const a = [...m.keys()]

// Convert the map values into an array

const a = [...m.values()]

// See: WeakMap, WeakSet

// In a Map, items are never garbage collected. A WeakMap instead lets all its items be freely garbage collected. Every key of a WeakMap is an object. When the reference to this object is lost, the value can be garbage collected.
//
//     Here are the main differences:
//
//     you cannot iterate over the keys or values (or key-values) of a WeakMap
// you cannot clear all items from a WeakMap
// you cannot check its size

//--------------------------------------------------------------------
