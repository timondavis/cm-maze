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
var Compass8 = /** @class */ (function (_super) {
    __extends(Compass8, _super);
    function Compass8() {
        var _this = _super.call(this, 'Compass8') || this;
        _this.typeId = 'Compass8';
        return _this;
    }
    /**
     * Get the cardinality for this behavior
     *
     * @returns {number}
     */
    Compass8.prototype.getConnectionPointCount = function () { return 8; };
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
    Compass8.prototype.getNextLocation = function (currentLocation, exitConnectionPoint) {
        this.validateConnectionPoint(exitConnectionPoint);
        var nextLocation = new NodeLocation2D_1.NodeLocation2D([
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
    };
    /**
     * Generate a new NodeLocation at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as NodeLocation2D.
     *
     * @returns {NodeLocation}
     */
    Compass8.prototype.generateNodeLocation = function (position) {
        return (position) ? new NodeLocation2D_1.NodeLocation2D(position) : new NodeLocation2D_1.NodeLocation2D([0, 0]);
    };
    return Compass8;
}(Cardinality_1.Cardinality));
exports.Compass8 = Compass8;
