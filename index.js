const express = require('express');
const path = require('path');
const app = express();

// ✅ Middleware: fix CSP and iframe headers
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', 'frame-ancestors *');
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// ✅ Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webex app server listening on port ${PORT}`);
});
