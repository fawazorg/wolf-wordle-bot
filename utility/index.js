const { createCanvas, registerFont } = require("canvas");

const isLanguage = (text, language) => {
  const AR_LETTERS = /^[\u0621-\u064A]+$/;
  const EN_LETTERS = /^[a-zA-Z]+$/;
  const TR_LETTERS = /^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/;
  const regex = language === "ar" ? AR_LETTERS : EN_LETTERS;
  switch (language) {
    case "ar":
      return AR_LETTERS.test(text);
      break;
    case "tr":
      return TR_LETTERS.test(text);
      break;
    case "en":
      return EN_LETTERS.test(text);
      break;
    default:
      return EN_LETTERS.test(text);
      break;
  }
};

const toImage = (rows) => {
  const canvas = createCanvas(700, 840);
  registerFont("data/AbdoLine.ttf", { family: "AbdoLine" });

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.imageSmoothingEnabled = true;
  ctx.globalCompositeOperation = "source-over";
  ctx.quality = "best";
  ctx.lineWidth = 2;
  const gray = "#3a3a3c";
  const green = "#538d4e";
  const yellow = "#b59f3b";
  const height = 140;
  const padding = 8;

  const fillCanvas = () => {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#121213";
    ctx.fill();
  };

  const emptyRow = (x, y, w, h) => {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.strokeStyle = gray;
    ctx.stroke();
  };

  const rowBox = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };

  const text = (x, y, text) => {
    ctx.font = "bold 80px AbdoLine";
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
  };

  const getColor = (color) => {
    switch (color) {
      case "gray":
        return gray;
        break;
      case "green":
        return green;
      case "yellow":
        return yellow;
      default:
        return gray;
        break;
    }
  };

  fillCanvas();
  rows.forEach((row, i) => {
    if (row) {
      row.forEach((l, j) => {
        const x = j * height;
        const y = i * height;
        rowBox(
          x + padding,
          y + padding,
          height - padding * 2,
          height - padding * 2,
          getColor(l.color)
        );
        text(x + height / 2, y + height / 4, l.key.toUpperCase());
      });
    } else {
      for (let ii = 0; ii < 5; ii++) {
        const x = ii * height;
        const y = i * height;
        emptyRow(x + padding, y + padding, height - padding * 2, height - padding * 2);
      }
    }
  });

  return canvas.toBuffer("image/jpeg");
};

module.exports = { toImage, isLanguage };
