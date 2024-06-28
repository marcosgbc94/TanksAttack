export default class Game {
    constructor(params = {}) {
        this._gameContainer = document.querySelector(params.container) || document.querySelector('#game-container');
        this._context = params.contextType ? this._gameContainer.getContext(params.contextType) : this._gameContainer.getContext('2d');
        this._width = params.width || 500;
        this._height = params.height || 500;
        this._backgroundColor = params.backgroundColor || 'black';
        this._keys = {};
        this._attack = {
            height: 10,
            width: 2
        }
        this._playerAudio = {
            audio: new Audio()
        }

        this._playerAudio.audio.src = '/public/audio/tank-track.mp3';
        this._playerAudio.audio.volume = .1;

        this._player = null;
        this._enemies = [];
        this._blocks = [];
        this._attacks = [];

        window.addEventListener('keydown', this._handleKeyDown.bind(this));
        window.addEventListener('keyup', this._handleKeyUp.bind(this));

        this._init();
    }

    get gameContainer() {
        return this._gameContainer;
    }

    get context() {
        return this._context;
    }

    get player() {
        return this._player;
    }

    set player(newPlayer) {
        this._player = newPlayer;
    }

    get enemies() {
        return this._enemies;
    }

    set enemies(newEnemies) {
        this._enemies.push(newEnemies);
    }

    get blocks() {
        return this._blocks;
    }

    set blocks(newBlocks) {
        this._blocks.push(newBlocks);
    }

    get attacks() {
        return this._attacks;
    }

    set attacks(newAttacks) {
        this._attacks.push(newAttacks);
    }

    _handleKeyDown(event) {
        this._keys[event.key] = true;

    }

    _handleKeyUp(event) {
        this._player.audioStop('move');
        delete this._keys[event.key];
    }


    _init() {
        this.gameContainer.style.backgroundColor = this._backgroundColor;
        this.gameContainer.width = this._width;
        this.gameContainer.height = this._height;
    }

    _loop() {
        this.clear();

        if (this._player) this.renderPlayer();

        if (this._attacks.length > 0) {
            this._attacks.map((attack, index) => {
                const attackRendering = this.renderAttack(attack);
                if (attackRendering === true) this._attacks.splice(index, 1);
            });
        }

        if (this._enemies.length > 0) {
            this._enemies.map((enemy) => {
                this.renderEnemy(enemy);
            });
        }

        if (this._blocks.length > 0) {
            this._blocks.map((block) => {
                this.renderBlock(block);
            });
        }

        requestAnimationFrame(() => this._loop());
    }

    renderPlayer() {
        this._playerMove();

        if (this._player.icon === undefined) {
            this._context.fillStyle = this._player.color;
            this._context.fillRect(this._player.left, this._player.top, this._player.width, this._player.height);
        } else {
            this._context.drawImage(this._player.icon, this._player.left, this._player.top, this._player.width, this._player.height);
        }
    }

    renderEnemy(enemy) {
        this._context.fillStyle = enemy.color;
        this._context.fillRect(enemy.left, enemy.top, enemy.width, enemy.height);
    }

    renderBlock(block) {
        // this._context.fillStyle = block.color;
        // this._context.fillRect(block.left, block.top, block.width, block.height);
        this._context.drawImage(block.icon, block.left, block.top, block.width, block.height);
    }

    renderAttack(attack) {
        switch (attack.direction) {
            case 'up':
                attack.height = this._attack.height;
                attack.width = this._attack.width;
                break;
            case 'down':
                attack.height = this._attack.height;
                attack.width = this._attack.width;
                break;
            case 'left':
                attack.height = this._attack.width;
                attack.width = this._attack.height;
                break;
            case 'right':
                attack.height = this._attack.width;
                attack.width = this._attack.height;
                break;
        }

        this._context.fillStyle = attack.color;
        this._context.fillRect(attack.left, attack.top, attack.width, attack.height);
        return this._AttackCollitionLimit(attack);
    }

    _playerMove() {
        if (this._keys['ArrowUp'] || this._keys['w']) {
            if (this._player.top > 0 && !this._playerCollitionBlock('up')) {
                this._player.audioPlay('move');
                this._player.moveUp();
            }
        } else if (this._keys['ArrowDown'] || this._keys['s']) {
            if ((this._player.top + this._player.height) < this._height && !this._playerCollitionBlock('down')) {
                this._player.audioPlay('move');
                this._player.moveDown();
            }
        } else if (this._keys['ArrowLeft'] || this._keys['a']) {
            if (this._player.left > 0 && !this._playerCollitionBlock('left')) {
                this._player.audioPlay('move');
                this._player.moveLeft();
            }
        } else if (this._keys['ArrowRight'] || this._keys['d']) {
            if ((this._player.left + this._player.width) < this._width && !this._playerCollitionBlock('right')) {
                this._player.audioPlay('move');
                this._player.moveRight();
            }
        }
    }

    _AttackCollitionLimit(attack) {
        const attack_tmp = {
            top: attack.top,
            left: attack.left,
            right: attack.left + attack.width,
            bottom: attack.top + attack.height
        }

        if (attack_tmp.top < -attack.height || attack_tmp.bottom > this._height || attack_tmp.left < 0 || attack_tmp.right > this._width) {
            return true; // Indica que hay colisión
        }

        if (this._AttackCollitionBlock(attack)) {
            return true; // Indica que hay colisión
        }

        switch (attack.direction) {
            case 'up':
                attack.moveUp();
                break;
            case 'down':
                attack.moveDown();
                break;
            case 'left':
                attack.moveLeft();
                break;
            case 'right':
                attack.moveRight();
                break;
        }

        return false;
    }

    _AttackCollitionBlock(attack) {
        let collition = false;

        const attack_tmp = {
            left: attack.left,
            right: attack.left + attack.width,
            top: attack.top,
            bottom: attack.top + attack.height
        };

        this._blocks.map((block, index) => {
            if (!block.collidable) return;

            if (!collition) {
                const block_tmp = {
                    left: block.left,
                    right: block.left + block.width,
                    top: block.top,
                    bottom: block.top + block.height
                };

                if (attack_tmp.left <= block_tmp.right && attack_tmp.right >= block_tmp.left &&
                    attack_tmp.top <= block_tmp.bottom && attack_tmp.bottom >= block_tmp.top) {
                    collition = true;
                } else if (attack_tmp.right >= block_tmp.left && attack_tmp.left <= block_tmp.right &&
                    attack_tmp.top <= block_tmp.bottom && attack_tmp.bottom >= block_tmp.top) {
                    collition = true;
                } else if (attack_tmp.top <= block_tmp.bottom && attack_tmp.bottom >= block_tmp.top &&
                    attack_tmp.left <= block_tmp.right && attack_tmp.right >= block_tmp.left) {
                    collition = true;
                } else if (attack_tmp.bottom >= block_tmp.top && attack_tmp.top <= block_tmp.bottom &&
                    attack_tmp.left <= block_tmp.right && attack_tmp.right >= block_tmp.left) {
                    collition = true;
                }

                if (collition) {
                    block.attacked(attack.damage);
                    if (block.health === 0) this._blocks.splice(index, 1);
                }
            }
        });

        return collition;
    }

    _playerCollitionBlock(move) {
        let collition = false;
        const playerSpeedMove = this._player.speedMove;

        const player_tmp = {
            left: this._player.left,
            right: this._player.left + this._player.width,
            top: this._player.top,
            bottom: this._player.top + this._player.height
        };

        this._blocks.map((block) => {
            if (!block.collidable) return;

            const block_tmp = {
                left: block.left,
                right: block.left + block.width,
                top: block.top,
                bottom: block.top + block.height
            };

            switch (move) {
                case 'left':
                    player_tmp.left -= playerSpeedMove;
                    player_tmp.right -= playerSpeedMove;

                    if (player_tmp.left <= block_tmp.right && player_tmp.right >= block_tmp.left &&
                        player_tmp.top <= block_tmp.bottom && player_tmp.bottom >= block_tmp.top) {
                        collition = true;
                    }
                    break;
                case 'right':
                    player_tmp.left += playerSpeedMove;
                    player_tmp.right += playerSpeedMove;

                    if (player_tmp.right >= block_tmp.left && player_tmp.left <= block_tmp.right &&
                        player_tmp.top <= block_tmp.bottom && player_tmp.bottom >= block_tmp.top) {
                        collition = true;
                    }
                    break;
                case 'up':
                    player_tmp.top -= playerSpeedMove;
                    player_tmp.bottom -= playerSpeedMove;

                    if (player_tmp.top <= block_tmp.bottom && player_tmp.bottom >= block_tmp.top &&
                        player_tmp.left <= block_tmp.right && player_tmp.right >= block_tmp.left) {
                        collition = true;
                    }
                    break;
                case 'down':
                    player_tmp.top += playerSpeedMove;
                    player_tmp.bottom += playerSpeedMove;

                    if (player_tmp.bottom >= block_tmp.top && player_tmp.top <= block_tmp.bottom &&
                        player_tmp.left <= block_tmp.right && player_tmp.right >= block_tmp.left) {
                        collition = true;
                    }
                    break;
            }
        });

        return collition;
    }

    clear() {
        this._context.clearRect(0, 0, this._width, this._height);
    }

    start() {
        this._loop();
    }
}