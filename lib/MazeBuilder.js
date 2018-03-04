"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MazeNode_1 = require("./MazeNode");
var CardinalityBehaviorFour2D_1 = require("./Behavior/CardinalityBehaviorFour2D");
var Maze_1 = require("./Maze");
/**
 * @class MazeBuilder
 *
 * Instanceable builder class which generates randomized Mazes in their most basic form.  This class can be
 * extended to handle the creation of a specialized maze or a derivative thereof.
 */
var MazeBuilder = /** @class */ (function () {
    function MazeBuilder(cardinalityBehavior, complexity) {
        if (complexity === void 0) { complexity = 100; }
        /**
         * A "Dictionary" of nodes in the generated maze, referenced by a string (@see MazeCoordinates.toString() );
         * @type {{ [key:stirng] : MazeNode }}
         */
        this.occupiedCoordinates = {};
        /**
         * Inrementing count of how many -considerations- have been made to build nodes.  Here for convenience (namely
         * in labelling).  Don't rely on this value for anything consistent.
         *
         * @type {number}
         */
        this.nodeCounter = 0;
        this.cardinalityBehavior = (cardinalityBehavior) ? cardinalityBehavior : new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D();
        this.complexity = complexity;
    }
    /**
     * Build a new randomized maze instance based on local instance configurations
     *
     * @returns {Maze}
     */
    MazeBuilder.prototype.buildMaze = function () {
        var startingCoordinates = this.cardinalityBehavior.generateCoordinates();
        this.entry = new MazeNode_1.MazeNode(this.cardinalityBehavior);
        this.nodeCounter++;
        this.entry.setName(this.nodeCounter.toString());
        this.occupiedCoordinates[startingCoordinates.toString()] = this.entry;
        this.generateRandomPathFrom(this.entry);
        for (var i = 0; i < this.complexity; i++) {
            this.seekAndGenerateRandomPath(this.entry);
        }
        var m = new Maze_1.Maze();
        m.setCardinalityBehavior(this.cardinalityBehavior);
        m.setNodes(this.normalizeNodeCoordinates());
        m.setCurrentNode(this.entry);
        m.setStartNode(this.entry);
        m.setFinishNode(this.selectRandomNode());
        m.setDimensions(this.getDimensions());
        return m;
    };
    /**
     * Convenience function (static) for shorthand randomization.
     *
     * @TODO !BUG! max cannot be reached by this algorithm, but instead max - 1
     *
     * @param {number} max
     * @param {number} min
     * @returns {number}
     */
    MazeBuilder.rand = function (max, min) {
        if (max === void 0) { max = 100; }
        if (min === void 0) { min = 1; }
        var number = Math.floor(Math.random() * max) + min;
        return Math.min(max, number);
    };
    /**
     * Generate a new random path sourcing from the indicated node.
     *
     * @param {MazeNode} pointer
     * @param {number} depth
     * @returns {MazeBuilder}
     */
    MazeBuilder.prototype.generateRandomPathFrom = function (pointer, depth) {
        if (depth === void 0) { depth = this.complexity; }
        var newDirection = -1;
        var openExits = [];
        var occupiedExits;
        var nextExitPosition;
        // Create node connections (to new or existing nodes) - 1 for each level of depth declared.
        for (var i = 0; i < depth; i++) {
            // Pick a random exit point on this node.  If there is no open exit, traverse to the next node and continue.
            openExits = pointer.getOpenExitPoints();
            if (openExits.length == 0) {
                pointer = this.hopToNextNode(pointer);
                continue;
            }
            newDirection = openExits[MazeBuilder.rand(openExits.length, 0)];
            // Start by attempting to connect to a random new or existing node gracefully...
            nextExitPosition = this.buildNextNodeOnRandomPath(pointer, newDirection);
            if (nextExitPosition >= 0) {
                pointer = pointer.getNeighborAt(nextExitPosition);
                continue;
            }
            // ... look for alternative ways of extending to another node if necessary...
            nextExitPosition = this.tryNodeConnectionFromEveryAvailableExit(pointer, openExits);
            if (nextExitPosition >= 0) {
                pointer = pointer.getNeighborAt(nextExitPosition);
                continue;
            }
            // .. retreat if unsuccessful, fallback to a previously connected node ...
            occupiedExits = pointer.getOccupiedExitPoints();
            if (occupiedExits.length > 0) {
                pointer = pointer.getNeighborAt(MazeBuilder.rand(occupiedExits.length - 1, 0));
            }
            // .. and, finally, surrender if we can't find any valid connected nodes.
            break;
        }
        return this;
    };
    /**
     * Builder will seek a random node within the defined parameters.  Once node is identified, it will branch
     * out a new randomized path of nodes.
     *
     * @param {MazeNode} startingNode
     * @param {number} maxDepth
     * @returns {MazeBuilder}
     */
    MazeBuilder.prototype.seekAndGenerateRandomPath = function (startingNode, maxDepth) {
        if (maxDepth === void 0) { maxDepth = this.complexity; }
        var depth = MazeBuilder.rand(maxDepth, 0);
        var neighbors;
        var pointer = startingNode;
        for (var i = 0; i < depth; i++) {
            neighbors = pointer.getNeighbors();
            if (neighbors.length > 0) {
                pointer = neighbors[MazeBuilder.rand(neighbors.length, 0)];
            }
            else
                break;
        }
        if (pointer) {
            this.generateRandomPathFrom(pointer);
        }
        return this;
    };
    /**
     * Get the collection of declared coordinates tracked in the map building process.
     *
     * @return {{[key:string] : MazeNode}}
     */
    MazeBuilder.prototype.getCoordinatesCollection = function () {
        return this.occupiedCoordinates;
    };
    /**
     * Try every available exit on the node for connection to a new or existing node.  Return the index of the
     * successful connections exit point when new connection is made.  If no connection is made, returns -1.
     *
     * @param {MazeNode} pointer
     * @param {number[]} openExits
     * @returns {number}
     */
    MazeBuilder.prototype.tryNodeConnectionFromEveryAvailableExit = function (pointer, openExits) {
        var validExitIndexFound = false;
        var newDirection = -1;
        var candidateExitPosition = -1;
        for (var i = 0; i < openExits.length; i++) {
            var index = MazeBuilder.rand(openExits.length, 0);
            newDirection = openExits[index];
            openExits = openExits.splice(index, 1);
            candidateExitPosition = this.buildNextNodeOnRandomPath(pointer, newDirection);
            if (candidateExitPosition > 0) {
                validExitIndexFound = true;
                break;
            }
        }
        return (validExitIndexFound) ? candidateExitPosition : -1;
    };
    /**
     * Convenince function to simply get the next node WHEN ALL EXIT POINTS ARE CLAIMED
     *
     * @pre  All exit points on the node must connect to other nodes.  Ignoring this precondition
     * may result in exceptions being thrown.
     *
     * @param {MazeNode} pointer
     */
    MazeBuilder.prototype.hopToNextNode = function (pointer) {
        return pointer.getNeighborAt(MazeBuilder.rand(this.cardinalityBehavior.getCardinality(), 0));
    };
    /**
     * Finds out if there is a neighboring node at the indicated exit.  If a node is found, returns that node,
     * otherwise generates a new node and returns that.  Coordinates will be set on the node returned.
     *
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {MazeNode}
     */
    MazeBuilder.prototype.getNextNodeAtExit = function (pointer, exitPoint) {
        var lastCoordinates;
        var nextCoordinates;
        var tempNextNode;
        // Determine coordinates for the new and existing nodes
        lastCoordinates = pointer.getCoordinates();
        nextCoordinates = this.cardinalityBehavior.getNextCoordinates(lastCoordinates, exitPoint);
        // If the next node's coordinate is already taken point our Next Node to that node.  Otherwise,
        // if the space in unoccupied, create a new node.
        if (this.occupiedCoordinates.hasOwnProperty(nextCoordinates.toString())) {
            tempNextNode = this.occupiedCoordinates[nextCoordinates.toString()];
        }
        else {
            tempNextNode = new MazeNode_1.MazeNode(this.cardinalityBehavior);
            tempNextNode.setCoordinates(nextCoordinates);
            tempNextNode.setMaxExits(MazeBuilder.rand(this.cardinalityBehavior.getCardinality(), 1));
            this.nodeCounter++;
            tempNextNode.setName(this.nodeCounter.toString());
        }
        return tempNextNode;
    };
    /**
     * Convenience method for producing (or finding), and then reporting the exit point connecting to,
     * the next node on a given path. Returns the index of the connected path, or -1 if failure took place
     *
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {number}
     */
    MazeBuilder.prototype.buildNextNodeOnRandomPath = function (pointer, exitPoint) {
        var tempNextNode;
        // Get or create the node at the next position.
        tempNextNode = this.getNextNodeAtExit(pointer, exitPoint);
        // If the logical entry point is open on the next node, we'll connect the nodes and traverse
        // to the next node.
        if (pointer.isPointOpen(exitPoint) && tempNextNode.isPointOpen(this.cardinalityBehavior.getOpposingPoint(exitPoint))) {
            pointer.connectTo(tempNextNode, exitPoint);
            pointer = tempNextNode;
            this.occupiedCoordinates[pointer.getCoordinates().toString()] = pointer;
            return exitPoint;
        }
        return -1;
    };
    /**
     * If the indicated dictionary has negative node values (a natural result of the current version of
     * the generation process), push all of the node coordinates up so that 0,0 represents the top left.
     *
     * This ultimately updates the map so that it will fit nicely within quadrant IV of the cartesian graph.
     *
     * @returns {{[p: string]: MazeNode}}
     */
    MazeBuilder.prototype.normalizeNodeCoordinates = function () {
        var _this = this;
        var adjustedCoordinates = {};
        var dimensionsUsed = this.getCoordinatesCollection()["[0,0]"].getCoordinates().getDimensions();
        var minCoordinateValuesInrange = [];
        var currentValue;
        var currentMin = 0;
        var adjustmentsByIndex = [];
        var currentNode;
        var _loop_1 = function (i) {
            Object.keys(this_1.getCoordinatesCollection()).forEach(function (key) {
                currentValue = _this.getCoordinatesCollection()[key].getCoordinates().getDimension(i);
                currentMin = (currentValue < currentMin) ? currentValue : currentMin;
            });
            minCoordinateValuesInrange[i] = currentMin;
        };
        var this_1 = this;
        // O(d * n)
        for (var i = 0; i < dimensionsUsed; i++) {
            _loop_1(i);
        }
        // O(d)
        for (var i = 0; i < dimensionsUsed; i++) {
            adjustmentsByIndex[i] = Math.abs(minCoordinateValuesInrange[i]);
        }
        var _loop_2 = function (i) {
            Object.keys(this_2.getCoordinatesCollection()).forEach(function (key) {
                currentNode = _this.getCoordinatesCollection()[key];
                currentNode.getCoordinates().adjustDimension(i, adjustmentsByIndex[i]);
            });
        };
        var this_2 = this;
        // O(d * n)
        for (var i = 0; i < dimensionsUsed; i++) {
            _loop_2(i);
        }
        // O(n)
        Object.keys(this.getCoordinatesCollection()).forEach(function (key) {
            currentNode = _this.getCoordinatesCollection()[key];
            adjustedCoordinates[currentNode.getCoordinates().toString()] = currentNode;
        });
        return adjustedCoordinates;
    };
    /**
     * Get the size of each dimension of this maze (for example, if
     * width = 6 and length = 4, this function will return [6, 4]).
     *
     * @returns {number[]}
     */
    MazeBuilder.prototype.getDimensions = function () {
        var _this = this;
        var dimensionsUsed = this.entry.getCoordinates().getDimensions();
        var node;
        var currentValue;
        var maxValue;
        var minValue;
        var dimensions = [];
        var _loop_3 = function (i) {
            maxValue = 0;
            minValue = 0;
            Object.keys(this_3.getCoordinatesCollection()).forEach(function (key) {
                node = _this.getCoordinatesCollection()[key];
                currentValue = node.getCoordinates().getDimension(i);
                maxValue = (currentValue > maxValue) ? currentValue : maxValue;
                minValue = (currentValue < minValue) ? currentValue : minValue;
            });
            dimensions.push((maxValue - minValue) + 1);
        };
        var this_3 = this;
        for (var i = 0; i < dimensionsUsed; i++) {
            _loop_3(i);
        }
        return dimensions;
    };
    /**
     * Select a random node on the existing maze.
     *
     * @returns {MazeNode}
     */
    MazeBuilder.prototype.selectRandomNode = function () {
        var coordinateList = Object.keys(this.getCoordinatesCollection());
        var index = MazeBuilder.rand(coordinateList.length, 0);
        return this.getCoordinatesCollection()[coordinateList[index]];
    };
    return MazeBuilder;
}());
exports.MazeBuilder = MazeBuilder;
