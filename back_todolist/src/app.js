const http = require('http');
const url = require('url');
const router = require('./routes/index.js');

const app = http.createServer(async (req, res) => {
  // Middleware CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  // Normaliser le path (enlever le slash final sauf pour la racine)
  let path = parsedUrl.pathname;
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  const method = req.method;

  // Router
  try {
    await router.handle(req, res, method, path);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
});

module.exports = app;