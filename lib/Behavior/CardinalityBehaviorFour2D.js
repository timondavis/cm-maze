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
var CardinalityBehaviorFour2D = /** @class */ (function (_super) {
    __extends(CardinalityBehaviorFour2D, _super);
    function CardinalityBehaviorFour2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardinalityBehaviorFour2D.prototype.getCardinality = function () { return 4; };
    CardinalityBehaviorFour2D.prototype.getNextCoordinates = function (currentCoordinates, exitPosition) {
        this.validatePosition(exitPosition);
        var nextCoordinates = new MazeCoordinates2D_1.MazeCoordinates2D([
            currentCoordinates.getDimension(0),
            currentCoordinates.getDimension(1)
        ]);
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
    CardinalityBehaviorFour2D.prototype.generateCoordinates = function (position) {
        return (position) ? new MazeCoordinates2D_1.MazeCoordinates2D(position) : new MazeCoordinates2D_1.MazeCoordinates2D([0, 0]);
    };
    return CardinalityBehaviorFour2D;
}(CardinalityBehavior_1.CardinalityBehavior));
exports.CardinalityBehaviorFour2D = CardinalityBehaviorFour2D;
