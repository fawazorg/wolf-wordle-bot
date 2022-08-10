const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  uid: { type: Number, unique: true },
  score: { type: Number, default: 0 },
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
