import {Euler, Quaternion} from 'three'

const getOpposingDirection = (direction) => {
    const polarity = direction[0]

    if (polarity === '+') {
        return '-' + direction[1]
    } else {
        return '+' + direction[1]
    }
}

  
const getRelativeDirectionArray = (direction) => {

    const directionMap = {
        '+x': [1, 0, 0],
        '-x': [-1, 0, 0],
        '+y': [0, 1, 0],
        '-y': [0, -1, 0],
        '+z': [0, 0, 1],
        '-z': [0, 0, -1],
    }

    if (directionMap.hasOwnProperty(direction)) {
        return directionMap[direction]
    } else {
        console.error('Invalid direction inputted into getRelativeDirectionArray')
        return [0, 0, 0]
    }
}

const equalDirections = (direction1, direction2) => {
    return direction1 === direction2
}

const getRotationFromDirection = (direction) => {
    const directionMap = {
        '+x': [0, 0, Math.PI / 2],
        '-x': [0, 0, - Math.PI / 2],
        '+y': [0, 0, Math.PI],
        '-y': [0, 0, 0],
        '+z': [- Math.PI/2, 0, 0],
        '-z': [Math.PI/2, 0, 0],
    }

    if (directionMap.hasOwnProperty(direction)) {
        return directionMap[direction]
    } else {
        console.error('Invalid direction inputted into getRotationFromDirection')
        return [0, 0, 0]
    }

}

export { 
    getOpposingDirection, 
    getRelativeDirectionArray, 
    equalDirections, 
    getRotationFromDirection, 
}