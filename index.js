const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve any static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/data', (req, res) => {
    fs.readFile('data/data.json', (err, data) => {
      if (err) {
        res.status(500).send('Error reading data file');
        return;
      }
      res.json(JSON.parse(data));
    });
  });

app.get('*', function (request, response) {
response.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'));
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
