import React from 'react';
import { getOptimizerView } from '../optimizers/OptimizerViewFactory';

export default function PortfolioResults({ stats }) {
  if (!stats) return null;

  const OptimizerComponent = getOptimizerView(stats.optimizer);

  return OptimizerComponent
    ? <OptimizerComponent stats={stats} />
    : <pre>{JSON.stringify(stats, null, 2)}</pre>;
}
