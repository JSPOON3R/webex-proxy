const express = require('express');
const fetch = require('node-fetch');
const app = express();

const TARGET_URL = 'https://studio-storage-proxy-9cfb4d61-cb6b-49a0-8655-66469aebae82.webfuse.com/index.html';

// ✅ Middleware to set headers on every response
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', 'frame-ancestors *');
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', async (req, res) => {
  try {
    const upstreamRes = await fetch(TARGET_URL);
    const html = await upstreamRes.text();
    res.type('html').send(html);
  } catch (err) {
    console.error('Failed to fetch upstream content:', err);
    res.status(500).send('Error loading app');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
