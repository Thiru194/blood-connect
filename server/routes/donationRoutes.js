const express = require("express");

const router = express.Router();

const {
  createDonation,
  getDonations,
  getMyDonations,
  deleteDonation,
} = require(
  "../controllers/donationController"
);

const {
  protect,
  adminOnly,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createDonation
);

router.get(
  "/",
  protect,
  adminOnly,
  getDonations
);

router.get(
  "/my",
  protect,
  getMyDonations
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteDonation
);

module.exports = router;