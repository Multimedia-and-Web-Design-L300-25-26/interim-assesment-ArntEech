const Crypto = require('../models/Crypto');

// ─── GET /api/crypto ──────────────────────────────────────────────────────────
// Returns all cryptocurrencies (tradable list)
const getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    return res.status(200).json({ cryptos });
  } catch (err) {
    console.error('Get all crypto error:', err);
    return res.status(500).json({ message: 'Failed to fetch cryptocurrencies.' });
  }
};

// ─── GET /api/crypto/gainers ──────────────────────────────────────────────────
// Returns cryptos sorted by 24h change descending (highest gainers first)
const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } }).sort({ change24h: -1 });
    return res.status(200).json({ cryptos: gainers });
  } catch (err) {
    console.error('Get top gainers error:', err);
    return res.status(500).json({ message: 'Failed to fetch top gainers.' });
  }
};

// ─── GET /api/crypto/new ─────────────────────────────────────────────────────
// Returns the most recently added cryptocurrencies (newest first)
const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 }).limit(20);
    return res.status(200).json({ cryptos: newListings });
  } catch (err) {
    console.error('Get new listings error:', err);
    return res.status(500).json({ message: 'Failed to fetch new listings.' });
  }
};

// ─── POST /api/crypto ─────────────────────────────────────────────────────────
// Adds a new cryptocurrency to the database
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h, color } = req.body;

    // Validate required fields
    if (!name || !symbol || price === undefined) {
      return res.status(400).json({
        message: 'Name, symbol, and price are required.',
      });
    }

    // Check for duplicate symbol
    const existing = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existing) {
      return res.status(409).json({
        message: `A cryptocurrency with symbol "${symbol.toUpperCase()}" already exists.`,
      });
    }

    const crypto = await Crypto.create({
      name,
      symbol,
      price: parseFloat(price),
      image:     image     || '',
      change24h: change24h !== undefined ? parseFloat(change24h) : 0,
      color:     color     || '#4B5563',
    });

    return res.status(201).json({
      message: `${crypto.name} (${crypto.symbol}) added successfully.`,
      crypto,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(' ') });
    }
    console.error('Add crypto error:', err);
    return res.status(500).json({ message: 'Failed to add cryptocurrency.' });
  }
};

module.exports = { getAllCrypto, getTopGainers, getNewListings, addCrypto };