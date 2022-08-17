const { Command } = require("wolf.js");
const { api } = require("../../bot");
const { refreshGroupsHashtag } = require("../../wordle/group");

const COMMAND_TRIGGER = "command_admin_refresh";

AdminRefresh = async (api, command) => {
  const isDeveloper = command.sourceSubscriberId === api.options.developerId;
  if (!isDeveloper) {
    return;
  }
  // message_refresh
  let groups = await api.group().list();
  let groupsNames = await refreshGroupsHashtag(groups);
  let phrase = api.phrase().getByCommandAndName(command, "message_refresh");
  let text = api.utility().string().replace(phrase, { groupsNames });
  await api.messaging().sendMessage(command, text, { formatting: { me: true } });
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => AdminRefresh(api, command),
});
