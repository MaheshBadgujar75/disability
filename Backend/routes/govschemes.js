const express = require("express");
const router = express.Router();
const DisabilityScheme = require("../models/DisabilitySchemes");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const language = req.query.language || "en";
    const category = req.query.category;
    const skip = (page - 1) * limit;

    const query = {};
    if (category && category !== "all") {
      query.category = category;
    }

    const [schemes, total] = await Promise.all([
      DisabilityScheme.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
      DisabilityScheme.countDocuments(query)
    ]);

    const formattedData = schemes.map((scheme) => scheme.getInLanguage(language));

    res.json({
      total,
      page,
      limit,
      data: formattedData
    });
  } catch (error) {
    console.error("Error fetching disability schemes:", error);
    res.status(500).json({
      message: "Error fetching disability schemes",
      error: error.message
    });
  }
});

module.exports = router;
