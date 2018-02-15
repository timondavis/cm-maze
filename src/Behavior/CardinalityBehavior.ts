import {MazeCoordinates} from "../MazeCoordinates/MazeCoordinates";

export abstract class CardinalityBehavior {

    abstract getNextCoordinates( currentCoordinates: MazeCoordinates, exitPosition: number): MazeCoordinates;
    abstract getCardinality() : number;

    /**
     * Ensure the indicated position is valid given this coordinates cardinality
     * @param {number} position
     */
    protected validatePosition( position: number ) {

        if ( position < 0 || position >= this.getCardinality() ){

            throw( "Indicated position supplied to coordinate is outside of the valid range of its cardinality" );
        }
    }

    /**
     * Generate a new Maze Coordinate at the indicated position (leave empty for default position)
     * @returns {MazeCoordinates}
     */
    public abstract generateCoordinates( position? : number[]) : MazeCoordinates;
}
