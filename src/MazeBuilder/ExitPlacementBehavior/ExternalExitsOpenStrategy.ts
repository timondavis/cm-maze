import {ExitPlacementBehavior} from "./ExitPlacementBehavior";
import {Maze} from "../../Maze";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {MazeNode} from "../../MazeNode";

export class ExternalExitsOpenStrategy extends ExitPlacementBehavior {

	private consumedNodeIds: string[] = [];

    constructor(maze: Maze) {
        super(maze, new MazeAnalysis(maze));
    }

    placeEntrance() {

    	let exitPoint = Math.floor(Math.random() * this.maze.getCardinality().getConnectionPointCount());
    	exitPoint = this.maze.getCardinality().roundConnectionPointToPrimeCardinality(exitPoint);
        let node :  MazeNode = this.findRandomNodeAdjacentToBorderAtExitPoint(exitPoint, this.consumedNodeIds);
        if (!node) {
            throw "Entrance Node could not be established."
        }

        // We know we're flush with at least one empty side, so if we've already maxed out the node's connection points,
		// raise the ceiling to one extra point.
        if (node.getOccupiedConnectionPoints().length == node.getMaxConnections()) {
			node.setMaxConnections(node.getMaxConnections() + 1);
        }

		let nextNode = this.generateExitNode(node.getCardinality());
        this.maze.addNode(nextNode, false);
		node.connectTo(nextNode, exitPoint);
		this.consumedNodeIds.push(node.getId());

        this.maze.setStartNode(node);
    }

    placeExit() {

		let exitPoint = Math.floor(Math.random() * this.maze.getCardinality().getConnectionPointCount());
		exitPoint = this.maze.getCardinality().roundConnectionPointToPrimeCardinality(exitPoint);
		let node: MazeNode = this.findRandomNodeAdjacentToBorderAtExitPoint(exitPoint, this.consumedNodeIds);
		if (!node) {
			throw "Exit Node could not be established."
		}

		// We know we're flush with at least one empty side, so if we've already maxed out the node's connection points,
		// raise the ceiling to one extra point.
		if (node.getOccupiedConnectionPoints().length == node.getMaxConnections()) {
			node.setMaxConnections(node.getMaxConnections() + 1);
		}

		let nextNode = this.generateExitNode(node.getCardinality());
		this.maze.addNode(nextNode, false);
		node.connectTo(nextNode, exitPoint);
		this.consumedNodeIds.push(node.getId());

		this.maze.setFinishNode(node);
	}
}
