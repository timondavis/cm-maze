import {CardinalityBehavior} from "./CardinalityBehavior";
import {D2D, MazeCoordinates2D} from "../MazeCoordinates/MazeCoordinates2D";
import {MazeCoordinates} from "../MazeCoordinates/MazeCoordinates";

/**
 * @enum CB4_CARD
 *
 * Represents cardinality points (compass ponints) on a 4 directional 2D plane.
 */
export enum CB4_CARD {
   N = 0, NORTH = 0,
   E = 1, EAST = 1,
   S = 2, SOUTH = 2,
   W = 3, WEST = 3
}

/**
 * @class CardinalityBehaviorFour2D
 *
 * Provides behavioral logic and services for working with 4 cardinality points on a 2d plane
 */
export class CardinalityBehaviorFour2D extends CardinalityBehavior {

    /**
     * Get the cardinality for this behavior
     *
     * Time Complexity: O(1)
     * Space Complexity: -
     *
     * @returns {number}
     */
    getCardinality(): number { return 4; }

    /**
     * Given a position on a 2D plane, and given an intended 'exit' point of cardinality (describing in which direction
     * we want to "move" from our current coordinates), this function will return an new MazeCoordinates2D object which
     * represents the theoretical coordinates for the space you would move to.
     *
     * Example: Going north from [0,0] would result in finding coordinates at position [1,0].
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @param {MazeCoordinates2D} currentCoordinates
     * @param {number} exitPosition
     * @returns {MazeCoordinates2D}
     * @throws Exception
     */
    getNextCoordinates(currentCoordinates: MazeCoordinates2D, exitPosition: number): MazeCoordinates2D {

        /* O(1) */
        this.validatePosition( exitPosition );

        /* O(1) */
        let nextCoordinates = new MazeCoordinates2D( [

            currentCoordinates.getDimension( 0 ),
            currentCoordinates.getDimension( 1 )
        ]);

        /* O(1) */
        switch( exitPosition ) {

            case CB4_CARD.NORTH : { nextCoordinates.adjustDimension( D2D.Y, - 1 ); break; }
            case CB4_CARD.EAST : { nextCoordinates.adjustDimension( D2D.X, 1 ); break; }
            case CB4_CARD.SOUTH: { nextCoordinates.adjustDimension( D2D.Y,  1 ); break; }
            case CB4_CARD.WEST: { nextCoordinates.adjustDimension( D2D.X, -1 ); break; }
            default:  throw( "Indicated exit position is out of range" );
        }

        return nextCoordinates;
    }

    /**
     * Generate a new Maze Coordinate at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as MazeCoordinates2D.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @returns {MazeCoordinates}
     */
    generateCoordinates(position?: number[]): MazeCoordinates {

        return ( position ) ? new MazeCoordinates2D( position ) : new MazeCoordinates2D( [0,0] );
    }
}