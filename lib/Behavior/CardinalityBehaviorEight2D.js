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
;
var CardinalityBehaviorEight2D = /** @class */ (function (_super) {
    __extends(CardinalityBehaviorEight2D, _super);
    function CardinalityBehaviorEight2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardinalityBehaviorEight2D.prototype.getCardinality = function () { return 8; };
    CardinalityBehaviorEight2D.prototype.getNextCoordinates = function (currentCoordinates, exitPosition) {
        this.validatePosition(exitPosition);
        var nextCoordinates = new MazeCoordinates2D_1.MazeCoordinates2D([
            currentCoordinates.getDimension(MazeCoordinates2D_1.D2D.X),
            currentCoordinates.getDimension(MazeCoordinates2D_1.D2D.Y)
        ]);
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
    CardinalityBehaviorEight2D.prototype.generateCoordinates = function (position) {
        return (position) ? new MazeCoordinates2D_1.MazeCoordinates2D(position) : new MazeCoordinates2D_1.MazeCoordinates2D([0, 0]);
    };
    return CardinalityBehaviorEight2D;
}(CardinalityBehavior_1.CardinalityBehavior));
exports.CardinalityBehaviorEight2D = CardinalityBehaviorEight2D;
