"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazePatternFinder = void 0;
const MazePath_1 = require("./MazePath");
const PathNodeList_1 = require("./Models/PathNodeList");
const PathNode_1 = require("./Models/PathNode");
/**
 * Static methods to find minimal paths between maze nodes.
 */
class MazePatternFinder {
    /**
     * Get a path between two nodes on the given maze.  Nodes identified by ID.
     *
     * @param fromNodeId
     * @param toNodeId
     * @param maze
     *
     * @return MazePath
     */
    static findPath(fromNodeId, toNodeId, maze) {
        // My own poor attempt as Dijkstra's path finding algorithm.  Starting with the first node,
        // continue considering path distances to potential nodes and recording the results.  Keep branching out to the
        // next node until target node is found.  When found, trace the path backward to start and capture as MazePath - TAD.
        let considered = new PathNodeList_1.PathNodeList();
        let visited = new Map();
        let startingNode = new PathNode_1.PathNode(fromNodeId);
        startingNode.distance = 0;
        startingNode.previous = null;
        considered.insert(startingNode);
        while (considered.length > 0) {
            let currentPathNode = considered.unshift();
            if (currentPathNode.id === toNodeId) {
                return MazePatternFinder.buildPath(currentPathNode);
            }
            let currentMazeNode = maze.getNodeWithId(currentPathNode.id);
            currentMazeNode.getNeighborIds().forEach((id) => {
                if (!visited.has(id)) {
                    let neighborPathNode = new PathNode_1.PathNode(id);
                    let thisPathDistance = currentPathNode.distance + 1;
                    if (neighborPathNode.distance == -1) {
                        neighborPathNode.distance = thisPathDistance;
                        neighborPathNode.previous = currentPathNode;
                    }
                    if (thisPathDistance < neighborPathNode.distance) {
                        neighborPathNode.previous = currentPathNode;
                        neighborPathNode.previous = currentPathNode;
                    }
                    considered.insert(neighborPathNode);
                }
            });
            visited.set(currentPathNode.id, currentPathNode);
        }
    }
    static buildPath(current) {
        let reversePath = [];
        let mazePath = new MazePath_1.MazePath();
        reversePath.push(current);
        while (current.previous !== null) {
            current = current.previous;
            reversePath.push(current);
        }
        for (let i = reversePath.length - 1; i >= 0; i--) {
            mazePath.append(reversePath[i].id);
        }
        return mazePath;
    }
    static getTilesWithinRange(fromNodeId, range, maze) {
        let candidates = new PathNodeList_1.PathNodeList();
        let visited = new Map();
        let startingNode = new PathNode_1.PathNode(fromNodeId);
        candidates.insert(startingNode);
        startingNode.distance = 0;
        startingNode.previous = null;
        while (candidates.length > 0) {
            let currentPathNode = candidates.unshift();
            let currentMazeNode = maze.getNodeWithId(currentPathNode.id);
            currentMazeNode.getNeighborIds().forEach((id) => {
                if (!visited.has(id)) {
                    let neighborPathNode = new PathNode_1.PathNode(id);
                    let thisPathDistance = currentPathNode.distance + 1;
                    if (thisPathDistance >= range) {
                        visited.set(id, currentPathNode);
                        return;
                    }
                    if (neighborPathNode.distance == -1) {
                        neighborPathNode.distance = thisPathDistance;
                        neighborPathNode.previous = currentPathNode;
                    }
                    if (thisPathDistance < neighborPathNode.distance) {
                        neighborPathNode.previous = currentPathNode;
                        neighborPathNode.previous = currentPathNode;
                    }
                    candidates.insert(neighborPathNode);
                }
            });
            visited.set(currentPathNode.id, currentPathNode);
        }
        let viableNodes = [];
        Array.from(visited.values()).forEach((pathNode) => {
            viableNodes.push(maze.getNodeWithId(pathNode.id));
        });
        return viableNodes;
    }
}
exports.MazePatternFinder = MazePatternFinder;
