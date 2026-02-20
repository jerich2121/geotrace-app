const { getHistory, addHistory, deleteHistory } = require('../../src/controllers/historyController');
const { authenticateToken } = require('../../src/middleware/auth');
const allowCors = require('../_cors');

// Note the 'async' addition here
module.exports = allowCors(async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();

  // We wrap this in a promise or ensure it's awaited so Vercel 
  // doesn't kill the function early.
  return new Promise((resolve) => {
    authenticateToken(req, res, async () => {
      try {
        let result;
        if (req.method === 'GET') result = await getHistory(req, res);
        else if (req.method === 'POST') result = await addHistory(req, res);
        else if (req.method === 'DELETE') result = await deleteHistory(req, res);
        else {
          res.status(405).json({ message: 'Method not allowed' });
        }
        resolve(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        resolve();
      }
    });
  });
});