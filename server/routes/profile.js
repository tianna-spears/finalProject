const express = require("express");
const router = express.Router();
const {
  getProfileByID,
  updateProfileByID,
  deleteProfileByID,
} = require("../controllers/profile");

// needs to be protected (authentication)
 
router.get("/:id", getProfileByID);
router.patch("/:id", updateProfileByID);
router.delete("/:id", deleteProfileByID);

module.exports = router;
