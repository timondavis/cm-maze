/**
 * @class NodeLocation
 *
 * Stores and facilitates mutation of the coordinates of a given point on a cartesian graph (2+ dimensions)
 */
export abstract class NodeLocation {

    /**
     * The number of dimensions recorded in these coordinates.
     */
    protected dimensions: number;

    /**
     * The actual position of these coordinates on a cartesian graph.
     */
    protected position: number[];

    /**
     * Create a new MazeCoordinate, indicating its position
     *
     * @param {number[]} position
     */
    public constructor(position?: number[]) {

        this.dimensions = this.getDimensionValue();
        this.validateDimensions();

        if (position !== undefined && position.length !== this.dimensions) {
            throw("Position supplied has incorrect #  of dimensions");
        }

        let tempPosition = [];
        for (let i = 0; i < this.dimensions; i++) { tempPosition[i] = 0; }
        this.position = (position) ? position : tempPosition;
    }


    /**
     * Update the position on this location instance
     *
     * @param {number[]} position
     * @returns {NodeLocation}
     */
    public updatePosition(position: number[]): NodeLocation {

        if ( position.length !== this.dimensions ) {
            throw( "Position supplied has incorrect # of dimensions" );
        }

        this.position = position;
        return this;
    }

    /**
     * Update the value of the point on the indicated dimensional axis
     *
     * @param {number} axisIndex
     * @param {number} newValue
     * @returns {NodeLocation}
     */
    public updateAxisPoint(axisIndex: number, newValue: number) : NodeLocation {

        if ( axisIndex < 0 || axisIndex >= this.dimensions ) {
            throw ( "Index out of dimensional range for coordinate" );
        }

        this.position[axisIndex] = newValue;

        return this;
    }

    /**
     * Adjust the value of the point on the indicated dimensional axis by the indicated delta
     *
     * @param {number} axisIndex
     * @param {number} pointDelta
     * @returns {NodeLocation}
     */
    public adjustAxisPoint(axisIndex: number, pointDelta: number) : NodeLocation {

        let newPosition = [];
        for( let i = 0 ; i < this.dimensions ; i++ ) { newPosition[i] = this.position[i]; }

        if ( axisIndex < 0 || axisIndex >= this.dimensions ) {
            throw ( "Index out of dimensional range for coordinate" );
        }

        newPosition[axisIndex] += pointDelta;

        this.position = newPosition;

        return this;
    }

    /**
     * Get the axis point value on the indicated axis
     *
     * @param {number} axisIndex
     * @returns {number}
     */
    public getAxisPoint(axisIndex: number) : number {

        if ( axisIndex < 0 || axisIndex >= this.dimensions ) {
            throw ( "Index out of dimensional range for coordinate" );
        }

        return this.position[axisIndex];
    }

    /**
     * Get the position of this location.
     * @returns {number[]}
     */
    public getPosition(): number[] {
        return this.position;
    }

    /**
     * Get the # of dimensions or axis tracking the position of this location
     *
     * @returns {number}
     */
    public getDimensions(): number {

        return this.dimensions;
    }

    /**
     * Convert these coordinates into a string representing the values contained inside.
     * @returns {string}
     */
    public toString() : string {

        return NodeLocation.encodePositionArray(this.position);
    }

    /**
     * Convert an array representing a position into a string that reads like the array.  Great for comparisons!
     * If executing this function on a maze coordinate instance, consider using the .toString() method, which will
     * give you the same result sourcing from the position on the coordinate.
     *
     * @param {number[]} position
     * @returns {string}
     */
    public static encodePositionArray(position: number[]) : string {

        let s: string = "[";

        for( let i = 0 ; i < position.length - 1; i++ ){

            s += position[i] + ",";
        }

        s += position[position.length - 1] + "]"

        return s;
    }

    protected abstract getDimensionValue(): number;

    /**
     * Validate that the dimensions have been set on this item.  Mainly this is here to bug other developers - if you
     * extend this abstract class without ensuring that the dimension value is defined as a property on the child
     * class, it will fail.
     */
    private validateDimensions() : void {

        if ( this.dimensions === undefined ) {
            throw ( "NodeLocation cannot be instantiated because it has no dimensions.  When extending the " +
                "NodeLocation class, please be sure to set the value for dimensions before invoking the parent " +
                "by returning the proper value in the concrete implementation of the getDimensionValue() method" );
        }

    }
}

