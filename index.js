const express = require('express');
const path = require('path');
const app = express();

// Global header middleware for all responses
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', "frame-ancestors *");
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Serve static files (like index.html) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Optional: fallback to index.html for SPA behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webex-compatible app listening on port ${PORT}`);
});
