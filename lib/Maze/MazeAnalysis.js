"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeAnalysis = void 0;
const NodeLocation2D_1 = require("../MazeCoordinates/NodeLocation2D");
const cm_domain_utilities_1 = require("cm-domain-utilities");
class MazeAnalysis extends cm_domain_utilities_1.SerializableModel {
    /**
     * @param maze {Maze}
     */
    constructor(maze) {
        super();
        this.state = {
            maze: maze,
            mazeCardinalityPoints: maze.getCardinality().getConnectionPointCount(),
            mazeLocationIndex: maze.getLocationKeyIndex(),
            nodeIdsAdjacentToBorderAtExitPoint: new Map(),
        };
        // Initialize arrays for directional neighbor vacancies
        for (let c = 0; c < this.state.mazeCardinalityPoints; c++) {
            this.state.nodeIdsAdjacentToBorderAtExitPoint.set(c, []);
        }
        this.analyzeMaze();
    }
    get nodeIdsAdjacentToBorderAtExitPoint() {
        return this.state.nodeIdsAdjacentToBorderAtExitPoint;
    }
    /**
     * Analyze the maze so that all public reporting stats are accurate and available.
     */
    analyzeMaze() {
        this.scanNodesWithVacantNeighbors();
    }
    scanNodesWithVacantNeighbors() {
        let node;
        for (let x = 0; x < this.state.maze.getDimensions()[0]; x++) {
            for (let y = 0; y < this.state.maze.getDimensions()[1]; y++) {
                node = this.state.mazeLocationIndex.get(new NodeLocation2D_1.NodeLocation2D([x, y]).toString());
                if (node != null) {
                    this.state.nodeIdsAdjacentToBorderAtExitPoint.get(0).push(node.id);
                    break;
                }
            }
            for (let y = this.state.maze.getDimensions()[1] - 1; y >= 0; y--) {
                node = this.state.mazeLocationIndex.get(new NodeLocation2D_1.NodeLocation2D([x, y]).toString());
                if (node != null) {
                    this.state.nodeIdsAdjacentToBorderAtExitPoint.get(this.state.maze.getCardinality().getConnectionPointCount() * 0.5).push(node.id);
                    break;
                }
            }
        }
        for (let y = 0; y < this.state.maze.getDimensions()[1]; y++) {
            for (let x = 0; x < this.state.maze.getDimensions()[0]; x++) {
                node = this.state.mazeLocationIndex.get(new NodeLocation2D_1.NodeLocation2D([x, y]).toString());
                if (node != null) {
                    this.state.nodeIdsAdjacentToBorderAtExitPoint.get(this.state.maze.getCardinality().getConnectionPointCount() * 0.75).push(node.id);
                    break;
                }
            }
            for (let x = this.state.maze.getDimensions()[0]; x >= 0; x--) {
                node = this.state.mazeLocationIndex.get(new NodeLocation2D_1.NodeLocation2D([x, y]).toString());
                if (node != null) {
                    this.state.nodeIdsAdjacentToBorderAtExitPoint.get(this.state.maze.getCardinality().getConnectionPointCount() * 0.25).push(node.id);
                    break;
                }
            }
        }
    }
}
exports.MazeAnalysis = MazeAnalysis;
