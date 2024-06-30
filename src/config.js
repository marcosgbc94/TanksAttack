export const CONFIG_GAME = {
    element: '#game-container',
    contextType: '2d',
    backgroundColor: 'black',
    sizeQuadrant: 25,
    countWidthQuadrant: 40,
    countHeightQuadrant: 20
}

export const CONFIG_PLAYER = {
    quadrants: 1.5,
    leftQuadrant: 0,
    topQuadrant: 0,
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
        quadrants: 1.5,
        color: 'red',
        health: 100,
        speedMove: .5,
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
        quadrants: 1,
        color: 'red',
        icon: '/public/img/blocks/bricks.webp',
        audio: '/public/audio/bricks-break.mp3',
        health: 100,
        collidable: true,
        destructible: true
    },
    2: {
        name: 'block',
        quadrants: 1,
        color: 'white',
        icon: '/public/img/blocks/block.svg',
        audio: '/public/audio/block.mp3',
        health: 100,
        collidable: true,
        destructible: false
    },
    3: {
        name: 'block_complete',
        quadrants: 2,
        color: 'white',
        icon: '/public/img/blocks/block_complete.svg',
        audio: '/public/audio/block.mp3',
        health: 100,
        collidable: true,
        destructible: false
    },
    4: {
        name: 'grass',
        quadrants: 2,
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