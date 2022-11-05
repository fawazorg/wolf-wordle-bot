const { Command } = require("wolf.js");
const { api } = require("../../bot");
const { refreshUnsetGroup } = require("../../wordle/active");

const COMMAND_TRIGGER = "command_admin_refresh";
const COMMAND_RESPONSE = "admin_refresh_message";

AdminRefresh = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  // message_refresh
  let names = await refreshUnsetGroup(api);
  let phrase = api.phrase().getByCommandAndName(command, COMMAND_RESPONSE);
  let content = api
    .utility()
    .string()
    .replace(phrase, { list: names.join("\n") });
  await api.messaging().sendMessage(command, content);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => AdminRefresh(api, command),
});
