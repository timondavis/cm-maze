import {CardinalityBehavior} from "./CardinalityBehavior";
import {D2D, MazeCoordinates2D} from "../MazeCoordinates/MazeCoordinates2D";
import {MazeCoordinates} from "../MazeCoordinates/MazeCoordinates";

export enum CB8_CARD {
    N = 0, NORTH = 0,
    NE = 1, NORTH_EAST = 1,
    E = 2, EAST = 2,
    SE = 3, SOUTH_EAST = 3,
    S = 4, SOUTH = 4,
    SW = 5, SOUTH_WEST = 5,
    W = 6, WEST = 6,
    NW = 7, NORTH_WEST = 7
};

export class CardinalityBehaviorEight2D extends CardinalityBehavior {

    getCardinality(): number { return 8; }

    getNextCoordinates(currentCoordinates: MazeCoordinates2D, exitPosition: number): MazeCoordinates2D {

        this.validatePosition( exitPosition );

        let nextCoordinates = new MazeCoordinates2D( [
            currentCoordinates.getDimension( 0 ),
            currentCoordinates.getDimension( 1 )
        ]);

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
                nextCoordinates.adjustDimension( 1, 1 );
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
                    .adjustDimension( D2D.X, 1 )
                    .adjustDimension( D2D.Y, -1 );
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

    generateCoordinates(position?: number[]): MazeCoordinates {

        return ( position ) ? new MazeCoordinates2D( position ) : new MazeCoordinates2D( [0,0] );
    }
}