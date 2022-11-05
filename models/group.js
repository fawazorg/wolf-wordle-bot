const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  gid: { type: Number, unique: true },
  hashtag: { type: Boolean, default: true },
  lastActiveAt: { type: Date, default: new Date() },
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
