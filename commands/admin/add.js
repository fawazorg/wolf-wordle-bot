const { Command } = require("wolf.js");
const { api } = require("../../bot");
const { Add } = require("../../wordle/admin");

const COMMAND_TRIGGER = "command_admin_add";

AdminAdd = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  const isAdminGroup = command.targetGroupId === 18813643;
  if (!isDeveloper && !isAdminGroup) {
    return;
  }
  await Add(command);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => AdminAdd(api, command),
});
