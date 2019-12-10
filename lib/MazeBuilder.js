"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MazeNode_1 = require("./MazeNode");
var Compass4_1 = require("./Behavior/Compass4");
var Maze_1 = require("./Maze");
/**
 * @class MazeBuilder
 *
 * Instanceable builder class which generates randomized Mazes in their most basic form.  This class can be
 * extended to handle the creation of a specialized maze or a derivative thereof.
 */
var MazeBuilder = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {Cardinality} cardinality
     * @param {number} complexity
     */
    function MazeBuilder(cardinality, complexity) {
        if (complexity === void 0) { complexity = 100; }
        this.cardinality = (cardinality) ? cardinality : new Compass4_1.Compass4();
        this.complexity = complexity;
    }
    /**
     * Build a new randomized maze instance based on local instance configurations
     *
     * @returns {Maze}
     */
    MazeBuilder.prototype.buildMaze = function () {
        this.maze = new Maze_1.Maze();
        // Start entry node at 0,0
        var startingCoordinates = this.cardinality.generateNodeLocation();
        this.entry = new MazeNode_1.MazeNode(this.cardinality, "Origin");
        this.maze.addNode(this.entry);
        this.generateRandomPathFrom(this.entry);
        for (var i = 0; i < this.complexity; i++) {
            this.seekAndGenerateRandomPath(this.entry);
        }
        this.maze.setCardinality(this.cardinality);
        this.maze.setNodes(this.normalizeNodeCoordinates());
        this.maze.setCurrentNode(this.entry);
        this.maze.setStartNode(this.entry);
        this.maze.setFinishNode(this.selectRandomNode());
        this.maze.setDimensions(this.getDimensions());
        return this.maze;
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
        max += 1;
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
            openExits = pointer.getOpenConnectionPoints();
            if (openExits.length == 0) {
                pointer = this.hopToNextNode(pointer);
                continue;
            }
            newDirection = openExits[MazeBuilder.rand(openExits.length - 1, 0)];
            // Start by attempting to connect to a random new or existing node gracefully...
            nextExitPosition = this.buildNextNodeOnRandomPath(pointer, newDirection);
            if (nextExitPosition >= 0) {
                var pointerId = pointer.getNeighborIdAt(nextExitPosition);
                pointer = this.maze.getNodeWithId(pointerId);
                continue;
            }
            // ... look for alternative ways of extending to another node if necessary...
            nextExitPosition = this.tryNodeConnectionFromEveryAvailableExit(pointer, openExits);
            if (nextExitPosition >= 0) {
                var pointerId = pointer.getNeighborIdAt(nextExitPosition);
                pointer = this.maze.getNodeWithId(pointerId);
                continue;
            }
            // .. retreat if unsuccessful, fallback to a previously connected node ...
            occupiedExits = pointer.getOccupiedConnectionPoints();
            if (occupiedExits.length > 0) {
                var pointerId = pointer.getNeighborIdAt(MazeBuilder.rand(occupiedExits.length - 1, 0));
                pointer = this.maze.getNodeWithId(pointerId);
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
            neighbors = pointer.getNeighborIds();
            var index = MazeBuilder.rand(neighbors.length - 1, 0);
            if (neighbors.length > 0) {
                pointer = this.maze.getNodeWithId(neighbors[index]);
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
     * Try every available connection point on the node and attempt to connect to a new or existing node.
     * Return the index of the successful connections connection point when new connection is made.
     * If no connection is made, returns -1.
     *
     * @param {MazeNode} pointer
     * @param {number[]} openConnectionPoints
     * @returns {number}
     */
    MazeBuilder.prototype.tryNodeConnectionFromEveryAvailableExit = function (pointer, openConnectionPoints) {
        var validExitIndexFound = false;
        var newDirection = -1;
        var candidateExitPosition = -1;
        for (var i = 0; i < openConnectionPoints.length; i++) {
            var index = MazeBuilder.rand(openConnectionPoints.length - 1, 0);
            newDirection = openConnectionPoints[index];
            openConnectionPoints = openConnectionPoints.splice(index, 1);
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
        return this.maze.getNodeWithId(pointer.getNeighborIdAt(MazeBuilder.rand(this.cardinality.getConnectionPointCount() - 1, 0)));
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
        lastCoordinates = pointer.getLocation();
        nextCoordinates = this.cardinality.getNextLocation(lastCoordinates, exitPoint);
        // If the next node's coordinate is already taken point our Next Node to that node.  Otherwise,
        // if the space in unoccupied, create a new node.
        if (this.maze.containsNodeWithId(nextCoordinates.toString())) {
            tempNextNode = this.maze.getNodeWithId(nextCoordinates.toString());
        }
        else {
            tempNextNode = new MazeNode_1.MazeNode(this.cardinality);
            tempNextNode.setLocation(nextCoordinates);
            tempNextNode.setMaxConnections(MazeBuilder.rand(this.cardinality.getConnectionPointCount() - 1, 1));
            this.maze.addNode(tempNextNode);
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
        if (pointer.isConnectionPointOpen(exitPoint) && tempNextNode.isConnectionPointOpen(this.cardinality.getOpposingConnectionPoint(exitPoint))) {
            pointer.connectTo(tempNextNode, exitPoint);
            return exitPoint;
        }
        return -1;
    };
    /**
     * If the indicated dictionary has negative node values (a natural result of the current version of
     * the generation process), push all of the node coordinates up so that 0,0 represents the top left.
     *
     * This ultimately updates the map so that it will fit nicely within quadrant II of the cartesian graph.
     *
     * @returns {{[p: string]: MazeNode}}
     */
    MazeBuilder.prototype.normalizeNodeCoordinates = function () {
        var _this = this;
        var adjustedCoordinates = {};
        var dimensionsUsed = this.maze.getNodeWithId("Origin").getLocation().getDimensions();
        var minCoordinateValuesInrange = [];
        var currentValue;
        var currentMin = 0;
        var adjustmentsByIndex = [];
        var currentNode;
        var _loop_1 = function (i) {
            Object.keys(this_1.maze.getNodes()).forEach(function (key) {
                currentValue = _this.maze.getNodeWithId(key).getLocation().getAxisPoint(i);
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
            Object.keys(this_2.maze.getNodes()).forEach(function (key) {
                currentNode = _this.maze.getNodeWithId(key);
                currentNode.getLocation().adjustAxisPoint(i, adjustmentsByIndex[i]);
            });
        };
        var this_2 = this;
        // O(d * n)
        for (var i = 0; i < dimensionsUsed; i++) {
            _loop_2(i);
        }
        // O(n)
        Object.keys(this.maze.getNodes()).forEach(function (key) {
            currentNode = _this.maze.getNodeWithId(key);
            adjustedCoordinates[currentNode.getId()] = currentNode;
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
        var dimensionsUsed = this.entry.getLocation().getDimensions();
        var node;
        var currentValue;
        var maxValue;
        var minValue;
        var dimensions = [];
        var _loop_3 = function (i) {
            maxValue = 0;
            minValue = 0;
            Object.keys(this_3.maze.getNodes()).forEach(function (key) {
                node = _this.maze.getNodes()[key];
                currentValue = node.getLocation().getAxisPoint(i);
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
        var coordinateList = Object.keys(this.maze.getNodes());
        var index = MazeBuilder.rand(coordinateList.length - 1, 0);
        return this.maze.getNodes()[coordinateList[index]];
    };
    return MazeBuilder;
}());
exports.MazeBuilder = MazeBuilder;
