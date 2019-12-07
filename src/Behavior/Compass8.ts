import {Cardinality} from "./Cardinality";
import {D2D, NodeLocation2D} from "../MazeCoordinates/NodeLocation2D";
import {NodeLocation} from "../MazeCoordinates/NodeLocation";

/**
 * @enum C8
 *
 * Represents connection points on a compass rose with a cardinality of 8.  Ordered clockwise starting at north position.
 * N = 0, NW = 7.
 */
export enum C8 {
    N = 0, NORTH = 0,
    NE = 1, NORTH_EAST = 1,
    E = 2, EAST = 2,
    SE = 3, SOUTH_EAST = 3,
    S = 4, SOUTH = 4,
    SW = 5, SOUTH_WEST = 5,
    W = 6, WEST = 6,
    NW = 7, NORTH_WEST = 7
}

/**
 * @class Compass8
 *
 * Behavior class for 2D Maze nodes with 8 possible points connecting points.
 */
export class Compass8 extends Cardinality {

    public typeId: string = 'Compass8';

    /**
     * Get the cardinality for this behavior
     *
     * @returns {number}
     */
    getConnectionPointCount(): number { return 8; }

    /**
     * Given a NodeLocation representing a position on a 2D plane,
     * and given an intended 'exit' connection point on that plane (describing in which direction
     * we want to "move" from our current coordinates), this function will return an new NodeLocation2D instance which
     * represents the new position.
     *
     * Example: Going north from [0,0] would result in finding coordinates at position [1,0].
     *
     * @param {NodeLocation2D} currentLocation
     * @param {number} exitConnectionPoint
     * @returns {NodeLocation2D}
     * @throws Exception
     */
    getNextLocation(currentLocation: NodeLocation, exitConnectionPoint: number): NodeLocation {

        this.validateConnectionPoint( exitConnectionPoint );

        let nextLocation = new NodeLocation2D( [
            currentLocation.getAxisPoint(D2D.X),
            currentLocation.getAxisPoint(D2D.Y)
        ]);

        /* O(1) */
        switch( exitConnectionPoint ) {

            case C8.NORTH : {
                nextLocation.adjustAxisPoint(D2D.Y, -1);
                break;
            }

            case C8.NORTH_EAST : {
                nextLocation
                    .adjustAxisPoint(D2D.X, 1)
                    .adjustAxisPoint(D2D.Y, -1);
                break;
            }

            case C8.EAST : {
                nextLocation.adjustAxisPoint(D2D.X, 1);
                break;
            }

            case C8.SOUTH_EAST : {
                nextLocation
                    .adjustAxisPoint(D2D.X, 1)
                    .adjustAxisPoint(D2D.Y, 1);
                break;
            }

            case C8.SOUTH : {

                nextLocation.adjustAxisPoint(D2D.Y, 1);
                break;
            }

            case C8.SOUTH_WEST : {
                nextLocation
                    .adjustAxisPoint(D2D.X, -1)
                    .adjustAxisPoint(D2D.Y, 1);
                break;
            }

            case C8.WEST : {
                nextLocation.adjustAxisPoint(D2D.X, -1);
                break;
            }

            case C8.NORTH_WEST : {
                nextLocation
                    .adjustAxisPoint(D2D.X, -1)
                    .adjustAxisPoint(D2D.Y, -1);
                break;
            }

            default: { throw( "Indicated connecting point is out of range" ); }
        }

        return nextLocation;
    }

    /**
     * Generate a new NodeLocation at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as NodeLocation2D.
     *
     * @returns {NodeLocation}
     */
    generateNodeLocation(position?: number[]): NodeLocation {

        return ( position ) ? new NodeLocation2D( position ) : new NodeLocation2D( [0,0] );
    }
}
