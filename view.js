// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Shape.prototype.paint = function (ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
};

Rectangle.prototype.paint = function (ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.rect(this.origin.x, this.origin.y, this.width, this.height);
    ctx.stroke();
};

Line.prototype.paint = function (ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.stroke();
};

Circle.prototype.paint = function (ctx) {
    Shape.prototype.paint.call(this, ctx);
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
};

Drawing.prototype.paint = function (ctx) {
    ctx.fillStyle = '#F0F0F0'; // Canvas background color
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.getShapes().forEach((shape) => {
        shape.paint(ctx);
    });
};

function updateShapeList(interactor, drawing) {
    const shapeList = document.getElementById('shapeList');
    shapeList.innerHTML = ''; // Vider le contenu

    drawing.getShapes().forEach((shape, i) => {
        const button = createShapeListButton(i, shape, () =>
            interactor.removeShape(i)
        );
        shapeList.appendChild(button);
    });
}

function createShapeListButton(index, shape, onclick) {
    const shapeName = shape.constructor.name;

    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-default';

    const colorSquare = document.createElement('span');
    colorSquare.style.display = 'inline-block';
    colorSquare.style.width = '12px';
    colorSquare.style.height = '12px';
    colorSquare.style.marginLeft = '4px';
    colorSquare.style.backgroundColor = shape.color;
    colorSquare.style.marginRight = '6px';
    button.appendChild(colorSquare);

    const text = document.createTextNode(` ${shapeName} `);
    button.appendChild(text);

    const closeButton = document.createElement('span');
    closeButton.className = 'glyphicon glyphicon-remove-sign';
    button.appendChild(closeButton);

    button.id = `shape-btn-${index}`;
    // Event listener to remove shape from drawing on click
    button.addEventListener('click', onclick);

    li.appendChild(button);
    return li;
}
