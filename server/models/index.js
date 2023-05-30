const databaseConfig = require("../config/database.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = databaseConfig.url;
db.posts = require("./post.model.js")(mongoose);

module.exports = db;
