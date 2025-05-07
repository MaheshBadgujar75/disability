const mongoose = require("mongoose");

const DisabilitySchema = new mongoose.Schema({
  name: {
    en: String,
    hi: String,
    mr: String,
  },
  description: {
    en: String,
    hi: String,
    mr: String,
  },
  category: {
    en: String,
    hi: String,
    mr: String,
  },
});

module.exports = mongoose.model("Disability", DisabilitySchema);
