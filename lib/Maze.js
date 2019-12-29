"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Maze
 *
 * A traverse-able maze, which manifests as a graph of interconnected nodes.
 */
var Maze = /** @class */ (function () {
    function Maze(mazeData) {
        if (mazeData === void 0) { mazeData = null; }
        /**
         * A "Dictionary" of nodes in the maze, indexed by string ( @see MazeNode.getLocation().toString() )
         *
         * @type {{ [key:string] : MazeNode }}
         */
        this.nodes = {};
        /**
         * Contains the size of the range for each dimension of the maze.
         * @type {any[]}
         */
        this.dimensions = [];
        if (mazeData === null) {
            return;
        }
        this.cardinality = mazeData.cardinality;
        this.id = Maze.generateKey();
    }
    Object.defineProperty(Maze.prototype, "size", {
        get: function () {
            return Object.keys(this.nodes).length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the unique GUID for this maze
     */
    Maze.prototype.getId = function () {
        return this.id;
    };
    /**
     * Set the cardinality behavior for nodes on this maze.
     *
     * @param {CardinalityBehavior} cardinality
     */
    Maze.prototype.setCardinality = function (cardinality) {
        this.cardinality = cardinality;
    };
    /**
     * Get the cardinality  for nodes on this maze.
     *
     * @returns {Cardinality}
     */
    Maze.prototype.getCardinality = function () {
        return this.cardinality;
    };
    /**
     * Assign a "dictionary" of maze nodes to this maze.
     *
     * @param {{[p: string]: MazeNode}} nodes
     */
    Maze.prototype.setNodes = function (nodes) {
        this.nodes = nodes;
    };
    /**
     * Get the "dictionary" of maze nodes contained in this maze.
     * @returns {{[p: string]: MazeNode}}
     */
    Maze.prototype.getNodes = function () {
        return this.nodes;
    };
    /**
     * Get the Maze Node with the given ID, if it exists.  Returns null if not found.
     * @param mazeNodeId
     */
    Maze.prototype.getNodeWithId = function (mazeNodeId) {
        if (this.containsNodeWithId(mazeNodeId)) {
            return this.nodes[mazeNodeId];
        }
        return null;
    };
    /**
     * Does the maze node dictionary have an entry with the given ID?
     * @param mazeNodeId
     */
    Maze.prototype.containsNodeWithId = function (mazeNodeId) {
        var nodeIdFound = false;
        Object.keys(this.nodes).forEach(function (key) {
            if (key === mazeNodeId) {
                nodeIdFound = true;
            }
        });
        return nodeIdFound;
    };
    /**
     * Get all nodes as an array instead of a map (which is the native structure).
     */
    Maze.prototype.getNodesArray = function () {
        var _this = this;
        var nodesArray;
        nodesArray = [];
        Object.keys(this.getNodes()).forEach(function (key) {
            nodesArray.push(_this.nodes[key]);
        });
        return nodesArray;
    };
    /**
     * Add a node to the node array
     * @param key
     * @param mazeNode
     */
    Maze.prototype.addNode = function (mazeNode, demandUniqueLocations) {
        if (demandUniqueLocations === void 0) { demandUniqueLocations = true; }
        if (demandUniqueLocations && this.getNodeAtLocation(mazeNode.getLocation())) {
            throw "Duplicate location assignment on Maze nodes";
        }
        this.nodes[mazeNode.getId()] = mazeNode;
    };
    /**
     * Iterate through the maze nodes by calling in a callback function.  Callback
     * function will be processed on each MazeNode in the collection.
     *
     * @param callback (node: MazeNode, key: string, nodes: { [key: string] : MazeNode }) => void
     */
    Maze.prototype.forEachNode = function (callback) {
        var _this = this;
        Object.keys(this.getNodes()).forEach(function (key) {
            callback(_this.getNodes()[key], key, _this.getNodes());
        });
    };
    /**
     * Get the MazeNode at the given location, if available.
     *
     * @param {NodeLocation} location
     * @returns {MazeNode}
     */
    Maze.prototype.getNodeAtLocation = function (location) {
        var keys = Object.keys(this.nodes);
        var tryNode = null;
        var foundNode = null;
        var key = "";
        for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            key = keys[keyIndex];
            tryNode = this.getNodeWithId(key);
            if (tryNode && tryNode.getLocation().toString() === location.toString()) {
                foundNode = this.nodes[key];
                break;
            }
        }
        return foundNode;
    };
    /**
     * Assign the indicated node a 'starting point' status.
     *
     * @param {MazeNode} node
     */
    Maze.prototype.setStartNode = function (node) {
        this.start = node;
    };
    /**
     * Get the node which is defined as the 'starting point', if available.
     *
     * @returns {MazeNode}
     */
    Maze.prototype.getStartNode = function () {
        return this.start;
    };
    /**
     * Assign the indicated node a 'finishing point' status.
     *
     * @param {MazeNode} node
     */
    Maze.prototype.setFinishNode = function (node) {
        this.finish = node;
    };
    /**
     * Get the node which is defined as the 'finishing point', if available.
     *
     * @returns {MazeNode}
     */
    Maze.prototype.getFinishNode = function () {
        return this.finish;
    };
    /**
     * Get the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6 (y axis)) will
     * return [4, 6].
     *
     * @returns {number[]}
     */
    Maze.prototype.getDimensions = function () {
        return this.dimensions;
    };
    /**
     * Set the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6(y axis)) will
     * be assigned with an array defined as [4, 6].
     *
     * @returns {number[]}
     */
    Maze.prototype.setDimensions = function (dimensions) {
        this.dimensions = dimensions;
    };
    /**
     * Get the total number of nodes belonging to this maze.
     * @returns {number}
     */
    Maze.prototype.getSize = function () {
        return this.size;
    };
    /**
     * Set the 'current' node pointer at the indicated node.
     *
     * @param {MazeNode} node
     */
    Maze.prototype.setCurrentNode = function (node) {
        this.currentNode = node;
    };
    /**
     * Get the 'current' node pointer at the indicated node.
     * @returns {MazeNode}
     */
    Maze.prototype.getCurrentNode = function () {
        return this.currentNode;
    };
    Maze.prototype.getLocationKeyIndex = function () {
        var _this = this;
        var node;
        var location;
        var mazeArray = this.prepareMazeIndexArray();
        Object.keys(this.getNodes()).forEach(function (key) {
            node = _this.getNodeWithId(key);
            location = node.getLocation();
            mazeArray[location.getPosition()[0]][location.getPosition()[1]] = node;
        });
        return this.generate2DMazeIndex(mazeArray);
    };
    /**
     * Move the 'current' node pointer for this maze in the indicated direction, if available.  Returns
     * the new node if successful, or otherwise FALSE
     *
     * @param {number} direction
     * @returns {MazeNode | boolean}
     */
    Maze.prototype.move = function (direction) {
        if (this.currentNode.isConnectionPointOccupied(direction)) {
            this.currentNode = this.getNodeWithId(this.currentNode.getNeighborIdAt(direction));
            return this.currentNode;
        }
        return false;
    };
    Maze.prototype.prepareMazeIndexArray = function () {
        var mazeArray = [];
        for (var x = 0; x < this.dimensions[0]; x++) {
            mazeArray[x] = [];
            for (var y = 0; y < this.dimensions[1]; y++) {
                mazeArray[x][y] = null;
            }
        }
        return mazeArray;
    };
    Maze.prototype.generate2DMazeIndex = function (mazeArray) {
        var index = new Map();
        for (var x = 0; x < this.dimensions[0]; x++) {
            for (var y = 0; y < this.dimensions[1]; y++) {
                if (mazeArray[x][y] !== null) {
                    index.set(mazeArray[x][y].getLocation().toString(), mazeArray[x][y]);
                }
            }
        }
        return index;
    };
    /**
     * Generate a unique key
     */
    Maze.generateKey = function () {
        var uuid = require('uuid/v4');
        return uuid();
    };
    return Maze;
}());
exports.Maze = Maze;
