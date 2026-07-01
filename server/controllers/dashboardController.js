const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest");
const Donation = require("../models/Donation");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalRequests =
      await BloodRequest.countDocuments();

    const totalDonations =
      await Donation.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalRequests,
        totalDonations,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};