const games = require("../data/games");

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
  const AR_LETTERS = /^[\u0621-\u064A\u0660-\u0669]+$/;
  const EN_LETTERS = /^[a-zA-Z]+$/;
  if (game.rtl() && AR_LETTERS.test(msg.body)) {
    return await game.submitGuess(msg.body, msg.sourceSubscriberId);
  }
  if (!game.rtl() && EN_LETTERS.test(msg.body)) {
    return await game.submitGuess(msg.body, msg.sourceSubscriberId);
  }
};

module.exports = { handleMessages };
