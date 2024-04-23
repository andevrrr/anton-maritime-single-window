const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const filePath = path.join(__dirname, '..', 'testdata', 'portnet-20240418120646.json');

router.get('/emilie', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading vessel data');
    }
    const jsonData = JSON.parse(data);
    let emilieData;

    if (jsonData.portCalls && Array.isArray(jsonData.portCalls)) {
      emilieData = jsonData.portCalls.find(vessel => vessel.vesselName === "Emilie");
    } else {
      return res.status(500).send('Unexpected JSON structure');
    }

    res.json(emilieData || 'No data for Emilie found');
  });
});

module.exports = router;
