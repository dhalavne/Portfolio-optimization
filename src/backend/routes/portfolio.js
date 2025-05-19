import express from 'express';
import axios from 'axios';
import math from 'mathjs';
const router = express.Router();

// Utility: Calculate expected returns and covariance matrix
function processPriceData(priceData) {
  const symbols = Object.keys(priceData);
  const dailyReturns = symbols.map((symbol) => {
    const prices = priceData[symbol];
    return prices.slice(1).map((price, i) => (price - prices[i]) / prices[i]);
  });

  const returnsMatrix = math.matrix(dailyReturns);
  const expectedReturns = dailyReturns.map((r) => math.mean(r));
  const covarianceMatrix = math.multiply(returnsMatrix, math.transpose(returnsMatrix));

  return { expectedReturns, covarianceMatrix };
}

function computeSharpe(weights, expectedReturns, covMatrix, riskFreeRate = 0.01) {
  const portfolioReturn = math.dot(weights, expectedReturns);
  const portfolioVol = math.sqrt(math.multiply(weights, math.multiply(covMatrix, weights)));
  return (portfolioReturn - riskFreeRate) / portfolioVol;
}

// Optimization logic
function optimizePortfolio(expectedReturns, covMatrix, riskTarget = 0.15) {
  const numAssets = expectedReturns.length;
  let weights = Array(numAssets).fill(1 / numAssets); // Start with equal weights

  // Naive iterative optimization (gradient-free, for demo purposes)
  for (let i = 0; i < 1000; i++) {
    const perturb = weights.map((w) => w + (Math.random() - 0.5) * 0.05);
    const norm = math.sum(perturb);
    const newWeights = perturb.map((w) => w / norm);

    const vol = math.sqrt(math.multiply(newWeights, math.multiply(covMatrix, newWeights)));
    if (vol <= riskTarget) {
      weights = newWeights;
    }
  }

  const sharpe = computeSharpe(weights, expectedReturns, covMatrix);
  return { weights, sharpe };
}

// GET: Optimize portfolio based on query
router.post('/optimize', async (req, res) => {
  const { tickers, riskTarget } = req.body;
  const apiKey = process.env.ALPHA_VANTAGE_KEY;

  try {
    const priceData = {};
    for (let ticker of tickers) {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${apiKey}`
      );

      const prices = Object.values(response.data['Time Series (Daily)'])
        .map((d) => parseFloat(d['5. adjusted close']))
        .reverse();

      priceData[ticker] = prices.slice(-60); // use 60 days of data
    }

    const { expectedReturns, covarianceMatrix } = processPriceData(priceData);
    const result = optimizePortfolio(expectedReturns, covarianceMatrix, riskTarget);

    res.json({ optimizedWeights: result.weights, sharpeRatio: result.sharpe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Optimization failed' });
  }
});

// // GET: Debounced ticker search (autocomplete)
router.get('/search', async (req, res) => {
  const { query } = req.query;
  const apiKey = process.env.ALPHA_VANTAGE_KEY;
  console.log(apiKey);

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`
    );

    console.log(response);

    const matches = response.data.bestMatches.map((match) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
    }));

    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;
