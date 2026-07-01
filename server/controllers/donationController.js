const Donation = require("../models/Donation");
const User = require("../models/User");

const createDonation = async (
  req,
  res
) => {
  try {
    const donation =
      await Donation.create({
        ...req.body,
        donor: req.user._id,
      });

    // Logging a donation registers the user as a donor and
    // resets their 56-day eligibility window automatically.
    const update = {
      isDonor: true,
      lastDonationDate:
        donation.donationDate || Date.now(),
    };

    if (req.body.bloodGroup) {
      update.bloodGroup = req.body.bloodGroup;
    }

    if (req.body.city) {
      update.city = req.body.city;
    }

    await User.findByIdAndUpdate(
      req.user._id,
      update
    );

    res.status(201).json({
      success: true,
      donation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyDonations = async (
  req,
  res
) => {
  try {
    const donations =
      await Donation.find({
        donor: req.user._id,
      }).sort({ donationDate: -1 });

    res.status(200).json({
      success: true,
      donations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDonations = async (
  req,
  res
) => {
  try {
    const donations =
      await Donation.find()
        .populate(
          "donor",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      donations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteDonation = async (
  req,
  res
) => {
  try {
    await Donation.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Donation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createDonation,
  getDonations,
  getMyDonations,
  deleteDonation,
};