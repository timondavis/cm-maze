import { Cardinality } from "./Cardinality";
import { NodeLocation } from "../MazeCoordinates/NodeLocation";
/**
 * @enum C8
 *
 * Represents connection points on a compass rose with a cardinality of 8.  Ordered clockwise starting at north position.
 * N = 0, NW = 7.
 */
export declare enum C8 {
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
    NORTH_WEST = 7
}
/**
 * @class Compass8
 *
 * Behavior class for 2D Maze nodes with 8 possible points connecting points.
 */
export declare class Compass8 extends Cardinality {
    typeId: string;
    constructor();
    /**
     * Get the cardinality for this behavior
     *
     * @returns {number}
     */
    getConnectionPointCount(): number;
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
    getNextLocation(currentLocation: NodeLocation, exitConnectionPoint: number): NodeLocation;
    /**
     * Generate a new NodeLocation at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as NodeLocation2D.
     *
     * @returns {NodeLocation}
     */
    generateNodeLocation(position?: number[]): NodeLocation;
}
