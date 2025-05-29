// src/backend/controllers/portfolioController.js

import analyticsService from '../services/analyticsService.js';

const getPortfolioStats = async (req, res) => {
  try {
    const data = await analyticsService.fetchPortfolioStats(req.body);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats from analytics service.' });
  }
};

export default {
  getPortfolioStats,
};
