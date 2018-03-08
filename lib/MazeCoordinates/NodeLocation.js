"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class NodeLocation
 *
 * Stores and facilitates mutation of the coordinates of a given point on a cartesian graph (2+ dimensions)
 */
var NodeLocation = /** @class */ (function () {
    /**
     * Create a new MazeCoordinate, indicating its position
     *
     * @param {number[]} position
     */
    function NodeLocation(position) {
        this.dimensions = this.getDimensionValue();
        this.validateDimensions();
        if (!position) {
            // Populate default position if not provided
            position = [];
            for (var i = 0; i < this.dimensions; i++) {
                position[i] = 0;
            }
        }
        else if (position.length !== this.dimensions) {
            throw ("Position supplied is of incorrect dimensions for the coordinate");
        }
        this.position = position;
    }
    /**
     * Update the position on this coordinate
     *
     * @param {number[]} position
     * @returns {NodeLocation}
     */
    NodeLocation.prototype.updatePosition = function (position) {
        if (position.length !== this.dimensions) {
            throw ("Position supplied is of incorrect dimensions for the coordinate");
        }
        this.position = position;
        return this;
    };
    /**
     * Update a dimensional value of the coordinate's position
     *
     * @param {number} index
     * @param {number} value
     * @returns {NodeLocation}
     */
    NodeLocation.prototype.updateDimension = function (index, value) {
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
     * @returns {NodeLocation}
     */
    NodeLocation.prototype.adjustDimension = function (index, amount) {
        var newPosition = [];
        for (var i = 0; i < this.dimensions; i++) {
            newPosition[i] = this.position[i];
        }
        if (index < 0 || index >= this.dimensions) {
            throw ("Index out of dimensional range for coordinate");
        }
        newPosition[index] += amount;
        this.position = newPosition;
        return this;
    };
    /**
     * Get this value at the given index (index represents dimension)
     *
     * @param {number} index
     * @returns {number}
     */
    NodeLocation.prototype.getDimension = function (index) {
        if (index < 0 || index >= this.dimensions) {
            throw ("Index out of dimensional range for coordinate");
        }
        return this.position[index];
    };
    /**
     * Get the position of this coordinate.
     * @returns {number[]}
     */
    NodeLocation.prototype.getPosition = function () {
        return this.position;
    };
    /**
     * Get the dimensions of this coordinate.  A 2 dimensional coordinate is an array with 2 elements, 3 for 3, etc.
     *
     * @returns {number}
     */
    NodeLocation.prototype.getDimensions = function () {
        return this.dimensions;
    };
    /**
     * Convert these coordinates into a string representing the values contained inside.
     * @returns {string}
     */
    NodeLocation.prototype.toString = function () {
        return NodeLocation.encodeCoorindateArray(this.dimensions, this.position);
    };
    /**
     * Convert an array of dimensional positions into a string that reads like the array.  Great for comparisons!
     * If executing this function on a maze coordinate instance, consider using the .toString() method, which will
     * give you the same result sourcing from the position on the coordinate.
     *
     * @param {number} dimensions
     * @param {number[]} elements
     * @returns {string}
     */
    NodeLocation.encodeCoorindateArray = function (dimensions, elements) {
        var s = "[";
        for (var i = 0; i < dimensions - 1; i++) {
            s += elements[i] + ",";
        }
        s += elements[dimensions - 1] + "]";
        return s;
    };
    /**
     * Validate that the dimensions have been set on this item.  Mainly this is here to bug other developers if they
     * extend this abstract class without ensuring that the dimension value is defined as a property on the child
     * class.
     */
    NodeLocation.prototype.validateDimensions = function () {
        if (this.dimensions === undefined) {
            throw ("Coordinate cannot be instantiated because it has no dimensions.  When extending the " +
                "MazeCoordinate class, please be sure to set the value for dimensions before invoking the parent " +
                "by returning the proper value in the implementation of the getDimensionValue() method");
        }
    };
    return NodeLocation;
}());
exports.NodeLocation = NodeLocation;
