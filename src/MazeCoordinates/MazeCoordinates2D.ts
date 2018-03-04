import {MazeCoordinates} from "./MazeCoordinates";

/**
 * Quick reference for X and Y indexes in MazeCoordinate positions.
 */
export enum D2D { X = 0, Y = 1 };

/**
 * @class MazeCoordinates2D
 *
 * Tracks coordinates on a 2 dimensional plane
 */
export class MazeCoordinates2D extends MazeCoordinates {

    /**
     * Get the number of dimensions belonging to this coordinate
     *
     * @returns {number}
     */
    protected getDimensionValue(): number {
        return 2;
    }
}