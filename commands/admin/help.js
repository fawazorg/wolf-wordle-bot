const { Command } = require("wolf.js");
const { api } = require("../../bot");

const COMMAND_TRIGGER = "command_help";
const COMMAND_RESPONSE = "message_admin_help";

AdminHelp = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  let phrase = api.phrase().getByCommandAndName(command, COMMAND_RESPONSE);
  await api.messaging().sendMessage(command, phrase.join("\n"));
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => AdminHelp(api, command),
});
