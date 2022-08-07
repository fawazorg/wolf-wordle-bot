const { Command } = require("wolf.js");
const { api } = require("../bot");
const { start } = require("../wordle/game");
const games = require("../data/games");
const COMMAND_TRIGGER = "command_default";

Default = async (api, command) => {
  if (games.has(command.targetGroupId)) {
    let game = games.get(command.targetGroupId);
    return await game.sendImage();
  }
  return await start(command);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => Default(api, command),
});
