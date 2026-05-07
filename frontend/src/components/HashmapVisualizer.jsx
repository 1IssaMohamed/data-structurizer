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
      <div className="hash-calc-box mono">
        <div>
          CURRENT KEY: <br/> <span style={{fontSize: '24px', color: 'red'}}>{currentKey !== undefined ? currentKey : 'None'}</span>
        </div>
        <div style={{ marginTop: '20px' }}>
          HASH VALUE: <br/> <span style={{fontSize: '24px', color: 'red'}}>{hashVal !== undefined ? hashVal : 'None'}</span>
        </div>
      </div>
      
      <div className="bucket-list">
        {buckets.map((bucket, idx) => {
          const isTargetBucket = idx === hashVal;
          const prevBucket = prevBuckets[idx] || [];
          const bucketChanged = bucket && prevBucket && bucket.length !== prevBucket.length;
          
          return (
            <div key={idx} className="bucket-row">
              <div className="bucket-index mono">{idx}</div>
              <div className={`bucket-items ${isTargetBucket ? 'active-bucket' : ''}`}>
                {bucket === null || bucket === undefined || bucket.length === 0 ? (
                  <span className="empty-bucket mono" style={{color: '#888'}}>EMPTY</span>
                ) : (
                  bucket.map((item, i) => (
                    <div key={i} className={`hashmap-key mono ${bucketChanged && i === bucket.length - 1 ? 'pointer-changed' : ''}`}>
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
