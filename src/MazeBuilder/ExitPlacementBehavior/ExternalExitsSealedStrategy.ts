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

        node.setName("Entrance");

        this.consumedNodeIds.push(node.getId());
        this.maze.setStartNode(node);
    }

    placeExit() {

        let node : MazeNode = this.findRandomBorderNode(this.consumedNodeIds);
        if (!node) {
            throw "Exit Node could not be established";
        }

        node.setName("Exit");
		this.consumedNodeIds.push(node.getId());
		this.maze.setFinishNode(node);
    }
}