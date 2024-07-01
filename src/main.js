import { CONFIG_GAME, CONFIG_PLAYER, ENEMIES, BLOCK_MATERIALS } from './config.js'
import Game from './Game.js';
import Player from './Player.js';
import Block from './Block.js';
import Enemy from './Enemy.js';
import { LEVEL_1_BLOCKS, LEVEL_1_ENEMIES } from './level_1.js';

let worker = new Worker('/src/worker.js');
window.addEventListener('load', () => {
    const game = new Game(CONFIG_GAME);

    LEVEL_1_ENEMIES.length > 0 && LEVEL_1_ENEMIES.map((enemy) => {
        game.enemies = new Enemy({...enemy, ...ENEMIES[enemy.id]});
    });

    LEVEL_1_BLOCKS.length > 0 && LEVEL_1_BLOCKS.map((block) => {
        game.blocks = new Block({...block, ...BLOCK_MATERIALS[block.material]});
    });

    game.player = new Player(CONFIG_PLAYER);

    game.start();
    
});

  // En el archivo principal
  
 