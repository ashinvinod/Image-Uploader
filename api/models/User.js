let mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userID: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  URL1: { type: String },
});

userSchema.plugin(uniqueValidator, { message: "is already taken." });
let User = mongoose.model("myuser", userSchema);
module.exports = User;
