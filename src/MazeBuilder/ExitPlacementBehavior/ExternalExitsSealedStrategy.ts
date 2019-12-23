import {ExitPlacementBehavior} from "./ExitPlacementBehavior";
import {Maze} from "../../Maze";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {MazeNode} from "../../MazeNode";

export class ExternalExitsSealedStrategy extends ExitPlacementBehavior {

    constructor(maze: Maze) {
        super(maze, new MazeAnalysis(maze));
    }

    placeEntrance() {

        let nodeData : {node: MazeNode, direction: number} = this.findBorderNodeEnteringFromRandomDirection();
        if (!nodeData.node) {
            throw "Entrance Node could not be established."
        }

        let node = nodeData.node;
        let direction = nodeData.direction;

        this.entranceNodeId = node.getId();
        this.directionIntoEntrance = direction;
        this.maze.setStartNode(node);
    }

    placeExit() {

        let nodeData : {node: MazeNode, direction: number} = this.findBorderNodeEnteringFromRandomDirection([this.entranceNodeId]);
        if (!nodeData.node) {
            throw "Exit Node could not be established";
        }

        let node = nodeData.node;
        let direction = nodeData.direction;

        this.exitNodeId = node.getId();
        this.directionIntoEntrance = direction;

        this.maze.setFinishNode(node);
    }
}