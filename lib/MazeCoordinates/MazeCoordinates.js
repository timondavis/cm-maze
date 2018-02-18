"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MazeCoordinates = /** @class */ (function () {
    /**
     * Create a new MazeCoordinate, indicating its position
     * @param {number[]} position
     */
    function MazeCoordinates(position) {
        this.dimensions = this.getDimensionValue();
        this.validateDimensions();
        if (!position) {
            position = [];
            for (var i = 0; i < this.dimensions; i++) {
                this.position[i] = 0;
            }
        }
        if (position.length !== this.dimensions) {
            throw ("Position supplied is of incorrect dimensions for the coordinate");
        }
        this.position = position;
    }
    /**
     * Update the position on this coordinate
     *
     * @param {number[]} position
     * @returns {MazeCoordinates}
     */
    MazeCoordinates.prototype.updatePosition = function (position) {
        if (position.length !== this.dimensions) {
            throw ("Position supplied is of incorrect dimensions for the coordinate");
        }
        this.position = position;
        return this;
    };
    /**
     * Update a dimensional value of the coordinate's position
     * @param {number} index
     * @param {number} value
     * @returns {MazeCoordinates}
     */
    MazeCoordinates.prototype.updateDimension = function (index, value) {
        if (index < 0 || index >= this.dimensions) {
            throw ("Index out of dimensional range for coordinate");
        }
        this.position[index] = value;
        return this;
    };
    /**
     * Adjust the indicated dimension on the coordinate position.  Changes by amount indicated.
     *
     * @param {number} index
     * @param {number} amount
     * @returns {MazeCoordinates}
     */
    MazeCoordinates.prototype.adjustDimension = function (index, amount) {
        if (index < 0 || index >= this.dimensions) {
            throw ("Index out of dimensional range for coordinate");
        }
        this.position[index] += amount;
        return this;
    };
    /**
     * Get this value at the given index (index represents dimension)
     *
     * @param {number} index
     * @returns {number}
     */
    MazeCoordinates.prototype.getDimension = function (index) {
        if (index < 0 || index >= this.dimensions) {
            throw ("Index out of dimensional range for coordinate");
        }
        return this.position[index];
    };
    /**
     * Get the position of this coordinate.
     * @returns {number[]}
     */
    MazeCoordinates.prototype.getPosition = function () {
        return this.position;
    };
    /**
     * Get the dimensions of this coordinate.  A 2 dimensional coordinate is an array with 2 elements, 3 for 3, etc.
     *
     * @returns {number}
     */
    MazeCoordinates.prototype.getDimensions = function () {
        return this.dimensions;
    };
    /**
     * Convert these coordinates into a string representing the values contained inside.
     * @returns {string}
     */
    MazeCoordinates.prototype.toString = function () {
        var s = "[";
        for (var i = 0; i < this.dimensions - 1; i++) {
            s += this.position[i] + ",";
        }
        s += this.position[this.dimensions - 1] + "]";
        return s;
    };
    MazeCoordinates.prototype.validateDimensions = function () {
        if (this.dimensions === undefined) {
            throw ("Coordinate cannot be instantiated because it has no dimensions.  When extending the " +
                "MazeCoordinate class, please be sure to set the value for dimensions before invoking the parent " +
                "by returning the proper value in the implementation of the getDimensionValue() method");
        }
    };
    return MazeCoordinates;
}());
exports.MazeCoordinates = MazeCoordinates;
