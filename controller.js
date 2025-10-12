var editingMode = { rect: 0, line: 1, circle: 2 };

function Pencil(ctx, drawing, canvas) {
    /* Controller props */
    this.currEditingMode = editingMode.rect;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = null;

    this.redoStack = [];

    new DnD(canvas, this);

    // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

    /* Édition du mode */
    const rectangleButton = document.getElementById('butRect');
    rectangleButton.addEventListener('click', () => {
        this.currEditingMode = editingMode.rect;
        console.log('Editing mode: Rectangle');
    });

    const lineButton = document.getElementById('butLine');
    lineButton.addEventListener('click', () => {
        this.currEditingMode = editingMode.line;
        console.log('Editing mode: Line');
    });

    const circleButton = document.getElementById('butCircle');
    circleButton.addEventListener('click', () => {
        this.currEditingMode = editingMode.circle;
        console.log('Editing mode: Circle');
    });

    /* Édition de l'épaisseur */
    const thicknessSpinner = document.getElementById('spinnerWidth');
    thicknessSpinner.addEventListener('change', (event) => {
        this.currLineWidth = parseInt(event.target.value, 10);
        console.log('Thickness changed to: ', event.target.value);
    });

    /* Édition de la couleur */
    const colorPicker = document.getElementById('colour');
    colorPicker.addEventListener('change', (event) => {
        this.currColour = event.target.value;
        console.log('Colour changed to: ', event.target.value);
    });

    /* Undo/Redo */
    const undoButton = document.getElementById('undoBtn');
    const redoButton = document.getElementById('redoBtn');
    undoButton.addEventListener('click', () => {
        if (drawing.getShapes().length <= 0) return;
        this.redoStack.push(drawing.shapes.pop());
        updateShapeList(this, drawing);
        drawing.paint(ctx);
    });
    redoButton.addEventListener('click', () => {
        if (this.redoStack.length <= 0) return;
        drawing.shapes.push(this.redoStack.pop());
        updateShapeList(this, drawing);
        drawing.paint(ctx);
    });

    this.onInteractionStart = function (dnd) {
        console.log('Interaction start');
        switch (this.currEditingMode) {
            case editingMode.rect:
                console.log('Rectangle');
                this.currentShape = new Rectangle(
                    { x: dnd.initX, y: dnd.initY },
                    0,
                    0,
                    this.currColour,
                    this.currLineWidth
                );
                break;
            case editingMode.line:
                console.log('Line');
                this.currentShape = new Line(
                    { x: dnd.initX, y: dnd.initY },
                    { x: dnd.initX, y: dnd.initY },
                    this.currColour,
                    this.currLineWidth
                );
                break;
            case editingMode.circle:
                console.log('Circle');
                this.currentShape = new Circle(
                    { x: dnd.initX, y: dnd.initY },
                    0,
                    this.currColour,
                    this.currLineWidth
                );
                break;
            default:
                throw new Error('Editing mode is not valid!');
        }

        console.log('Current shape: ', this.currentShape);
        drawing.paint(ctx);
        this.currentShape.paint(ctx);
    };

    this.onInteractionUpdate = function (dnd) {
        console.log('Interaction update');
        switch (this.currEditingMode) {
            case editingMode.rect:
                this.currentShape.width = dnd.finalPosX - dnd.initX;
                this.currentShape.height = dnd.finalPosY - dnd.initY;
                break;
            case editingMode.line:
                this.currentShape.endPoint = {
                    x: dnd.finalPosX,
                    y: dnd.finalPosY,
                };
                break;
            case editingMode.circle:
                const dx = dnd.finalPosX - dnd.initX;
                const dy = dnd.finalPosY - dnd.initY;
                this.currentShape.radius = Math.sqrt(dx * dx + dy * dy);
                break;
            default:
                throw new Error('Editing mode is not valid!');
        }
        drawing.paint(ctx);
        this.currentShape.paint(ctx);
    };

    this.onInteractionEnd = function (dnd) {
        console.log('Interaction ended');
        drawing.addShape(this.currentShape);
        updateShapeList(this, drawing);
        drawing.paint(ctx);
        this.currentShape = null;
    };

    this.removeShape = (index) => {
        drawing.shapes.splice(index, 1);
        updateShapeList(this, drawing);
        drawing.paint(ctx);
    };

    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
}
