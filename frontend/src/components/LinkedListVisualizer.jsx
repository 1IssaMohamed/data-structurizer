import React from 'react';

const LinkedListVisualizer = ({ frames, currentIndex, previousLocals, listVar = "values", cursorVar = "curr_idx" }) => {
  const locals = frames[currentIndex]?.locals || {};
  const prevLocals = previousLocals || {};
  
  const list = locals[listVar] || [];
  const cursor = locals[cursorVar];
  const prevCursor = prevLocals[cursorVar];
  
  const cursorMoved = cursor !== prevCursor;

  return (
    <div className="ll-container">
      {list.map((val, idx) => {
        const isCurrent = idx === cursor;
        const highlight = isCurrent && cursorMoved;

        return (
          <div key={idx} className="ll-node-wrapper">
            <div className="ll-node-group">
              {isCurrent && <div className="ll-pointer mono">CURR↓</div>}
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
          {cursor === list.length && <div className="ll-pointer mono">CURR↓</div>}
          <div className={`ll-node mono null-node ${cursor === list.length ? 'll-active' : ''} ${cursor === list.length && cursorMoved ? 'pointer-changed' : ''}`}>
            NULL
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
