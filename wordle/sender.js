const { api } = require("../bot");
const { toImage } = require("../utility/index");

const gameStart = async (gid, language) => {
  let phrase = api.phrase().getByLanguageAndName(language, "message_start");
  await api.messaging().sendGroupMessage(gid, phrase);
};
const gameWon = async (gid, language, uid, solution) => {
  let phrase = api.phrase().getByLanguageAndName(language, "message_win");
  let user = await api.subscriber().getById(uid);
  let text = api.utility().string().replace(phrase, { nickname: user.nickname, id: user.id });
  await api.messaging().sendGroupMessage(gid, text);
};
const gameLose = async (gid, language, solution) => {
  let phrase = api.phrase().getByLanguageAndName(language, "message_lose");
  let text = api.utility().string().replace(phrase, { solution });
  await api.messaging().sendGroupMessage(gid, text);
};
const gameHistory = async (gid, language, guess) => {
  let phrase = api.phrase().getByLanguageAndName(language, "message_history");
  let text = api.utility().string().replace(phrase, { guess });
  await api.messaging().sendGroupMessage(gid, text);
};
const Image = async (gid, language, formattedGuess) => {
  await api.messaging().sendGroupMessage(gid, toImage(formattedGuess));
};

module.exports = { gameStart, gameWon, gameLose, gameHistory, Image };
