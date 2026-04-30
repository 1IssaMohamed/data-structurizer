import React from 'react';

const StackVisualizer = ({ frames, currentIndex, previousLocals, stackVar = "stack" }) => {
  const locals = frames[currentIndex]?.locals || {};
  const stack = locals[stackVar] || [];
  const prevStack = previousLocals?.[stackVar] || [];

  // Check if the stack changed (element pushed or popped)
  const isChanged = stack.length !== prevStack.length || 
                    stack[stack.length - 1] !== prevStack[prevStack.length - 1];

  return (
    <div className="stack-container">
      {stack.map((val, idx) => {
        const isTop = idx === stack.length - 1;
        const highlight = isTop && isChanged;
        
        return (
          <div key={idx} className={`stack-node mono ${highlight ? 'pointer-changed' : ''}`}>
            {val}
            {isTop && <span className="stack-top-label mono">TOP→</span>}
          </div>
        );
      }).reverse() /* Reverse to show top of stack at the top of the screen */}
      <div className="stack-base mono">STACK BASE</div>
    </div>
  );
};

export default StackVisualizer;
