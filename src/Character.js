export default class Character {
    constructor(params = {}) {
        this._width = params.width || 50;
        this._height = params.height || 50;
        this._left = params.left || 0;
        this._top = params.top || 0;
        this._color = params.color || 'red';
        this._health = params.health || 100;
        this._speedMove = params.speedMove || 5;
        this._direction = params.direction || 'right';

        if (params.icon !== undefined) {
            this._icons = params.icon;
            this._icon = new Image();
            this._icon.src = params.icon.down ? params.icon.down : null;
        }

        if (params.audio !== undefined) {
            this._audios = params.audio;
            this._audio = {};
            this._audio.move = new Audio();
            this._audio.move.src = params.audio !== undefined ? params.audio.move : null;
            this._audio.move.volume = params.audio.volume;
        }
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get left() { return this._left; }
    get top() { return this._top; }
    get color() { return this._color; }
    get health() { return this._health; }
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

    moveUp() {
        this._top -= this._speedMove;
        this._direction = 'up';
    }

    moveDown() {
        this._top += this._speedMove;
        this._direction = 'down';
    }

    moveLeft() {
        this._left -= this._speedMove;
        this._direction = 'left';
    }

    moveRight() {
        this._left += this._speedMove;
        this._direction = 'right';
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