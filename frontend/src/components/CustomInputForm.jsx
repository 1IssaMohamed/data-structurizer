import React, { useState } from 'react';

const CustomInputForm = ({ algorithm, onSubmit, onBack }) => {
  const [values, setValues] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [pendingArgs, setPendingArgs] = useState(null);
  const [parseError, setParseError] = useState(null);

  const parseValue = (param, raw) => {
    if (param.type === 'array') {
      return raw.split(',').map(s => {
        const trimmed = s.trim();
        if (trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'none') return null;
        const n = Number(trimmed);
        if (isNaN(n)) return trimmed;
        return n;
      });
    }
    if (param.type === 'integer') {
      const n = parseInt(raw, 10);
      if (isNaN(n)) throw new Error(`"${raw}" is not a valid integer.`);
      return n;
    }
    return raw;
  };

  const isSorted = arr => arr.every((v, i) => i === 0 || v >= arr[i - 1]);

  const handleSubmit = e => {
    e.preventDefault();
    setParseError(null);
    try {
      const args = algorithm.params.map(p => parseValue(p, values[p.name] || ''));
      const arrayIndex = algorithm.params.findIndex(p => p.type === 'array');
      if (arrayIndex !== -1 && !isSorted(args[arrayIndex])) {
        setPendingArgs(args);
        setShowWarning(true);
        return;
      }
      onSubmit(args);
    } catch (err) {
      setParseError(err.message);
    }
  };

  return (
    <div className="screen-container">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="screen-header">
        <div className="breadcrumb mono">{algorithm.displayName} / Custom Input</div>
        <h1>CUSTOM INPUT</h1>
        <p className="screen-subtitle">Enter your own values and run the visualization.</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {algorithm.params.map(param => (
            <div key={param.name} className="form-field">
              <label className="form-label mono">{param.label}</label>
              {param.type === 'array' ? (
                <textarea
                  className="form-input mono"
                  rows={2}
                  placeholder={param.placeholder}
                  value={values[param.name] || ''}
                  onChange={e => setValues(v => ({ ...v, [param.name]: e.target.value }))}
                  required
                />
              ) : (
                <input
                  type="number"
                  className="form-input mono"
                  placeholder={param.placeholder}
                  value={values[param.name] || ''}
                  onChange={e => setValues(v => ({ ...v, [param.name]: e.target.value }))}
                  required
                />
              )}
              <div className="form-hint">
                {param.type === 'array' ? 'Separate values with commas. e.g. 1, 3, 5, 12' : 'Enter a single integer.'}
              </div>
            </div>
          ))}

          {parseError && <div className="form-error mono">⚠ {parseError}</div>}

          <button type="submit" className="form-submit">
            Run Visualization →
          </button>
        </form>
      </div>

      {/* Unsorted Array Warning Modal */}
      {showWarning && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-warning-badge mono">⚠ UNSORTED ARRAY</div>
            <h2 className="modal-title">Unsorted Array Detected</h2>
            <p className="modal-description">
              Binary search requires a sorted input. Running on an unsorted array will produce
              incorrect or unpredictable results — but watching <em>why</em> it breaks is a
              valuable learning exercise!
            </p>
            <div className="modal-buttons">
              <button
                className="btn-proceed"
                onClick={() => { onSubmit(pendingArgs); setShowWarning(false); }}
              >
                Proceed Anyway
              </button>
              <button className="btn-cancel" onClick={() => setShowWarning(false)}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomInputForm;
