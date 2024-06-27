export default class Character {
    constructor(params = {}) {
        this._width = params.width || 50; // Valor predeterminado de ancho si no se proporciona
        this._height = params.height || 50; // Valor predeterminado de alto si no se proporciona
        this._left = params.left || 0; // Valor predeterminado de posición izquierda si no se proporciona
        this._top = params.top || 0; // Valor predeterminado de posición superior si no se proporciona
        this._color = params.color || 'red'; // Color predeterminado si no se proporciona
        this._health = params.health || 100;
        this._speedMove = params.speedMove || 5;
        this._direction = params.direction || 'right'
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get left() {
        return this._left;
    }

    set left(newLeft) {
        if (newLeft && typeof newLeft === 'number') {
            this._left = newLeft;
        }
    }

    get top() {
        return this._top;
    }

    get color() {
        return this._color;
    }

    get health() {
        return this._health;
    }

    get speedMove() {
        return this._speedMove;
    }

    get direction() {
        return this._direction;
    }

    moveUp() {
        this._top -= this._speedMove; // Mover hacia arriba
        this._direction = 'up';
    }

    moveDown() {
        this._top += this._speedMove; // Mover hacia abajo
        this._direction = 'down';
    }

    moveLeft() {
        this._left -= this._speedMove; // Mover hacia la izquierda
        this._direction = 'left';
    }

    moveRight() {
        this._left += this._speedMove; // Mover hacia la derecha
        this._direction = 'right';
    }

    get character() {
        return {
            width: this.width,
            height: this.height,
            left: this.left,
            top: this.top,
            color: this.color,
            health: this.health,
            speedMove: this.speedMove
        };
    }
}