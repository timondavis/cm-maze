import { CardinalityBehavior } from "./CardinalityBehavior";
import { MazeCoordinates2D } from "../MazeCoordinates/MazeCoordinates2D";
import { MazeCoordinates } from "../MazeCoordinates/MazeCoordinates";
/**
 * @enum CB4_CARD
 *
 * Represents cardinality points (compass ponints) on a 4 directional 2D plane.
 */
export declare enum CB4_CARD {
    N = 0,
    NORTH = 0,
    E = 1,
    EAST = 1,
    S = 2,
    SOUTH = 2,
    W = 3,
    WEST = 3,
}
/**
 * @class Compass4
 *
 * Provides behavioral logic and services for working with 4 cardinality points on a 2d plane
 */
export declare class CardinalityBehaviorFour2D extends CardinalityBehavior {
    /**
     * Get the cardinality for this behavior
     *
     * Time Complexity: O(1)
     * Space Complexity: -
     *
     * @returns {number}
     */
    getCardinality(): number;
    /**
     * Given a position on a 2D plane, and given an intended 'exit' point of cardinality (describing in which direction
     * we want to "move" from our current coordinates), this function will return an new NodeLocation2D object which
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
     * to cast the returned result as NodeLocation2D.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @returns {MazeCoordinates}
     */
    generateCoordinates(position?: number[]): MazeCoordinates;
}
