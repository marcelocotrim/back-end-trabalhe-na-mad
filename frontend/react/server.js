const PORT = 3000;
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Express server is up on port ${PORT}`);
});
