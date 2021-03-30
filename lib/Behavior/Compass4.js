"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compass4 = exports.C4 = void 0;
const Cardinality_1 = require("./Cardinality");
const NodeLocation2D_1 = require("../MazeCoordinates/NodeLocation2D");
/**
 * @enum C4
 *
 * Represents cardinality points (compass ponints) on a 4 directional 2D plane.
 */
var C4;
(function (C4) {
    C4[C4["N"] = 0] = "N";
    C4[C4["NORTH"] = 0] = "NORTH";
    C4[C4["E"] = 1] = "E";
    C4[C4["EAST"] = 1] = "EAST";
    C4[C4["S"] = 2] = "S";
    C4[C4["SOUTH"] = 2] = "SOUTH";
    C4[C4["W"] = 3] = "W";
    C4[C4["WEST"] = 3] = "WEST";
})(C4 = exports.C4 || (exports.C4 = {}));
/**
 * @class Compass4
 *
 * Provides behavioral logic and services for working with objects, spacially oriented with a compass
 * rose having 4 cardinal points
 */
class Compass4 extends Cardinality_1.Cardinality {
    constructor() {
        super('Compass4');
    }
    /**
     * Get the # of connection points attached to this cardinality
     *
     * @returns {number}
     */
    getConnectionPointCount() { return 4; }
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
            currentLocation.getAxisPoint(0),
            currentLocation.getAxisPoint(1)
        ]);
        switch (exitConnectionPoint) {
            case C4.NORTH: {
                nextLocation.adjustAxisPoint(NodeLocation2D_1.D2D.Y, -1);
                break;
            }
            case C4.EAST: {
                nextLocation.adjustAxisPoint(NodeLocation2D_1.D2D.X, 1);
                break;
            }
            case C4.SOUTH: {
                nextLocation.adjustAxisPoint(NodeLocation2D_1.D2D.Y, 1);
                break;
            }
            case C4.WEST: {
                nextLocation.adjustAxisPoint(NodeLocation2D_1.D2D.X, -1);
                break;
            }
            default: throw ("Indicated exit position is out of range");
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
        return connectionPoint;
    }
}
exports.Compass4 = Compass4;
