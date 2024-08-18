const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    accountName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    phone: { type: Number },
    dateOfBirth: { type: String },
    avatar: { type: String },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
