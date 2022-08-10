const { Command } = require("wolf.js");
const { api } = require("../bot");
const { myScore } = require("../wordle/score");

const COMMAND_TRIGGER = "command_my_score";

MyScore = async (api, command) => {
  await myScore(command);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => MyScore(api, command),
});
