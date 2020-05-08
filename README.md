# Телеграм-бот для игры в шахматы

Простой телеграм-бот на Node.js. Для генерации ходов, проверки на шах/мат/пат и т.д. используется [chess.js](https://github.com/jhlywa/chess.js). Для отрисовки доски – [node-canvas](https://github.com/Automattic/node-canvas).
  
Игра заканчивается в случае мата, ничьи, пата или повторения трех одинаковых ходов. 
  
## Как выглядит:
![Image of Yaktocat](imgs/board-example.jpg)
  
  
## Доступные нотации:
Бот принимает ходы по классической нотации с указанием начального и конечного поля играющей фигуры.  
  
Пример:  
```
e2-e4
d7-d6
d2-d4
```

## Live demo:  
[@chess_zugzwang_bot](https://t.me/chess_zugzwang_bot)

## Установка

Это простое node.js-приложение, процесс установки стандартный.

Склонируйте репозиторий:
```
git clone https://github.com/grangegrange/telegram_chess_bot.git
```    

Перейдите в директорию с проектом:
```
cd telegram_chess_bot/
```
  
Установите зависимости:
```
npm i
```

Создайте своего телеграм-бота командой `/newbot` в родительском боте телеграма: [@BotFather](https://telegram.me/BotFather). Создайте в корневом разделе проекта файл `.env` и запишите в него полученный токен телеграм-бота:
```
TOKEN=123456789:AAEKfs...Dj38g
```

Запустите приложение:
```
npm run start
```

Для отслеживания изменений в `.js` файлах:
```
npm run watch
```


## Используемые библиотеки:  
* [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
* [chess.js](https://github.com/jhlywa/chess.js)
* [canvas](https://github.com/Automattic/node-canvas)