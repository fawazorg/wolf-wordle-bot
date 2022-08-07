const { WOLFBot } = require("wolf.js");
const api = new WOLFBot();
const { handleMessages } = require("./wordle/handler");
require("dotenv").config();

module.exports = { api };

api.on("groupMessage", async (message) => {
  await handleMessages(message);
});

api.on("ready", () => {
  console.log(`[*] - ${api.config.keyword} start.`);
});

api.login(process.env.EMAIL, process.env.PASSWORD);
