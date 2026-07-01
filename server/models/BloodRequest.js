const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    unitsRequired: {
      type: Number,
      required: true,
    },

    hospital: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Completed",
      ],
      default: "Pending",
    },

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BloodRequest",
  bloodRequestSchema
);