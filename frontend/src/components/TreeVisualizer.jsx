import React from 'react';
import QueueVisualizer from './QueueVisualizer';

const TreeVisualizer = ({ frames, currentIndex, previousLocals, treeVar = "tree", cursorVar = "curr_idx", queueVar = "queue" }) => {
  const locals = frames[currentIndex]?.locals || {};
  const prevLocals = previousLocals || {};
  
  const tree = locals[treeVar] || [];
  const cursor = locals[cursorVar];
  const prevCursor = prevLocals[cursorVar];
  
  const cursorMoved = cursor !== prevCursor;

  // Calculate number of levels needed based on array length
  const levels = Math.max(1, Math.ceil(Math.log2(tree.length + 1)));

  // Canvas dimensions
  const W = 600;
  const H = Math.max(300, levels * 80);

  // Helper to get coordinates of a node by index
  const getNodePos = (index) => {
    const level = Math.floor(Math.log2(index + 1));
    const nodesInLevel = Math.pow(2, level);
    const positionInLevel = index - (nodesInLevel - 1);
    
    // Vertical spacing
    const y = (level + 0.5) * (H / levels);
    
    // Horizontal spacing
    const segmentWidth = W / nodesInLevel;
    const x = (positionInLevel + 0.5) * segmentWidth;
    
    return { x, y };
  };

  return (
    <div className="graph-container">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="graph-svg" style={{ display: 'block' }}>
        {/* Draw Edges first */}
        {tree.map((val, idx) => {
          if (val === null || val === undefined) return null;
          
          const leftChildIdx = 2 * idx + 1;
          const rightChildIdx = 2 * idx + 2;
          const { x: x1, y: y1 } = getNodePos(idx);

          return (
            <React.Fragment key={`edges-${idx}`}>
              {leftChildIdx < tree.length && tree[leftChildIdx] !== null && tree[leftChildIdx] !== undefined && (
                <line 
                  x1={x1} y1={y1} 
                  x2={getNodePos(leftChildIdx).x} y2={getNodePos(leftChildIdx).y} 
                  stroke="#000" strokeWidth={3} 
                />
              )}
              {rightChildIdx < tree.length && tree[rightChildIdx] !== null && tree[rightChildIdx] !== undefined && (
                <line 
                  x1={x1} y1={y1} 
                  x2={getNodePos(rightChildIdx).x} y2={getNodePos(rightChildIdx).y} 
                  stroke="#000" strokeWidth={3} 
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Draw Nodes */}
        {tree.map((val, idx) => {
          // If the array explicitly has None padding, we can skip rendering the node itself, 
          // or render it as an empty dashed circle if we want to show tree shape. Let's just skip it for clarity,
          // or maybe show a subtle dot. Let's just skip drawing empty nodes to avoid clutter.
          if (val === null || val === undefined) return null;

          const { x, y } = getNodePos(idx);
          const isCurrent = idx === cursor;
          const justMovedHere = isCurrent && cursorMoved;

          let fillClass = "graph-node-unvisited";
          if (isCurrent) fillClass = "graph-node-current";

          return (
            <g key={idx} className={`graph-node-group ${justMovedHere ? 'node-pulse' : ''}`}>
              {isCurrent && (
                <text x={x} y={y - 35} textAnchor="middle" className="tree-pointer mono">
                  CURR↓
                </text>
              )}
              <circle 
                cx={x} cy={y} r={24} 
                className={`graph-circle ${fillClass}`}
              />
              <text 
                x={x} y={y} 
                textAnchor="middle" 
                dominantBaseline="central" 
                className="graph-text mono"
              >
                {val}
              </text>
              {/* Subtle index */}
              <text x={x + 30} y={y + 15} fontSize="10" fill="#888" className="mono">
                [{idx}]
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Sub-structures */}
      {locals[queueVar] && (
        <div style={{ marginTop: '20px', width: '100%' }}>
          <h3 className="mono" style={{ textAlign: 'center' }}>BFS QUEUE</h3>
          <QueueVisualizer frames={frames} currentIndex={currentIndex} previousLocals={previousLocals} queueVar={queueVar} />
        </div>
      )}
    </div>
  );
};

export default TreeVisualizer;
