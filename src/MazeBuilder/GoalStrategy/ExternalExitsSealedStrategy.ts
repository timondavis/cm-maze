import {GoalStrategy} from "./GoalStrategy";
import {Maze} from "../../Maze";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {MazeNode} from "../../MazeNode";

export class ExternalExitsSealedStrategy extends GoalStrategy {

    constructor(maze: Maze) {
        super(maze, new MazeAnalysis(maze));
    }

    placeEntrance() {

        let nodeData : {node: MazeNode, direction: number} = this.findBorderNodeEnteringFromRandomDirection();
        if (!nodeData.node) {
            throw "Entrance Node could not be established."
        }

        this.entranceNodeId = nodeData.node.getId();
        this.directionIntoEntrance = nodeData.direction;
    }

    placeExit() {

        let nodeData : {node: MazeNode, direction: number} = this.findBorderNodeEnteringFromRandomDirection([this.entranceNodeId]);
        if (!nodeData.node) {
            throw "Exit Node could not be established";
        }

        this.exitNodeId = nodeData.node.getId();
        this.directionIntoExit = nodeData.direction;
    }
}