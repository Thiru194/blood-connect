const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    unitsDonated: {
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

    donationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Donation",
  donationSchema
);