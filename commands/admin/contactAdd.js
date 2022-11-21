const { Command } = require("wolf.js");
const { api } = require("../../bot");
const { admins } = require("../../data/admin");

const COMMAND_TRIGGER = "command_admin_add_contact";
const COMMAND_RESPONSE = "admin_contact_message";

AddContact = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  const isAdmin = admins.includes(command.sourceSubscriberId);
  const ok = isDeveloper || isAdmin;
  if (!ok) {
    return;
  }
  await api.contact().add(command.sourceSubscriberId);
  let phrase = api.phrase().getByCommandAndName(command, COMMAND_RESPONSE);
  return await api.messaging().sendMessage(command, phrase);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => AddContact(api, command),
});
