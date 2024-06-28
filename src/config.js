export const CONFIG_GAME = {
    'element': '#game-container',
    'contextType': '2d',
    'backgroundColor': 'black',
    'width': 900,
    'height': 500
}

export const CONFIG_PLAYER = {
    width: 50,
    height: 50,
    left: 0,
    top: 0,
    color: 'blue',
    health: 100,
    speedMove: 2,
    direction: 'down',
    icon: {
        up: '/public/img/tank_player_up.svg',
        down: '/public/img/tank_player_down.svg',
        right: '/public/img/tank_player_right.svg',
        left: '/public/img/tank_player_left.svg'
    },
    audio: {
        volume: 0.1,
        move: '/public/audio/tank-track.mp3'
    }
}

export const CONFIG_ENEMY = {
    'width': 50,
    'height': 50,
    'left': 300,
    'top': 0,
    'color': 'red',
    icon: {
        up: null,
        down: null,
        right: null,
        left: null
    },
    'health': 100,
    'speedMove': 5
}

export const BLOCK_MATERIALS = {
    1: {
        name: 'brick',
        width: 25,
        height: 25,
        color: 'white',
        icon: '/public/img/bricks.webp',
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
        icon: '/public/img/block.svg',
        audio: '/public/audio/block.mp3',
        health: 100,
        collidable: true,
        destructible: false
    }
}

export const CONFIG_ATTACK = {
    width: 10,
    height: 2,
    color: 'white',
    speedMove: 5,
    damage: 50
}