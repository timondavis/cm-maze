import {CardinalityBehavior} from "./CardinalityBehavior";
import {D2D, MazeCoordinates2D} from "../MazeCoordinates/MazeCoordinates2D";
import {MazeCoordinates} from "../MazeCoordinates/MazeCoordinates";

export enum CB4_CARD {
   N = 0, NORTH = 0,
   E = 1, EAST = 1,
   S = 2, SOUTH = 2,
   W = 3, WEST = 3
}

export class CardinalityBehaviorFour2D extends CardinalityBehavior {

    getCardinality(): number { return 4; }

    getNextCoordinates(currentCoordinates: MazeCoordinates2D, exitPosition: number): MazeCoordinates2D {

        this.validatePosition( exitPosition );

        let nextCoordinates = new MazeCoordinates2D( [

            currentCoordinates.getDimension( 0 ),
            currentCoordinates.getDimension( 1 )
        ]);

        switch( exitPosition ) {

            case CB4_CARD.NORTH : { nextCoordinates.adjustDimension( D2D.Y, - 1 ); break; }
            case CB4_CARD.EAST : { nextCoordinates.adjustDimension( D2D.X, 1 ); break; }
            case CB4_CARD.SOUTH: { nextCoordinates.adjustDimension( D2D.Y,  1 ); break; }
            case CB4_CARD.WEST: { nextCoordinates.adjustDimension( D2D.X, -1 ); break; }
            default:  throw( "Indicated exit position is out of range" );
        }

        return nextCoordinates;
    }

    generateCoordinates(position?: number[]): MazeCoordinates {

        return ( position ) ? new MazeCoordinates2D( position ) : new MazeCoordinates2D( [0,0] );
    }
}