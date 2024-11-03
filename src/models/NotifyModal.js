const mongoose = require("mongoose");

const NotifySchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: String },
    role: { type: String, enum: ["admin", "user", "trainee"], default: "user" },
  },
  {
    timestamps: true,
  }
);

const Notify = mongoose.model("Notify", NotifySchema);
module.exports = Notify;
