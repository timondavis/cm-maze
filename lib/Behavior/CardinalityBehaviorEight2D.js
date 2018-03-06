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
 * @enum CB8_CARD
 *
 * Represents cardinality point directions as named enumerations from integer values.
 */
var CB8_CARD;
(function (CB8_CARD) {
    CB8_CARD[CB8_CARD["N"] = 0] = "N";
    CB8_CARD[CB8_CARD["NORTH"] = 0] = "NORTH";
    CB8_CARD[CB8_CARD["NE"] = 1] = "NE";
    CB8_CARD[CB8_CARD["NORTH_EAST"] = 1] = "NORTH_EAST";
    CB8_CARD[CB8_CARD["E"] = 2] = "E";
    CB8_CARD[CB8_CARD["EAST"] = 2] = "EAST";
    CB8_CARD[CB8_CARD["SE"] = 3] = "SE";
    CB8_CARD[CB8_CARD["SOUTH_EAST"] = 3] = "SOUTH_EAST";
    CB8_CARD[CB8_CARD["S"] = 4] = "S";
    CB8_CARD[CB8_CARD["SOUTH"] = 4] = "SOUTH";
    CB8_CARD[CB8_CARD["SW"] = 5] = "SW";
    CB8_CARD[CB8_CARD["SOUTH_WEST"] = 5] = "SOUTH_WEST";
    CB8_CARD[CB8_CARD["W"] = 6] = "W";
    CB8_CARD[CB8_CARD["WEST"] = 6] = "WEST";
    CB8_CARD[CB8_CARD["NW"] = 7] = "NW";
    CB8_CARD[CB8_CARD["NORTH_WEST"] = 7] = "NORTH_WEST";
})(CB8_CARD = exports.CB8_CARD || (exports.CB8_CARD = {}));
/**
 * @class CardinalityBehaviorEight2D
 *
 * Behavior class for 2D Maze nodes with 8 possible points of cardinality (exit points):w
 */
var CardinalityBehaviorEight2D = /** @class */ (function (_super) {
    __extends(CardinalityBehaviorEight2D, _super);
    function CardinalityBehaviorEight2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the cardinality for this behavior
     *
     * @returns {number}
     */
    CardinalityBehaviorEight2D.prototype.getCardinality = function () { return 8; };
    /**
     * Given a position on a 2D plane, and given an intended 'exit' point of cardinality (describing in which direction
     * we want to "move" from our current coordinates), this function will return an new MazeCoordinates2D object which
     * represents the theoretical coordinates for the space you would move to.
     *
     * Example: Going north from [0,0] would result in finding coordinates at position [1,0].
     *
     * @param {MazeCoordinates2D} currentCoordinates
     * @param {number} exitPosition
     * @returns {MazeCoordinates2D}
     * @throws Exception
     */
    CardinalityBehaviorEight2D.prototype.getNextCoordinates = function (currentCoordinates, exitPosition) {
        /* O(1) */
        this.validatePosition(exitPosition);
        /* O(1) */
        var nextCoordinates = new MazeCoordinates2D_1.MazeCoordinates2D([
            currentCoordinates.getDimension(MazeCoordinates2D_1.D2D.X),
            currentCoordinates.getDimension(MazeCoordinates2D_1.D2D.Y)
        ]);
        /* O(1) */
        switch (exitPosition) {
            case CB8_CARD.NORTH: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.Y, -1);
                break;
            }
            case CB8_CARD.NORTH_EAST: {
                nextCoordinates
                    .adjustDimension(MazeCoordinates2D_1.D2D.X, 1)
                    .adjustDimension(MazeCoordinates2D_1.D2D.Y, -1);
                break;
            }
            case CB8_CARD.EAST: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.X, 1);
                break;
            }
            case CB8_CARD.SOUTH_EAST: {
                nextCoordinates
                    .adjustDimension(MazeCoordinates2D_1.D2D.X, 1)
                    .adjustDimension(MazeCoordinates2D_1.D2D.Y, 1);
                break;
            }
            case CB8_CARD.SOUTH: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.Y, 1);
                break;
            }
            case CB8_CARD.SOUTH_WEST: {
                nextCoordinates
                    .adjustDimension(MazeCoordinates2D_1.D2D.X, -1)
                    .adjustDimension(MazeCoordinates2D_1.D2D.Y, 1);
                break;
            }
            case CB8_CARD.WEST: {
                nextCoordinates.adjustDimension(MazeCoordinates2D_1.D2D.X, -1);
                break;
            }
            case CB8_CARD.NORTH_WEST: {
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
     * to cast the returned result as MazeCoordinates2D.
     *
     * @returns {MazeCoordinates}
     */
    CardinalityBehaviorEight2D.prototype.generateCoordinates = function (position) {
        return (position) ? new MazeCoordinates2D_1.MazeCoordinates2D(position) : new MazeCoordinates2D_1.MazeCoordinates2D([0, 0]);
    };
    return CardinalityBehaviorEight2D;
}(CardinalityBehavior_1.CardinalityBehavior));
exports.CardinalityBehaviorEight2D = CardinalityBehaviorEight2D;
