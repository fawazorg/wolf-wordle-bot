const Default = require("./default");
const Help = require("./help");
const Add = require("./add");
const Delete = require("./delete");
const Join = require("./join");
const Solve = require("./solve");
const Refresh = require("./refresh");
const Commands = [Help, Add, Delete, Join, Solve, Refresh];

Default.children = Commands;

module.exports = Default;
