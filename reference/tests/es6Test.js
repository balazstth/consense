
class Shape {
    version = "1.00";

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
