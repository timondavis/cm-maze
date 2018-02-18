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
     * @param {number} exitPosition     The cardinality position you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will position back to this node.
     * @returns {MazeNode}
     */
    MazeNode.prototype.connectTo = function (node, exitPosition, autoConnect) {
        if (autoConnect === void 0) { autoConnect = true; }
        if (exitPosition >= this.cardinality.getCardinality() || exitPosition < 0) {
            throw ("Indicated exitPosition value exceeds maximum MazeNode cardinality range");
        }
        if (!this.neighbors[exitPosition] === undefined) {
            throw ("Indicated exitPosition exitPosition is already occupied.  Two exits/entries may not occupy the same exitPosition");
        }
        this.neighbors[exitPosition] = node;
        if (autoConnect) {
            var entryPosition = this.cardinality.getOpposingPoint(exitPosition);
            if (autoConnect && node.isPositionOccupied(entryPosition)) {
                throw ("Cannot auto-connect to proposed MazeNode.  The automated connectTo node entry exitPosition is occupied.");
            }
            node.connectTo(this, entryPosition, false);
        }
        return this;
    };
    /**
     * Find out of the indicated exitPosition of cardinality is occupied on this node
     *
     * @param {number} exitPosition
     * @returns {boolean}
     */
    MazeNode.prototype.isPositionOccupied = function (exitPosition) {
        return (this.neighbors[exitPosition] === null);
    };
    /**
     * Get a connected node by indicating the exit (cardinality position) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {MazeNode}
     */
    MazeNode.prototype.getNeighborAt = function (exitPosition) {
        if (exitPosition >= this.cardinality.getCardinality() || exitPosition < 0) {
            throw ("Indicated cardinality position is outside of the valid range");
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
     * Get a list of occupied exit positions on the node.
     *
     * @returns {MazeNode[]}
     */
    MazeNode.prototype.getOccupiedExitPoints = function () {
        var positions = [];
        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (var i = 0; i < this.cardinality.getCardinality(); i++) {
            if (this.neighbors[i] != undefined) {
                positions.push(i);
            }
        }
        return positions;
    };
    /**
     * Get a list of unoccupied exit positions on the node
     *
     * @returns {number[]}
     */
    MazeNode.prototype.getOpenExitPoints = function () {
        var positions = [];
        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (var i = 0; i < this.cardinality.getCardinality(); i++) {
            if (this.neighbors[i] == undefined) {
                positions.push(i);
            }
        }
        return positions;
    };
    /**
     * Get an array of neighboring nodes.
     *
     * @boolean {includeOpenNodes}  Get the array with null nodes in-tact.  Useful for mapping.  Defaults to FALSE.
     * @returns {MazeNode[]}
     */
    MazeNode.prototype.getNeighbors = function (includeOpenNodes) {
        if (includeOpenNodes === void 0) { includeOpenNodes = false; }
        var positions = [];
        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (var i = 0; i < this.cardinality.getCardinality(); i++) {
            if (this.neighbors[i] != undefined) {
                positions.push(this.neighbors[i]);
            }
            else if (includeOpenNodes) {
                positions.push(this.neighbors[i]);
            }
        }
        return positions;
    };
    /**
     * Find out whether an entry/exit position on the node is empty.
     *
     * @param {number} position
     * @returns {boolean}
     */
    MazeNode.prototype.isPointOpen = function (position) {
        this.cardinality.validatePosition(position);
        return (this.neighbors[position] === undefined);
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
