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
      
      <div className="screen-header" style={{ marginBottom: '40px' }}>
        <div className="breadcrumb mono">{algorithm.category}</div>
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>{algorithm.displayName.toUpperCase()}</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <div>
          <h2 style={{ fontSize: '20px', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '16px' }}>What It Is</h2>
          <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7', fontSize: '15px' }}>
            {info.whatItIs}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '20px', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '16px' }}>How It Works</h2>
          <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7', fontSize: '15px' }}>
            {info.howItWorks}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '20px', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '16px' }}>The Genius</h2>
          <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7', fontSize: '15px' }}>
            {info.genius}
          </div>
        </div>

        {info.comparisons && (
          <div>
            <h2 style={{ fontSize: '20px', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '16px' }}>Comparisons</h2>
            <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7', fontSize: '15px' }}>
              {info.comparisons}
            </div>
          </div>
        )}

        <div>
          <h2 style={{ fontSize: '20px', textTransform: 'uppercase', borderBottom: '2px solid #000', paddingBottom: '8px', marginBottom: '16px' }}>Practice Problems</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {info.practiceProblems.map((problem, idx) => (
              <li key={idx} style={{ marginBottom: '12px' }}>
                <a 
                  href={problem.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#000', fontWeight: 'bold', textDecoration: 'underline', fontSize: '16px' }}
                >
                  {problem.name}
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
