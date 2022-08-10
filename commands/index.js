const Default = require("./default");
const Help = require("./help");
const Info = require("./info");
const MyScore = require("./myScore");
const TopPlayers = require("./topPlayers");
const Admin = require("./admin");

const Commands = [Help, Info, MyScore, TopPlayers, Admin];

Default.children = Commands;

module.exports = Default;
