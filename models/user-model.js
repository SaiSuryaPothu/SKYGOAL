const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateToken = function async() {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      
    },
    process.env.SECRET_KEY);
  } catch (error) {
    console.log(`Token error ${error}`);
  }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
