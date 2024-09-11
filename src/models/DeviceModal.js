const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "maintenance"],
      default: "available",
    },
    lastMaintenance: { type: Date },
    maintenanceInterval: { type: Number },
    description: { type: String },
    purchaseDate: { type: Date },
    serialNumber: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.model("Device", DeviceSchema);
module.exports = Device;
