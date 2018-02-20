export declare abstract class MazeCoordinates {
    protected dimensions: number;
    position: number[];
    /**
     * Create a new MazeCoordinate, indicating its position
     * @param {number[]} position
     */
    constructor(position?: number[]);
    /**
     * Update the position on this coordinate
     *
     * @param {number[]} position
     * @returns {MazeCoordinates}
     */
    updatePosition(position: number[]): MazeCoordinates;
    /**
     * Update a dimensional value of the coordinate's position
     * @param {number} index
     * @param {number} value
     * @returns {MazeCoordinates}
     */
    updateDimension(index: number, value: number): MazeCoordinates;
    /**
     * Adjust the indicated dimension on the coordinate position.  Changes by amount indicated.
     *
     * @param {number} index
     * @param {number} amount
     * @returns {MazeCoordinates}
     */
    adjustDimension(index: number, amount: number): MazeCoordinates;
    /**
     * Get this value at the given index (index represents dimension)
     *
     * @param {number} index
     * @returns {number}
     */
    getDimension(index: number): number;
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
    protected abstract getDimensionValue(): number;
    private validateDimensions();
}
