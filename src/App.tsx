import React, { useState } from 'react';
import SquareMaze from './lib/squareMaze';
import SquareMazeView from './components/SquareMazeView';
import './App.css';

function App() {
  const [ renderMethod, setRenderMethod ] = useState('binary tree');
  const newMaze = new SquareMaze(30,30);
  newMaze.buildPaths(renderMethod);
  const topLeftCell = newMaze.getCell(0, 0);
  const bottomRightCell = newMaze.getCell(29, 29);
  newMaze.findPath(topLeftCell, bottomRightCell);
  // newMaze.setDijkstra(topLeftCell);
  return (
    <div className="App">
      <header className="App-header">
        <SquareMazeView renderData={newMaze.getRenderData()} />
          <div className="buttons">
              <button onClick={() => setRenderMethod('Aldous Broder')}>Aldous Broder</button>
              <button onClick={() => setRenderMethod('binary tree')}>Binary Tree</button>
              <button onClick={() => setRenderMethod('side winder')}>Side Winder</button>
          </div>
      </header>
    </div>
  );
}

export default App;
