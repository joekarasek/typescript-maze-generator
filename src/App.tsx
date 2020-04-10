import React, { useState } from 'react';
import SquareMaze from './lib/squareMaze';
import SquareMazeView from './components/SquareMazeView';
import './App.css';

let newMaze = new SquareMaze(40,40);

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
                  newMaze.drawLongestPath();
                  setMazeRenderData(newMaze.getRenderData());
              }} >Solve</button>
              <button onClick={() => {
                  newMaze.clearAllLabels();
                  newMaze.drawStartAndFinish();
                  setMazeRenderData(newMaze.getRenderData());
              }} >Clear</button>
          </div>
          <div className="buttons">
              <button onClick={() => {
                  newMaze = new SquareMaze(10, 10);
                  newMaze.buildPaths(renderMethod);
                  setMazeRenderData(newMaze.getRenderData());
              }} >10 X 10</button>
              <button onClick={() => {
                  newMaze = new SquareMaze(20, 20);
                  newMaze.buildPaths(renderMethod);
                  setMazeRenderData(newMaze.getRenderData());
              }} >20 X 20</button>
              <button onClick={() => {
                  newMaze = new SquareMaze(30, 30);
                  newMaze.buildPaths(renderMethod);
                  setMazeRenderData(newMaze.getRenderData());
              }} >30 X 30</button>
              <button onClick={() => {
                  newMaze = new SquareMaze(40, 40);
                  newMaze.buildPaths(renderMethod);
                  setMazeRenderData(newMaze.getRenderData());
              }} >40 X 40</button>
          </div>
      </header>
    </div>
  );
}

export default App;
