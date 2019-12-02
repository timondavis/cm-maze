"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Cardinality_1 = require("./Cardinality");
var NodeLocation2D_1 = require("../MazeCoordinates/NodeLocation2D");
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
var Compass4 = /** @class */ (function (_super) {
    __extends(Compass4, _super);
    function Compass4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the # of connection points attached to this cardinality
     *
     * @returns {number}
     */
    Compass4.prototype.getConnectionPointCount = function () { return 4; };
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
    Compass4.prototype.getNextLocation = function (currentLocation, exitConnectionPoint) {
        this.validateConnectionPoint(exitConnectionPoint);
        var nextLocation = new NodeLocation2D_1.NodeLocation2D([
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
    };
    /**
     * Generate a new NodeLocation at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as NodeLocation2D.
     *
     * @returns {NodeLocation}
     */
    Compass4.prototype.generateNodeLocation = function (position) {
        return (position) ? new NodeLocation2D_1.NodeLocation2D(position) : new NodeLocation2D_1.NodeLocation2D([0, 0]);
    };
    return Compass4;
}(Cardinality_1.Cardinality));
exports.Compass4 = Compass4;
