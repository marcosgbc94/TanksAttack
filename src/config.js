export const CONFIG_GAME = {
    'element': '#game-container',
    'contextType': '2d',
    'backgroundColor': 'black',
    'width': 900,
    'height': 500
}

export const CONFIG_PLAYER = {
    'width': 50,
    'height': 50,
    'left': 0,
    'top': 0,
    'color': 'blue',
    'health': 100,
    'speedMove': 5,
    'direction': 'down'
}

export const CONFIG_ENEMY = {
    'width': 50,
    'height': 50,
    'left': 300,
    'top': 0,
    'color': 'red',
    'health': 100,
    'speedMove': 5
}

export const CONFIG_MATERIAL_BRICK_BLOCK = {
    id: 1,
    width: 25,
    height: 25,
    color: 'white',
    collidable: true,
    destructible: true
}

export const CONFIG_ATTACK = {
    width: 10,
    height: 10,
    color: 'white',
    speedMove: 1,
    damage: 50
}