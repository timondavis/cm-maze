import {Cardinality} from "./Cardinality";
import {D2D, NodeLocation2D} from "../MazeCoordinates/NodeLocation2D";
import {NodeLocation} from "../MazeCoordinates/NodeLocation";

/**
 * @enum C4
 *
 * Represents cardinality points (compass ponints) on a 4 directional 2D plane.
 */
export enum C4 {
   N = 0, NORTH = 0,
   E = 1, EAST = 1,
   S = 2, SOUTH = 2,
   W = 3, WEST = 3
}

/**
 * @class Compass4
 *
 * Provides behavioral logic and services for working with objects, spacially oriented with a compass
 * rose having 4 cardinal points
 */
export class Compass4 extends Cardinality {

    public constructor() {
        super('Compass4');
    }

    /**
     * Get the # of connection points attached to this cardinality
     *
     * @returns {number}
     */
    getConnectionPointCount(): number { return 4; }

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

        this.validateConnectionPoint(exitConnectionPoint);

        let nextLocation = new NodeLocation2D( [

            currentLocation.getAxisPoint(0),
            currentLocation.getAxisPoint(1)
        ]);

        switch( exitConnectionPoint ) {

            case C4.NORTH : { nextLocation.adjustAxisPoint(D2D.Y, -1); break; }
            case C4.EAST : { nextLocation.adjustAxisPoint(D2D.X, 1); break; }
            case C4.SOUTH: { nextLocation.adjustAxisPoint(D2D.Y, 1); break; }
            case C4.WEST: { nextLocation.adjustAxisPoint(D2D.X, -1); break; }
            default:  throw( "Indicated exit position is out of range" );
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
