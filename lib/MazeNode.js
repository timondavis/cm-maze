"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MazeNode = /** @class */ (function () {
    function MazeNode(cardinality) {
        this.name = "";
        this.neighbors = new Array(cardinality);
        for (var i = 0; i < cardinality; i++) {
        }
        this.cardinality = cardinality;
    }
    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.
     *
     * @param {MazeNode} connectTo      The node to connect to this node
     * @param {number} exitPoint        The cardinality point you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will point back to this node.
     */
    MazeNode.prototype.connectTo = function (node, exitPoint, autoConnect) {
        if (autoConnect === void 0) { autoConnect = true; }
        if (exitPoint >= this.cardinality || exitPoint < 0) {
            throw ("Indicated exitPoint value exceeds maximum MazeNode cardinality range");
        }
        if (!this.neighbors[exitPoint] === undefined) {
            throw ("Indicated exitPoint position is already occupied.  Two exits/entries may not occupy the same exitPoint");
        }
        this.neighbors[exitPoint] = node;
        if (autoConnect) {
            var entryPoint = ((exitPoint - this.cardinality / 2) > 0) ?
                exitPoint - this.cardinality / 2 :
                this.cardinality - exitPoint;
            if (autoConnect && node.isPositionOccupied(entryPoint)) {
                throw ("Cannot auto-connect to proposed MazeNode.  The automated connectTo node entry position is occupied.");
            }
            node.connectTo(this, entryPoint, false);
        }
    };
    /**
     * Find out of the indicated position of cardinality is occupied on this node
     *
     * @param {number} exitPosition
     * @returns {boolean}
     */
    MazeNode.prototype.isPositionOccupied = function (exitPosition) {
        return (this.neighbors[exitPosition] === null);
    };
    /**
     * Get a connected node by indicating the exit (cardinality point) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {MazeNode}
     */
    MazeNode.prototype.getNeighborAt = function (exitPosition) {
        if (exitPosition >= this.cardinality || exitPosition < 0) {
            throw ("Indicated cardinality point is outside of the valid range");
        }
        return this.neighbors[exitPosition];
    };
    /**
     * Give this node a name, if you like
     *
     * @param {string} name
     */
    MazeNode.prototype.setName = function (name) {
        this.name = name;
    };
    /**
     * Get the name of this node
     *
     * @param {string} name
     * @returns {string}
     */
    MazeNode.prototype.getName = function (name) {
        return this.name;
    };
    /**
     * Find out if the indicated node indicated to this node directly, as a neighbor
     *
     * @param {MazeNode} node
     * @returns {boolean}
     */
    MazeNode.prototype.isNeighborsWith = function (node) {
        for (var i = 0; i < this.cardinality; i++) {
            if (node == this.neighbors[i]) {
                return true;
            }
        }
        return false;
    };
    return MazeNode;
}());
exports.MazeNode = MazeNode;
