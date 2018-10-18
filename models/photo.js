//Model mongoose dla standardowej bazy dannych.

var mongoose = require("mongoose");

var photoSchema = new mongoose.Schema({

name: String,
image: String
});

module.exports = mongoose.model("Photo", photoSchema);