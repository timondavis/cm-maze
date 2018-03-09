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
var CardinalityBehavior_1 = require("./CardinalityBehavior");
var MazeCoordinates2D_1 = require("../MazeCoordinates/MazeCoordinates2D");
/**
 * @enum CB4_CARD
 *
 * Represents cardinality points (compass ponints) on a 4 directional 2D plane.
 */
var CB4_CARD;
(function (CB4_CARD) {
    CB4_CARD[CB4_CARD["N"] = 0] = "N";
    CB4_CARD[CB4_CARD["NORTH"] = 0] = "NORTH";
    CB4_CARD[CB4_CARD["E"] = 1] = "E";
    CB4_CARD[CB4_CARD["EAST"] = 1] = "EAST";
    CB4_CARD[CB4_CARD["S"] = 2] = "S";
    CB4_CARD[CB4_CARD["SOUTH"] = 2] = "SOUTH";
    CB4_CARD[CB4_CARD["W"] = 3] = "W";
    CB4_CARD[CB4_CARD["WEST"] = 3] = "WEST";
})(CB4_CARD = exports.CB4_CARD || (exports.CB4_CARD = {}));
/**
 * @class CardinalityBehaviorFour2D
 *
 * Provides behavioral logic and services for working with 4 cardinality points on a 2d plane
 */
var CardinalityBehaviorFour2D = /** @class */ (function (_super) {
    __extends(CardinalityBehaviorFour2D, _super);
    function CardinalityBehaviorFour2D() {
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
    CardinalityBehaviorFour2D.prototype.getCardinality = function () { return 4; };
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
    CardinalityBehaviorFour2D.prototype.getNextCoordinates = function (currentCoordinates, exitPosition) {
        /* O(1) */
        this.validatePosition(exitPosition);
        /* O(1) */
        var nextCoordinates = new MazeCoordinates2D_1.MazeCoordinates2D([
            currentCoordinates.getAxisPoint(0),
            currentCoordinates.getAxisPoint(1)
        ]);
        /* O(1) */
        switch (exitPosition) {
            case CB4_CARD.NORTH: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.Y, -1);
                break;
            }
            case CB4_CARD.EAST: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.X, 1);
                break;
            }
            case CB4_CARD.SOUTH: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.Y, 1);
                break;
            }
            case CB4_CARD.WEST: {
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
    CardinalityBehaviorFour2D.prototype.generateCoordinates = function (position) {
        return (position) ? new MazeCoordinates2D_1.MazeCoordinates2D(position) : new MazeCoordinates2D_1.MazeCoordinates2D([0, 0]);
    };
    return CardinalityBehaviorFour2D;
}(CardinalityBehavior_1.CardinalityBehavior));
exports.CardinalityBehaviorFour2D = CardinalityBehaviorFour2D;
