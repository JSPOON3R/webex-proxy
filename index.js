const express = require('express');
const fetch = require('node-fetch');
const app = express();

const TARGET_URL = 'https://studio-storage-proxy-9cfb4d61-cb6b-49a0-8655-66469aebae82.webfuse.com/index.html';

app.get('/', async (req, res) => {
  try {
    const upstreamRes = await fetch(TARGET_URL);
    const html = await upstreamRes.text();

    res.set({
      'Content-Type': 'text/html',
      'X-Frame-Options': 'ALLOWALL',
      'Cross-Origin-Opener-Policy': 'unsafe-none',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Access-Control-Allow-Origin': '*'
    });

    res.send(html);
  } catch (err) {
    console.error('Failed to fetch upstream content:', err);
    res.status(500).send('Error loading app');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
