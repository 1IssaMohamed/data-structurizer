import React from 'react';

// The backend sanitize_locals only goes one level deep, so inner bucket lists
// like [] or [10, 22] get serialized as strings '[]' or '[10, 22]'.
// This helper safely parses them back to arrays.
const parseBucket = (bucket) => {
  if (Array.isArray(bucket)) return bucket;
  if (typeof bucket === 'string') {
    try { return JSON.parse(bucket); } catch { return []; }
  }
  return [];
};

const HashmapVisualizer = ({ frames, currentIndex, previousLocals, bucketsVar = "buckets", keyVar = "current_key", hashVar = "hash_val" }) => {
  const locals = frames[currentIndex]?.locals || {};
  const prevLocals = previousLocals || {};
  
  const rawBuckets = locals[bucketsVar] || [];
  const buckets = Array.isArray(rawBuckets) ? rawBuckets.map(parseBucket) : [];
  const currentKey = locals[keyVar];
  const hashVal = locals[hashVar];
  
  const rawPrevBuckets = prevLocals[bucketsVar] || [];
  const prevBuckets = Array.isArray(rawPrevBuckets) ? rawPrevBuckets.map(parseBucket) : [];
  
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
          const bucketChanged = Array.isArray(bucket) && Array.isArray(prevBucket) && bucket.length !== prevBucket.length;
          
          return (
            <div key={idx} className="bucket-row">
              <div className="bucket-index mono">{idx}</div>
              <div className={`bucket-items ${isTargetBucket ? 'active-bucket' : ''}`}>
                {!Array.isArray(bucket) || bucket.length === 0 ? (
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
