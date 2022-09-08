const games = require("../data/games");
const { isLanguage } = require("../utility");
const { isSpam } = require("./spam");
const { isGroupHashtag } = require("./group");
/**
 *
 * @param {import("wolf.js").MessageObject} msg
 */
const handleMessages = async (msg) => {
  // if group have game
  if (!games.has(msg.targetGroupId)) {
    return;
  }
  const hashtag = await isGroupHashtag(msg.targetGroupId);
  if (hashtag && msg.body.charAt(0) !== "#") {
    return;
  }
  let word = hashtag ? msg.body.replace("#", "") : msg.body;
  if (word.length !== 5) {
    return;
  }
  if (isSpam(msg.targetGroupId)) {
    return;
  }
  // submit the word
  let game = games.get(msg.targetGroupId);
  if (isLanguage(word, game.language)) {
    await game.submitGuess(
      word.toLocaleUpperCase(game.language).replace("ة", "ه"),
      msg.sourceSubscriberId
    );
  }
};

module.exports = { handleMessages };
