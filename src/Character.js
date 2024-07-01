import { CONFIG_GAME } from './config.js';
export default class Character {
    constructor(params = {}) {
        this._width = params.quadrants * CONFIG_GAME.sizeQuadrant || 25;
        this._height = params.quadrants * CONFIG_GAME.sizeQuadrant || 25;
        this._left = params.leftQuadrant * CONFIG_GAME.sizeQuadrant || 0;
        this._top = params.topQuadrant * CONFIG_GAME.sizeQuadrant || 0;
        this._leftQuadrant = params.leftQuadrant || 0;
        this._topQuadrant = params.topQuadrant || 0;
        this._color = params.color || 'red';
        this._health = params.health || 100;
        this._speedMove = params.speedMove || 5;
        this._direction = params.direction || 'right';
        this._delayShoot = params.delayShoot || 3000;

        if (params.icon) {
            this._icons = params.icon;
            this._icon = new Image();
            this._icon.src = params.icon.down ? params.icon.down : null;
        }

        if (params.audio) {
            this._audios = params.audio;
            this._audio = {};
            for (const audio in params.audio) {
                this._audio[audio] = new Audio();
                this._audio[audio].src = params.audio ? params.audio[audio] : null;
                this._audio[audio].volume = params.audio.volume;   
            }
        }
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get left() { return this._left; }
    get top() { return this._top; }
    get leftQuadrant() { return this._leftQuadrant; }
    get topQuadrant() { return this._topQuadrant; }
    get color() { return this._color; }
    get health() { return this._health; }
    get delayShoot() { return this._delayShoot; }
    get speedMove() { return this._speedMove; }
    get direction() { return this._direction; }
    get icon() { return this._icon; }
    get audio() { return this._audio; }

    set left(newLeft) {
        if (typeof newLeft === 'number') {
            this._left = newLeft;
        }
    }

    set top(newTop) {
        if (typeof newTop === 'number') {
            this._top = newTop;
        }
    }

    set direction(newDirection) {
        if (typeof newDirection === 'string') {
            this._direction = newDirection;

            if (this._icon && this._icons) {
                this._icon.src = this._icons[newDirection];
            }
        }
    }

    moveUp() {
        this._top -= this._speedMove;
        this._topQuadrant = Math.floor(this._top / CONFIG_GAME.sizeQuadrant);
        this._direction = 'up';
        if (this._icon && this._icons) {
            this._icon.src = this._icons.up;
        }
    }

    moveDown() {
        this._top += this._speedMove;
        this._topQuadrant = Math.floor(this._top / CONFIG_GAME.sizeQuadrant);
        this._direction = 'down';
        if (this._icon && this._icons) {
            this._icon.src = this._icons.down;
        }
    }

    moveLeft() {
        this._left -= this._speedMove;
        this._leftQuadrant = Math.floor(this._left / CONFIG_GAME.sizeQuadrant);
        this._direction = 'left';
        if (this._icon && this._icons) {
            this._icon.src = this._icons.left;
        }
    }

    moveRight() {
        this._left += this._speedMove;
        this._leftQuadrant = Math.floor(this._left / CONFIG_GAME.sizeQuadrant);
        this._direction = 'right';
        if (this._icon && this._icons) {
            this._icon.src = this._icons.right;
        }
    }

    attacked(damage) {
        if (this._audio) {
            if (this._audio.impact) {
                this.audioPlay('impact');
            }
        }
        if (damage) {
            this._health -= damage;

            if (this._health < 0) {
                this._health = 0;
            }
        }
    }

    audioPlay(option) {
        if (this._audio && this._audio[option]) {
            this._audio[option].play();
        }
    }

    audioStop(option) {
        if (this._audio && this._audio[option]) {
            if (!this._audio[option].paused) {
                this._audio[option].pause();
                this._audio[option].currentTime = 0;
            }
        }
    }
}