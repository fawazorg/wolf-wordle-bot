const { WOLFBot } = require("wolf.js");
const { handleMessages } = require("./wordle/handler");
const { db } = require("./db");

const api = new WOLFBot();

module.exports = { api };

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("[*][Database] - It's connected");
});

api.on("groupMessage", async (message) => {
  await handleMessages(message);
});

api.on("ready", () => {
  console.log(`[*][${api.config.keyword}] is ready`);
});

api.login(process.env.EMAIL, process.env.PASSWORD);
