const { Image, createCanvas } = require('canvas');
const params = require('../constants/params');

const drawImageCanvas = (gameBoard) => {

    const canvas = createCanvas(400, 400);
    const context = canvas.getContext('2d');
    const img = new Image();

    const squareWidth = 50;
    const totalSquares = 64;
    const boardSize = 8;
    const colorLigth = '#EAD8C3';
    const colorDark = '#B08368';

    let i, x, y = -1

    for (i = 0; i < totalSquares; i++) {
        x++;
        if (i % boardSize === 0) {
            y++;
            x = 0;
        }

        context.beginPath()
        context.rect(x * squareWidth, y * squareWidth, squareWidth, squareWidth);
        context.fillStyle = (x + y) % 2 ? colorDark : colorLigth;
        context.fill();

        const piece = gameBoard[y][x]
        if (piece !== null) {
            img.src = `./imgs/${piece.color}${piece.type.toUpperCase()}.svg`;
            context.drawImage(img, x * squareWidth, y * squareWidth, squareWidth, squareWidth);
        }

        context.font = "11px Verdana";
        context.fillStyle = (x + y) % 2 ? colorLigth : colorDark;
        if (x === 0) context.fillText(-(y - 8), x * squareWidth + 1, y * squareWidth + 12);
        if (y === 7) context.fillText(params.chessLetters[x], x * squareWidth + 42, y * squareWidth + 47);

    }

    return Buffer.from(canvas.toDataURL().slice(22), "base64");

}

module.exports.drawImageCanvas = drawImageCanvas