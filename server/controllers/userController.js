const User = require("../models/User");

const searchDonors = async (
  req,
  res
) => {
  try {
    const {
      bloodGroup,
      city,
    } = req.query;

    // Only registered donors; filters are optional
    const query = { isDonor: true };

    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    const donors =
      await User.find(query).select("-password");

    res.status(200).json({
      success: true,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDonorById = async (req, res) => {
  try {
    const donor = await User.findById(
      req.params.id
    ).select("-password");

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found",
      });
    }

    res.status(200).json({
      success: true,
      donor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Apply to become a donor (fills donor details on the logged-in user)
const applyDonor = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const {
      phone,
      bloodGroup,
      city,
      age,
      gender,
      weight,
      lastDonationDate,
      available,
    } = req.body;

    user.phone = phone || user.phone;
    user.bloodGroup = bloodGroup || user.bloodGroup;
    user.city = city || user.city;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.weight = weight || user.weight;
    // NIL / never donated comes through as empty -> store null
    user.lastDonationDate = lastDonationDate || null;
    user.available =
      available !== undefined ? available : user.available;
    user.isDonor = true;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Donor application submitted successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        bloodGroup: updatedUser.bloodGroup,
        city: updatedUser.city,
        isDonor: updatedUser.isDonor,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name =
      req.body.name || user.name;

    user.phone =
      req.body.phone || user.phone;

    user.city =
      req.body.city || user.city;

    user.bloodGroup =
      req.body.bloodGroup ||
      user.bloodGroup;

    user.age =
      req.body.age || user.age;

    user.gender =
      req.body.gender || user.gender;

    user.weight =
      req.body.weight || user.weight;

    // Allow setting a date or clearing it to NIL (null)
    if ("lastDonationDate" in req.body) {
      user.lastDonationDate =
        req.body.lastDonationDate || null;
    }

    if (req.body.available !== undefined) {
      user.available = req.body.available;
    }

    const updatedUser =
      await user.save();

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllUsers = async (
  req,
  res
) => {
  try {
    const users =
      await User.find().select(
        "-password"
      );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  searchDonors,
  getDonorById,
  applyDonor,
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
};                                                                                              