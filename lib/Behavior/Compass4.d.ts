import { Cardinality } from "./Cardinality";
import { NodeLocation } from "../MazeCoordinates/NodeLocation";
/**
 * @enum C4
 *
 * Represents cardinality points (compass ponints) on a 4 directional 2D plane.
 */
export declare enum C4 {
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
 * Provides behavioral logic and services for working with objects, spacially oriented with a compass
 * rose having 4 cardinal points
 */
export declare class Compass4 extends Cardinality {
    /**
     * Get the # of connection points attached to this cardinality
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
