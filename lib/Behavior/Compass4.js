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
 * Provides behavioral logic and services for working with 4 cardinality points on a 2d plane
 */
var Compass4 = /** @class */ (function (_super) {
    __extends(Compass4, _super);
    function Compass4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the cardinality for this behavior
     *
     * Time Complexity: O(1)
     * Space Complexity: -
     *
     * @returns {number}
     */
    Compass4.prototype.getConnectionPointCount = function () { return 4; };
    /**
     * Given a position on a 2D plane, and given an intended 'exit' point of cardinality (describing in which direction
     * we want to "move" from our current coordinates), this function will return an new NodeLocation2D object which
     * represents the theoretical coordinates for the space you would move to.
     *
     * Example: Going north from [0,0] would result in finding coordinates at position [1,0].
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @param {NodeLocation2D} currentCoordinates
     * @param {number} exitPosition
     * @returns {NodeLocation2D}
     * @throws Exception
     */
    Compass4.prototype.getNextLocation = function (currentCoordinates, exitPosition) {
        /* O(1) */
        this.validateConnectionPoint(exitPosition);
        /* O(1) */
        var nextCoordinates = new MazeCoordinates2D_1.MazeCoordinates2D([
            currentCoordinates.getDimension(0),
            currentCoordinates.getDimension(1)
        ]);
        /* O(1) */
        switch (exitPosition) {
            case C4.NORTH: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.Y, -1);
                break;
            }
            case C4.EAST: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.X, 1);
                break;
            }
            case C4.SOUTH: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.Y, 1);
                break;
            }
            case C4.WEST: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.X, -1);
                break;
            }
            default: throw ("Indicated exit position is out of range");
        }
        return nextCoordinates;
    };
    /**
     * Generate a new Maze Coordinate at the indicated position (leave empty for default position).  It is safe
     * to cast the returned result as NodeLocation2D.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     *
     * @returns {NodeLocation}
     */
    Compass4.prototype.generateNodeLocation = function (position) {
        return (position) ? new MazeCoordinates2D_1.MazeCoordinates2D(position) : new MazeCoordinates2D_1.MazeCoordinates2D([0, 0]);
    };
    return Compass4;
}(Cardinality_1.Cardinality));
exports.Compass4 = Compass4;
