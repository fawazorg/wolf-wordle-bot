const Default = require("./default");
const Help = require("./help");
const Info = require("./info");
const Commands = [Help, Info];

Default.children = Commands;

module.exports = Default;
