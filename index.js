const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const token = process.env.TOKEN
const { Chess } = require('chess.js')

const bot = new TelegramBot(token, { polling: true })


// CONSTANTS & FUNCTIONS
const COMMANDS = require('./constants/commands')
const boardFunctions = require('./functions/board')

// STATE
let chessPlaying = false
let chessGame = {}

bot.on('message', (msg) => {

    // NOT PLAYING & IN COMMANDS LIST
    if (!chessPlaying && Object.values(COMMANDS).indexOf(msg.text) !== -1) {

        if (msg.text === COMMANDS.BOT_START) {
            bot.sendMessage(msg.chat.id, "Шахматы?", {
                "reply_markup": {
                    "keyboard": [
                        ["Играем"]
                    ]
                }
            })
        }

        if (msg.text === COMMANDS.CHESS_START) {
            chessPlaying = true
            chessGame = new Chess()
            bot.sendMessage(msg.chat.id, "Ну-ка посмотрим", {
                "reply_markup": {
                    "keyboard": [
                        ["Закончить игру"]
                    ]
                }
            })
            bot.sendMessage(msg.chat.id, "Начинаем игру!")
            const boardImage = boardFunctions.drawImageCanvas(chessGame.board())
            bot.sendPhoto(msg.chat.id, boardImage)
        }

    }

    // STOP PLAYING
    else if (chessPlaying && msg.text === COMMANDS.CHESS_STOP) {

        chessPlaying = false;
        bot.sendMessage(msg.chat.id, "Игра закончена. Еще?", {
            "reply_markup": {
                "keyboard": [
                    ["Играем"]
                ]
            }
        })

    }

    // NOT A COMMAND
    else {

    }

})