export default class Block {
    constructor(params = {}) {
        this._width = params.width || 50;
        this._height = params.height || 50;
        this._left = params.left || 0;
        this._top = params.top || 0;
        this._health = params.health || 50;
        this._icon = new Image();
        this._icon.src = params.icon || null;
        this._color = params.color || 'white';
        this._audio = new Audio;
        this._audio.src = params.audio || null;
        this._audio.volume = 0.1;
        this._collidable = (params.collidable === null || params.collidable === undefined) ? true : params.collidable;
        this._destructible = (params.destructible === null || params.destructible === undefined) ? true : params.destructible;
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get left() { return this._left; }
    get top() { return this._top; }
    get health() { return this._health; }
    get color() { return this._color; }
    get collidable() { return this._collidable; }
    get destructible() { return this._destructible; }
    get icon() { return this._icon; }
    get audio() { return this._audio; }

    attacked(damage) {
        this.audioPlay();
        if (damage && this._destructible) {
            this._health -= damage;

            if (this._health < 0) {
                this._health = 0;
            }
        }
    }

    audioPlay() {
        if (this._audio) {
            this.audioStop();
            this._audio.play();
        }
    }

    audioStop() {
        if (this._audio) {
            if (!this._audio.paused) {
                this._audio.pause();
                this._audio.currentTime = 0;
            }
        }
    }
}