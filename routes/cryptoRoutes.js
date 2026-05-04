const express = require('express');
const router  = express.Router();
const {
  getAllCrypto,
  getTopGainers,
  getNewListings,
  addCrypto,
} = require('../controllers/cryptoController');

// IMPORTANT: specific routes (/gainers, /new) must come before the param route (/crypto/:id)

// GET /api/crypto/gainers — top gainers sorted by 24h change desc
router.get('/gainers', getTopGainers);

// GET /api/crypto/new — newest listings sorted by createdAt desc
router.get('/new', getNewListings);

// GET /api/crypto — all tradable cryptocurrencies
router.get('/', getAllCrypto);

// POST /api/crypto — add a new cryptocurrency
router.post('/', addCrypto);

module.exports = router;