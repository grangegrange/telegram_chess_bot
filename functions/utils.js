const params = require('../constants/params')


const reverseArray = (array) => {
    return array.slice().reverse()
}


const isChessCommand = (message) => {
    if (message.length === 5 &&
        params.chessLetters.indexOf(message[0]) >= 0 &&
        message[1] >= 1 && message[1] <= 8 &&
        message[2] === '-' &&
        params.chessLetters.indexOf(message[3]) >= 0 &&
        message[4] >= 1 && message[4] <= 8
    ) {
        return true
    }
    return false
}


module.exports.reverseArray = reverseArray
module.exports.isChessCommand = isChessCommand