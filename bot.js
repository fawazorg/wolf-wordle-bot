const schedule = require("node-schedule");
const { WOLFBot } = require("wolf.js");
const { handleMessages } = require("./wordle/handler");
const { db } = require("./db");
const { setLastActive, deleteGroup } = require("./wordle/active");
const { leaveInactiveGroups } = require("./jobs/active");

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
  schedule.scheduleJob("0 * * * *", async () => await leaveInactiveGroups(api, 5));
  console.log("[*][Jobs] - Has been started");
});

api.on("joinedGroup", async (group) => {
  await setLastActive(group.id);
});

api.on("leftGroup", async (group) => {
  await deleteGroup(group.id);
});

api.login(process.env.EMAIL, process.env.PASSWORD);
