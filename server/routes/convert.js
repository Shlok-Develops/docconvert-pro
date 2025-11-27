const express = require('express');
const router = express.Router();
const conversionService = require('../services/conversionService');

router.post('/', async (req, res) => {
  try {
    const { files, targetFormat } = req.body;
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files provided' });
    }

    if (!targetFormat) {
      return res.status(400).json({ success: false, error: 'Target format not specified' });
    }

    const results = await conversionService.convertFiles(files, targetFormat);
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
