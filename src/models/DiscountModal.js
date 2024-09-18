const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    percent: { type: Number, required: true },
    description: { type: String },
    status: { type: String, enum: ["active", "stop"], default: "active" },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    packages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Package" }],
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model("Discount", DiscountSchema);
module.exports = Discount;
