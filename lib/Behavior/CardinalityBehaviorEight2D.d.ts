import { CardinalityBehavior } from "./CardinalityBehavior";
import { MazeCoordinates2D } from "../MazeCoordinates/MazeCoordinates2D";
import { MazeCoordinates } from "../MazeCoordinates/MazeCoordinates";
export declare enum CB8_CARD {
    N = 0,
    NORTH = 0,
    NE = 1,
    NORTH_EAST = 1,
    E = 2,
    EAST = 2,
    SE = 3,
    SOUTH_EAST = 3,
    S = 4,
    SOUTH = 4,
    SW = 5,
    SOUTH_WEST = 5,
    W = 6,
    WEST = 6,
    NW = 7,
    NORTH_WEST = 7,
}
export declare class CardinalityBehaviorEight2D extends CardinalityBehavior {
    /**
     * Get the cardinality for this behavior
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @returns {number}
     */
    getCardinality(): number;
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
    getNextCoordinates(currentCoordinates: MazeCoordinates2D, exitPosition: number): MazeCoordinates2D;
    /**
     * Generate a new Maze Coordinate at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as MazeCoordinates2D.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @returns {MazeCoordinates}
     */
    generateCoordinates(position?: number[]): MazeCoordinates;
}
