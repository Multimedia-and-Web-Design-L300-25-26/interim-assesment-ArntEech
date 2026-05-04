const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Cryptocurrency name is required'],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, 'Symbol is required'],
      uppercase: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,        // URL to the coin's image/logo
      default: '',
    },
    change24h: {
      type: Number,        // percentage change over the last 24h, e.g. +2.5 or -1.3
      default: 0,
    },
    color: {
      type: String,        // hex color used for the coin avatar in the UI
      default: '#4B5563',
    },
  },
  { timestamps: true }   // createdAt used to sort "New Listings"
);

module.exports = mongoose.model('Crypto', cryptoSchema);