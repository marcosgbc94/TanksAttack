import { CONFIG_GAME, CONFIG_PLAYER, CONFIG_ENEMY, CONFIG_MATERIAL_BRICK_BLOCK, CONFIG_ATTACK } from './config.js'
import Game from './Game.js';
import Character from './Character.js';
import Block from './Block.js';
import Attack from './attack.js';
import level_1 from './level_1.js';

window.addEventListener('load', () => {
    const player = new Character(CONFIG_PLAYER);
    const enemies = new Character(CONFIG_ENEMY);
    const game = new Game(CONFIG_GAME);

    level_1.length > 0 && level_1.map((block) => {
        switch (block.material) {
            case 1:
                game.blocks = new Block({...block, ...CONFIG_MATERIAL_BRICK_BLOCK});
                break;
        }
    });

    game.player = player;
    game.enemies = enemies;

    game.start();

    window.addEventListener('keypress', (key) => {
        if (key.code === 'Space') {
            let attackLeft = 0;
            let attackTop = 0;
            
            if (player.direction === 'up') {
                attackLeft = player.left + (player.width/2);
                attackTop = player.top;
            }

            if (player.direction === 'down') {
                attackLeft = player.left + (player.width/2);
                attackTop = player.top + player.height;
            }

            if (player.direction === 'left') {
                attackLeft = player.left;
                attackTop = player.top + (player.height/2) - (CONFIG_ATTACK.height/2);
            }

            if (player.direction === 'right') {
                attackLeft = player.left + player.width;
                attackTop = player.top + (player.height/2) - (CONFIG_ATTACK.height/2);
            }

            game.attacks = new Attack({...CONFIG_ATTACK, left: attackLeft, top: attackTop, direction: player.direction});
        }
    })
});