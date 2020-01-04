import {Maze} from "../Maze";
import {MazePath} from "./MazePath";
import {MazeNode} from "../MazeNode";
import {MazePathTuple} from "./MazePathTuple";

export class PathFinder {

	public static findPath(fromNodeId: string, toNodeId: string, maze:Maze ) : MazePath {

		let considered = new PathFinderNodeList();
		let visited = new Map<string, PathFinderNode>();
		let startingNode = new PathFinderNode(fromNodeId);

		startingNode.distance = 0;
		startingNode.previous = null;

		considered.insert(startingNode);

		while(considered.getLength() > 0) {

			let currentPathNode = considered.unshift();

			if (currentPathNode.id === toNodeId) {
				return PathFinder.buildPath(currentPathNode, visited);
			}

			let currentMazeNode = maze.getNodeWithId(currentPathNode.id);

			let neighborPathNode: PathFinderNode;
			let thisPathDistance: number;
			currentMazeNode.getNeighborIds().forEach((id) => {

				if (!visited.has(id)) {
					neighborPathNode = new PathFinderNode(id);
					thisPathDistance = currentPathNode.distance + 1;

					if (neighborPathNode.distance == -1 ) {
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

	private static buildGraphMap(maze: Maze): Map<string, PathFinderNode> {

		let graph = new Map<string, PathFinderNode>();

		maze.forEachNode((node, nodeId) => {
			graph.set(nodeId, new PathFinderNode(nodeId));
		});

		return graph;
	}

	private static buildPath(current, visited): MazePath {

		let reversePath: PathFinderNode[] = [];
		let mazePath = new MazePath();

		reversePath.push(current);

		while (current.previous !== null) {
			current = current.previous;
			reversePath.push(current);
		}

		for (let i = reversePath.length - 1 ; i >= 0 ; i--) {
			mazePath.append(reversePath[i].id);
		}

		return mazePath;
	}
}

class PathFinderNode {
	previous: PathFinderNode = null;
	distance: number = -1;

	constructor(public id: string) {}
}

class PathFinderNodeList {

	public list: PathFinderNode[] = [];

	public getLength() {
		return this.list.length;
	}

	public insert(node: PathFinderNode) {
		if (this.list.length == 0) {
			this.list[0] = node;
			return;
		}

		for (let i = 0 ; i < this.list.length ; i++) {
			if (node.distance >= this.list[i].distance) {
				this.list.splice(i, 0, node);
				break;
			}
		}
	}

	public unshift() : PathFinderNode {

		if (this.list.length == 0) {
			return null;
		}

		let item = this.list[0];
		this.list.splice(0, 1);
		return item;
	}
}
