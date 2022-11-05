const { Command } = require("wolf.js");
const { api } = require("../../bot");

const COMMAND_TRIGGER = "command_admin";
const COMMAND_RESPONSE = "message_admin_default";

AdminDefault = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  let phrase = api.phrase().getByCommandAndName(command, COMMAND_RESPONSE);
  await api.messaging().sendMessage(command, phrase);
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => AdminDefault(api, command),
});
