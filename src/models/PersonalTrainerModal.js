const mongoose = require("mongoose");

const PersonalTrainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    certifications: [{ type: String }],
    experienceYears: { type: Number, min: 0 },
    bio: { type: String },
    address: { type: String, required: true },
    status: { type: String, enum: ["active", "block"], default: "active" },
    contactInfor: {
      phone: { type: String, required: true },
      email: { type: String },
      socialMedia: { type: String },
    },
    // availability: [
    //   {
    //     day: {
    //       type: String,
    //       enum: [
    //         "Monday",
    //         "Tuesday",
    //         "Wednesday",
    //         "Thursday",
    //         "Friday",
    //         "Saturday",
    //         "Sunday",
    //       ],
    //       required: true,
    //     },
    //     startTime: { type: String, required: true },
    //     endTime: { type: String, required: true },
    //   },
    // ],
    profileImage: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const PersonalTrainer = mongoose.model(
  "PersonalTrainer",
  PersonalTrainerSchema
);
module.exports = PersonalTrainer;
