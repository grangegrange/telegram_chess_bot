const params = require('../constants/params')


const reverseArray = (array) => {
    return array.slice().reverse()
}


const isChessCommand = (message) => {
    const msg = message.toLowerCase()
    if (msg.length === 5 &&
        params.chessLetters.indexOf(msg[0]) >= 0 &&
        msg[1] >= 1 && msg[1] <= 8 &&
        msg[2] === '-' &&
        params.chessLetters.indexOf(msg[3]) >= 0 &&
        msg[4] >= 1 && msg[4] <= 8
    ) {
        return true
    }
    return false
}


module.exports.reverseArray = reverseArray
module.exports.isChessCommand = isChessCommand