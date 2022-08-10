const { api } = require("../bot");
const { toImage } = require("../utility/index");

const getPhrase = (language, phrase) => {
  return api.phrase().getByLanguageAndName(language, phrase);
};

const gameStart = async (gid, language) => {
  let phrase = getPhrase(language, "message_start");
  await api.messaging().sendGroupMessage(gid, phrase, { formatting: { me: true } });
};

const gameWon = async (gid, language, uid, score) => {
  let phrase = getPhrase(language, "message_win");
  let user = await api.subscriber().getById(uid);
  let text = api
    .utility()
    .string()
    .replace(phrase, { nickname: user.nickname, id: user.id, score });
  await api.messaging().sendGroupMessage(gid, text, { formatting: { me: true } });
};
const gameLose = async (gid, language, solution) => {
  let phrase = getPhrase(language, "message_lose");
  let text = api.utility().string().replace(phrase, { solution });
  await api.messaging().sendGroupMessage(gid, text, { formatting: { me: true } });
};
const gameHistory = async (gid, language, guess) => {
  let phrase = getPhrase(language, "message_history");
  let text = api.utility().string().replace(phrase, { guess });
  await api.messaging().sendGroupMessage(gid, text, { formatting: { me: true } });
};
const Image = async (gid, language, formattedGuess) => {
  await api.messaging().sendGroupMessage(gid, toImage(formattedGuess));
};

const wordAdd = async (gid, language) => {
  let phrase = getPhrase(language, "message_admin_add");
  await api.messaging().sendGroupMessage(gid, phrase);
};

const wordAddError = async (gid, language) => {
  let phrase = getPhrase(language, "message_admin_add_error");
  await api.messaging().sendGroupMessage(gid, phrase);
};

const wordAddExists = async (gid, language) => {
  let phrase = getPhrase(language, "message_admin_add_exists");
  await api.messaging().sendGroupMessage(gid, phrase);
};

const wordDelete = async (gid, language) => {
  let phrase = getPhrase(language, "message_admin_delete");
  await api.messaging().sendGroupMessage(gid, phrase);
};
const wordDeleteError = async (gid, language) => {
  let phrase = getPhrase(language, "message_admin_delete_error");
  await api.messaging().sendGroupMessage(gid, phrase);
};

const wordSolve = async (gid, language, solution) => {
  let phrase = getPhrase(language, "message_admin_solve");
  let text = api.utility().string().replace(phrase, { solution });
  await api.messaging().sendGroupMessage(gid, text);
};

const wordSolveError = async (gid, language) => {
  let phrase = getPhrase(language, "message_admin_solve_error");
  await api.messaging().sendGroupMessage(gid, phrase);
};

const sendMyScore = async (gid, language, uid, { score, GlobalRank }) => {
  let phrase = getPhrase(language, "message_my_score");
  let { nickname, id } = await api.subscriber().getById(uid);
  let text = api.utility().string().replace(phrase, { GlobalRank, score, nickname, id });
  await api.messaging().sendGroupMessage(gid, text);
};

const myScoreError = async (gid, language, uid) => {
  let phrase = getPhrase(language, "message_my_score_error");
  let { nickname, id } = await api.subscriber().getById(uid);
  let text = api.utility().string().replace(phrase, { nickname, id });
  await api.messaging().sendGroupMessage(gid, text);
};

const sendTopPlayers = async (gid, language, players = []) => {
  let phrase = getPhrase(language, "message_top_players");
  let list = await players.reduce(async (pv, user, i) => {
    let names = await pv;
    let { nickname, id } = await api.subscriber().getById(user.uid);
    return [...names, `${i + 1} ـ  ${nickname}( ${id} ) ـ ${user.score}`];
  }, []);
  let text = api
    .utility()
    .string()
    .replace(phrase, { list: list.join("\n") });
  await api.messaging().sendGroupMessage(gid, text);
};

const Join = async (gid, language) => {
  let phrase = getPhrase(language, "message_start");
  await api.messaging().sendGroupMessage(gid, phrase);
};

const joinError = async (gid, language) => {
  let phrase = getPhrase(language, "message_start");
  await api.messaging().sendGroupMessage(gid, phrase);
};
const errorNumber = async (gid, language) => {
  let phrase = getPhrase(language, "error_must_be_number");
  await api.messaging().sendGroupMessage(gid, phrase);
};

module.exports = {
  gameStart,
  gameWon,
  gameLose,
  gameHistory,
  Image,
  wordAdd,
  wordAddError,
  wordAddExists,
  wordDelete,
  wordDeleteError,
  wordSolve,
  wordSolveError,
  sendMyScore,
  myScoreError,
  sendTopPlayers,
  Join,
  joinError,
  errorNumber,
};
