export default class Attack {
    constructor(params = {}) {
        this._player = (params.player === undefined || params.player === null ? true : params.player);
        this._width = params.width || 10;
        this._height = params.height || 10;
        this._top = params.top || 0;
        this._left = params.left || 0;
        this._color = params.color || 'white';
        this._speedMove = params.speedMove || 10;
        this._damage = params.damage || 50;
        this._direction = params.direction || 'down';
    }

    get player() { return this._player; }
    get width() { return this._width; }
    get height() { return this._height; }
    get left() { return this._left; }
    get top() { return this._top; }
    get color() { return this._color; }
    get speedMove() { return this._speedMove; }
    get damage() { return this._damage; }
    get direction() { return this._direction; }

    set width(newWidth) {
        if (typeof newWidth === 'number') this._width = newWidth;
    }

    set height(newHeight) {
        if (typeof newHeight === 'number') this._height = newHeight;
    }

    moveUp() {
        this._top -= this._speedMove;
    }

    moveDown() {
        this._top += this._speedMove;
    }

    moveLeft() {
        this._left -= this._speedMove;
    }

    moveRight() {
        this._left += this._speedMove;
    }
}