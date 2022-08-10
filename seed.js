const cliProgress = require("cli-progress");
const wordsAR = require("./data/words-ar.json");
const wordsEN = require("./data/words-EN.json");
const Word = require("./models/word");
const { db } = require("./db");

const insert = async (words, lang, bar) => {
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    await Word.create({ text: word, lang });
    bar.increment();
  }
};

db.once("open", async () => {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.rect);
  bar.start([...wordsAR, ...wordsEN].length, 0);
  await insert(wordsAR, "ar", bar);
  await insert(wordsEN, "en", bar);
  bar.stop();
  db.close();
});
