import React, {ReactElement} from 'react';
import classNames from 'classnames';
import { CellWalls } from '../lib/cell';

interface SquareMazeViewProps {
    renderData: CellWalls[][];
}

export default function SquareMazeView({renderData}: SquareMazeViewProps): ReactElement {
    return (
        <div className="square-maze">
            {renderData.map(row =>(
                <div className="square-maze__row">
                    {row.map(cell => {
                        const classes = classNames("square-maze__cell", {
                            "square-maze__cell--has-north-wall": cell.hasNorthWall,
                            "square-maze__cell--has-south-wall": cell.hasSouthWall,
                            "square-maze__cell--has-east-wall": cell.hasEastWall,
                            "square-maze__cell--has-west-wall": cell.hasWestWall,
                        });
                        return <div className={classes} />
                    })}
                </div>
            ))}
        </div>
    );
}

SquareMazeView.propTypes = {};
