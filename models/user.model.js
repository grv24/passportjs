const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  provider: String,
  firstName: String,
  lastName: String,
  username: String,
  googleId: String,
  picture: String,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
