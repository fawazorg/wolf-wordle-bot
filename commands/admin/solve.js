const { Command } = require("wolf.js");
const { api } = require("../../bot");
const { Solve } = require("../../wordle/admin");

const COMMAND_TRIGGER = "command_admin_solve";

AdminSolve = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  await Solve(command);
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => AdminSolve(api, command),
});
