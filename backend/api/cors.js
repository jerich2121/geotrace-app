const allowCors = (fn) => async (req, res) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
  ].filter(Boolean);

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!process.env.FRONTEND_URL) {
    // fallback during development if FRONTEND_URL not set
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return fn(req, res);
};

module.exports = allowCors;