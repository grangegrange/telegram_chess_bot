const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const token = process.env.TOKEN

const bot = new TelegramBot(token, { polling: true })


bot.on('message', (msg) => {

    if (msg.text === '/start') {
        bot.sendMessage(msg.chat.id, "Шахматы?", {
            "reply_markup": {
                "keyboard": [
                    ["Шахматы"]
                ]
            }
        });
    }

});

