import Character from "./Character.js";

export default class Player extends Character {
    constructor (params = {}) {
        super(params);
    }

    moveUp() {
        super.moveUp();
    }

    moveDown() {
        super.moveDown();
    }

    moveLeft() {
        super.moveLeft();
    }

    moveRight() {
        super.moveRight();
    }
}