import React from 'react';
import SquareMaze from './lib/squareMaze';
import './App.css';

function App() {
  const newMaze = new SquareMaze(10,10);
  console.log(newMaze);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
