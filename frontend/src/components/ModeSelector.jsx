import React from 'react';

const ModeSelector = ({ algorithm, onDemo, onCustom, onInfo, onBack }) => (
  <div className="screen-container">
    <button className="back-btn" onClick={onBack}>← Back</button>
    <div className="screen-header">
      <div className="breadcrumb mono">{algorithm.category}</div>
      <h1>{algorithm.displayName.toUpperCase()}</h1>
      <p className="screen-subtitle">{algorithm.description}</p>
    </div>
    <div className="mode-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', maxWidth: '900px' }}>
      
      <div className="mode-card" onClick={onInfo} style={{ backgroundColor: '#B4D3D9' }}>
        <div className="mode-card-icon">🧠</div>
        <div className="mode-card-title">Learn / Info</div>
        <p className="mode-card-description">
          Understand the genius behind this algorithm and practice LeetCode questions.
        </p>
      </div>

      <div className="mode-card" onClick={onDemo}>
        <div className="mode-card-icon">▶</div>
        <div className="mode-card-title">Demo</div>
        <p className="mode-card-description">
          Step through pre-built scenarios covering normal, edge, and failure cases.
        </p>
      </div>

      <div className="mode-card" onClick={onCustom}>
        <div className="mode-card-icon">✎</div>
        <div className="mode-card-title">Custom Input</div>
        <p className="mode-card-description">
          Enter your own values and watch exactly what the algorithm does.
        </p>
      </div>
      
    </div>
  </div>
);

export default ModeSelector;
