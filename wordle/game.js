const Word = require("../models/word");
const games = require("../data/games");
const wordle = require("./wordle");
/**
 *
 * @param {import('wolf.js').CommandObject} command
 */
const start = async (command) => {
  // set a word
  const solution = await Word.random(command.language);
  // init game object
  let game = new wordle(command.targetGroupId, solution.text.toUpperCase(), command.language);
  games.set(command.targetGroupId, game);
  // send start game
  await game.start();
};

module.exports = { start };
