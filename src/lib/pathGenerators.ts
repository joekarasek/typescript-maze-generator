import SquareMaze from './squareMaze';

export const binaryTree = (maze: SquareMaze) => {
    maze.getAll().forEach(function(cell) {
        const choices = [];
        if (cell.neighbors.north) {
            choices.push(cell.neighbors.north);
        }
        if (cell.neighbors.east) {
            choices.push(cell.neighbors.east);
        }

        if (choices.length>0) {
            const choice = choices[ Math.floor((Math.random() * choices.length)) ];
            cell.link(choice);
        }

    });
}

export const aldousBroder = (maze: SquareMaze) => {
    let cell = maze.sample();
    let unvisitedCells = maze.size() - 1;
    let computationalSteps = 1;

    while (unvisitedCells > 0 && computationalSteps < 25000) {
        let neighbor = cell && cell.sampleNeighbor();

        if (neighbor && neighbor.links.length === 0) {
            // @ts-ignore
            cell.link(neighbor);
            unvisitedCells--;
        }

        cell = neighbor;
        computationalSteps ++;
    }

    console.log(`Aldous Broder maze generation visited ${computationalSteps} cells before visiting all cells and completing`);
}