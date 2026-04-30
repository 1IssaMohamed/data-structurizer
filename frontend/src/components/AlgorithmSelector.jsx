import React from 'react';

const AlgorithmSelector = ({ algorithms, onSelect }) => (
  <div className="landing-container">
    <div className="landing-header">
      <h1>ALGORITHM VISUALIZER</h1>
      <p className="landing-subtitle">Choose an algorithm to explore step by step.</p>
    </div>
    <div className="algorithm-grid">
      {algorithms.map(algo => (
        <div key={algo.id} className="algo-card" onClick={() => onSelect(algo.id)}>
          <div className="algo-card-category mono">{algo.category}</div>
          <div className="algo-card-title">{algo.displayName}</div>
          <p className="algo-card-description">{algo.description}</p>
          <div className="algo-card-arrow">→</div>
        </div>
      ))}
    </div>
  </div>
);

export default AlgorithmSelector;
