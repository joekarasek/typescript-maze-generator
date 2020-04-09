import React, { useState } from 'react';
import SquareMaze from './lib/squareMaze';
import SquareMazeView from './components/SquareMazeView';
import './App.css';

const newMaze = new SquareMaze(30,30);

function App() {
  const [ renderMethod, setRenderMethod ] = useState('binary tree');
  const [ mazeRenderData, setMazeRenderData ] = useState(newMaze.getRenderData());
    const handleMethodSelect = (method: string) => {
        newMaze.buildPaths('reset');
        newMaze.clearAllLabels();
        newMaze.clearAllPathWeights();
        newMaze.buildPaths(method);
        setRenderMethod(method);
        setMazeRenderData(newMaze.getRenderData());
    };
  return (
    <div className="App">
      <header className="App-header">
        <SquareMazeView renderData={mazeRenderData} />
          <div className="buttons">
              <button onClick={() => handleMethodSelect('Aldous Broder')}>Aldous Broder</button>
              <button onClick={() => handleMethodSelect('binary tree')}>Binary Tree</button>
              <button onClick={() => handleMethodSelect('side winder')}>Side Winder</button>
              <button onClick={() => handleMethodSelect('hunt and kill')}>Hunt and Kill</button>
              <button onClick={() => handleMethodSelect('recursive backtracker')}>Recursive Backtracker</button>
              <button onClick={() => handleMethodSelect('reset')}>Clear</button>
          </div>
          <div className="buttons">
              <button onClick={() => {
                  newMaze.clearAllLabels();
                  newMaze.findLongestPath();
                  setMazeRenderData(newMaze.getRenderData());
              }} >Find Longest Path</button>
          </div>
      </header>
    </div>
  );
}

export default App;
