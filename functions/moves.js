const piecesPositions = require('../constants/piecesPositions')


const evaluateBoard = (board) => {
    // console.log('evaluateBoard:', board)
    let totalEvaluation = 0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j)
        }
    }
    return totalEvaluation
}


const getPieceValue = (piece, x, y) => {

    if (piece === null) {
        return 0
    }

    const getAbsoluteValue = function (piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? piecesPositions.pawnEvalWhite[y][x] : piecesPositions.pawnEvalBlack[y][x] )
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? piecesPositions.rookEvalWhite[y][x] : piecesPositions.rookEvalBlack[y][x] )
        } else if (piece.type === 'n') {
            return 30 + piecesPositions.knightEval[y][x]
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? piecesPositions.bishopEvalWhite[y][x] : piecesPositions.bishopEvalBlack[y][x] )
        } else if (piece.type === 'q') {
            return 90 + piecesPositions.evalQueen[y][x]
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? piecesPositions.kingEvalWhite[y][x] : piecesPositions.kingEvalBlack[y][x] )
        }
        throw "Unknown piece type: " + piece.type
    }

    const absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y)
    return piece.color === 'w' ? absoluteValue : -absoluteValue

}


const minimax = (depth, game, isMaximisingPlayer) => {

    if (depth === 0) {
        return -evaluateBoard(game.board())
    }

    const newGameMoves = game.moves()

    if (isMaximisingPlayer) {
        let bestMove = -9999
        for (let i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i])
            bestMove = Math.max(bestMove, minimax(depth - 1, game, !isMaximisingPlayer))
            game.undo()
        }
        return bestMove
    } else {
        let bestMove = 9999
        for (let i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i])
            bestMove = Math.min(bestMove, minimax(depth - 1, game, !isMaximisingPlayer))
            game.undo()
        }
        return bestMove
    }

}


const minimaxRoot = (depth, game, isMaximisingPlayer) => {

    const newGameMoves = game.moves()
    let bestMove = -9999
    let bestMoveFound

    for(let i = 0; i < newGameMoves.length; i++) {
        const newGameMove = newGameMoves[i]
        game.move(newGameMove)
        const value = minimax(depth - 1, game, !isMaximisingPlayer)
        game.undo()
        if(value >= bestMove) {
            bestMove = value
            bestMoveFound = newGameMove
        }
    }

    return bestMoveFound
}


module.exports.evaluateBoard = evaluateBoard
module.exports.minimaxRoot = minimaxRoot