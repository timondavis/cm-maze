"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MazeNode_1 = require("./MazeNode");
var MazeBuilder = /** @class */ (function () {
    function MazeBuilder() {
        this.cardinality = 4;
        this.complexity = 5;
    }
    MazeBuilder.prototype.buildMaze = function () {
        var m = new MazeNode_1.MazeNode(this.cardinality);
    };
    MazeBuilder.prototype.buildCoreRoute = function (m, depth) {
        if (depth === void 0) { depth = 0; }
        var exit = -1;
        var nextEntry = -1;
        for (var i = 0; i < this.complexity; i++) {
            var n = new MazeNode_1.MazeNode(this.cardinality);
            exit = MazeBuilder.rand(this.cardinality);
            nextEntry = Math.abs(this.cardinality - this.cardinality / 2);
        }
    };
    MazeBuilder.rand = function (max, min) {
        if (max === void 0) { max = 100; }
        if (min === void 0) { min = 1; }
        var number = Math.floor(Math.random() * max) + min;
        return Math.min(max, number);
    };
    return MazeBuilder;
}());
exports.MazeBuilder = MazeBuilder;
