const express = require("express");
const { getHistory, addHistory, deleteHistory } = require("../controllers/historyController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.use(authenticateToken);

router.get("/", getHistory);
router.post("/", addHistory);
router.delete("/", deleteHistory);

module.exports = router;