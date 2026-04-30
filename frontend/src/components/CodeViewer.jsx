import React from 'react';

const CodeViewer = ({ sourceCode, currentLine, sourceStartLine = 1, locals, previousLocals }) => {
  if (!sourceCode) return null;

  const lines = sourceCode.split('\n');

  return (
    <div className="code-viewer-container">
      <div className="code-panel">
        <h3 className="mono">SOURCE CODE</h3>
        <pre className="mono code-block">
          {lines.map((lineText, idx) => {
            const absoluteLineNum = sourceStartLine + idx;
            const isCurrent = absoluteLineNum === currentLine;
            return (
              <div key={absoluteLineNum} className={`code-line ${isCurrent ? 'current-line' : ''}`}>
                <span className="line-number">{absoluteLineNum}</span>
                <span className="line-text">{lineText}</span>
              </div>
            );
          })}
        </pre>
      </div>
      
      <div className="variables-panel mono">
        <h3>LOCALS (LINE {currentLine})</h3>
        <ul>
          {locals && Object.entries(locals).map(([key, val]) => {
            // Very long arrays shouldn't flood the panel
            const displayVal = Array.isArray(val) && val.length > 10 
              ? `Array(${val.length})` 
              : JSON.stringify(val);
              
            const isChanged = previousLocals && JSON.stringify(locals[key]) !== JSON.stringify(previousLocals[key]);
              
            return (
              <li key={key} className={isChanged ? 'variable-changed' : ''}>
                <strong>{key}</strong> <span>{displayVal}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CodeViewer;
