"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Maze
 *
 * A traverse-able maze, which manifests as a graph of interconnected nodes.
 */
var Maze = /** @class */ (function () {
    function Maze() {
        /**
         * A "Dictionary" of nodes in the maze, indexed by string ( @see MazeNode.getCoordinates().toString() )
         *
         * @type {{ [key:string] : MazeNode }}
         */
        this.nodes = {};
        /**
         * Contains the size of the range for each dimension of the maze.
         * @type {any[]}
         */
        this.dimensions = [];
    }
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
        this.size = Object.keys(nodes).length;
    };
    /**
     * Get the "dictionary" of maze nodes contained in this maze.
     * @returns {{[p: string]: MazeNode}}
     */
    Maze.prototype.getNodes = function () {
        return this.nodes;
    };
    /**
     * Get the MazeNode at the given location, if available.
     *
     * @param {NodeLocation} location
     * @returns {MazeNode}
     */
    Maze.prototype.getNode = function (location) {
        return this.nodes[location.toString()];
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
     * @returns {MazeNode | boolean}
     */
    Maze.prototype.getFinishNode = function () {
        if (typeof this.finish !== 'undefined') {
            return this.finish;
        }
        return false;
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
    /**
     * Move the 'current' node pointer for this maze in the indicated direction, if available.  Returns
     * the new node if successful, or otherwise FALSE
     *
     * @param {number} direction
     * @returns {MazeNode | boolean}
     */
    Maze.prototype.move = function (direction) {
        if (this.currentNode.isPointOccupied(direction)) {
            this.currentNode = this.currentNode.getNeighborAt(direction);
            return this.currentNode;
        }
        return false;
    };
    return Maze;
}());
exports.Maze = Maze;
