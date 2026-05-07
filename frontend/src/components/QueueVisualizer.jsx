import React from 'react';

const QueueVisualizer = ({ frames, currentIndex, previousLocals, queueVar = "queue", headVar = "head", tailVar = "tail" }) => {
  const locals = frames[currentIndex]?.locals || {};
  const prevLocals = previousLocals || {};
  
  const queue = locals[queueVar] || [];
  
  const head = locals[headVar] !== undefined ? locals[headVar] : 0;
  const tail = locals[tailVar] !== undefined ? locals[tailVar] : queue.length;
  
  const prevHead = prevLocals[headVar] !== undefined ? prevLocals[headVar] : 0;
  const prevTail = prevLocals[tailVar] !== undefined ? prevLocals[tailVar] : (prevLocals[queueVar]?.length || 0);

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
    <div className="queue-container">
      <div className="queue-tube">
        {queue.map((val, idx) => {
          // It's in the queue if idx >= head and idx < tail
          const inQueue = idx >= head && idx < tail;
          const isJustAdded = idx === tail - 1 && tail !== prevTail;
          const isJustRemoved = idx === head - 1 && head !== prevHead;
          
          let classes = "queue-node mono";
          if (inQueue) classes += " in-queue";
          if (isJustAdded) classes += " pointer-changed"; // New element pop
          if (isJustRemoved) classes += " just-removed";  // Show it fading out

          return (
            <div key={idx} className="queue-node-wrapper">
              {idx === head && <div className="queue-pointer head-pointer mono">HEAD</div>}
              {idx === tail && <div className="queue-pointer tail-pointer mono">TAIL</div>}
              
              <div className={classes}>
                {val}
              </div>
            </div>
          );
        })}
        {/* Tail pointer points just after the last element */}
        <div className="queue-node-wrapper empty-slot">
          {queue.length === tail && <div className="queue-pointer tail-pointer mono">TAIL</div>}
          <div className="queue-node mono empty-node"></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default QueueVisualizer;
