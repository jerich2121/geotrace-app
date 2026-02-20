const { getMe } = require('../../src/controllers/authController');
const { authenticateToken } = require('../../src/middleware/auth');
const allowCors = require('../_cors');

module.exports = allowCors((req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  return authenticateToken(req, res, () => getMe(req, res));
});