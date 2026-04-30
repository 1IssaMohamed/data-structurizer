import React from 'react';

const HashmapVisualizer = ({ frames, currentIndex, previousLocals, bucketsVar = "buckets", keyVar = "current_key", hashVar = "hash_val" }) => {
  const locals = frames[currentIndex]?.locals || {};
  const prevLocals = previousLocals || {};
  
  const buckets = locals[bucketsVar] || [];
  const currentKey = locals[keyVar];
  const hashVal = locals[hashVar];
  
  const prevBuckets = prevLocals[bucketsVar] || [];
  
  return (
    <div className="hashmap-container">
      <div className="hashmap-header mono">
        <div className="hashmap-info">
          CURRENT KEY: <span className="highlight-text">{currentKey !== undefined ? currentKey : 'None'}</span>
        </div>
        <div className="hashmap-info">
          HASH VALUE: <span className="highlight-text">{hashVal !== undefined ? hashVal : 'None'}</span>
        </div>
      </div>
      
      <div className="hashmap-buckets">
        {buckets.map((bucket, idx) => {
          const isTargetBucket = idx === hashVal;
          // Check if this specific bucket changed length
          const prevBucket = prevBuckets[idx] || [];
          const bucketChanged = bucket && prevBucket && bucket.length !== prevBucket.length;
          
          return (
            <div key={idx} className={`hash-bucket-row ${isTargetBucket ? 'active-bucket' : ''}`}>
              <div className="hash-index mono">{idx}</div>
              <div className={`hash-bucket-contents ${bucketChanged ? 'pointer-changed' : ''}`}>
                {bucket === null || bucket === undefined || bucket.length === 0 ? (
                  <span className="empty-bucket mono">EMPTY</span>
                ) : (
                  bucket.map((item, i) => (
                    <div key={i} className="hash-item mono">
                      {Array.isArray(item) ? `${item[0]}: ${item[1]}` : item}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HashmapVisualizer;
