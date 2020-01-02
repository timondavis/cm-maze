import {Maze} from "../Maze";
import {MazePath} from "./MazePath";
import {MazeNode} from "../MazeNode";
import {MazePathTuple} from "./MazePathTuple";

export class PathFinder {

	private shortestPathLength: number = -1;
	private originNode: MazeNode = null;

	// Root MazeNode Index ID: number => ( <MazePathStart, MazePathFinish>: number => path : MazePath )
	private paths: Map<MazePathTuple, MazePath> = new Map<MazePathTuple, MazePath>();

	constructor(private maze: Maze) {}

	public findPath(fromNode: MazeNode, toNode: MazeNode) {
		this.shortestPathLength = -1;
		this.originNode = fromNode;

		let pathsFound: MazePath[] = [];
		this.findPaths(fromNode, toNode, new MazePath(),  pathsFound, -1 , 0);

		let shortestPath = null;
		for (let i = 0 ; i < pathsFound.length ; i++) {
			if (shortestPath == null) {
				shortestPath = pathsFound[i];
			}

			if (shortestPath.length > pathsFound[i].length && fromNode.getId() == pathsFound[i].next()) {
				pathsFound[i].reset();
				shortestPath = pathsFound[i];
			}

			pathsFound[i].reset();
		}

		return shortestPath;
	}


	/**
	 * Find paths from one point to another.  Once a path is identified, only equal sized or smaller paths will be considered.
	 *
	 * @param fromNode
	 * @param toNode
	 * @param path
	 * @param lastExitPosition
	 * @param validPaths
	 * @param depth
	 * @param shortestPathLength
	 */
	private findPaths(fromNode: MazeNode, toNode: MazeNode, path: MazePath, pathsConnecting: MazePath[],
							lastExitPosition: number,  depth: number) : MazePath[] {

		path = (path) ? path : new MazePath();

		if (!path.append(fromNode.getId())) { return; }

		let connectionPoints = fromNode.getOccupiedConnectionPoints();

		if (path.length >= this.shortestPathLength && this.shortestPathLength > 0) {
			return;
		}

		if (path.first() === this.originNode.getId() && fromNode.getId() === toNode.getId()) {
			this.shortestPathLength = path.length;
			pathsConnecting.push(path);
			return;
		}

		for (let i = 0 ; i < connectionPoints.length ; i++) {
			let nextNode = this.maze.getNodeWithId(fromNode.getNeighborIdAt(connectionPoints[i]));

			// Don't allow the same node to be counted twice.  Don't look back at the last node in the series.
			if (!path.isNodeIdUniqueToPath(nextNode.getId())) { continue; }
			if (lastExitPosition === connectionPoints[i]) { continue; }

			// Clone the path and plug it into recursion
			let pathClone = new MazePath(path);
			this.findPaths(
				this.maze.getNodeWithId(fromNode.getNeighborIdAt(connectionPoints[i])),
				toNode,
				pathClone,
				pathsConnecting,
				this.maze.getCardinality().getOpposingConnectionPoint(connectionPoints[i]),
				depth++);
		}
	}
}