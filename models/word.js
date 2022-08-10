const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  text: { type: String, require: true, unique: true },
  lang: { type: String, require: true },
});

WordSchema.statics.random = async function (lang) {
  const count = await this.count({ lang });
  var rand = Math.floor(Math.random() * count);
  return this.findOne({ lang }).skip(rand);
};

const Word = mongoose.model("Word", WordSchema);

module.exports = Word;
