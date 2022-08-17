const Default = require("./default");
const Help = require("./help");
const Info = require("./info");
const MyScore = require("./myScore");
const TopPlayers = require("./topPlayers");
const Cancel = require("./cancel");
const Toggle = require("./toggle");
const Admin = require("./admin");

const Commands = [Help, Info, MyScore, TopPlayers, Cancel, Toggle, Admin];

Default.children = Commands;

module.exports = Default;
