import React from 'react';

const GraphVisualizer = ({ frames, currentIndex, previousLocals, graphVar = "graph", currentVar = "current", visitedVar = "visited", queueVar = "queue", nodePositions }) => {
  const locals = frames[currentIndex]?.locals || {};
  const prevLocals = previousLocals || {};
  
  const graph = locals[graphVar] || {};
  const current = locals[currentVar];
  const visited = locals[visitedVar] || [];
  const queue = locals[queueVar] || [];
  
  const prevCurrent = prevLocals[currentVar];
  
  // Dimensions for the SVG canvas
  const W = 600;
  const H = 400;

  return (
    <div className="graph-container">
      <svg width={W} height={H} className="graph-svg">
        {/* Draw Edges first so they are behind nodes */}
        {Object.entries(graph).map(([fromNodeStr, neighbors]) => {
          const fromNode = parseInt(fromNodeStr);
          if (!nodePositions[fromNode]) return null;
          const { x: x1, y: y1 } = nodePositions[fromNode];
          
          return neighbors.map((toNode, i) => {
            if (!nodePositions[toNode]) return null;
            const { x: x2, y: y2 } = nodePositions[toNode];
            
            // To prevent double drawing undirected edges, only draw if from < to, 
            // OR if it's directed (we'll just draw all for now, SVG handles overlapping lines fine)
            return (
              <line 
                key={`${fromNode}-${toNode}-${i}`} 
                x1={x1} y1={y1} x2={x2} y2={y2} 
                stroke="var(--border-color)" 
                strokeWidth={3} 
              />
            );
          });
        })}
        
        {/* Draw Nodes */}
        {Object.keys(nodePositions).map(nodeStr => {
          const id = parseInt(nodeStr);
          const { x, y } = nodePositions[id];
          
          const isCurrent = id === current;
          const isVisited = visited.includes(id);
          const isInQueue = queue.includes(id);
          const justMovedHere = isCurrent && current !== prevCurrent;
          
          let fillClass = "graph-node-unvisited";
          if (isCurrent) fillClass = "graph-node-current";
          else if (isVisited) fillClass = "graph-node-visited";
          else if (isInQueue) fillClass = "graph-node-queued";
          
          return (
            <g key={id} className={`graph-node-group ${justMovedHere ? 'node-pulse' : ''}`}>
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
                {id}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="graph-legend mono">
        <div className="legend-item"><span className="legend-box graph-node-unvisited"></span> Unvisited</div>
        <div className="legend-item"><span className="legend-box graph-node-queued"></span> In Queue</div>
        <div className="legend-item"><span className="legend-box graph-node-current"></span> Current</div>
        <div className="legend-item"><span className="legend-box graph-node-visited"></span> Visited</div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
