export default class Block {
    constructor (params = {}) {
        this._width = params.width || 50;
        this._height = params.height || 50;
        this._left = params.left || 0;
        this._top = params.top || 0;
        this._icon = new Image();
        this._icon.src = params.icon || null;
        this._color = params.color || 'white';
        this._audio = params.audio || null,
        this._collidable = (params.collidable === null || params.collidable === undefined) ? true : params.collidable;
        this._destructible = (params.destructible === null || params.destructible === undefined) ? true : params.destructible;
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

    get top() {
        return this._top;
    }

    get color() {
        return this._color;
    }

    get collidable() {
        return this._collidable;
    }

    get destructible() {
        return this._destructible;
    }

    get icon() {
        return this._icon;
    }

    get audio() {
        return this._audio;
    }

    get block() {
        return {
            width: this.width,
            height: this.height,
            left: this.left,
            top: this.top,
            color: this.color,
            collidable: this.collidable,
            destructible: this.destructible
        };
    }

    destroy() {
        const audio = new Audio(this._audio);
        audio.play();
    }
}