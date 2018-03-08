"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Cardinality_1 = require("./Cardinality");
var MazeCoordinates2D_1 = require("../MazeCoordinates/MazeCoordinates2D");
/**
 * @enum C8
 *
 * Represents cardinality point directions as named enumerations from integer values.
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
 * Behavior class for 2D Maze nodes with 8 possible points of cardinality (exit points):w
 */
var Compass8 = /** @class */ (function (_super) {
    __extends(Compass8, _super);
    function Compass8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the cardinality for this behavior
     *
     * @returns {number}
     */
    Compass8.prototype.getConnectionPointCount = function () { return 8; };
    /**
     * Given a position on a 2D plane, and given an intended 'exit' point of cardinality (describing in which direction
     * we want to "move" from our current coordinates), this function will return an new NodeLocation2D object which
     * represents the theoretical coordinates for the space you would move to.
     *
     * Example: Going north from [0,0] would result in finding coordinates at position [1,0].
     *
     * @param {NodeLocation2D} currentCoordinates
     * @param {number} exitPosition
     * @returns {NodeLocation2D}
     * @throws Exception
     */
    Compass8.prototype.getNextLocation = function (currentCoordinates, exitPosition) {
        /* O(1) */
        this.validateConnectionPoint(exitPosition);
        /* O(1) */
        var nextCoordinates = new MazeCoordinates2D_1.MazeCoordinates2D([
            currentCoordinates.getDimension(MazeCoordinates2D_1.D2D.X),
            currentCoordinates.getDimension(MazeCoordinates2D_1.D2D.Y)
        ]);
        /* O(1) */
        switch (exitPosition) {
            case C8.NORTH: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.Y, -1);
                break;
            }
            case C8.NORTH_EAST: {
                nextCoordinates
                    .adjustDimension(MazeCoordinates2D_1.D2D.X, 1)
                    .adjustDimension(MazeCoordinates2D_1.D2D.Y, -1);
                break;
            }
            case C8.EAST: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.X, 1);
                break;
            }
            case C8.SOUTH_EAST: {
                nextCoordinates
                    .adjustDimension(MazeCoordinates2D_1.D2D.X, 1)
                    .adjustDimension(MazeCoordinates2D_1.D2D.Y, 1);
                break;
            }
            case C8.SOUTH: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.Y, 1);
                break;
            }
            case C8.SOUTH_WEST: {
                nextCoordinates
                    .adjustDimension(MazeCoordinates2D_1.D2D.X, -1)
                    .adjustDimension(MazeCoordinates2D_1.D2D.Y, 1);
                break;
            }
            case C8.WEST: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.X, -1);
                break;
            }
            case C8.NORTH_WEST: {
                nextCoordinates
                    .adjustDimension(MazeCoordinates2D_1.D2D.X, -1)
                    .adjustDimension(MazeCoordinates2D_1.D2D.Y, -1);
                break;
            }
            default: {
                throw ("Indicated exit position is out of range");
            }
        }
        return nextCoordinates;
    };
    /**
     * Generate a new Maze Coordinate at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as NodeLocation2D.
     *
     * @returns {NodeLocation}
     */
    Compass8.prototype.generateNodeLocation = function (position) {
        return (position) ? new MazeCoordinates2D_1.MazeCoordinates2D(position) : new MazeCoordinates2D_1.MazeCoordinates2D([0, 0]);
    };
    return Compass8;
}(Cardinality_1.Cardinality));
exports.Compass8 = Compass8;
