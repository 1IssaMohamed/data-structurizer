import React from 'react';

const ArrayVisualizer = ({ frames, currentIndex, arrayVar, pointers, previousLocals }) => {
  if (!frames || frames.length === 0) return <div>No frames available</div>;
  
  const currentFrame = frames[currentIndex];
  if (!currentFrame) return null;

  const locals = currentFrame.locals;
  const arrayData = locals[arrayVar] || [];

  return (
    <div>
      <div className="array-container">
        {/* Render Pointers */}
        {pointers.map((pointerName) => {
          const pointerIdx = locals[pointerName];
          if (pointerIdx === undefined || pointerIdx === null || pointerIdx >= arrayData.length || pointerIdx < 0) return null;
          
          const isChanged = previousLocals && locals[pointerName] !== previousLocals[pointerName];
          
          return (
            <div 
              key={pointerName}
              className={`pointer pointer-${pointerName.toLowerCase()} mono ${isChanged ? 'pointer-changed' : ''}`}
              style={{ transform: `translateX(${pointerIdx * 60}px)` }}
            >
              {pointerName.toUpperCase()}
              {pointerName === 'l' || pointerName === 'i' ? '↓' : pointerName === 'r' || pointerName === 'j' ? '↑' : '↓'}
            </div>
          );
        })}

        {/* Render Array */}
        {arrayData.map((val, idx) => {
          // Highlight active cells if pointers are on them
          const isActive = pointers.some(p => locals[p] === idx);
          
          return (
            <div key={idx} className={`array-box mono ${isActive ? 'active' : ''}`}>
              {val}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
