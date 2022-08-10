const { Command } = require("wolf.js");
const { api } = require("../../bot");
const { Delete } = require("../../wordle/admin");

const COMMAND_TRIGGER = "command_admin_delete";

AdminDelete = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  await Delete(command);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => AdminDelete(api, command),
});
