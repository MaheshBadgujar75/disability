const mongoose = require("mongoose");

const disabilityTypeSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true, trim: true, unique: true },
      hi: { type: String, trim: true },
      mr: { type: String, trim: true },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      en: { type: String, required: true, trim: true },
      hi: { type: String, trim: true },
      mr: { type: String, trim: true },
    },
    shortDescription: {
      en: { type: String, trim: true, maxlength: 200 },
      hi: { type: String, trim: true, maxlength: 200 },
      mr: { type: String, trim: true, maxlength: 200 },
    },
    image: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      default: null,
    },
    categories: [
      {
        type: String,
        enum: [
          "physical",
          "cognitive",
          "sensory",
          "psychological",
          "developmental",
          "other",
        ],
      },
    ],
    commonAccommodations: [
      {
        type: String,
        trim: true,
      },
    ],
    resourceLinks: [
      {
        title: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for multilingual search
disabilityTypeSchema.index({
  "name.en": "text",
  "description.en": "text",
  "shortDescription.en": "text",
  "resourceLinks.title": "text",
});

// Pre-save hook to generate slug automatically
disabilityTypeSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name.en
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

module.exports = mongoose.model(
  "disabilitiestypes",
  disabilityTypeSchema,
  "disabilitiestypes"
);
