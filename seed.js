/**
 * Run once to seed the database with initial crypto data:
 *   node seed.js
 */
const mongoose = require('mongoose');
const Crypto   = require('./models/Crypto');
require('dotenv').config();

const seedData = [
  // ── Tradable ─────────────────────────────────────────────────────────────
  { name: 'Bitcoin',  symbol: 'BTC',  price: 84245.30, change24h: 0.64,  color: '#F7931A', image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
  { name: 'Ethereum', symbol: 'ETH',  price: 2181.91,  change24h: 2.08,  color: '#627EEA', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
  { name: 'Solana',   symbol: 'SOL',  price: 132.50,   change24h: 1.44,  color: '#9945FF', image: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
  { name: 'XRP',      symbol: 'XRP',  price: 2.53,     change24h: -0.08, color: '#23292F', image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png' },
  { name: 'BNB',      symbol: 'BNB',  price: 602.45,   change24h: 1.14,  color: '#F3BA2F', image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png' },
  { name: 'USDC',     symbol: 'USDC', price: 1.00,     change24h: 0.00,  color: '#2775CA', image: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' },
  // ── Top Gainers ──────────────────────────────────────────────────────────
  { name: 'Pepe',      symbol: 'PEPE', price: 0.0082,   change24h: 12.45, color: '#4CAF50', image: '' },
  { name: 'Dogecoin',  symbol: 'DOGE', price: 0.182,    change24h: 8.32,  color: '#C2A633', image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' },
  { name: 'Shiba Inu', symbol: 'SHIB', price: 0.000019, change24h: 6.71,  color: '#FF5722', image: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png' },
  { name: 'Avalanche', symbol: 'AVAX', price: 31.50,    change24h: 4.89,  color: '#E84142', image: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
  { name: 'Chainlink', symbol: 'LINK', price: 14.80,    change24h: 3.92,  color: '#2A5ADA', image: 'https://cryptologos.cc/logos/chainlink-link-logo.png' },
  { name: 'Sui',       symbol: 'SUI',  price: 3.45,     change24h: 15.20, color: '#4DA2FF', image: '' },
  // ── New Listings ─────────────────────────────────────────────────────────
  { name: 'Aptos',    symbol: 'APT',  price: 5.30,  change24h: 7.80,  color: '#2DD8A3', image: '' },
  { name: 'Sei',      symbol: 'SEI',  price: 0.32,  change24h: 4.50,  color: '#9B1C1C', image: '' },
  { name: 'Jupiter',  symbol: 'JUP',  price: 0.78,  change24h: 3.20,  color: '#6366F1', image: '' },
  { name: 'Starknet', symbol: 'STRK', price: 0.46,  change24h: -1.30, color: '#28286E', image: '' },
  { name: 'ZKsync',   symbol: 'ZK',   price: 0.089, change24h: 2.10,  color: '#4E529A', image: '' },
  { name: 'Mantle',   symbol: 'MNT',  price: 0.79,  change24h: 5.40,  color: '#000000', image: '' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Crypto.deleteMany({});
    console.log('🗑  Cleared existing crypto data');

    await Crypto.insertMany(seedData);
    console.log(`🌱 Seeded ${seedData.length} cryptocurrencies`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seed();