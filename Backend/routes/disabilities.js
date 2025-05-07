const express = require("express");
const router = express.Router();
const Disability = require("../models/Disability");

// ✅ Fetch Disabilities with Pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const disabilities = await Disability.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ disabilities, total: await Disability.countDocuments(), page, limit });
  } catch (error) {
    console.error("Error fetching disabilities:", error);
    res.status(500).json({ message: "Server error fetching disabilities" });
  }
});

module.exports = router;
