// FILE: routes/governmentSchemes.js
const express = require('express');
const router = express.Router();
const GovernmentScheme = require('../models/govSchemeModel');

// GET all government schemes with pagination, filtering and language support
router.get('/', async (req, res) => {
  try {
    console.log('Request received with query:', req.query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const language = req.query.language || 'en';
    
    // Build query object
    const query = { isActive: true };
    
    // Apply category filter if provided
    if (req.query.category && req.query.category.toLowerCase() !== 'all') {
      // Match the enum values in the schema
      const categoryMapping = {
        'Disability': 'disability',
        'Education': 'education',
        'Healthcare': 'healthcare', 
        'Health': 'healthcare',    // Handle both health and healthcare
        'Employment': 'employment'
      };
      
      const category = categoryMapping[req.query.category] || req.query.category.toLowerCase();
      query.category = category;
    }

    console.log('MongoDB query:', query);
    
    // Get total count for pagination
    const total = await GovernmentScheme.countDocuments(query);
    console.log('Total documents:', total);
    
    // Get schemes with pagination
    let schemes = await GovernmentScheme.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    console.log(`Found ${schemes.length} schemes`);
    
    // Process schemes for language
    if (language !== 'en') {
      schemes = schemes.map(scheme => {
        const schemObj = scheme.toObject();
        
        // If translations exist for this language, use them
        if (schemObj.translations && schemObj.translations[language]) {
          const translations = schemObj.translations[language];
          
          // Replace English fields with translated ones when available
          if (translations.title) schemObj.title = translations.title;
          if (translations.description) schemObj.description = translations.description;
          if (translations.eligibility) schemObj.eligibility = translations.eligibility;
          if (translations.benefits) schemObj.benefits = translations.benefits;
          if (translations.applicationProcess) schemObj.applicationProcess = translations.applicationProcess;
        }
        
        return schemObj;
      });
    }
    
    // Return formatted response
    res.json({
      success: true,
      total,
      page,
      limit,
      data: schemes
    });
    
  } catch (error) {
    console.error('Error fetching government schemes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching government schemes',
      error: error.message
    });
  }
});

// GET single government scheme by ID with language support
router.get('/api/governmentschemes/:id', async (req, res) => {
  try {
    const schemeId = req.params.id;
    const language = req.query.language || 'en';
    
    const scheme = await GovernmentScheme.findById(schemeId);
    
    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Government scheme not found'
      });
    }
    
    // Process language translations
    const schemeObj = scheme.toObject();
    
    if (language !== 'en' && schemeObj.translations && schemeObj.translations[language]) {
      const translations = schemeObj.translations[language];
      
      // Replace English fields with translated ones
      if (translations.title) schemeObj.title = translations.title;
      if (translations.description) schemeObj.description = translations.description;
      if (translations.eligibility) schemeObj.eligibility = translations.eligibility;
      if (translations.benefits) schemeObj.benefits = translations.benefits;
      if (translations.applicationProcess) schemeObj.applicationProcess = translations.applicationProcess;
    }
    
    res.json({
      success: true,
      data: schemeObj
    });
    
  } catch (error) {
    console.error('Error fetching government scheme:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching government scheme',
      error: error.message
    });
  }
});

// Test route to confirm API is working
router.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working!' });
});

// Optional: Route to add test data if needed
router.get('/api/seed', async (req, res) => {
  try {
    const testScheme = new GovernmentScheme({
      title: "Test Scheme",
      description: "This is a test scheme",
      category: "education",
      eligibility: "Testing eligibility",
      benefits: "Testing benefits",
      applicationProcess: "Testing process",
      isActive: true
    });
    
    await testScheme.save();
    res.json({ success: true, message: 'Test scheme created!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;