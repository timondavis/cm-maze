/**
 * @class NodeLocation
 *
 * Stores and facilitates mutation of the coordinates of a given point on a cartesian graph (2+ dimensions)
 */
export declare abstract class NodeLocation {
    /**
     * The number of dimensions recorded in these coordinates.
     */
    protected dimensions: number;
    /**
     * The actual position of these coordinates on a cartesian graph.
     */
    position: number[];
    /**
     * Create a new MazeCoordinate, indicating its position
     *
     * @param {number[]} position
     */
    constructor(position?: number[]);
    /**
     * Update the position on this location instance
     *
     * @param {number[]} position
     * @returns {NodeLocation}
     */
    updatePosition(position: number[]): NodeLocation;
    /**
     * Update the value of the point on the indicated dimensional axis
     *
     * @param {number} axisIndex
     * @param {number} newValue
     * @returns {NodeLocation}
     */
    updateAxisPoint(axisIndex: number, newValue: number): NodeLocation;
    /**
     * Adjust the value of the point on the indicated dimensional axis by the indicated delta
     *
     * @param {number} axisIndex
     * @param {number} pointDelta
     * @returns {NodeLocation}
     */
    adjustAxisPoint(axisIndex: number, pointDelta: number): NodeLocation;
    /**
     * Get this value at the given index (index represents dimension)
     *
     * @param {number} axisIndex
     * @returns {number}
     */
    getAxisPoint(axisIndex: number): number;
    /**
     * Get the position of this coordinate.
     * @returns {number[]}
     */
    getPosition(): number[];
    /**
     * Get the dimensions of this coordinate.  A 2 dimensional coordinate is an array with 2 elements, 3 for 3, etc.
     *
     * @returns {number}
     */
    getDimensions(): number;
    /**
     * Convert these coordinates into a string representing the values contained inside.
     * @returns {string}
     */
    toString(): string;
    /**
     * Convert an array of dimensional positions into a string that reads like the array.  Great for comparisons!
     * If executing this function on a maze coordinate instance, consider using the .toString() method, which will
     * give you the same result sourcing from the position on the coordinate.
     *
     * @param {number} dimensions
     * @param {number[]} elements
     * @returns {string}
     */
    static encodePositionArray(dimensions: number, elements: number[]): string;
    protected abstract getDimensionValue(): number;
    /**
     * Validate that the dimensions have been set on this item.  Mainly this is here to bug other developers if they
     * extend this abstract class without ensuring that the dimension value is defined as a property on the child
     * class.
     */
    private validateDimensions();
}
