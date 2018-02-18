"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MazeNode = /** @class */ (function () {
    function MazeNode(cardinality, coordinates) {
        this.name = "";
        this.cardinality = cardinality;
        this.neighbors = new Array(cardinality.getCardinality());
        this.coordinates = (coordinates) ? coordinates : this.cardinality.generateCoordinates();
    }
    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.
     *
     * @param {MazeNode} node           The node to connect to this node
     * @param {number} exitPoint        The cardinality point you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will point back to this node.
     * @returns {MazeNode}
     */
    MazeNode.prototype.connectTo = function (node, exitPoint, autoConnect) {
        if (autoConnect === void 0) { autoConnect = true; }
        if (exitPoint >= this.cardinality.getCardinality() || exitPoint < 0) {
            throw ("Indicated exitPoint value exceeds maximum MazeNode cardinality range");
        }
        if (!this.neighbors[exitPoint] === undefined) {
            throw ("Indicated exitPoint position is already occupied.  Two exits/entries may not occupy the same exitPoint");
        }
        this.neighbors[exitPoint] = node;
        if (autoConnect) {
            var entryPoint = this.cardinality.getOpposingPoint(exitPoint);
            if (autoConnect && node.isPositionOccupied(entryPoint)) {
                throw ("Cannot auto-connect to proposed MazeNode.  The automated connectTo node entry position is occupied.");
            }
            node.connectTo(this, entryPoint, false);
        }
        return this;
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
        if (exitPosition >= this.cardinality.getCardinality() || exitPosition < 0) {
            throw ("Indicated cardinality point is outside of the valid range");
        }
        return this.neighbors[exitPosition];
    };
    /**
     * Give this node a name, if you like
     *
     * @param {string} name
     * @returns {MazeNode}
     */
    MazeNode.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /**
     * Get the name of this node
     *
     * @param {string} name
     */
    MazeNode.prototype.getName = function () {
        return this.name;
    };
    /**
     * Find out if the indicated node indicated to this node directly, as a neighbor
     *
     * @param {MazeNode} node
     * @returns {boolean}
     */
    MazeNode.prototype.isNeighborsWith = function (node) {
        for (var i = 0; i < this.cardinality.getCardinality(); i++) {
            if (node == this.neighbors[i]) {
                return true;
            }
        }
        return false;
    };
    /**
     * Get a list of occupied exit points on the node.
     *
     * @returns {MazeNode[]}
     */
    MazeNode.prototype.getOccupiedExitPoints = function () {
        var points = [];
        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (var i = 0; i < this.cardinality.getCardinality(); i++) {
            if (this.neighbors[i] != undefined) {
                points.push(i);
            }
        }
        return points;
    };
    /**
     * Get a list of unoccupied exit points on the node
     *
     * @returns {number[]}
     */
    MazeNode.prototype.getOpenExitPoints = function () {
        var points = [];
        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (var i = 0; i < this.cardinality.getCardinality(); i++) {
            if (this.neighbors[i] == undefined) {
                points.push(i);
            }
        }
        return points;
    };
    /**
     * Get an array of neighboring nodes.
     *
     * @boolean {includeOpenNodes}  Get the array with null nodes in-tact.  Useful for mapping.  Defaults to FALSE.
     * @returns {MazeNode[]}
     */
    MazeNode.prototype.getNeighbors = function (includeOpenNodes) {
        if (includeOpenNodes === void 0) { includeOpenNodes = false; }
        var points = [];
        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (var i = 0; i < this.cardinality.getCardinality(); i++) {
            if (this.neighbors[i] != undefined) {
                points.push(this.neighbors[i]);
            }
            else if (includeOpenNodes) {
                points.push(this.neighbors[i]);
            }
        }
        return points;
    };
    /**
     * Find out whether an entry/exit point on the node is empty.
     *
     * @param {number} point
     * @returns {boolean}
     */
    MazeNode.prototype.isPointOpen = function (point) {
        this.cardinality.validatePosition(point);
        return (this.neighbors[point] === undefined);
    };
    /**
     * Set the coordinates for this node
     *
     * @param {MazeCoordinates} coordinates
     * @returns {this}
     */
    MazeNode.prototype.setCoordinates = function (coordinates) {
        this.coordinates = coordinates;
        return this;
    };
    /**
     * Get the coordinates for this node
     * @returns {MazeCoordinates}
     */
    MazeNode.prototype.getCoordinates = function () {
        return this.coordinates;
    };
    return MazeNode;
}());
exports.MazeNode = MazeNode;
