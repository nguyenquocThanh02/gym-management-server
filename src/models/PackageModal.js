const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    benefits: { type: [String], required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },
    stock: { type: Number, required: true, default: 0 },
    published: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
