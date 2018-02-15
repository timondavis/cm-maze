export abstract class MazeCoordinates {

    protected dimensions: number;
    public position: number[];

    /**
     * Create a new MazeCoordinate, indicating its position
     * @param {number[]} position
     */
    public constructor(position?: number[]) {

        this.dimensions = this.getDimensionValue();
        this.validateDimensions();

        if ( ! position ) {

            position = [];

            for( let i = 0 ; i < this.dimensions ; i++ ) {

                this.position[i] = 0;
            }
        }

        if (position.length !== this.dimensions) {
            throw("Position supplied is of incorrect dimensions for the coordinate");
        }

        this.position = position;
    }

    /**
     * Update the position on this coordinate
     *
     * @param {number[]} position
     * @returns {MazeCoordinates}
     */
    public updatePosition(position: number[]): MazeCoordinates {

        if ( position.length !== this.dimensions ) {
            throw("Position supplied is of incorrect dimensions for the coordinate");
        }

        this.position = position;
        return this;
    }

    /**
     * Update a dimensional value of the coordinate's position
     * @param {number} index
     * @param {number} value
     * @returns {MazeCoordinates}
     */
    public updateDimension( index : number, value : number ) : MazeCoordinates {

        if ( index < 0 || index >= this.dimensions ) {
            throw ( "Index out of dimensional range for coordinate" );
        }

        this.position[index] = value;

        return this;
    }

    /**
     * Adjust the indicated dimension on the coordinate position.  Changes by amount indicated.
     *
     * @param {number} index
     * @param {number} amount
     * @returns {MazeCoordinates}
     */
    public adjustDimension( index : number, amount : number ) : MazeCoordinates {

        if ( index < 0 || index >= this.dimensions ) {
            throw ( "Index out of dimensional range for coordinate" );
        }

        this.position[index] += amount;

        return this;
    }

    /**
     * Get this value at the given index (index represents dimension)
     *
     * @param {number} index
     * @returns {number}
     */
    public getDimension( index : number ) : number {

        if ( index < 0 || index >= this.dimensions ) {
            throw ( "Index out of dimensional range for coordinate" );
        }

        return this.position[index];
    }

    /**
     * Get the position of this coordinate.
     * @returns {number[]}
     */
    public getPosition(): number[] {
        return this.position;
    }

    /**
     * Get the dimensions of this coordinate.  A 2 dimensional coordinate is an array with 2 elements, 3 for 3, etc.
     *
     * @returns {number}
     */
    public getDimensions(): number {

        return this.dimensions;
    }

    protected abstract getDimensionValue(): number;


    private validateDimensions() : void {

        if ( this.dimensions === undefined ) {
            throw ( "Coordinate cannot be instantiated because it has no dimensions.  When extending the " +
                "MazeCoordinate class, please be sure to set the value for dimensions before invoking the parent " +
                "by returning the proper value in the implementation of the getDimensionValue() method" );
        }

    }
}

