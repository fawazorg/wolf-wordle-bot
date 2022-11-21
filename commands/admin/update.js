const { Command } = require("wolf.js");
const { api } = require("../../bot");
const { admins } = require("../../data/admin");

const COMMAND_TRIGGER = "command_admin_update";
const COMMAND_RESPONSE = "admin_update_message";

UpdateStatus = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  const isAdmin = admins.includes(command.sourceSubscriberId);
  const ok = isDeveloper || isAdmin;
  if (!ok) {
    return;
  }
  const status = command.argument;
  await api.updateProfile().setStatus(status).save();
  let phrase = api.phrase().getByCommandAndName(command, COMMAND_RESPONSE);
  let content = api.utility().string().replace(phrase, { status });
  return await api.messaging().sendMessage(command, content);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => UpdateStatus(api, command),
});
