"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class MazeNode
 *
 * The MazeNode represents a node or 'room' in a maze.  It is designed to facilitate connection and traversal
 * to other MazeNode instances.
 */
var MazeNode = /** @class */ (function () {
    function MazeNode(cardinality, coordinates) {
        /**
         * The name of this node
         *
         * @type {string}
         */
        this.name = "";
        this.cardinality = cardinality;
        this.neighbors = new Array(cardinality.getConnectionPointCount());
        this.coordinates = (coordinates) ? coordinates : this.cardinality.generateNodeLocation();
        this.maxExits = -1;
    }
    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.  If either node is maxed out, no connection will be made.
     *
     * @param {MazeNode} node           The node to connect to this node
     * @param {number} exitPosition     The cardinality position you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will position back to this node.
     * @returns {MazeNode}
     */
    MazeNode.prototype.connectTo = function (node, exitPosition, autoConnect) {
        if (autoConnect === void 0) { autoConnect = true; }
        if (!this.isPointOpen(exitPosition)) {
            throw ("One-Way connection failed: " +
                "Indicated node will not tolerate any more additional connections - maximum reached.");
        }
        if (exitPosition >= this.cardinality.getConnectionPointCount() || exitPosition < 0) {
            throw ("Indicated exitPosition value exceeds maximum MazeNode cardinality range");
        }
        if (!this.neighbors[exitPosition] === undefined) {
            throw ("Indicated exitPosition exitPosition is already occupied.  Two exits/entries may not occupy the same exitPosition");
        }
        this.neighbors[exitPosition] = node;
        if (autoConnect) {
            if (!node.isPointOpen(node.getCardinality().getOpposingConnectionPoint(exitPosition))) {
                throw ("Two-Way conneciton failed.  Indicated node will not tolerate any more additonal connections, " +
                    "maximum reached.");
            }
            var entryPosition = this.cardinality.getOpposingConnectionPoint(exitPosition);
            node.connectTo(this, entryPosition, false);
            if (MazeNode.debug) {
                console.log("CONNECTING NODES\n");
                console.log(this.getName() + " (" + exitPosition + ")  <=> (" + entryPosition + ") " + node.getName());
            }
        }
        return this;
    };
    /**
     * Get a connected node by indicating the exit (cardinality position) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {MazeNode}
     */
    MazeNode.prototype.getNeighborAt = function (exitPosition) {
        if (exitPosition >= this.cardinality.getConnectionPointCount() || exitPosition < 0) {
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
        for (var i = 0; i < this.cardinality.getConnectionPointCount(); i++) {
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
        for (var i = 0; i < this.cardinality.getConnectionPointCount(); i++) {
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
        for (var i = 0; i < this.cardinality.getConnectionPointCount(); i++) {
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
        for (var i = 0; i < this.cardinality.getConnectionPointCount(); i++) {
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
        if (this.maxExits >= 0 && this.maxExits <= this.getOccupiedExitPoints().length) {
            return false;
        }
        this.cardinality.validateConnectionPoint(position);
        return (this.neighbors[position] === undefined);
    };
    /**
     * Find out whether an entry/exit position on the node is occupied
     * @param {number} position
     * @returns {boolean}
     */
    MazeNode.prototype.isPointOccupied = function (position) {
        this.cardinality.validateConnectionPoint(position);
        return (this.neighbors[position] !== undefined);
    };
    /**
     * Set the coordinates for this node
     *
     * @param {NodeLocation} coordinates
     * @returns {this}
     */
    MazeNode.prototype.setCoordinates = function (coordinates) {
        this.coordinates = coordinates;
        return this;
    };
    /**
     * Get the coordinates for this node
     * @returns {NodeLocation}
     */
    MazeNode.prototype.getCoordinates = function () {
        return this.coordinates;
    };
    /**
     * Get the cardinality behavior object associated with this node.
     * @returns {Cardinality}
     */
    MazeNode.prototype.getCardinality = function () {
        return this.cardinality;
    };
    /**
     * Stringify the output for human console consumption
     *
     * @returns {string}
     */
    MazeNode.prototype.toString = function () {
        var output = "";
        var occupiedExitPoints = this.getOccupiedExitPoints();
        output += this.getName() + ": \n";
        output += "Coordinates: " + this.getCoordinates().toString() + "\n";
        output += "Exits:";
        for (var i = 0; i < occupiedExitPoints.length; i++) {
            output += " " + occupiedExitPoints[i] + " ";
        }
        output += "\n";
        output += "Max Exits: " + this.getMaxExits();
        output += "\n\n";
        return output;
    };
    /**
     * Set the maximum amount of nodes that this node can connect to.
     *
     * @param {number} maxExits
     * @returns {MazeNode}
     */
    MazeNode.prototype.setMaxExits = function (maxExits) {
        this.maxExits = maxExits;
        return this;
    };
    /**
     * Get the maximum amount of nodes that this node can connect to.
     *
     * @returns {number}
     */
    MazeNode.prototype.getMaxExits = function () {
        return this.maxExits;
    };
    /**
     * Toggle debugging messages
     *
     * @param {boolean} toggle
     */
    MazeNode.toggleDebug = function (toggle) {
        if (toggle === undefined) {
            MazeNode.debug = !MazeNode.debug;
        }
        else {
            MazeNode.debug = toggle;
        }
    };
    /**
     * Debug Mode
     * @type {boolean}
     */
    MazeNode.debug = false;
    return MazeNode;
}());
exports.MazeNode = MazeNode;
