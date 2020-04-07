import Cell, { CellRenderData } from './cell';
import { binaryTree, aldousBroder, sideWinder } from './pathGenerators';

export default class SquareMaze {
    rows: number;
    cols: number;
    cells: Cell[][];
    maxPathWeight: number | null;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.cells = [];
        this.buildCells();
        this.setAllCellNeighbors();
        this.maxPathWeight = null;
    }

    private buildCells(): void {
        for (let i: number = 0; i < this.rows; i++) {
            this.cells.push([]);
            for (let j: number = 0; j < this.cols; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
    }

    private setAllCellNeighbors(): void {
        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                // Set's neighbors for each cell. Note: this function is subclassed to allow future modifications
                this.setSingleCellNeighbors(this.getCell(i,j));
            }
        }
    };

    private setSingleCellNeighbors(cell: Cell | null): void {
        if (!cell) return;
        const row = cell.row;
        const col = cell.col;

        cell.addNeighbor(this.getCell(row-1, col), 'north');
        cell.addNeighbor(this.getCell(row, col-1), 'west');
        cell.addNeighbor(this.getCell(row+1, col), 'south');
        cell.addNeighbor(this.getCell(row, col+1), 'east');
    }

    getCell(row: number, col: number): Cell | null {
        return (this.cells[row] && this.cells[row][col]) || null;
    }

    sample(): Cell | null {
        const randomRow: number = Math.floor((Math.random() * this.rows));
        const randomCol: number = Math.floor((Math.random() * this.cols));
        return this.getCell(randomRow, randomCol);
    };

    getRow(row: number): Cell[] | null {
        return this.cells[row] || null;
    };

    getAll(): Cell[] {
        return this.cells.flatMap(cell => cell);
    };

    size(): number {
        return this.getAll().length;
    };

    getRenderData(): CellRenderData[][] {
        return this.cells.map(RowOfCells => RowOfCells.map( cell => cell.getCellRenderData()));
    }

    buildPaths(method: string) {
        switch(method) {
            case 'Aldous Broder':
                aldousBroder(this);
                break;
            case 'side winder':
                sideWinder(this);
                break;
            case 'binary tree':
            default:
                binaryTree(this);
                break;
        }
    }

    // clearDistance = function() {
    //     for (i=0; i<this.rows; i++) {
    //         for (j=0; j<this.cols; j++) {
    //             this.cells[i][j].distance = null;
    //         }
    //     }
    // };

    setDijkstra(rootCell: Cell | null): void {
        if (!rootCell) return;
        rootCell.pathWeight = 0;
        let frontier: Cell[] = [rootCell];
        let newMaxWeight = 0;

        while (frontier.length > 0) {
            let newFrontier: Cell[] = [];

            frontier.forEach((cell) => {
                cell.links.forEach((linkedCell) => {
                    if (linkedCell.pathWeight === null) {
                        // @ts-ignore
                        let newFrontierWeight: number = cell.pathWeight + 1;
                        linkedCell.pathWeight = newFrontierWeight;
                        newFrontier.push(linkedCell);
                        newMaxWeight = newFrontierWeight;
                    }
                });
            });
            frontier = newFrontier;
        }
        this.maxPathWeight = newMaxWeight;
    };
}

// // Start: Distance/Dijkstra
//
// Grid.prototype.clearDistance = function() {
//     for (i=0; i<this.rows; i++) {
//         for (j=0; j<this.cols; j++) {
//             this.cells[i][j].distance = null;
//         }
//     }
// };
//
// Grid.prototype.setDijkstra = function(rootCell) {
//     rootCell.distance = 0;
//     var frontier = [rootCell];
//     var maxDistance = 0;
//
//     while (frontier.length > 0) {
//         var newFrontier = [];
//
//         frontier.forEach(function(cell) {
//             cell.links.forEach(function(linkedCell) {
//                 if (linkedCell.distance === null) {
//                     linkedCell.distance = cell.distance + 1;
//                     newFrontier.push(linkedCell);
//                 }
//             });
//             maxDistance = frontier[0].distance;
//         });
//         frontier = newFrontier;
//     }
//     this.maxDistance = maxDistance;
// };
//
// exports.Grid = Grid;