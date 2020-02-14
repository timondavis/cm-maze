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
var ConcreteSerializable_1 = require("./ConcreteSerializable");
/**
 * @class MazeNode
 *
 * The MazeNode represents a node or 'room' in a maze.  It is designed to facilitate connection and traversal
 * to other MazeNode instances.
 */
var MazeNode = /** @class */ (function (_super) {
    __extends(MazeNode, _super);
    function MazeNode(cardinality, id, coordinates, maxConnections) {
        if (id === void 0) { id = null; }
        if (maxConnections === void 0) { maxConnections = null; }
        var _this = _super.call(this) || this;
        /**
         * Unique string key for maze node
         */
        _this._mazeNodeId = "";
        /**
         * The name of this node
         *
         * @type {string}
         */
        _this._name = "";
        _this._cardinality = cardinality;
        _this._neighbors = new Array(cardinality.getConnectionPointCount());
        _this._mazeNodeId = (id) ? id : MazeNode.generateKey();
        _this._maxExits = (maxConnections) ? maxConnections : _this.cardinality.getConnectionPointCount();
        _this._coordinates = (coordinates) ? coordinates : _this.cardinality.generateNodeLocation();
        MazeNode.indexIdCounter++;
        _this._indexId = MazeNode.indexIdCounter;
        _this.contents = new Map();
        return _this;
    }
    Object.defineProperty(MazeNode.prototype, "id", {
        get: function () {
            return this._mazeNodeId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeNode.prototype, "indexId", {
        get: function () {
            return this._indexId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeNode.prototype, "location", {
        get: function () {
            return this._coordinates;
        },
        set: function (value) {
            this._coordinates = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeNode.prototype, "locationId", {
        get: function () {
            return this.location.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeNode.prototype, "neighbors", {
        get: function () {
            return this._neighbors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeNode.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeNode.prototype, "maxConnections", {
        get: function () {
            return this._maxExits;
        },
        set: function (maxConnections) {
            this._maxExits = maxConnections;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MazeNode.prototype, "cardinality", {
        get: function () {
            return this._cardinality;
        },
        enumerable: true,
        configurable: true
    });
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
                "Indicated node reports that given exit is not available for connection..");
        }
        if (exitPosition >= this.cardinality.getConnectionPointCount() || exitPosition < 0) {
            throw ("Indicated exitPosition value exceeds maximum MazeNode cardinality range");
        }
        if (!this.neighbors[exitPosition] === undefined) {
            throw ("Indicated exitPosition exitPosition is already occupied.  Two exits/entries may not occupy the same exitPosition");
        }
        this.neighbors[exitPosition] = node.id;
        if (autoConnect) {
            if (!node.isConnectionPointOpen(node.cardinality.getOpposingConnectionPoint(exitPosition))) {
                throw ("Two-Way conneciton failed.  Indicated node will not tolerate any more additonal connections, " +
                    "maximum reached.");
            }
            var entryPosition = this.cardinality.getOpposingConnectionPoint(exitPosition);
            node.connectTo(this, entryPosition, false);
            if (MazeNode.debug) {
                console.log("CONNECTING NODES\n");
                console.log(this.name + " (" + exitPosition + ")  <=> (" + entryPosition + ") " + node.name);
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
     * Find out if the indicated node indicated to this node directly, as a neighbor
     *
     * @param {MazeNode} node
     * @returns {boolean}
     */
    MazeNode.prototype.isNeighborsWith = function (node) {
        for (var i = 0; i < this.cardinality.getConnectionPointCount(); i++) {
            if (node.id == this.neighbors[i]) {
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
    MazeNode.prototype.getAvailableConnectionPoints = function () {
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
        if (this.maxConnections >= 0 && (this.getOccupiedConnectionPoints().length + 1) > this.maxConnections) {
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
     * Stringify the output for human console consumption
     *
     * @returns {string}
     */
    MazeNode.prototype.toString = function () {
        var output = "";
        var occupiedExitPoints = this.getOccupiedConnectionPoints();
        output += this.name + ": \n";
        output += "Coordinates: " + this.location.toString() + "\n";
        output += "Exits:";
        for (var i = 0; i < occupiedExitPoints.length; i++) {
            output += " " + occupiedExitPoints[i] + " ";
        }
        output += "\n";
        output += "Max Exits: " + this.maxConnections;
        output += "\n\n";
        return output;
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
     * Index ID Incrementor
     */
    MazeNode.indexIdCounter = 0;
    /**
     * Debug Mode
     * @type {boolean}
     */
    MazeNode.debug = false;
    return MazeNode;
}(ConcreteSerializable_1.ConcreteSerializable));
exports.MazeNode = MazeNode;
