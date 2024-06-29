import Character from "./Character.js";

export default class Enemy extends Character {
    constructor(params = {}) {
        super(params);
    };

    moveUp() {
        super.moveUp();
        if (this._icon !== undefined) {
            this._icon.src = this._icons.up;
        }
    }

    moveDown() {
        super.moveDown();
        if (this._icon !== undefined) {
            this._icon.src = this._icons.down;
        }
    }

    moveLeft() {
        super.moveLeft();
        if (this._icon !== undefined) {
            this._icon.src = this._icons.left;
        }
    }

    moveRight() {
        super.moveRight();
        if (this._icon !== undefined) {
            this._icon.src = this._icons.right;
        }
    }
}