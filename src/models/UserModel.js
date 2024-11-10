const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    accountName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "trainee"], default: "user" },
    phone: { type: Number },
    dateOfBirth: { type: String },
    avatar: { type: String },
    status: { type: String, enum: ["active", "block"], default: "active" },
    core: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    // inviteToken: { type: String },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
