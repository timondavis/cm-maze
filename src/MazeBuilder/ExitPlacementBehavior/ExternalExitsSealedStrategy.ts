import {ExitPlacementBehavior} from "./ExitPlacementBehavior";
import {Maze} from "../../Maze";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {MazeNode} from "../../MazeNode";

export class ExternalExitsSealedStrategy extends ExitPlacementBehavior {

	private consumedNodeIds: string[] = [];

    constructor(maze: Maze) {
        super(maze, new MazeAnalysis(maze));
    }

    placeEntrance() {

        let node : MazeNode = this.findRandomBorderNode(this.consumedNodeIds);
        if (!node) {
            throw "Entrance Node could not be established."
        }

        node.name = "Entrance";

        this.consumedNodeIds.push(node.id);
        this.maze.setStartNode(node);
    }

    placeExit() {

        let node : MazeNode = this.findRandomBorderNode(this.consumedNodeIds);
        if (!node) {
            throw "Exit Node could not be established";
        }

        node.name = "Exit";
		this.consumedNodeIds.push(node.id);
		this.maze.setFinishNode(node);
    }
}