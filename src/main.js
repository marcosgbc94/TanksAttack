import { CONFIG_GAME, CONFIG_PLAYER, ENEMIES, BLOCK_MATERIALS } from './config.js'
import Game from './Game.js';
import Player from './Player.js';
import Block from './Block.js';
import Enemy from './Enemy.js';
import level_1 from './level_1.js';

window.addEventListener('load', () => {
    const player = new Player(CONFIG_PLAYER);
    const enemies = new Enemy(ENEMIES[1]);
    const game = new Game(CONFIG_GAME);

    level_1.length > 0 && level_1.map((block) => {
        game.blocks = new Block({...block, ...BLOCK_MATERIALS[block.material]});
    });

    game.player = player;
    game.enemies = enemies;

    game.start();
});