const mongoose = require("mongoose");

const registerTracking = new mongoose.Schema(
  {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
    paymentMethod: { type: String },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
const RegisterTracking = mongoose.model("RegisterTracking", registerTracking);
module.exports = RegisterTracking;
