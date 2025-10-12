// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

class Drawing {
    constructor() {
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    getShapes() {
        return this.shapes;
    }
}

class Shape {
    constructor(color, thickness) {
        this.color = color || 'black';
        this.thickness = thickness || 1;
    }
}

class Rectangle extends Shape {
    constructor(origin, width, height, color, thickness) {
        super(color, thickness);
        this.origin = origin;
        this.width = width;
        this.height = height;
    }
}

class Line extends Shape {
    constructor(startPoint, endPoint, color, thickness) {
        super(color, thickness);
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
}

class Circle extends Shape {
    constructor(center, radius, color, thickness) {
        super(color, thickness);
        this.center = center;
        this.radius = radius;
    }
}
