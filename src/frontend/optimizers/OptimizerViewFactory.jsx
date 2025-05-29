import MeanVarianceView from './MeanVarianceView';
// import BlackLittermanView from './BlackLittermanView';

const optimizerViews = {
  mean_variance: MeanVarianceView,
 // black_litterman: BlackLittermanView,
  // Add new ones here without touching PortfolioResults
};

export function getOptimizerView(type) {
  return optimizerViews[type] || null;
}
