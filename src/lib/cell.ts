type RelationshipPossibilities = "north" | "south" | "east" | "west";

export interface CellRenderData {
    hasNorthWall: boolean;
    hasSouthWall: boolean;
    hasEastWall: boolean;
    hasWestWall: boolean;
    pathWeight: number | null;
    label: string;
}

export default class Cell {
    row: number;
    col: number;
    links: Cell[];
    neighbors: {
        north: null | Cell,
        east: null | Cell,
        west: null | Cell,
        south: null | Cell
    };
    pathWeight: number | null;
    label: string;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.links = [];
        this.neighbors = {
            north: null,
            east: null,
            west: null,
            south: null
        };
        this.pathWeight = null;
        this.label = '';
    }

    addNeighbor(cell: Cell | null, relation: RelationshipPossibilities): void {
        this.neighbors[relation] = cell;
    }

    getUnvisitedNeighbors(): Cell[] {
        const unvisitedNeighbors = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (let [position, cell] of Object.entries(this.neighbors)) {
            if (cell && cell?.links.length === 0) {
                unvisitedNeighbors.push(cell);
            }
        }
        return unvisitedNeighbors;
    }

    link(cell: Cell | null): void {
        if (cell && this.links.indexOf(cell) === -1) {
            this.links.push(cell);
            cell.link(this);
        }
    }

    unlink(cell: Cell): void {
        const indexOfCell: number = this.links.indexOf(cell);
        if (indexOfCell >= 0) {
            this.links.splice(indexOfCell, 1);
            cell.unlink(this);
        }
    }

    isLinked(queryCell: Cell | null): boolean {
        if (queryCell) {
            return this.links.indexOf(queryCell) !== -1;
        }
        return false;
    }

    // @todo refactor, as this assumes there is a neighborCell to sample and could loop forever if no neighbors are set
    sampleNeighbor(): Cell | null {
        const keys: RelationshipPossibilities[] = ['north','east','south','west'];
        let index: number = -1;
        do {
            index = Math.floor(Math.random() * 4);
        } while (!this.neighbors[keys[index]]);
        return this.neighbors[keys[index]];
    }

    getCellRenderData(): CellRenderData {
        return {
            hasSouthWall: !this.isLinked(this.neighbors['south']),
            hasNorthWall: !this.isLinked(this.neighbors['north']),
            hasEastWall: !this.isLinked(this.neighbors['east']),
            hasWestWall: !this.isLinked(this.neighbors['west']),
            pathWeight: this.pathWeight,
            label: this.label,
        }
    }
}
