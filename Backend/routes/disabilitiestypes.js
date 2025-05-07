const express = require("express");
const router = express.Router();
const DisabilityType = require("../models/DisabilityTypes");

// Get disability types with default English data, or fetch selected language data
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 6, language = "en" } = req.query;
    const skip = (page - 1) * limit;

    // Fetch all language fields and image
    const disabilityTypes = await DisabilityType.find({})
      .select("_id name description image")
      .skip(skip)
      .limit(parseInt(limit));

    // Format response based on selected language, default to English
    const formattedData = disabilityTypes.map((disability) => ({
      _id: disability._id,
      name: disability.name[language] || disability.name.en, // Default to English
      description: disability.description[language] || disability.description.en, // Default to English
      image: disability.image || null,
    }));

    res.json({
      total: await DisabilityType.countDocuments(),
      page: parseInt(page), // Include the current page
      limit: parseInt(limit),
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching disability types", error });
  }
});

module.exports = router;
