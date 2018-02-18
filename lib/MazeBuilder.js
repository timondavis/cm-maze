"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../node_modules/@types/node/index.d.ts" />
var MazeNode_1 = require("./MazeNode");
var CardinalityBehaviorFour2D_1 = require("./Behavior/CardinalityBehaviorFour2D");
var MazeBuilder = /** @class */ (function () {
    function MazeBuilder(cardinalityBehavior, complexity) {
        if (complexity === void 0) { complexity = 5; }
        this.occupiedCoordinates = {};
        this.cardinalityBehavior = (cardinalityBehavior) ? cardinalityBehavior : new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D();
        this.complexity = complexity;
    }
    MazeBuilder.prototype.buildMaze = function () {
        this.entry = new MazeNode_1.MazeNode(this.cardinalityBehavior);
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
    MazeBuilder.prototype.generateRandomPathFrom = function (node, depth) {
        if (depth === void 0) { depth = this.complexity; }
        var newDirection = -1;
        var openExits;
        var pointer = new MazeNode_1.MazeNode(this.cardinalityBehavior);
        var validExitIndexFound = false;
        // Create node connections (to new or existing nodes) - 1 for each level of depth declared.
        for (var i = 0; i < depth; i++) {
            // Pick a random exit point on this node.  If there is no open exit, traverse to the next node and continue.
            openExits = pointer.getOpenExitPoints();
            if (openExits.length == 0) {
                this.hopToNextNode(pointer);
                continue;
            }
            newDirection = openExits[MazeBuilder.rand(openExits.length - 1, 0)];
            if (this.buildNextNodeOnRandomPath(pointer, newDirection)) {
                continue;
            }
            for (var i_1 = 0; i_1 < openExits.length; i_1++) {
                newDirection = openExits[i_1];
                if (this.buildNextNodeOnRandomPath(pointer, newDirection)) {
                    validExitIndexFound = true;
                    break;
                }
            }
            if (validExitIndexFound) {
                continue;
            }
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
        this.generateRandomPathFrom(pointer);
        return this;
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
        pointer.getNeighborAt(MazeBuilder.rand(this.cardinalityBehavior.getCardinality(), 0));
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
        }
        return tempNextNode;
    };
    /**
     * Convenience method for producing (or finding), and then traversing to, the next node on a given path.
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {boolean}
     */
    MazeBuilder.prototype.buildNextNodeOnRandomPath = function (pointer, exitPoint) {
        var tempNextNode;
        // Get or create the node at the next position.
        tempNextNode = this.getNextNodeAtExit(pointer, exitPoint);
        // If the logical entry point is open on the next node, we'll connect the nodes and traverse
        // to the next node.
        if (tempNextNode.isPointOpen(this.cardinalityBehavior.getOpposingPoint(exitPoint))) {
            pointer.connectTo(tempNextNode, exitPoint);
            pointer = pointer.getNeighborAt(this.cardinalityBehavior.getOpposingPoint(exitPoint));
            this.occupiedCoordinates[pointer.getCoordinates().toString()] = pointer;
            return true;
        }
        return false;
    };
    return MazeBuilder;
}());
exports.MazeBuilder = MazeBuilder;
