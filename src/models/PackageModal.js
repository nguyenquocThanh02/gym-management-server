const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String },
    sessionWithPT: { type: Number, default: 0 },
    description: { type: String },
    suitableFor: { type: String },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    // discount: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },
    stock: { type: Number, default: 999 },
    register: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "block"], default: "active" },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
