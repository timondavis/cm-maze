"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class MazeNode
 *
 * The MazeNode represents a node or 'room' in a maze.  It is designed to facilitate connection and traversal
 * to other MazeNode instances.
 */
var MazeNode = /** @class */ (function () {
    function MazeNode(cardinality, id, coordinates) {
        if (id === void 0) { id = null; }
        /**
         * The name of this node
         *
         * @type {string}
         */
        this.name = "";
        /**
         * Unique string key for maze node
         */
        this.mazeNodeId = "";
        this.cardinality = cardinality;
        this.neighbors = new Array(cardinality.getConnectionPointCount());
        this.coordinates = (coordinates) ? coordinates : this.cardinality.generateNodeLocation();
        this.maxExits = -1;
        this.mazeNodeId = (id) ? id : MazeNode.generateKey();
    }
    MazeNode.prototype.getId = function () {
        return this.mazeNodeId;
    };
    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.  If either node is maxed out, no connection will be made.
     *
     * @param {string} mazeNodeId           The node Id to connect to this node
     * @param {number} exitPosition     The cardinality position you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will position back to this node.
     * @returns {MazeNode}
     */
    MazeNode.prototype.connectTo = function (node, exitPosition, autoConnect) {
        if (autoConnect === void 0) { autoConnect = true; }
        if (!this.isConnectionPointOpen(exitPosition)) {
            throw ("One-Way connection failed: " +
                "Indicated node will not tolerate any more additional connections - maximum reached.");
        }
        if (exitPosition >= this.cardinality.getConnectionPointCount() || exitPosition < 0) {
            throw ("Indicated exitPosition value exceeds maximum MazeNode cardinality range");
        }
        if (!this.neighbors[exitPosition] === undefined) {
            throw ("Indicated exitPosition exitPosition is already occupied.  Two exits/entries may not occupy the same exitPosition");
        }
        this.neighbors[exitPosition] = node.getId();
        if (autoConnect) {
            if (!node.isConnectionPointOpen(node.getCardinality().getOpposingConnectionPoint(exitPosition))) {
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
     * @returns {string} Maze node ID
     */
    MazeNode.prototype.getNeighborIdAt = function (exitPosition) {
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
            if (node.getId() == this.neighbors[i]) {
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
    MazeNode.prototype.getOccupiedConnectionPoints = function () {
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
    MazeNode.prototype.getOpenConnectionPoints = function () {
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
     * Get an array of neighboring node ids.
     *
     * @boolean {includeOpenNodes}  Get the array with null nodes in-tact.  Useful for mapping.  Defaults to FALSE.
     * @returns {string[]}
     */
    MazeNode.prototype.getNeighborIds = function (includeOpenNodes) {
        if (includeOpenNodes === void 0) { includeOpenNodes = false; }
        var positions = [];
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
     * @param {number} point
     * @returns {boolean}
     */
    MazeNode.prototype.isConnectionPointOpen = function (point) {
        if (this.maxExits >= 0 && this.maxExits <= this.getOccupiedConnectionPoints().length) {
            return false;
        }
        this.cardinality.validateConnectionPoint(point);
        return (this.neighbors[point] === undefined);
    };
    /**
     * Find out whether an entry/exit position on the node is occupied
     * @param {number} point
     * @returns {boolean}
     */
    MazeNode.prototype.isConnectionPointOccupied = function (point) {
        this.cardinality.validateConnectionPoint(point);
        return (this.neighbors[point] !== undefined);
    };
    /**
     * @use Location
     * Set the coordinates for this node
     * @param {NodeLocation} coordinates
     * @returns {this}
     */
    MazeNode.prototype.setLocation = function (coordinates) {
        this.coordinates = coordinates;
        return this;
    };
    /**
     * @use Location
     * Get the coordinates for this node
     * @returns {NodeLocation}
     */
    MazeNode.prototype.getLocation = function () {
        return this.coordinates;
    };
    /**
     * Get a string ID for this location
     * @return {string}
     */
    MazeNode.prototype.getLocationId = function () {
        return this.getLocation().toString();
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
        var occupiedExitPoints = this.getOccupiedConnectionPoints();
        output += this.getName() + ": \n";
        output += "Coordinates: " + this.getLocation().toString() + "\n";
        output += "Exits:";
        for (var i = 0; i < occupiedExitPoints.length; i++) {
            output += " " + occupiedExitPoints[i] + " ";
        }
        output += "\n";
        output += "Max Exits: " + this.getMaxConnections();
        output += "\n\n";
        return output;
    };
    /**
     * Set the maximum amount of nodes that this node can connect to.
     *
     * @param {number} maxConnections
     * @returns {MazeNode}
     */
    MazeNode.prototype.setMaxConnections = function (maxConnections) {
        this.maxExits = maxConnections;
        return this;
    };
    /**
     * Get the maximum amount of nodes that this node can connect to.
     *
     * @returns {number}
     */
    MazeNode.prototype.getMaxConnections = function () {
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
     * Generate a unique key
     */
    MazeNode.generateKey = function () {
        var uuid = require('uuid/v4');
        return uuid();
    };
    /**
     * Debug Mode
     * @type {boolean}
     */
    MazeNode.debug = false;
    return MazeNode;
}());
exports.MazeNode = MazeNode;
