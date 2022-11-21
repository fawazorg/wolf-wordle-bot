const Default = require("./default");
const Help = require("./help");
const Add = require("./add");
const Delete = require("./delete");
const Join = require("./join");
const Solve = require("./solve");
const Refresh = require("./refresh");
const Count = require("./count");
const Update = require("./update");
const ContactAdd = require("./contactAdd");

const Commands = [Help, Add, Delete, Join, Solve, Refresh, Count, Update, ContactAdd];

Default.children = Commands;

module.exports = Default;
