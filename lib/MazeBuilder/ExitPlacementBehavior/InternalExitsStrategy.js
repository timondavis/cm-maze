"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalExitsStrategy = void 0;
const ExitPlacementBehavior_1 = require("./ExitPlacementBehavior");
const MazeAnalysis_1 = require("../../Maze/MazeAnalysis");
class InternalExitsStrategy extends ExitPlacementBehavior_1.ExitPlacementBehavior {
    constructor(maze) {
        super(maze, new MazeAnalysis_1.MazeAnalysis(maze));
    }
    placeEntrance() {
        this.maze.setStartNode(this.maze.getNodeWithId("Origin"));
    }
    placeExit() {
        let randomNode;
        do {
            randomNode = this.selectRandomNode();
        } while (randomNode === this.maze.getStartNode());
        this.maze.setFinishNode(randomNode);
    }
}
exports.InternalExitsStrategy = InternalExitsStrategy;
