const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@127.0.0.1:27019/${process.env.MONGO_DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.Promise = global.Promise;
const db = mongoose.connection;

module.exports = { db };
