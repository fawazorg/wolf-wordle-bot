const { Validator, Command } = require("wolf.js");
const { api } = require("../../bot");
const Group = require("../../models/group");
const { AdminGroup } = require("../../data/admin");

const COMMAND_TRIGGER = "command_admin_join";
const COMMAND_RESPONSE = "message_admin_join";
const COMMAND_JOIN_LOG = "admin_join_log";

AdminJoin = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  if (!Validator.isValidNumber(command.argument)) {
    return;
  }
  const phrase = api.phrase().getByCommandAndName(command, COMMAND_RESPONSE);
  //group exist in db by anther bot
  const group = await Group.findOne({ gid: parseInt(command.argument) });
  if (group) {
    const err = phrase[8];
    return await api.messaging().sendMessage(command, err.msg);
  }
  const res = await api.group().joinById(parseInt(command.argument));
  const text = phrase.find((err) => err.code === res.code && err?.subCode === res.headers?.subCode);
  await api.messaging().sendMessage(command, text.msg);
  // log message
  if (res.code === 200) {
    let log_phrase = api.phrase().getByCommandAndName(command, COMMAND_JOIN_LOG);
    let AdminUser = await api.subscriber().getById(command.sourceSubscriberId);
    let Group = await api.group().getById(parseInt(command.argument));
    let content = api.utility().string().replace(log_phrase, {
      adminNickname: AdminUser.nickname,
      adminID: AdminUser.id,
      groupName: Group.name,
      groupID: Group.id,
    });
    return await api.messaging().sendGroupMessage(AdminGroup, content);
  }
};

module.exports = new Command(COMMAND_TRIGGER, {
  private: (command) => AdminJoin(api, command),
});
