"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalExitsSealedStrategy = void 0;
const ExitPlacementBehavior_1 = require("./ExitPlacementBehavior");
const MazeAnalysis_1 = require("../../Maze/MazeAnalysis");
class ExternalExitsSealedStrategy extends ExitPlacementBehavior_1.ExitPlacementBehavior {
    constructor(maze) {
        super(maze, new MazeAnalysis_1.MazeAnalysis(maze));
        this.consumedNodeIds = [];
    }
    placeEntrance() {
        let node = this.findRandomBorderNode(this.consumedNodeIds);
        if (!node) {
            throw "Entrance Node could not be established.";
        }
        node.name = "Entrance";
        this.consumedNodeIds.push(node.id);
        this.maze.setStartNode(node);
    }
    placeExit() {
        let node = this.findRandomBorderNode(this.consumedNodeIds);
        if (!node) {
            throw "Exit Node could not be established";
        }
        node.name = "Exit";
        this.consumedNodeIds.push(node.id);
        this.maze.setFinishNode(node);
    }
}
exports.ExternalExitsSealedStrategy = ExternalExitsSealedStrategy;
