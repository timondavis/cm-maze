import { NodeLocation } from "../MazeCoordinates/NodeLocation";
/**
 * @abstract Cardinality
 *
 * Provides constraints and services which allow MazeNodes to connect to one another, and to facilitate traversal
 * between them, in a logical fashion based on the cardinality of exit points for each node.
 */
export declare abstract class Cardinality {
    readonly id: string;
    abstract getNextLocation(currentLocation: NodeLocation, exitConnectionPoint: number): NodeLocation;
    abstract getConnectionPointCount(): number;
    protected constructor(cardinalityId: any);
    /**
     * In some use cases, the most basic cardinality points are the only valid points for the operation.  Call
     * this method to 'round' the connection point up to its closest valid connection point.
     *
     * @param connectionPoint: number
     * @return number
     */
    abstract roundConnectionPointToPrimeCardinality(connectionPoint: number): any;
    /**
     * Ensure the indicated position is valid given this coordinates cardinality
     *
     * @param {number} connectionPoint
     */
    validateConnectionPoint(connectionPoint: number): void;
    /**
     * Given that each connection point has an opposite connection point (as long as there is more than one),
     * this function returns the opposing point to the given point.  For instance, on a Cardainlity with a
     * connection point count of 4, you'll have points 0 - 3 (4 points in all).
     * 0 is north, 1 east, 2 south, 3 west.  In this case, the opposite of 0 is 2. The opposite of 3 is 1.
     *
     * By default, the base class provides an algorithm to find the diametrically opposed point given an even number
     * of points on a 2D plane.
     *
     * @param {number} point  The point to test against
     * @return {number}
     */
    getOpposingConnectionPoint(point: number): number;
    /**
     * Generate a new Maze Coordinate at the indicated position (leave empty for default position)
     * @returns {NodeLocation}
     */
    abstract generateNodeLocation(position?: number[]): NodeLocation;
}
