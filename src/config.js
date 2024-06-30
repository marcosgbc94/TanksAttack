export const CONFIG_GAME = {
    'element': '#game-container',
    'contextType': '2d',
    'backgroundColor': 'black',
    'width': 900,
    'height': 500
}

export const CONFIG_PLAYER = {
    width: 40,
    height: 40,
    left: 0,
    top: 0,
    color: 'blue',
    health: 100,
    speedMove: 1,
    direction: 'down',
    delayShoot: 3000,
    icon: {
        up: '/public/img/characters/player/tank_player_up.svg',
        down: '/public/img/characters/player/tank_player_down.svg',
        right: '/public/img/characters/player/tank_player_right.svg',
        left: '/public/img/characters/player/tank_player_left.svg'
    },
    audio: {
        volume: 0.2,
        move: '/public/audio/tank-track.mp3',
        shot: '/public/audio/tank-shot.mp3'
    }
}

export const ENEMIES = {
    1: {
        width: 40,
        height: 40,
        left: 300,
        top: 0,
        color: 'red',
        health: 100,
        speedMove: 0.5,
        direction: 'down',
        delayShoot: 3000,
        distanceObserver: 300,
        distanceShot: 200,
        icon: {
            up: '/public/img/characters/enemy_a/enemy_up.svg',
            down: '/public/img/characters/enemy_a/enemy_down.svg',
            right: '/public/img/characters/enemy_a/enemy_right.svg',
            left: '/public/img/characters/enemy_a/enemy_left.svg'
        },
        audio: {
            volume: 0.2,
            move: '/public/audio/tank-track.mp3',
            shot: '/public/audio/tank-shot.mp3',
            impact: '/public/audio/block.mp3'
        }
    }
}

export const BLOCK_MATERIALS = {
    1: {
        name: 'brick',
        width: 25,
        height: 25,
        color: 'red',
        icon: '/public/img/blocks/bricks.webp',
        audio: '/public/audio/bricks-break.mp3',
        health: 100,
        collidable: true,
        destructible: true
    },
    2: {
        name: 'block',
        width: 25,
        height: 25,
        color: 'white',
        icon: '/public/img/blocks/block.svg',
        audio: '/public/audio/block.mp3',
        health: 100,
        collidable: true,
        destructible: false
    },
    3: {
        name: 'block_complete',
        width: 50,
        height: 50,
        color: 'white',
        icon: '/public/img/blocks/block_complete.svg',
        audio: '/public/audio/block.mp3',
        health: 100,
        collidable: true,
        destructible: false
    },
    4: {
        name: 'grass',
        width: 50,
        height: 50,
        color: 'green',
        icon: '/public/img/blocks/grass_complete.svg',
        audio: null,
        health: 100,
        collidable: false,
        destructible: false
    }
}

export const CONFIG_ATTACK = {
    width: 10,
    height: 2,
    color: 'white',
    speedMove: 3,
    damage: 50
}