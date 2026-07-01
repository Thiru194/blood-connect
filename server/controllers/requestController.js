const BloodRequest = require("../models/BloodRequest");

// Create a new blood request tied to the logged-in user.
const createRequest = async (req, res) => {
  try {
    const request = await BloodRequest.create({
      ...req.body,
      requestedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List every blood request, newest first.
// Serves both the public feed (GET /) and the admin view (GET /all).
const getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate("requestedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Requests created by the currently logged-in user.
const getMyRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({
      requestedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Single request with the requester's contact details.
const getRequestById = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id).populate(
      "requestedBy",
      "name email phone city bloodGroup"
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = req.body.status;
    await request.save();

    res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getRequests,
  // Admin "all requests" view shares the same logic as the public feed.
  getAllRequests: getRequests,
  getRequestById,
  getMyRequests,
  deleteRequest,
  updateRequestStatus,
};
