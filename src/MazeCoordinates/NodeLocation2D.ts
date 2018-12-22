import {NodeLocation} from "./NodeLocation";

/**
 * Quick reference for X and Y indexes in MazeCoordinate positions.
 */
export enum D2D { X = 0, Y = 1 }

/**
 * @class NodeLocation2D
 *
 * Tracks coordinates on a 2 dimensional plane
 */
export class NodeLocation2D extends NodeLocation {

    /**
     * Get the number of dimensions belonging to this location
     *
     * @returns {number}
     */
    protected getDimensionValue(): number {
        return 2;
    }

    /**
     * Get the X position for the node location
     */
    public get X() : number {
        return this.getPosition()[0];
    }

    /**
     * Get the Y position for the node location
     */
    public get Y() : number {
        return this.getPosition()[1];
    }
}