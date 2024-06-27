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
            game.attacks = new Attack({...CONFIG_ATTACK, left: player.left, top: player.top, direction: player.direction});
        }
    })
});