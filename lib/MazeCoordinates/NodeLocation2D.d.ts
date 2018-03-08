import { NodeLocation } from "./NodeLocation";
/**
 * Quick reference for X and Y indexes in MazeCoordinate positions.
 */
export declare enum D2D {
    X = 0,
    Y = 1,
}
/**
 * @class NodeLocation2D
 *
 * Tracks coordinates on a 2 dimensional plane
 */
export declare class NodeLocation2D extends NodeLocation {
    /**
     * Get the number of dimensions belonging to this coordinate
     *
     * @returns {number}
     */
    protected getDimensionValue(): number;
}
