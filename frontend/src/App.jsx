/**
 * ==========================================================================
 * MAIN FRONTEND APPLICATION (React)
 * ==========================================================================
 * This is the "Eyes" of the application. It handles:
 * 1. User navigation (picking an algorithm).
 * 2. Talking to the Python backend to get code snapshots.
 * 3. Animating the results so you can see the algorithm in action.
 */

import React, { useState, useEffect } from 'react';
import { ALGORITHMS } from './config/algorithms';
import AlgorithmSelector from './components/AlgorithmSelector';
import ModeSelector from './components/ModeSelector';
import DemoSelector from './components/DemoSelector';
import CustomInputForm from './components/CustomInputForm';
import CodeViewer from './components/CodeViewer';

function App() {
  // --------------------------------------------------------------------------
  // 1. STATE MANAGEMENT (The Memory)
  // --------------------------------------------------------------------------
  // We use these variables to "remember" what the user is doing.

  // ── Navigation State ──
  // We use these to track which "Page" the user is on (landing, mode select, or visualizer)
  const [screen, setScreen] = useState('select');
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState(null);

  // ── Visualizer State ──
  // This is the core data for the animations!
  const [frames, setFrames] = useState([]);         // All the "snapshots" from the Python tracer
  const [currentIndex, setCurrentIndex] = useState(0); // Which snapshot are we currently looking at?
  const [loading, setLoading] = useState(false);    // Are we waiting for the Python backend?
  const [error, setError] = useState(null);         // Did something blow up?
  const [isPlaying, setIsPlaying] = useState(false); // Is the "Auto-Play" running?
  const [sourceCode, setSourceCode] = useState(''); // The text of the Python code
  const [sourceStartLine, setSourceStartLine] = useState(1); // Where the code starts (for highlighting)

  const selectedAlgorithm = ALGORITHMS.find(a => a.id === selectedAlgorithmId);

  // --------------------------------------------------------------------------
  // 2. DATA FETCHING (Talking to Python)
  // --------------------------------------------------------------------------
  // This section sends the algorithm name and your input data to the 
  // backend server and waits for the "snapshots" to come back.

  const fetchTrace = async (args, kwargs = {}) => {
    // Reset everything before we start a new run
    setLoading(true);
    setError(null);
    setFrames([]);
    setCurrentIndex(0);
    setIsPlaying(false);
    try {
      // Use the environment variable from DigitalOcean, or fallback to a relative path so Nginx can proxy it
      const apiUrl = import.meta.env.VITE_API_URL || '/trace';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ algorithm_name: selectedAlgorithmId, args, kwargs })
      });
      const resData = await response.json();
      if (resData.success) {
        // We got the data! Save the snapshots and the source code
        setFrames(resData.data.frames);
        setSourceCode(resData.source_code);
        setSourceStartLine(resData.source_start_line || 1);
      } else {
        setError(resData.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 3. PLAYBACK LOGIC (The Timer)
  // --------------------------------------------------------------------------
  // This part handles the "Play" button. It automatically moves to 
  // the next snapshot every 800 milliseconds.

  useEffect(() => {
    let interval = null;
    if (isPlaying && frames.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= frames.length - 1) { setIsPlaying(false); return prev; }
          return prev + 1;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, frames.length]);

  // --------------------------------------------------------------------------
  // 4. NAVIGATION HANDLERS
  // --------------------------------------------------------------------------
  // These functions are called when you click buttons to move 
  // between different screens.

  const handleAlgorithmSelect = id => {
    setSelectedAlgorithmId(id);
    setFrames([]);
    setError(null);
    setScreen('mode');
  };

  const handleDemoSelect = async demo => {
    setScreen('visualizer');
    await fetchTrace(demo.args);
  };

  const handleCustomSubmit = async args => {
    setScreen('visualizer');
    await fetchTrace(args);
  };

  // --------------------------------------------------------------------------
  // 5. SCREEN ROUTING (What to show?)
  // --------------------------------------------------------------------------
  // This logic decides which component to show on the screen based on the 'screen' state.

  if (screen === 'select')
    return <AlgorithmSelector algorithms={ALGORITHMS} onSelect={handleAlgorithmSelect} />;

  if (screen === 'mode')
    return (
      <ModeSelector
        algorithm={selectedAlgorithm}
        onDemo={() => setScreen('demo-select')}
        onCustom={() => setScreen('custom-input')}
        onBack={() => setScreen('select')}
      />
    );

  if (screen === 'demo-select')
    return (
      <DemoSelector
        algorithm={selectedAlgorithm}
        onSelect={handleDemoSelect}
        onBack={() => setScreen('mode')}
      />
    );

  if (screen === 'custom-input')
    return (
      <CustomInputForm
        algorithm={selectedAlgorithm}
        onSubmit={handleCustomSubmit}
        onBack={() => setScreen('mode')}
      />
    );

  // --------------------------------------------------------------------------
  // 6. THE VISUALIZER SCREEN (The Main Event)
  // --------------------------------------------------------------------------
  // This is the actual visualization page where you see the code and animations.

  const VisualizerConfig = selectedAlgorithm?.visualizer;
  const VisualizerComponent = VisualizerConfig?.component;

  const stepForward = () => { if (currentIndex < frames.length - 1) setCurrentIndex(c => c + 1); };
  const stepBack    = () => { if (currentIndex > 0) setCurrentIndex(c => c - 1); };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
        <h1 style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>ALGORITHM VISUALIZER</h1>
        <span className="mono" style={{ fontSize: '16px', color: '#555' }}>
          {selectedAlgorithm?.displayName}
        </span>
      </div>
      <div style={{ borderBottom: '2px solid #000', marginBottom: '28px' }} />

      {error && (
        <div style={{ color: 'red', border: '2px solid red', padding: '10px', marginBottom: '16px' }}>
          ERROR: {error}
        </div>
      )}

      {/* Controls */}
      <div className="controls-bar">
        <button className="back-btn" onClick={() => setScreen('mode')} style={{ marginBottom: 0 }}>
          ← Back
        </button>
        <button onClick={() => { setCurrentIndex(0); setIsPlaying(false); }} disabled={loading || isPlaying}>Reset</button>
        <button onClick={stepBack} disabled={loading || isPlaying || currentIndex === 0}>Step Back</button>
        <button onClick={() => setIsPlaying(!isPlaying)} disabled={loading || frames.length === 0}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={stepForward} disabled={loading || isPlaying || currentIndex >= frames.length - 1}>
          Step Forward
        </button>
        <span className="frame-counter mono">
          FRAME: {frames.length > 0 ? currentIndex + 1 : 0} / {frames.length}
        </span>
      </div>

      {loading && <div className="mono" style={{ marginBottom: '20px' }}>RUNNING PYTHON TRACER...</div>}

      {!loading && !error && VisualizerComponent && frames.length > 0 && (
        <div className="main-layout">
          <div className="visualizer-section">
            <VisualizerComponent
              frames={frames}
              currentIndex={currentIndex}
              previousLocals={currentIndex > 0 ? frames[currentIndex - 1]?.locals : {}}
              {...VisualizerConfig.props}
            />
          </div>
          <CodeViewer
            sourceCode={sourceCode}
            currentLine={frames[currentIndex]?.line}
            sourceStartLine={sourceStartLine}
            locals={frames[currentIndex]?.locals}
            previousLocals={currentIndex > 0 ? frames[currentIndex - 1]?.locals : {}}
          />
        </div>
      )}
    </div>
  );
}

export default App;
