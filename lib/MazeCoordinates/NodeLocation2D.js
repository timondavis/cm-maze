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
var NodeLocation_1 = require("./NodeLocation");
/**
 * Quick reference for X and Y indexes in MazeCoordinate positions.
 */
var D2D;
(function (D2D) {
    D2D[D2D["X"] = 0] = "X";
    D2D[D2D["Y"] = 1] = "Y";
})(D2D = exports.D2D || (exports.D2D = {}));
/**
 * @class NodeLocation2D
 *
 * Tracks coordinates on a 2 dimensional plane
 */
var NodeLocation2D = /** @class */ (function (_super) {
    __extends(NodeLocation2D, _super);
    function NodeLocation2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the number of dimensions belonging to this location
     *
     * @returns {number}
     */
    NodeLocation2D.prototype.getDimensionValue = function () {
        return 2;
    };
    /**
     * Get the X position for the node location
     */
    NodeLocation2D.prototype.getX = function () {
        return this.getPosition()[0];
    };
    /**
     * Get the Y position for the node location
     */
    NodeLocation2D.prototype.getY = function () {
        return this.getPosition()[1];
    };
    return NodeLocation2D;
}(NodeLocation_1.NodeLocation));
exports.NodeLocation2D = NodeLocation2D;
