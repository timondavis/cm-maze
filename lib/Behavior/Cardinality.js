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
var cm_domain_utilities_1 = require("cm-domain-utilities");
/**
 * @abstract Cardinality
 *
 * Provides constraints and services which allow MazeNodes to connect to one another, and to facilitate traversal
 * between them, in a logical fashion based on the cardinality of exit points for each node.
 */
var Cardinality = /** @class */ (function (_super) {
    __extends(Cardinality, _super);
    function Cardinality(cardinalityId) {
        var _this = _super.call(this) || this;
        _this.state = {
            id: cardinalityId
        };
        return _this;
    }
    /**
     * Ensure the indicated position is valid given this coordinates cardinality
     *
     * @param {number} connectionPoint
     */
    Cardinality.prototype.validateConnectionPoint = function (connectionPoint) {
        if (connectionPoint < 0 || connectionPoint >= this.getConnectionPointCount()) {
            throw ("Indicated position supplied to coordinate is outside of the valid range of its cardinality");
        }
    };
    /**
     * Given that each connection point has an opposite connection point (as long as there is more than one),
     * this function returns the opposing point to the given point.  For instance, on a Cardainlity with a
     * connection point count of 4, you'll have points 0 - 3 (4 points in all).
     * 0 is north, 1 east, 2 south, 3 west.  In this case, the opposite of 0 is 2. The opposite of 3 is 1.
     *
     * By default, the base class provides an algorithm to find the diametrically opposed point given an even number
     * of points on a 2D plane.
     *
     * @param {number} point  The point to test against
     * @return {number}
     */
    Cardinality.prototype.getOpposingConnectionPoint = function (point) {
        /* @TODO Can't math do this...? */
        for (var i = 0; i < this.getConnectionPointCount() / 2; i++) {
            point -= 1;
            if (point < 0) {
                point = this.getConnectionPointCount() - 1;
            }
        }
        return point;
    };
    return Cardinality;
}(cm_domain_utilities_1.SerializableModel));
exports.Cardinality = Cardinality;
