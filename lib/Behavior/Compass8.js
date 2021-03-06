"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compass8 = exports.C8 = void 0;
const Cardinality_1 = require("./Cardinality");
const NodeLocation2D_1 = require("../MazeCoordinates/NodeLocation2D");
/**
 * @enum C8
 *
 * Represents connection points on a compass rose with a cardinality of 8.  Ordered clockwise starting at north position.
 * N = 0, NW = 7.
 */
var C8;
(function (C8) {
    C8[C8["N"] = 0] = "N";
    C8[C8["NORTH"] = 0] = "NORTH";
    C8[C8["NE"] = 1] = "NE";
    C8[C8["NORTH_EAST"] = 1] = "NORTH_EAST";
    C8[C8["E"] = 2] = "E";
    C8[C8["EAST"] = 2] = "EAST";
    C8[C8["SE"] = 3] = "SE";
    C8[C8["SOUTH_EAST"] = 3] = "SOUTH_EAST";
    C8[C8["S"] = 4] = "S";
    C8[C8["SOUTH"] = 4] = "SOUTH";
    C8[C8["SW"] = 5] = "SW";
    C8[C8["SOUTH_WEST"] = 5] = "SOUTH_WEST";
    C8[C8["W"] = 6] = "W";
    C8[C8["WEST"] = 6] = "WEST";
    C8[C8["NW"] = 7] = "NW";
    C8[C8["NORTH_WEST"] = 7] = "NORTH_WEST";
})(C8 = exports.C8 || (exports.C8 = {}));
/**
 * @class Compass8
 *
 * Behavior class for 2D Maze nodes with 8 possible points connecting points.
 */
class Compass8 extends Cardinality_1.Cardinality {
    constructor() {
        super('Compass8');
        this.typeId = 'Compass8';
    }
    /**
     * Get the cardinality for this behavior
     *
     * @returns {number}
     */
    getConnectionPointCount() { return 8; }
    /**
     * Given a NodeLocation representing a position on a 2D plane,
     * and given an intended 'exit' connection point on that plane (describing in which direction
     * we want to "move" from our current coordinates), this function will return an new NodeLocation2D instance which
     * represents the new position.
     *
     * Example: Going north from [0,0] would result in finding coordinates at position [1,0].
     *
     * @param {NodeLocation2D} currentLocation
     * @param {number} exitConnectionPoint
     * @returns {NodeLocation2D}
     * @throws Exception
     */
    getNextLocation(currentLocation, exitConnectionPoint) {
        this.validateConnectionPoint(exitConnectionPoint);
        let nextLocation = new NodeLocation2D_1.NodeLocation2D([
            currentLocation.getAxisPoint(NodeLocation2D_1.D2D.X),
            currentLocation.getAxisPoint(NodeLocation2D_1.D2D.Y)
        ]);
        /* O(1) */
        switch (exitConnectionPoint) {
            case C8.NORTH: {
                nextLocation.adjustAxisPoint(NodeLocation2D_1.D2D.Y, -1);
                break;
            }
            case C8.NORTH_EAST: {
                nextLocation
                    .adjustAxisPoint(NodeLocation2D_1.D2D.X, 1)
                    .adjustAxisPoint(NodeLocation2D_1.D2D.Y, -1);
                break;
            }
            case C8.EAST: {
                nextLocation.adjustAxisPoint(NodeLocation2D_1.D2D.X, 1);
                break;
            }
            case C8.SOUTH_EAST: {
                nextLocation
                    .adjustAxisPoint(NodeLocation2D_1.D2D.X, 1)
                    .adjustAxisPoint(NodeLocation2D_1.D2D.Y, 1);
                break;
            }
            case C8.SOUTH: {
                nextLocation.adjustAxisPoint(NodeLocation2D_1.D2D.Y, 1);
                break;
            }
            case C8.SOUTH_WEST: {
                nextLocation
                    .adjustAxisPoint(NodeLocation2D_1.D2D.X, -1)
                    .adjustAxisPoint(NodeLocation2D_1.D2D.Y, 1);
                break;
            }
            case C8.WEST: {
                nextLocation.adjustAxisPoint(NodeLocation2D_1.D2D.X, -1);
                break;
            }
            case C8.NORTH_WEST: {
                nextLocation
                    .adjustAxisPoint(NodeLocation2D_1.D2D.X, -1)
                    .adjustAxisPoint(NodeLocation2D_1.D2D.Y, -1);
                break;
            }
            default: {
                throw ("Indicated connecting point is out of range");
            }
        }
        return nextLocation;
    }
    /**
     * Generate a new NodeLocation at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as NodeLocation2D.
     *
     * @returns {NodeLocation}
     */
    generateNodeLocation(position) {
        return (position) ? new NodeLocation2D_1.NodeLocation2D(position) : new NodeLocation2D_1.NodeLocation2D([0, 0]);
    }
    roundConnectionPointToPrimeCardinality(connectionPoint) {
        return (connectionPoint % 2 == 0) ? connectionPoint : connectionPoint - 1;
    }
}
exports.Compass8 = Compass8;
