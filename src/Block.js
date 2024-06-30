import { CONFIG_GAME } from './config.js';

export default class Block {
    constructor(params = {}) {
        this._width = params.quadrants * CONFIG_GAME.sizeQuadrant || 25;
        this._height = params.quadrants * CONFIG_GAME.sizeQuadrant || 25;
        this._left = params.leftQuadrant * CONFIG_GAME.sizeQuadrant || 0;
        this._top = params.topQuadrant * CONFIG_GAME.sizeQuadrant || 0;
        this._health = params.health || 50;
        this._color = params.color || 'white';
        this._collidable = (params.collidable === null || params.collidable === undefined) ? true : params.collidable;
        this._destructible = (params.destructible === null || params.destructible === undefined) ? true : params.destructible;
        this._leftQuadrant = params.leftQuadrant || 0;
        this._topQuadrant = params.topQuadrant || 0;
        this._quadrants = params.quadrants || 1;

        if (params.icon) {
            this._icon = new Image();
            this._icon.src = params.icon || null;
        }

        if (params.audio) {
            this._audio = new Audio;
            this._audio.src = params.audio || null;
            this._audio.volume = 0.1;
        }
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get left() { return this._left; }
    get top() { return this._top; }
    get leftQuadrant() { return this._leftQuadrant; }
    get topQuadrant() { return this._topQuadrant; }
    get quadrants() { return this._quadrants; }
    get health() { return this._health; }
    get color() { return this._color; }
    get collidable() { return this._collidable; }
    get destructible() { return this._destructible; }
    get icon() { return this._icon; }
    get audio() { return this._audio; }

    attacked(damage) {
        if (this._audio) this.audioPlay();
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