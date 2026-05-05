import React from 'react';

const LinkedListVisualizer = ({ frames, currentIndex, previousLocals, listVar = "values", cursorVar = "curr_idx", pointers }) => {
  const locals = frames[currentIndex]?.locals || {};
  const prevLocals = previousLocals || {};
  
  const list = locals[listVar] || [];
  const activePointers = pointers ? pointers : [cursorVar];

  return (
    <div className="ll-container">
      {list.map((val, idx) => {
        const pointersHere = activePointers.filter(p => locals[p] === idx);
        const isCurrent = pointersHere.length > 0;
        const highlight = pointersHere.some(p => locals[p] !== prevLocals[p]);

        return (
          <div key={idx} className="ll-node-wrapper">
            <div className="ll-node-group">
              {pointersHere.map((p, i) => (
                <div key={p} className="ll-pointer mono" style={{ top: `-${35 + i * 20}px` }}>
                  {p.toUpperCase()}↓
                </div>
              ))}
              <div className={`ll-node mono ${isCurrent ? 'll-active' : ''} ${highlight ? 'pointer-changed' : ''}`}>
                {val}
              </div>
            </div>
            {idx < list.length - 1 && <div className="ll-arrow mono">→</div>}
          </div>
        );
      })}
      
      {/* Show null termination */}
      <div className="ll-node-wrapper">
        <div className="ll-arrow mono">→</div>
        <div className="ll-node-group">
          {activePointers.filter(p => locals[p] >= list.length).map((p, i) => (
            <div key={p} className="ll-pointer mono" style={{ top: `-${35 + i * 20}px` }}>
              {p.toUpperCase()}↓
            </div>
          ))}
          <div className={`ll-node mono null-node ${activePointers.some(p => locals[p] >= list.length) ? 'll-active' : ''}`}>
            NULL
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
