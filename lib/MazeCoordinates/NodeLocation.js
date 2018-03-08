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
            throw ("Position supplied has incorrect #  of dimensions");
        }
        this.position = position;
    }
    /**
     * Update the position on this location instance
     *
     * @param {number[]} position
     * @returns {NodeLocation}
     */
    NodeLocation.prototype.updatePosition = function (position) {
        if (position.length !== this.dimensions) {
            throw ("Position supplied has incorrect # of dimensions");
        }
        this.position = position;
        return this;
    };
    /**
     * Update the value of the point on the indicated dimensional axis
     *
     * @param {number} axisIndex
     * @param {number} newValue
     * @returns {NodeLocation}
     */
    NodeLocation.prototype.updateAxisPoint = function (axisIndex, newValue) {
        if (axisIndex < 0 || axisIndex >= this.dimensions) {
            throw ("Index out of dimensional range for coordinate");
        }
        this.position[axisIndex] = newValue;
        return this;
    };
    /**
     * Adjust the value of the point on the indicated dimensional axis by the indicated delta
     *
     * @param {number} axisIndex
     * @param {number} pointDelta
     * @returns {NodeLocation}
     */
    NodeLocation.prototype.adjustAxisPoint = function (axisIndex, pointDelta) {
        var newPosition = [];
        for (var i = 0; i < this.dimensions; i++) {
            newPosition[i] = this.position[i];
        }
        if (axisIndex < 0 || axisIndex >= this.dimensions) {
            throw ("Index out of dimensional range for coordinate");
        }
        newPosition[axisIndex] += pointDelta;
        this.position = newPosition;
        return this;
    };
    /**
     * Get this value at the given index (index represents dimension)
     *
     * @param {number} axisIndex
     * @returns {number}
     */
    NodeLocation.prototype.getAxisPoint = function (axisIndex) {
        if (axisIndex < 0 || axisIndex >= this.dimensions) {
            throw ("Index out of dimensional range for coordinate");
        }
        return this.position[axisIndex];
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
        return NodeLocation.encodePositionArray(this.dimensions, this.position);
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
    NodeLocation.encodePositionArray = function (dimensions, elements) {
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
