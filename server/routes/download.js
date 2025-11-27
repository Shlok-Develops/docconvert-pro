const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const archiver = require('archiver');
const router = express.Router();

router.post('/single', async (req, res) => {
  try {
    const { convertedName, downloadName } = req.body;
    const filePath = path.join('./converted', convertedName);
    await fs.access(filePath);
    res.download(filePath, downloadName);
  } catch (error) {
    res.status(404).json({ success: false, error: 'File not found' });
  }
});

router.post('/batch', async (req, res) => {
  try {
    const { files } = req.body;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files provided' });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const zipName = `DocConvert_Pro_Results_${timestamp}.zip`;

    res.attachment(zipName);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(res);

    for (const file of files) {
      const filePath = path.join('./converted', file.convertedName);
      try {
        await fs.access(filePath);
        archive.file(filePath, { name: file.downloadName });
      } catch (err) {
        console.error(`File not found: ${filePath}`);
      }
    }

    await archive.finalize();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
