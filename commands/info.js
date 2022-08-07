const { Command } = require("wolf.js");
const { api } = require("../bot");
const COMMAND_TRIGGER = "command_info";
const COMMAND_RESPONSE = "message_info";

Info = async (api, command) => {
  let phrase = api.phrase().getByCommandAndName(command, COMMAND_RESPONSE);
  await api.messaging().sendMessage(command, phrase);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => Info(api, command),
});
