// import React, { useState } from 'react';
// import axios from 'axios';

// export default function Portfolio() {
//   const [tickers, setTickers] = useState('');
//   const [risk, setRisk] = useState(0.15);
//   const [result, setResult] = useState(null);

//   const handleOptimize = async () => {
//     try {
//       const res = await axios.post('http://localhost:3000/api/portfolio/optimize', {
//         tickers: tickers.split(',').map(t => t.trim().toUpperCase()),
//         riskTarget: parseFloat(risk)
//       });
//       setResult(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Optimization failed');
//     }
//   };

//   return (
//     <div className="form-wrapper">
//       <h2>Optimize Portfolio</h2>
//       <input placeholder="Tickers (e.g. AAPL,MSFT,GOOG)" value={tickers} onChange={e => setTickers(e.target.value)} />
//       <input type="number" step="0.01" min="0" max="1" value={risk} onChange={e => setRisk(e.target.value)} />
//       <button onClick={handleOptimize}>Optimize</button>

//       {result && (
//         <div className="result-box">
//           <h3>Optimized Weights:</h3>
//           <ul>
//             {result.optimizedWeights.map((w, i) => (
//               <li key={i}>{tickers.split(',')[i].toUpperCase()}: {(w * 100).toFixed(2)}%</li>
//             ))}
//           </ul>
//           <p><strong>Sharpe Ratio:</strong> {result.sharpeRatio.toFixed(3)}</p>
//         </div>
//       )}
//     </div>
//   );
// }
