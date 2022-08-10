const Player = require("../models/player");
const { sendMyScore, myScoreError, sendTopPlayers } = require("./sender");
const myScore = async ({ language, targetGroupId, sourceSubscriberId }) => {
  let score = await Player.aggregate([
    {
      $setWindowFields: {
        sortBy: { score: -1 },
        output: {
          GlobalRank: {
            $documentNumber: {},
          },
        },
      },
    },
    { $match: { uid: { $eq: sourceSubscriberId } } },
  ]);
  if (score.length > 0) {
    return await sendMyScore(targetGroupId, language, sourceSubscriberId, score[0]);
  }
  await myScoreError(targetGroupId, language, sourceSubscriberId);
};
const topPlayers = async ({ language, targetGroupId }) => {
  let players = await Player.find().sort({ score: -1 }).limit(10);
  await sendTopPlayers(targetGroupId, language, players);
};
const addScore = async (uid, score) => {
  try {
    await Player.findOneAndUpdate({ uid }, { $inc: { score } }, { upsert: true });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { myScore, topPlayers, addScore };
