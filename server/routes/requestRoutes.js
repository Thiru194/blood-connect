const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  getAllRequests,
  getMyRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
} = require("../controllers/requestController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.post("/", protect, createRequest);
router.get("/", getRequests);

router.get("/my", protect, getMyRequests);
router.get("/all", protect, adminOnly, getAllRequests);

router.put("/:id/status", protect, adminOnly, updateRequestStatus);
router.delete("/:id", protect, adminOnly, deleteRequest);

// Keep this last so it doesn't shadow /my and /all
router.get("/:id", protect, getRequestById);

module.exports = router;
