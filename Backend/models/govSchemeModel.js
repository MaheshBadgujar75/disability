// FILE: models/GovernmentScheme.js
const mongoose = require('mongoose');

const governmentSchemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['disability', 'education', 'healthcare', 'employment'],
    trim: true
  },
  eligibility: {
    type: String,
    required: true,
    trim: true
  },
  benefits: {
    type: String,
    required: true,
    trim: true
  },
  applicationProcess: {
    type: String,
    required: true,
    trim: true
  },
  documents: {
    type: [String],
    default: []
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  contactInfo: {
    website: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    }
  },
  image: {
    type: String,
    trim: true
  },
  translations: {
    hi: {
      title: String,
      description: String,
      eligibility: String,
      benefits: String,
      applicationProcess: String
    },
    mr: {
      title: String,
      description: String,
      eligibility: String,
      benefits: String,
      applicationProcess: String
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create text index for search functionality
governmentSchemeSchema.index({
  title: 'text',
  description: 'text',
  eligibility: 'text',
  benefits: 'text',
  'translations.hi.title': 'text',
  'translations.hi.description': 'text',
  'translations.mr.title': 'text',
  'translations.mr.description': 'text'
});

// Explicitly specify the collection name 'govschemes'
module.exports = mongoose.model('GovernmentScheme', governmentSchemeSchema, 'govschemes');