const express = require("express");

const router = express.Router();

const {
  searchDonors,
  getDonorById,
  applyDonor,
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} = require(
  "../controllers/userController"
);

const {
  protect,
  adminOnly,
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/search",
  searchDonors
);

router.post(
  "/apply",
  protect,
  applyDonor
);

router.get(
  "/profile",
  protect,
  getProfile
);
router.put(
  "/profile",
  protect,
  updateProfile
);

router.get(
  "/all",
  protect,
  adminOnly,
  getAllUsers
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteUser
);

// Keep last so it doesn't shadow /search, /profile, /all
router.get(
  "/:id",
  protect,
  getDonorById
);

module.exports = router;