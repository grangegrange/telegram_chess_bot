const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const token = process.env.TOKEN

const bot = new TelegramBot(token, { polling: true })


// CONSTANTS & FUNCTIONS
const COMMANDS = require('./constants/commands')

// STATE
let chessPlaying = false

bot.on('message', (msg) => {

    if (!chessPlaying && Object.values(COMMANDS).indexOf(msg.text) !== -1) {

        if (msg.text === COMMANDS.BOT_START) {
            bot.sendMessage(msg.chat.id, "Шахматы?", {
                "reply_markup": {
                    "keyboard": [
                        ["Играем"]
                    ]
                }
            });
        }


        if (msg.text === COMMANDS.CHESS_START) {

            chessPlaying = true;

            bot.sendMessage(msg.chat.id, "Ну-ка посмотрим", {
                "reply_markup": {
                    "keyboard": [
                        ["Закончить игру"]
                    ]
                }
            })

            bot.sendMessage(msg.chat.id, "Игра началась!")

        }

    }
    else if (chessPlaying && msg.text === COMMANDS.CHESS_STOP) {

        chessPlaying = false;

        bot.sendMessage(msg.chat.id, "Игра закончена. Еще?", {
            "reply_markup": {
                "keyboard": [
                    ["Играем"]
                ]
            }
        });

    }
    else {

    }



});

