import React from 'react';

const DemoSelector = ({ algorithm, onSelect, onBack }) => (
  <div className="screen-container">
    <button className="back-btn" onClick={onBack}>← Back</button>
    <div className="screen-header">
      <div className="breadcrumb mono">{algorithm.displayName} / Demos</div>
      <h1>CHOOSE A SCENARIO</h1>
      <p className="screen-subtitle">Each demo highlights a distinct behaviour of the algorithm.</p>
    </div>
    <div className="demo-grid">
      {algorithm.demos.map((demo, idx) => (
        <div key={idx} className="demo-card" onClick={() => onSelect(demo)}>
          <div className="demo-card-number mono">0{idx + 1}</div>
          <div className="demo-card-name">{demo.name}</div>
          <p className="demo-card-description">{demo.description}</p>
          <div className="demo-card-args mono" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {JSON.stringify(demo.args)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DemoSelector;
