const words = require("../data/words.json");
const games = require("../data/games");
const wordle = require("./wordle");
/**
 *
 * @param {import('wolf.js').CommandObject} command
 */
const start = async (command) => {
  // set a word
  const solution = words[Math.floor(Math.random() * words.length)];
  // init game object
  let game = new wordle(command.targetGroupId, solution, command.language);
  games.set(command.targetGroupId, game);
  // send start game
  await game.start();
};

module.exports = { start };
