"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeLocation2D = exports.D2D = void 0;
const NodeLocation_1 = require("./NodeLocation");
/**
 * Quick reference for X and Y indexes in MazeCoordinate positions.
 */
var D2D;
(function (D2D) {
    D2D[D2D["X"] = 0] = "X";
    D2D[D2D["Y"] = 1] = "Y";
})(D2D = exports.D2D || (exports.D2D = {}));
/**
 * @class NodeLocation2D
 *
 * Tracks coordinates on a 2 dimensional plane
 */
class NodeLocation2D extends NodeLocation_1.NodeLocation {
    /**
     * Get the number of dimensions belonging to this location
     *
     * @returns {number}
     */
    getDimensionValue() {
        return 2;
    }
    /**
     * Get the X position for the node location
     */
    getX() {
        return this.position[0];
    }
    /**
     * Get the Y position for the node location
     */
    getY() {
        return this.position[1];
    }
}
exports.NodeLocation2D = NodeLocation2D;
