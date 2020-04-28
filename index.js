const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const token = process.env.TOKEN
const { Chess } = require('chess.js')

const bot = new TelegramBot(token, { polling: true })


// CONSTANTS & FUNCTIONS
const COMMANDS = require('./constants/commands')
const PARAMS = require('./constants/params')
const boardFunctions = require('./functions/board')
const movesFunctions = require('./functions/moves')
const utils = require('./functions/utils')

// STATE
let chessPlaying = {}
let chessGame = {}


const finishGame = (game, chatId, botMove) => {
    if (game.in_checkmate()) {
        botMove ? bot.sendMessage(chatId, "Вы проиграли!") : bot.sendMessage(chatId, "Вы выиграли!")
    }
    if (game.in_draw()) {
        bot.sendMessage(chatId, "Ничья!")
    }
    if (game.in_stalemate()) {
        bot.sendMessage(chatId, "Пат!")
    }
    if (game.in_threefold_repetition()) {
        bot.sendMessage(chatId, "Повтор трех ходов")
    }
    bot.sendMessage(chatId, "Партия закончена", {
        "reply_markup": {
            "keyboard": [
                [COMMANDS.CHESS_START]
            ]
        }
    })
    chessPlaying[chatId] = false
}


bot.on('message', (msg) => {

    if (!chessGame[msg.chat.id]) {
        chessGame[msg.chat.id] = {}
    }

    // NOT PLAYING & IN COMMANDS LIST
    if (!chessPlaying[msg.chat.id] && Object.values(COMMANDS).indexOf(msg.text) !== -1) {

        if (msg.text === COMMANDS.BOT_START) {
            bot.sendMessage(msg.chat.id, "Шахматы?", {
                "reply_markup": {
                    "keyboard": [
                        [COMMANDS.CHESS_START]
                    ]
                }
            })
        }

        if (msg.text === COMMANDS.CHESS_START) {
            chessPlaying[msg.chat.id] = true
            // chessPlaying = true
            chessGame[msg.chat.id] = new Chess()
            bot.sendMessage(msg.chat.id, "Ну-ка посмотрим. Ходы в нотации e2-e4, f2-f3", {
                "reply_markup": {
                    "keyboard": [
                        [COMMANDS.CHESS_STOP]
                    ]
                }
            })
            bot.sendMessage(msg.chat.id, "Начинаем партию")
            const boardImage = boardFunctions.drawImageCanvas(chessGame[msg.chat.id].board())
            bot.sendPhoto(msg.chat.id, boardImage)
        }

    }

    // CHESS COMMAND
    else if (chessPlaying[msg.chat.id] && utils.isChessCommand(msg.text)) {

        const fenBeforeMove = chessGame[msg.chat.id].fen()
        chessGame[msg.chat.id].move(msg.text.toLowerCase(), {sloppy: true})
        const fenAfterMove = chessGame[msg.chat.id].fen()

        // IF USER MOVE IS POSSIBLE
        if (fenBeforeMove !== fenAfterMove) {

            // IF USER HAS FINISHED THE GAME
            if (chessGame[msg.chat.id].game_over()) {
                finishGame(chessGame[msg.chat.id], msg.chat.id, false)
                const boardImage = boardFunctions.drawImageCanvas(chessGame[msg.chat.id].board())
                bot.sendPhoto(msg.chat.id, boardImage)
                game.reset()
            }
            // IF BOT CAN MOVE
            else {
                const botMove = movesFunctions.minimaxRoot(PARAMS.depth, chessGame[msg.chat.id], true)
                chessGame[msg.chat.id].move(botMove, {sloppy: true})
                if (chessGame[msg.chat.id].in_check() && !chessGame[msg.chat.id].game_over()) {
                    bot.sendMessage(msg.chat.id, "Шах!")
                }
                const boardImage = boardFunctions.drawImageCanvas(chessGame[msg.chat.id].board())
                bot.sendPhoto(msg.chat.id, boardImage)
                // IF BOT HAS FINISHED THE GAME
                if (chessGame[msg.chat.id].game_over()) {
                    finishGame(chessGame[msg.chat.id], msg.chat.id, true)
                    game.reset()
                }

            }

        }
        // IF USER MOVE IS NOT POSSIBLE
        else {
            bot.sendMessage(msg.chat.id, "Такой ход невозможен!");
        }

    }

    // STOP PLAYING
    else if (msg.text === COMMANDS.CHESS_STOP) {
        finishGame(chessGame[msg.chat.id], msg.chat.id, null)
    }

    // NOT A COMMAND
    else {
        bot.sendMessage(msg.chat.id, "Что вы говорите?");
    }

})