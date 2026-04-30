import React from 'react';

const ModeSelector = ({ algorithm, onDemo, onCustom, onBack }) => (
  <div className="screen-container">
    <button className="back-btn" onClick={onBack}>← Back</button>
    <div className="screen-header">
      <div className="breadcrumb mono">{algorithm.category}</div>
      <h1>{algorithm.displayName.toUpperCase()}</h1>
      <p className="screen-subtitle">{algorithm.description}</p>
    </div>
    <div className="mode-grid">
      <div className="mode-card" onClick={onDemo}>
        <div className="mode-card-icon">▶</div>
        <div className="mode-card-title">Demo</div>
        <p className="mode-card-description">
          Step through pre-built scenarios covering normal, edge, and failure
          cases — no setup required.
        </p>
      </div>
      <div className="mode-card" onClick={onCustom}>
        <div className="mode-card-icon">✎</div>
        <div className="mode-card-title">Custom Input</div>
        <p className="mode-card-description">
          Enter your own values and watch exactly what the algorithm does
          with your specific data.
        </p>
      </div>
    </div>
  </div>
);

export default ModeSelector;
