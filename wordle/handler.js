const games = require("../data/games");
const { isLanguage } = require("../utility");

/**
 *
 * @param {import("wolf.js").MessageObject} msg
 */
const handleMessages = async (msg) => {
  // if message is more then 5 chars
  if (msg.body.length !== 5) {
    return;
  }
  // if group have game
  if (!games.has(msg.targetGroupId)) {
    return;
  }
  // submit the word
  let game = games.get(msg.targetGroupId);
  if (isLanguage(msg.body, game.language)) {
    await game.submitGuess(msg.body.toUpperCase(), msg.sourceSubscriberId);
  }
};

module.exports = { handleMessages };
