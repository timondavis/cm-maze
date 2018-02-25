import {MazeCoordinates} from "../MazeCoordinates/MazeCoordinates";

/**
 * @TODO THESE SHOULD BE SINGLETONS - THIS CLASS AND ITS CHILDREN
 */
export abstract class CardinalityBehavior {

    abstract getNextCoordinates( currentCoordinates: MazeCoordinates, exitPosition: number): MazeCoordinates;
    abstract getCardinality() : number;

    /**
     * Ensure the indicated position is valid given this coordinates cardinality
     *
     * Time Complexity: O(1)
     * Space Complexity: 0
     *
     * @param {number} position
     */
    public validatePosition( position: number ) {

        if ( position < 0 || position >= this.getCardinality() ){

            throw( "Indicated position supplied to coordinate is outside of the valid range of its cardinality" );
        }
    }

    /**
     * Given that each 'point' of cardinality has an opposite point (as long as there is more than one),
     * this function returns the opposing point to the given point.  For instance, on a 4 point cardinality, you'll
     * have points 0 - 3 (4 points in all).  0 is north, 1 east, 2 south, 3 west.  In this case, the opposite of 0 is 2.
     * The opposite of 3 is 1.
     *
     * By default, the base class provides an algorithm to find the diametrically opposed point given an even number
     * of points on a 2d plane.:w
     *
     * Time Complexity: O(point), let point = @param point
     *
     * @param {number} point  The point to test against
     * @return {number}
     */
     public getOpposingPoint( point: number ): number {

        /* @TODO Can't math do this...? */
        for ( let i = 0 ; i < this.getCardinality() / 2; i++ ){
            point -= 1;

            if ( point < 0 ) {

               point = this.getCardinality() - 1;
            }
        }

        return point;
    }

    /**
     * Generate a new Maze Coordinate at the indicated position (leave empty for default position)
     * @returns {MazeCoordinates}
     */
    public abstract generateCoordinates( position? : number[]) : MazeCoordinates;
}
