const cliProgress = require("cli-progress");
const wordsAR = require("./data/words-ar.json");
const wordsEN = require("./data/words-en.json");
const wordsTR = require("./data/words-tr.json");
const Word = require("./models/word");
const { db } = require("./db");

const insert = async (words, lang, bar) => {
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    try {
      await Word.create({ text: word, lang });
    } catch (error) {}
    bar.increment();
  }
};

db.once("open", async () => {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.rect);
  bar.start([...wordsAR, ...wordsEN, ...wordsTR].length, 0);
  await insert(wordsAR, "ar", bar);
  await insert(wordsEN, "en", bar);
  await insert(wordsTR, "tr", bar);
  bar.stop();
  db.close();
});
