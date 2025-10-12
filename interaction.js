// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.initX = 0;
    this.initY = 0;
    this.finalPosX = 0;
    this.finalPosY = 0;

    this.isDragging = false;

    // Developper les 3 fonctions gérant les événements
    this.onClick = function (event) {
        this.isDragging = true;
        const { x, y } = getMousePosition(canvas, event);
        this.initX = x;
        this.initY = y;
        console.log('click', x, y);
        interactor.onInteractionStart(this);
    }.bind(this);

    this.onMove = function (event) {
        if (!this.isDragging) return;
        const { x, y } = getMousePosition(canvas, event);
        this.finalPosX = x;
        this.finalPosY = y;
        console.log('move', x, y);
        interactor.onInteractionUpdate(this);
    }.bind(this);

    this.onRelease = function (event) {
        if (!this.isDragging) return;
        this.isDragging = false;
        const { x, y } = getMousePosition(canvas, event);
        this.finalPosX = x;
        this.finalPosY = y;
        interactor.onInteractionEnd(this);
        console.log('release', x, y);
    }.bind(this);
    // Associer les fonctions précédentes aux évènements du canvas.

    canvas.addEventListener('mousedown', this.onClick);
    canvas.addEventListener('mousemove', this.onMove);
    canvas.addEventListener('mouseup', this.onRelease);
}

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}
