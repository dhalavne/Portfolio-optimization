import axios from 'axios';
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5001';

const fetchPortfolioStats = async (payload) => {
  const response = await axios.post(`${PYTHON_SERVICE_URL}/portfolio-stats`, payload);
  return response.data;
};

export default {
  fetchPortfolioStats,
};
