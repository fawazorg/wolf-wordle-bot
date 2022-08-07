const { Command } = require("wolf.js");
const { api } = require("../bot");
const COMMAND_TRIGGER = "command_help";
const COMMAND_RESPONSE = "message_help";

Help = async (api, command) => {
  let phrase = api.phrase().getByCommandAndName(command, COMMAND_RESPONSE);
  await api.messaging().sendMessage(command, phrase.join("\n"));
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => Help(api, command),
});
