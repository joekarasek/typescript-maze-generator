import Cell, { CellRenderData } from './cell';
import { binaryTree, aldousBroder, sideWinder, huntAndKill, recursiveBacktracker, clearAllPaths } from './pathGenerators';

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
    };

    buildPaths(method: string) {
        this.clearAllLabels();
        this.clearAllPathWeights();
        switch(method) {
            case 'Aldous Broder':
                aldousBroder(this);
                break;
            case 'side winder':
                sideWinder(this);
                break;
            case 'hunt and kill':
                huntAndKill(this);
                break;
            case 'recursive backtracker':
                recursiveBacktracker(this);
                break;
            case 'binary tree':
                binaryTree(this);
                break;
            case 'reset':
            default:
                clearAllPaths(this);
                break;
        }
        this.drawStartAndFinish();
    };

    clearAllPathWeights(blackList: Cell[] = []): void {
        this.cells.forEach(row => row.forEach(cell => {
            if (!blackList.includes(cell)) {
                cell.pathWeight = null
            }
        }));
    };

    clearAllLabels(blackList: Cell[] = []): void {
        this.cells.forEach(row => row.forEach(cell => cell.label = ''));
    };

    findPath(targetCell: Cell | null, starterCell: Cell | null): Cell[] | void {
        if (!targetCell || !starterCell) return;
        this.setDijkstra(targetCell);

        const breadCrumbs: Cell[] = [starterCell];
        let currentCell = starterCell;
        while (currentCell !== targetCell) {
            currentCell.links.forEach(cell => {
                // @ts-ignore
                if (cell.pathWeight < currentCell.pathWeight) {
                    breadCrumbs.push(cell);
                    currentCell = cell;
                }
            })
        }

        return breadCrumbs;
    }

    markPath(path: Cell[]) {
        this.clearAllLabels();
        path.forEach(cell => cell.label = '•');
    }

    findLongestPath(): Cell[] {
        let initialCell = this.getCell(0,0);
        this.setDijkstra(initialCell);
        // @ts-ignore
        const pathStartCell = this.getAll().reduce((previousCell, currentCell) => previousCell.pathWeight > currentCell.pathWeight ? previousCell : currentCell);
        this.clearAllPathWeights();
        this.setDijkstra(pathStartCell);
        // @ts-ignore
        const pathEndCell = this.getAll().reduce((previousCell, currentCell) => previousCell.pathWeight > currentCell.pathWeight ? previousCell : currentCell)
        return this.findPath(pathStartCell, pathEndCell) || [];
    }

    drawLongestPath(): void {
        this.markPath(this.findLongestPath());
    }

    drawStartAndFinish(): void {
        const longestPath = this.findLongestPath();
        longestPath[0].label = "S";
        longestPath[longestPath.length - 1].label = "F";
    }

    setDijkstra(rootCell: Cell | null): void {
        if (!rootCell) return;
        rootCell.pathWeight = 1;
        let frontier: Cell[] = [rootCell];
        let newMaxWeight = 1;

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
