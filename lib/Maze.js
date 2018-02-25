"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Maze = /** @class */ (function () {
    function Maze() {
        this.nodes = {};
        this.dimensions = [];
    }
    Maze.prototype.setCardinalityBehavior = function (cardinalityBehavior) {
        this.cardinalityBehavior = cardinalityBehavior;
    };
    Maze.prototype.getCardinalityBehavior = function () {
        return this.cardinalityBehavior;
    };
    Maze.prototype.setNodes = function (nodes) {
        this.nodes = nodes;
    };
    Maze.prototype.getNodes = function () {
        return this.nodes;
    };
    Maze.prototype.getNode = function (coordinates) {
        return this.nodes[coordinates.toString()];
    };
    Maze.prototype.setStartNode = function (node) {
        this.start = node;
    };
    Maze.prototype.getStartNode = function () {
        return this.start;
    };
    Maze.prototype.getFinishNode = function () {
        if (typeof this.finish !== 'undefined') {
            return this.finish;
        }
        return false;
    };
    Maze.prototype.getDimensions = function () {
        return this.dimensions;
    };
    Maze.prototype.setDimensions = function (dimensions) {
        this.dimensions = dimensions;
    };
    Maze.prototype.getSize = function () {
        return this.size;
    };
    Maze.prototype.setCurrentNode = function (node) {
        this.currentNode = node;
    };
    Maze.prototype.move = function (direction) {
        if (this.currentNode.isPointOccupied(direction)) {
            this.currentNode.getNeighborAt(direction);
            return this.currentNode;
        }
        return false;
    };
    Maze.prototype.setSize = function (size) {
        this.size = size;
    };
    return Maze;
}());
exports.Maze = Maze;
