const { Command } = require("wolf.js");
const { api } = require("../bot");
const { topPlayers } = require("../wordle/score");

const COMMAND_TRIGGER = "command_top_players";

TopPlayers = async (api, command) => {
  await topPlayers(command);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => TopPlayers(api, command),
});
