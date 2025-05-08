const mongoose = require("mongoose");

const disabilitySchemeSchema = new mongoose.Schema(
    {
      name: {
        en: { type: String, required: true, trim: true },
        hi: { type: String, required: true, trim: true },
        mr: { type: String, required: true, trim: true },
      },
      description: {
        en: { type: String, required: true, trim: true },
        hi: { type: String, required: true, trim: true },
        mr: { type: String, required: true, trim: true },
      },
      category: {
        type: String,
        required: true,
        enum: ["disability", "healthcare", "education", "employment"],
        trim: true,
      },
      eligibility: {
        type: String,
        required: true,
        trim: true,
      },
      benefits: {
        type: String,
        required: true,
        trim: true,
      },
      applicationProcess: {
        type: String,
        required: true,
        trim: true,
      },
      documents: [
        {
          type: String,
          trim: true,
        },
      ],
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
      contactInfo: {
        website: { type: String, trim: true },
        phone: { type: String, trim: true },
        email: { type: String, trim: true },
      },
      image: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
);

// Full-text search index
disabilitySchemeSchema.index({
  "name.en": "text",
  "name.hi": "text",
  "name.mr": "text",
  "description.en": "text",
});

// Categorical index for filtering
disabilitySchemeSchema.index({ category: 1 });

/**
 * Return the scheme in the desired language
 */
disabilitySchemeSchema.methods.getInLanguage = function (language = "en") {
  if (!["en", "hi", "mr"].includes(language)) {
    language = "en";
  }

  return {
    _id: this._id,
    name: this.name[language],
    description: this.description[language],
    category: this.category,
    eligibility: this.eligibility,
    benefits: this.benefits,
    applicationProcess: this.applicationProcess,
    documents: this.documents,
    lastUpdated: this.lastUpdated,
    contactInfo: this.contactInfo,
    image: this.image,
  };
};

/**
 * Find all schemes under a specific category and return localized fields
 */
disabilitySchemeSchema.statics.findByCategory = async function (
    category,
    language = "en"
) {
  const schemes = await this.find({ category });

  if (!["en", "hi", "mr"].includes(language)) {
    language = "en";
  }

  return schemes.map((scheme) => ({
    _id: scheme._id,
    name: scheme.name[language],
    description: scheme.description[language],
    category: scheme.category,
    image: scheme.image,
  }));
};

/**
 * Search across all languages and return localized results
 */
disabilitySchemeSchema.statics.searchSchemes = async function (
    query,
    language = "en"
) {
  if (!["en", "hi", "mr"].includes(language)) {
    language = "en";
  }

  const schemes = await this.find({
    $or: [
      { "name.en": { $regex: query, $options: "i" } },
      { "name.hi": { $regex: query, $options: "i" } },
      { "name.mr": { $regex: query, $options: "i" } },
      { "description.en": { $regex: query, $options: "i" } },
      { "description.hi": { $regex: query, $options: "i" } },
      { "description.mr": { $regex: query, $options: "i" } },
    ],
  });

  return schemes.map((scheme) => ({
    _id: scheme._id,
    name: scheme.name[language],
    description: scheme.description[language],
    category: scheme.category,
    image: scheme.image,
  }));
};

module.exports = mongoose.model("DisabilityScheme", disabilitySchemeSchema, "disabilityschemes");
