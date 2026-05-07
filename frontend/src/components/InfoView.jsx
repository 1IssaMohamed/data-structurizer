import React from 'react';
import { ALGORITHM_INFO } from '../config/algorithmsInfo';

const InfoView = ({ algorithm, onBack }) => {
  const info = ALGORITHM_INFO[algorithm.id];

  if (!info) {
    return (
      <div className="screen-container">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="screen-header">
          <h1>{algorithm.displayName.toUpperCase()}</h1>
          <p>Detailed information for this algorithm is coming soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
      <button className="back-btn" onClick={onBack}>← Back</button>
      
      <div className="screen-header">
        <div className="breadcrumb mono">{algorithm.category}</div>
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>{algorithm.displayName.toUpperCase()}</h1>
        <p className="screen-subtitle" style={{ fontSize: '18px', fontStyle: 'italic', marginBottom: '32px' }}>
          {info.introduction}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* How it Works Section */}
        <div style={{ backgroundColor: '#fff', border: '2px solid #000', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '16px', display: 'inline-block' }}>⚙️ HOW IT WORKS</h2>
          <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7', fontSize: '15px' }}>
            {info.howItWorks}
          </div>
        </div>

        {/* The Genius Section */}
        <div style={{ backgroundColor: '#B4D3D9', border: '2px solid #000', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '16px', display: 'inline-block' }}>🧠 THE GENIUS</h2>
          <div style={{ lineHeight: '1.7', fontSize: '15px' }}>
            {info.genius}
          </div>
        </div>

        {/* Comparisons Section */}
        <div style={{ backgroundColor: '#fff', border: '2px solid #000', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '16px', display: 'inline-block' }}>⚖️ COMPARISONS</h2>
          <div style={{ lineHeight: '1.7', fontSize: '15px' }}>
            {info.comparisons}
          </div>
        </div>

        {/* LeetCode Practice */}
        <div style={{ backgroundColor: '#BDA6CE', border: '2px solid #000', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '16px', display: 'inline-block' }}>💻 NEETCODE 75 PRACTICE</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {info.leetcode.map((problem, idx) => (
              <li key={idx} style={{ marginBottom: '12px' }}>
                <a 
                  href={problem.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#000', fontWeight: 'bold', textDecoration: 'underline', fontSize: '16px' }}
                >
                  ↗ {problem.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default InfoView;
