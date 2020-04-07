import React from 'react';
import Cell from './lib/cell';
import './App.css';

function App() {
  const newCell = new Cell(1,1);
  const secondCell = new Cell(2,2);
  newCell.addNeighbor(secondCell, "north");
  newCell.link(newCell.neighbors.north);
  console.log({newCell, secondCell});
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
