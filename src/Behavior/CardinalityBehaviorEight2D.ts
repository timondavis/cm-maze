import {CardinalityBehavior} from "./CardinalityBehavior";
import {D2D, MazeCoordinates2D} from "../MazeCoordinates/MazeCoordinates2D";
import {MazeCoordinates} from "../MazeCoordinates/MazeCoordinates";

/**
 * @enum CB8_CARD
 *
 * Represents cardinality point directions as named enumerations from integer values.
 */
export enum CB8_CARD {
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
 * @class CardinalityBehaviorEight2D
 *
 * Behavior class for 2D Maze nodes with 8 possible points of cardinality (exit points):w
 */
export class CardinalityBehaviorEight2D extends CardinalityBehavior {

    /**
     * Get the cardinality for this behavior
     *
     * @returns {number}
     */
    getCardinality(): number { return 8; }

    /**
     * Given a position on a 2D plane, and given an intended 'exit' point of cardinality (describing in which direction
     * we want to "move" from our current coordinates), this function will return an new MazeCoordinates2D object which
     * represents the theoretical coordinates for the space you would move to.
     *
     * Example: Going north from [0,0] would result in finding coordinates at position [1,0].
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
            currentCoordinates.getDimension( D2D.X ),
            currentCoordinates.getDimension( D2D.Y )
        ]);

        /* O(1) */
        switch( exitPosition ) {

            case CB8_CARD.NORTH : {
                nextCoordinates.adjustDimension( D2D.Y, -1 );
                break;
            }

            case CB8_CARD.NORTH_EAST : {
                nextCoordinates
                    .adjustDimension( D2D.X, 1 )
                    .adjustDimension( D2D.Y, -1 );
                break;
            }

            case CB8_CARD.EAST : {
                nextCoordinates.adjustDimension( D2D.X, 1 );
                break;
            }

            case CB8_CARD.SOUTH_EAST : {
                nextCoordinates
                    .adjustDimension( D2D.X, 1 )
                    .adjustDimension( D2D.Y, 1 );
                break;
            }

            case CB8_CARD.SOUTH : {

                nextCoordinates.adjustDimension( D2D.Y, 1 );
                break;
            }

            case CB8_CARD.SOUTH_WEST : {
                nextCoordinates
                    .adjustDimension( D2D.X, -1 )
                    .adjustDimension( D2D.Y, 1 );
                break;
            }

            case CB8_CARD.WEST : {
                nextCoordinates.adjustDimension( D2D.X, -1 );
                break;
            }

            case CB8_CARD.NORTH_WEST : {
                nextCoordinates
                    .adjustDimension( D2D.X, -1 )
                    .adjustDimension( D2D.Y, -1 );
                break;
            }

            default: { throw( "Indicated exit position is out of range" ); }
        }

        return nextCoordinates;
    }

    /**
     * Generate a new Maze Coordinate at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as MazeCoordinates2D.
     *
     * @returns {MazeCoordinates}
     */
    generateCoordinates(position?: number[]): MazeCoordinates {

        return ( position ) ? new MazeCoordinates2D( position ) : new MazeCoordinates2D( [0,0] );
    }
}