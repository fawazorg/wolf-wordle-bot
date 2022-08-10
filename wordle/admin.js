const { Validator } = require("wolf.js");
const Word = require("../models/word");
const { isLanguage } = require("../utility");
const games = require("../data/games");
const {
  wordAddError,
  wordAdd,
  wordAddExists,
  wordDelete,
  wordDeleteError,
  errorNumber,
  wordSolve,
  wordSolveError,
} = require("./sender");

const Add = async ({ language, targetGroupId, argument }) => {
  if (argument.length !== 5 || !isLanguage(argument, language)) {
    return await wordAddError(targetGroupId, language);
  }
  try {
    await Word.create({ text: argument, lang: language });
    await wordAdd(targetGroupId, language);
  } catch (error) {
    await wordAddExists(targetGroupId, language);
  }
};
const Delete = async ({ language, targetGroupId, argument }) => {
  if (argument.length !== 5 || !isLanguage(argument, language)) {
    return await wordAddError(targetGroupId, language);
  }
  try {
    let word = await Word.findOneAndDelete({ text: argument });
    if (word) {
      return await wordDelete(targetGroupId, language);
    }
    return await wordDeleteError(targetGroupId, language);
  } catch (error) {
    await wordDeleteError(targetGroupId, language);
  }
};
const Solve = async ({ language, targetGroupId, argument }) => {
  if (!Validator.isValidNumber(argument)) {
    return await errorNumber(targetGroupId, language);
  }
  const id = parseInt(argument);
  if (!games.has(id)) {
    return await wordSolveError(targetGroupId, language);
  }
  const game = games.get(id);
  await wordSolve(targetGroupId, language, game.solution);
};

module.exports = { Add, Delete, Solve };
