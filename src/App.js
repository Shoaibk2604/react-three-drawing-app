// App.js
import React from 'react';
import './App.css';
import DrawingApp from './DrawingApp';
import HomePage from './DrawingApp';
import CubeHomeApp from './DrawingApp';
import CanvasDrawing from './DrawingCanvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Drawing App</h1>
      </header>
      <main>
        {/* <CanvasDrawing/> */}
        <DrawingApp />
      </main>
    </div>
  );
}

export default App;
