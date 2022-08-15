const games = require("../data/games");
const { isLanguage } = require("../utility");

/**
 *
 * @param {import("wolf.js").MessageObject} msg
 */
const handleMessages = async (msg) => {
  if (msg.body.charAt(0) !== "#") {
    return;
  }
  let word = msg.body.replace("#", "");
  // if message is more then 5 chars
  if (word.length !== 5) {
    return;
  }
  // if group have game
  if (!games.has(msg.targetGroupId)) {
    return;
  }
  // submit the word
  let game = games.get(msg.targetGroupId);
  if (isLanguage(word, game.language)) {
    await game.submitGuess(word.toUpperCase().replace("ة", "ه"), msg.sourceSubscriberId);
  }
};

module.exports = { handleMessages };
