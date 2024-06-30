import Character from "./Character.js";

export default class Enemy extends Character {
    constructor(params = {}) {
        super(params);
        this._distanceObserver = params.distanceObserver;
        this._distanceShot = params.distanceShot;
    };

    get distanceObserver() { return this._distanceObserver; }
    get distanceShot() { return this._distanceShot; }

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