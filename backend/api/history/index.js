const { getHistory, addHistory, deleteHistory } = require('../../src/controllers/historyController');
const { authenticateToken } = require('../../src/middleware/auth');
const allowCors = require('../_cors');

module.exports = allowCors((req, res) => {
  return authenticateToken(req, res, () => {
    if (req.method === 'GET') return getHistory(req, res);
    if (req.method === 'POST') return addHistory(req, res);
    if (req.method === 'DELETE') return deleteHistory(req, res);
    return res.status(405).json({ message: 'Method not allowed' });
  });
});