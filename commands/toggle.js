const { Command } = require("wolf.js");
const { api } = require("../bot");
const { toggleGroupHashtag } = require("../wordle/group");

const COMMAND_TRIGGER = "command_toggle";

Toggle = async (api, command) => {
  const enabled = await toggleGroupHashtag(command.targetGroupId);
  if (enabled) {
    let phrase = api.phrase().getByCommandAndName(command, "message_toggle_enabled");
    return await api.messaging().sendMessage(command, phrase, { formatting: { me: true } });
  }
  let phrase = api.phrase().getByCommandAndName(command, "message_toggle_disabled");
  await api.messaging().sendMessage(command, phrase, { formatting: { me: true } });
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => Toggle(api, command),
});
