const mongoose = require("mongoose");

const users = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  users_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model("users", users);