import { CONFIG_ATTACK } from './config.js'
import Attack from './Attack.js';

export default class Game {
    constructor(params = {}) {
        this._gameContainer = document.querySelector(params.container) || document.querySelector('#game-container');
        this._context = params.contextType ? this._gameContainer.getContext(params.contextType) : this._gameContainer.getContext('2d');
        this._width = params.width || 500;
        this._height = params.height || 500;
        this._backgroundColor = params.backgroundColor || 'black';

        this._moveKeys = ['ArrowUp', 'w', 'ArrowDown', 's', 'ArrowLeft', 'a', 'ArrowRight', 'd'];
        this._keys = {};

        this._player = null;
        this._enemies = [];
        this._blocks = [];
        this._attacks = [];

        window.addEventListener('keydown', this._handleKeyDown.bind(this));
        window.addEventListener('keyup', this._handleKeyUp.bind(this));

        this._init();
    }

    get gameContainer() { return this._gameContainer; }
    get context() { return this._context; }
    get player() { return this._player; }
    get enemies() { return this._enemies; }
    get blocks() { return this._blocks; }
    get attacks() { return this._attacks; }

    set player(newPlayer) {
        this._player = newPlayer;
    }

    set enemies(newEnemies) {
        this._enemies.push(newEnemies);
    }

    set blocks(newBlocks) {
        this._blocks.push(newBlocks);
    }

    set attacks(newAttacks) {
        this._attacks.push(newAttacks);
    }

    clear() {
        this._context.clearRect(0, 0, this._width, this._height);
    }

    start() {
        this._loop();
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
                this.chase();
            });
        }

        if (this._blocks.length > 0) {
            this._blocks.map((block) => {
                this.renderBlock(block);
            });
        }

        requestAnimationFrame(() => this._loop());
    }

    _handleKeyDown(event) {
        if (event.code === 'Space') {
            this._playerAttack();
        } else {
            this._keys[event.key] = true;
        }
    }

    _handleKeyUp(event) {
        if (this._moveKeys.includes(event.key)) {
            this._player.audioStop('move');
        }
        delete this._keys[event.key];
    }

    // RENDERS

    renderPlayer() {
        this._playerMove();

        if (!this._player.icon) {
            this._context.fillStyle = this._player.color;
            this._context.fillRect(this._player.left, this._player.top, this._player.width, this._player.height);
        } else {
            this._context.drawImage(this._player.icon, this._player.left, this._player.top, this._player.width, this._player.height);
        }
    }

    renderEnemy(enemy) {
        if (!enemy.icon) {
            this._context.fillStyle = enemy.color;
            this._context.fillRect(enemy.left, enemy.top, enemy.width, enemy.height);
        } else {
            this._context.drawImage(enemy.icon, enemy.left, enemy.top, enemy.width, enemy.height);
        }
    }

    renderBlock(block) {
        if (!block.icon) {
            this._context.fillStyle = block.color;
            this._context.fillRect(block.left, block.top, block.width, block.height);
        } else {
            this._context.drawImage(block.icon, block.left, block.top, block.width, block.height);
        }
    }

    renderAttack(attack) {
        switch (attack.direction) {
            case 'up':
            case 'down':
                attack.height = CONFIG_ATTACK.width;
                attack.width = CONFIG_ATTACK.height;
                break;
            case 'left':
            case 'right':
                attack.height = CONFIG_ATTACK.height;
                attack.width = CONFIG_ATTACK.width;
                break;
        }

        this._context.fillStyle = attack.color;
        this._context.fillRect(attack.left, attack.top, attack.width, attack.height);

        return this._AttackCollitionLimit(attack);
    }

    // ACTIONS

    _playerMove() {
        if (this._keys['ArrowUp'] || this._keys['w']) {
            if (this._player.top > 0 && !this._playerCollitionBlock('up') && !this._playerCollitionEnemy('up')) {
                this._player.audioPlay('move');
                this._player.moveUp();
            }
        } else if (this._keys['ArrowDown'] || this._keys['s']) {
            if ((this._player.top + this._player.height) < this._height && !this._playerCollitionBlock('down') && !this._playerCollitionEnemy('down')) {
                this._player.audioPlay('move');
                this._player.moveDown();
            }
        } else if (this._keys['ArrowLeft'] || this._keys['a']) {
            if (this._player.left > 0 && !this._playerCollitionBlock('left') && !this._playerCollitionEnemy('left')) {
                this._player.audioPlay('move');
                this._player.moveLeft();
            }
        } else if (this._keys['ArrowRight'] || this._keys['d']) {
            if ((this._player.left + this._player.width) < this._width && !this._playerCollitionBlock('right') && !this._playerCollitionEnemy('right')) {
                this._player.audioPlay('move');
                this._player.moveRight();
            }
        }
    }

    _playerAttack() {
        if (!(this._lastAttackTime === undefined || (Date.now() - this._lastAttackTime) >= this._player.delayShoot)) return;

        this._lastAttackTime = Date.now();
        this._player.audioPlay('shot');

        let attackLeft = 0;
        let attackTop = 0;

        if (this._player.direction === 'up') {
            attackLeft = this._player.left + (this._player.width / 2);
            attackTop = this._player.top;
        }

        if (this._player.direction === 'down') {
            attackLeft = this._player.left + (this._player.width / 2);
            attackTop = this._player.top + this._player.height;
        }

        if (this._player.direction === 'left') {
            attackLeft = this._player.left;
            attackTop = this._player.top + (this._player.height / 2) - (CONFIG_ATTACK.height / 2);
        }

        if (this._player.direction === 'right') {
            attackLeft = this._player.left + this._player.width;
            attackTop = this._player.top + (this._player.height / 2) - (CONFIG_ATTACK.height / 2);
        }

        // Crear el ataque
        this.attacks = new Attack({ ...CONFIG_ATTACK, player: true, left: attackLeft, top: attackTop, direction: this._player.direction });
    }

    _enemyAttack(enemy) {
        if (!(this._lastAttackTimeEnemy === undefined || (Date.now() - this._lastAttackTimeEnemy) >= enemy.delayShoot)) return;

        this._lastAttackTimeEnemy = Date.now();
        enemy.audioPlay('shot');

        let attackLeft = 0;
        let attackTop = 0;

        if (enemy.direction === 'up') {
            attackLeft = enemy.left + (enemy.width / 2);
            attackTop = enemy.top;
        }

        if (enemy.direction === 'down') {
            attackLeft = enemy.left + (enemy.width / 2);
            attackTop = enemy.top + enemy.height;
        }

        if (enemy.direction === 'left') {
            attackLeft = enemy.left;
            attackTop = enemy.top + (enemy.height / 2) - (CONFIG_ATTACK.height / 2);
        }

        if (enemy.direction === 'right') {
            attackLeft = enemy.left + enemy.width;
            attackTop = enemy.top + (enemy.height / 2) - (CONFIG_ATTACK.height / 2);
        }

        // Crear el ataque
        this.attacks = new Attack({ ...CONFIG_ATTACK, player: false, left: attackLeft, top: attackTop, direction: enemy.direction });
    }

    // COLLITIONS

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

        if (attack.player) {
            if (this._AttackCollitionEnemy(attack)) {
                return true; // Indica que hay colisión
            }
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

    _AttackCollitionEnemy(attack) {
        let collition = false;

        const attack_tmp = {
            left: attack.left,
            right: attack.left + attack.width,
            top: attack.top,
            bottom: attack.top + attack.height
        };

        this._enemies.map((enemy, index) => {
            if (!collition) {
                const enemy_tmp = {
                    left: enemy.left,
                    right: enemy.left + enemy.width,
                    top: enemy.top,
                    bottom: enemy.top + enemy.height
                };

                if (attack_tmp.left <= enemy_tmp.right && attack_tmp.right >= enemy_tmp.left &&
                    attack_tmp.top <= enemy_tmp.bottom && attack_tmp.bottom >= enemy_tmp.top) {
                    collition = true;
                } else if (attack_tmp.right >= enemy_tmp.left && attack_tmp.left <= enemy_tmp.right &&
                    attack_tmp.top <= enemy_tmp.bottom && attack_tmp.bottom >= enemy_tmp.top) {
                    collition = true;
                } else if (attack_tmp.top <= enemy_tmp.bottom && attack_tmp.bottom >= enemy_tmp.top &&
                    attack_tmp.left <= enemy_tmp.right && attack_tmp.right >= enemy_tmp.left) {
                    collition = true;
                } else if (attack_tmp.bottom >= enemy_tmp.top && attack_tmp.top <= enemy_tmp.bottom &&
                    attack_tmp.left <= enemy_tmp.right && attack_tmp.right >= enemy_tmp.left) {
                    collition = true;
                }

                if (collition) {
                    enemy.attacked(attack.damage);
                    if (enemy.health === 0) this._enemies.splice(index, 1);
                }
            }
        });

        return collition;
    }

    _playerCollitionBlock(move) {
        let collition = false;
        const playerSpeedMove = (this._player.speedMove / 2);

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

    _playerCollitionEnemy(move) {
        let collition = false;
        const playerSpeedMove = (this._player.speedMove / 2);

        const player_tmp = {
            left: this._player.left,
            right: this._player.left + this._player.width,
            top: this._player.top,
            bottom: this._player.top + this._player.height
        };

        this._enemies.map((enemy) => {
            const enemy_tmp = {
                left: enemy.left,
                right: enemy.left + enemy.width,
                top: enemy.top,
                bottom: enemy.top + enemy.height
            };

            switch (move) {
                case 'left':
                    player_tmp.left -= playerSpeedMove;
                    player_tmp.right -= playerSpeedMove;

                    if (player_tmp.left <= enemy_tmp.right && player_tmp.right >= enemy_tmp.left &&
                        player_tmp.top <= enemy_tmp.bottom && player_tmp.bottom >= enemy_tmp.top) {
                        collition = true;
                    }
                    break;
                case 'right':
                    player_tmp.left += playerSpeedMove;
                    player_tmp.right += playerSpeedMove;

                    if (player_tmp.right >= enemy_tmp.left && player_tmp.left <= enemy_tmp.right &&
                        player_tmp.top <= enemy_tmp.bottom && player_tmp.bottom >= enemy_tmp.top) {
                        collition = true;
                    }
                    break;
                case 'up':
                    player_tmp.top -= playerSpeedMove;
                    player_tmp.bottom -= playerSpeedMove;

                    if (player_tmp.top <= enemy_tmp.bottom && player_tmp.bottom >= enemy_tmp.top &&
                        player_tmp.left <= enemy_tmp.right && player_tmp.right >= enemy_tmp.left) {
                        collition = true;
                    }
                    break;
                case 'down':
                    player_tmp.top += playerSpeedMove;
                    player_tmp.bottom += playerSpeedMove;

                    if (player_tmp.bottom >= enemy_tmp.top && player_tmp.top <= enemy_tmp.bottom &&
                        player_tmp.left <= enemy_tmp.right && player_tmp.right >= enemy_tmp.left) {
                        collition = true;
                    }
                    break;
            }
        });

        return collition;
    }

    chase() {
        // Calcular la dirección hacia el jugador
        let dx = this._player.left - this.enemies[0].left;
        let dy = this._player.top - this.enemies[0].top;

        // Calcular la distancia al jugador
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Detener al enemigo si está cerca del jugador
        if (distance <= 100) {
            this.isChasing = false;

            this._enemyAttack(this.enemies[0]);
            return;
        }

        // Normalizar el vector de dirección
        dx /= distance;
        dy /= distance;

        // Mover el enemigo en la dirección normalizada y velocidad
        this._enemies[0].left += dx * this._enemies[0].speedMove;
        this._enemies[0].top += dy * this._enemies[0].speedMove;

        // Actualizar la dirección del enemigo basada en el movimiento
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                this._enemies[0]._direction = 'right';
            } else {
                this._enemies[0]._direction = 'left';
            }
        } else {
            if (dy > 0) {
                this._enemies[0]._direction = 'down';
            } else {
                this._enemies[0]._direction = 'up';
            }
        }

        // Actualizar el ícono si está definido
        if (this._enemies[0].icon !== undefined) {
            switch (this._enemies[0]._direction) {
                case 'up':
                    this._enemies[0]._icon.src = this._enemies[0]._icons.up;
                    break;
                case 'down':
                    this._enemies[0]._icon.src = this._enemies[0]._icons.down;
                    break;
                case 'left':
                    this._enemies[0]._icon.src = this._enemies[0]._icons.left;
                    break;
                case 'right':
                    this._enemies[0]._icon.src = this._enemies[0]._icons.right;
                    break;
                default:
                    break;
            }
        }
    }
}