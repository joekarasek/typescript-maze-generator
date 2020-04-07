import React, {ReactElement} from 'react';
import classNames from 'classnames';
import { CellRenderData } from '../lib/cell';

interface SquareMazeViewProps {
    renderData: CellRenderData[][];
}

export default function SquareMazeView({renderData}: SquareMazeViewProps): ReactElement {
    return (
        <div className="square-maze">
            {renderData.map((row, rowIndex) =>(
                <div key={`row-${rowIndex}`} className="square-maze__row">
                    {row.map((cell, cellIndex) => {
                        const classes = classNames("square-maze__cell", {
                            "square-maze__cell--has-north-wall": cell.hasNorthWall,
                            "square-maze__cell--has-south-wall": cell.hasSouthWall,
                            "square-maze__cell--has-east-wall": cell.hasEastWall,
                            "square-maze__cell--has-west-wall": cell.hasWestWall,
                        });
                        return (
                            <div key={`cell-${cellIndex}-${rowIndex}`} className={classes}>
                                {cell.pathWeight}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

SquareMazeView.propTypes = {};
