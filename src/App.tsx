import React from 'react';
import SquareMaze from './lib/squareMaze';
import SquareMazeView from './components/SquareMazeView';
import './App.css';

function App() {
  const newMaze = new SquareMaze(20,20);
  console.log(newMaze);
  console.table(newMaze.getRenderData());
  return (
    <div className="App">
      <header className="App-header">
        <SquareMazeView renderData={newMaze.getRenderData()} />
      </header>
    </div>
  );
}

export default App;
