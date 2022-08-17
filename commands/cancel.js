const { Command } = require("wolf.js");
const { api } = require("../bot");
const games = require("../data/games");

const COMMAND_TRIGGER = "command_cancel";

Cancel = async (api, command) => {
  if (!games.has(command.targetGroupId)) {
    let phrase = api.phrase().getByCommandAndName(command, "message_cancel_error");
    return await api.messaging().sendMessage(command, phrase, { formatting: { me: true } });
  }
  games.delete(command.targetGroupId);
  let phrase = api.phrase().getByCommandAndName(command, "message_cancel_done");
  return await api.messaging().sendMessage(command, phrase, { formatting: { me: true } });
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => Cancel(api, command),
});
