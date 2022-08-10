const { Validator, Command } = require("wolf.js");
const { api } = require("../../bot");

const COMMAND_TRIGGER = "command_admin_join";
const COMMAND_RESPONSE = "message_admin_join";

AdminJoin = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  if (!Validator.isValidNumber(command.argument)) {
    return;
  }
  const res = await api.group().joinById(parseInt(command.argument));
  const phrase = api.phrase().getByCommandAndName(command, COMMAND_RESPONSE);
  const text = phrase.find((err) => err.code === res.code && err?.subCode === res.headers?.subCode);
  await api.messaging().sendMessage(command, text.msg);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => AdminJoin(api, command),
});
