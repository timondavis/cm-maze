"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitPlacementBehavior = void 0;
const MazeNode_1 = require("../../Maze/MazeNode");
const MazeBuilder_1 = require("../../Maze/MazeBuilder");
class ExitPlacementBehavior {
    constructor(maze, mazeAnalysis) {
        this.maze = maze;
        this.mazeAnalysis = mazeAnalysis;
    }
    generateExitNode(cardinality) {
        let node = new MazeNode_1.MazeNode(cardinality, `EXIT-${ExitPlacementBehavior.generatedExitCount}`);
        node.maxConnections = 2;
        node.name = `Exit-${ExitPlacementBehavior.generatedExitCount}`;
        ExitPlacementBehavior.generatedExitCount++;
        return node;
    }
    findRandomNodeAdjacentToBorderAtExitPoint(exitPoint, excludedNodeIds = []) {
        // Copy an array of border node IDs from the maze analysis
        let availableNodeIds = [];
        this.mazeAnalysis.nodeIdsAdjacentToBorderAtExitPoint.get(exitPoint).forEach((id) => {
            availableNodeIds.push(id);
        });
        // If there are excluded IDs, remove them from the collection of available IDs
        if (excludedNodeIds.length > 0) {
            for (let excludedIdIndex = 0; excludedIdIndex < excludedNodeIds.length; excludedIdIndex++) {
                availableNodeIds = availableNodeIds.filter(id => id !== excludedNodeIds[excludedIdIndex]);
            }
        }
        // Pick a random node ID and ship it back.
        if (availableNodeIds.length == 0) {
            throw `Could not find any eligible border nodes to select at exit point ${exitPoint}`;
        }
        return this.selectRandomNodeFromIdCollection(availableNodeIds);
    }
    findRandomBorderNode(excludedNodeIds = []) {
        let exitPoint = Math.floor(Math.random() * this.maze.getCardinality().getConnectionPointCount());
        exitPoint = this.maze.getCardinality().roundConnectionPointToPrimeCardinality(exitPoint);
        return this.findRandomNodeAdjacentToBorderAtExitPoint(exitPoint, []);
    }
    /**
     * Select a random node on the existing maze.
     *
     * @returns {MazeNode}
     */
    selectRandomNode() {
        let coordinateList = Object.keys(this.maze.getNodes());
        let index = MazeBuilder_1.MazeBuilder.rand(coordinateList.length - 1, 0);
        return this.maze.getNodes()[coordinateList[index]];
    }
    selectRandomNodeFromIdCollection(availableNodeIds) {
        let availableNodeIndex;
        let nodeId;
        availableNodeIndex = Math.floor(Math.random() * availableNodeIds.length);
        nodeId = availableNodeIds[availableNodeIndex];
        return this.maze.getNodeWithId(nodeId);
    }
}
exports.ExitPlacementBehavior = ExitPlacementBehavior;
ExitPlacementBehavior.generatedExitCount = 0;
