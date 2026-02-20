const allowCors = (fn) => async (req, res) => {
  // Use '*' or a specific domain like 'https://your-frontend.vercel.app'
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');

  // Handle Preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Use await to ensure the serverless function stays alive until logic completes
  return await fn(req, res);
};

module.exports = allowCors;