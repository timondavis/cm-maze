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
        if (mazeData) {
            this.state = mazeData;
        }
        else {
            this.state = {
                cardinality: undefined,
                currentNode: undefined,
                dimensions: [],
                finish: undefined,
                id: Maze.generateKey(),
                nodes: {},
                start: undefined
            };
        }
    }
    Object.defineProperty(Maze.prototype, "id", {
        /**
         * Get the unique GUID for this maze
         */
        get: function () {
            return this.state.id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the cardinality behavior for nodes on this maze.
     *
     * @param {CardinalityBehavior} cardinality
     */
    Maze.prototype.setCardinality = function (cardinality) {
        this.state.cardinality = cardinality;
    };
    /**
     * Get the cardinality  for nodes on this maze.
     *
     * @returns {Cardinality}
     */
    Maze.prototype.getCardinality = function () {
        return this.state.cardinality;
    };
    /**
     * Assign a "dictionary" of maze nodes to this maze.
     *
     * @param {{[p: string]: MazeNode}} nodes
     */
    Maze.prototype.setNodes = function (nodes) {
        this.state.nodes = nodes;
    };
    /**
     * Get the "dictionary" of maze nodes contained in this maze.
     * @returns {{[p: string]: MazeNode}}
     */
    Maze.prototype.getNodes = function () {
        return this.state.nodes;
    };
    /**
     * Get the Maze Node with the given ID, if it exists.  Returns null if not found.
     * @param mazeNodeId
     */
    Maze.prototype.getNodeWithId = function (mazeNodeId) {
        if (this.containsNodeWithId(mazeNodeId)) {
            return this.state.nodes[mazeNodeId];
        }
        return null;
    };
    /**
     * Does the maze node dictionary have an entry with the given ID?
     * @param mazeNodeId
     */
    Maze.prototype.containsNodeWithId = function (mazeNodeId) {
        var nodeIdFound = false;
        Object.keys(this.state.nodes).forEach(function (key) {
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
            nodesArray.push(_this.state.nodes[key]);
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
        if (demandUniqueLocations && this.getNodeAtLocation(mazeNode.location)) {
            throw "Duplicate location assignment on Maze nodes";
        }
        this.state.nodes[mazeNode.id] = mazeNode;
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
        var keys = Object.keys(this.state.nodes);
        var tryNode = null;
        var foundNode = null;
        var key = "";
        for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            key = keys[keyIndex];
            tryNode = this.getNodeWithId(key);
            if (tryNode && tryNode.location.toString() === location.toString()) {
                foundNode = this.state.nodes[key];
                break;
            }
        }
        return foundNode;
    };
    /**
     * Get a random node from the maze.
     */
    Maze.prototype.getRandomNode = function () {
        var randomIndex = Math.floor(Math.random() * (this.getNodesArray().length - 1));
        return this.getNodesArray()[randomIndex];
    };
    /**
     * Assign the indicated node a 'starting point' status.
     *
     * @param {MazeNode} node
     */
    Maze.prototype.setStartNode = function (node) {
        this.state.start = node;
    };
    /**
     * Get the node which is defined as the 'starting point', if available.
     *
     * @returns {MazeNode}
     */
    Maze.prototype.getStartNode = function () {
        return this.state.start;
    };
    /**
     * Assign the indicated node a 'finishing point' status.
     *
     * @param {MazeNode} node
     */
    Maze.prototype.setFinishNode = function (node) {
        this.state.finish = node;
    };
    /**
     * Get the node which is defined as the 'finishing point', if available.
     *
     * @returns {MazeNode}
     */
    Maze.prototype.getFinishNode = function () {
        return this.state.finish;
    };
    /**
     * Get the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6 (y axis)) will
     * return [4, 6].
     *
     * @returns {number[]}
     */
    Maze.prototype.getDimensions = function () {
        return this.state.dimensions;
    };
    /**
     * Set the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6(y axis)) will
     * be assigned with an array defined as [4, 6].
     *
     * @returns {number[]}
     */
    Maze.prototype.setDimensions = function (dimensions) {
        this.state.dimensions = dimensions;
    };
    /**
     * Get the total number of nodes belonging to this maze.
     * @returns {number}
     */
    Maze.prototype.getSize = function () {
        return Object.keys(this.state.nodes).length;
    };
    /**
     * Set the 'current' node pointer at the indicated node.
     *
     * @param {MazeNode} node
     */
    Maze.prototype.setCurrentNode = function (node) {
        this.state.currentNode = node;
    };
    /**
     * Get the 'current' node pointer at the indicated node.
     * @returns {MazeNode}
     */
    Maze.prototype.getCurrentNode = function () {
        return this.state.currentNode;
    };
    Maze.prototype.getLocationKeyIndex = function () {
        var _this = this;
        var node;
        var location;
        var mazeArray = this.prepareMazeIndexArray();
        Object.keys(this.getNodes()).forEach(function (key) {
            node = _this.getNodeWithId(key);
            location = node.location;
            mazeArray[location.position[0]][location.position[1]] = node;
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
        if (this.state.currentNode.isConnectionPointOccupied(direction)) {
            this.state.currentNode = this.getNodeWithId(this.state.currentNode.getNeighborIdAt(direction));
            return this.state.currentNode;
        }
        return false;
    };
    Maze.prototype.prepareMazeIndexArray = function () {
        var mazeArray = [];
        for (var x = 0; x < this.state.dimensions[0]; x++) {
            mazeArray[x] = [];
            for (var y = 0; y < this.state.dimensions[1]; y++) {
                mazeArray[x][y] = null;
            }
        }
        return mazeArray;
    };
    Maze.prototype.generate2DMazeIndex = function (mazeArray) {
        var index = new Map();
        for (var x = 0; x < this.state.dimensions[0]; x++) {
            for (var y = 0; y < this.state.dimensions[1]; y++) {
                if (mazeArray[x][y] !== null) {
                    index.set(mazeArray[x][y].location.toString(), mazeArray[x][y]);
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
