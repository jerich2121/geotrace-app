const { login } = require('../../src/controllers/authController');
const allowCors = require('../_cors');

module.exports = allowCors((req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  return login(req, res);
});