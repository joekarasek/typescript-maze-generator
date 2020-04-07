import Cell from './cell';

export const binaryTree = (cells: Cell[]) => {
    cells.forEach(function(cell) {
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