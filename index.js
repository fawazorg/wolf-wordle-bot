const { api } = require("./bot");
const commands = require("./commands");
api.commandHandler().register([commands]);
