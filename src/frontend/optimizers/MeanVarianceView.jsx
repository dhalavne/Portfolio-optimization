import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './MeanVarianceView.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MeanVarianceView({ stats }) {
  const { weights, metrics } = stats;

  if (!weights || !metrics) {
    return <div className="mv-error">Invalid or incomplete mean-variance data.</div>;
  }

  // Prepare pie chart data
  const pieData = {
    labels: Object.keys(weights),
    datasets: [
      {
        label: 'Portfolio Weights',
        data: Object.values(weights),
        backgroundColor: [
          '#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#0ea5e9'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mv-container">
      <h3 className="mv-header">Mean-Variance Optimization Results</h3>

      <div className="mv-section">
        <h4>Portfolio Weights</h4>
        <div className="mv-chart-container">
          <Pie data={pieData} />
        </div>

        <table className="mv-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Weight (%)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(weights).map(([ticker, weight]) => (
              <tr key={ticker}>
                <td>{ticker}</td>
                <td>{(weight * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mv-section">
        <h4>Portfolio Metrics</h4>
        <ul className="mv-metrics">
          <li><strong>Expected Return:</strong> {(metrics.expected_return * 100).toFixed(2)}%</li>
          <li><strong>Risk (Std Dev):</strong> {(metrics.risk * 100).toFixed(2)}%</li>
          <li><strong>Sharpe Ratio:</strong> {metrics.sharpe_ratio.toFixed(2)}</li>
        </ul>
      </div>
    </div>
  );
}
