import Cell from './cell';
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
};

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
};

export const sideWinder = (maze: SquareMaze, param: number = 0.5) => {
    maze.cells.forEach((row: Cell[] ) => {
        let run: Cell[] = [];

        row.forEach(function(cell) {
            run.push(cell);

            let atEasternEdge = (cell.neighbors.east === null);
            let atNorthernEdge = (cell.neighbors.north === null);
            let shouldCloseRun = atEasternEdge || (!atNorthernEdge && Math.random() < param);

            if (shouldCloseRun) {
                let index = Math.floor(Math.random() * run.length);
                if (run[index].neighbors.north) {
                    run[index].link(run[index].neighbors.north);
                }
                run = [];
            } else {
                cell.link(cell.neighbors.east);
            }
        });
    });
};
