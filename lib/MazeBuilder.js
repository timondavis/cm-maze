"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../node_modules/@types/node/index.d.ts" />
var MazeNode_1 = require("./MazeNode");
var CardinalityBehaviorFour2D_1 = require("./Behavior/CardinalityBehaviorFour2D");
var MazeBuilder = /** @class */ (function () {
    function MazeBuilder(cardinalityBehavior, complexity) {
        if (complexity === void 0) { complexity = 5; }
        this.occupiedCoordinates = {};
        this.nodeCounter = 0;
        this.cardinalityBehavior = (cardinalityBehavior) ? cardinalityBehavior : new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D();
        this.complexity = complexity;
    }
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
    };
    MazeBuilder.rand = function (max, min) {
        if (max === void 0) { max = 100; }
        if (min === void 0) { min = 1; }
        var number = Math.floor(Math.random() * max) + min;
        return Math.min(max, number);
    };
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
            newDirection = openExits[MazeBuilder.rand(openExits.length - 1, 0)];
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
    MazeBuilder.prototype.seekAndGenerateRandomPath = function (startingNode, maxDepth) {
        if (maxDepth === void 0) { maxDepth = this.complexity; }
        var depth = MazeBuilder.rand(maxDepth, 0);
        var neighbors;
        var pointer = startingNode;
        for (var i = 0; i < depth; i++) {
            neighbors = pointer.getNeighbors();
            if (neighbors.length > 0) {
                pointer = neighbors[MazeBuilder.rand(neighbors.length - 1, 0)];
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
            newDirection = openExits[i];
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
        return pointer.getNeighborAt(MazeBuilder.rand(this.cardinalityBehavior.getCardinality() - 1, 0));
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
            tempNextNode.setMaxExits(2);
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
    return MazeBuilder;
}());
exports.MazeBuilder = MazeBuilder;
