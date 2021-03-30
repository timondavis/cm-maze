"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cardinality = void 0;
const cm_domain_utilities_1 = require("cm-domain-utilities");
/**
 * @abstract Cardinality
 *
 * Provides constraints and services which allow MazeNodes to connect to one another, and to facilitate traversal
 * between them, in a logical fashion based on the cardinality of exit points for each node.
 */
class Cardinality extends cm_domain_utilities_1.SerializableModel {
    constructor(cardinalityId) {
        super();
        this.state = {
            id: cardinalityId
        };
    }
    /**
     * Ensure the indicated position is valid given this coordinates cardinality
     *
     * @param {number} connectionPoint
     */
    validateConnectionPoint(connectionPoint) {
        if (connectionPoint < 0 || connectionPoint >= this.getConnectionPointCount()) {
            throw ("Indicated position supplied to coordinate is outside of the valid range of its cardinality");
        }
    }
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
    getOpposingConnectionPoint(point) {
        /* @TODO Can't math do this...? */
        for (let i = 0; i < this.getConnectionPointCount() / 2; i++) {
            point -= 1;
            if (point < 0) {
                point = this.getConnectionPointCount() - 1;
            }
        }
        return point;
    }
}
exports.Cardinality = Cardinality;
