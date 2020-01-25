import {Maze} from "../Maze";
import {MazePath} from "./MazePath";
import {PathNodeList} from "./Models/PathNodeList";
import {PathNode} from "./Models/PathNode";

/**
 * Static methods to find minimal paths between maze nodes.
 */
export class MazePatternFinder {

	/**
	 * Get a path between two nodes on the given maze.  Nodes identified by ID.
	 *
	 * @param fromNodeId
	 * @param toNodeId
	 * @param maze
	 *
	 * @return MazePath
	 */
	public static findPath(fromNodeId: string, toNodeId: string, maze:Maze) : MazePath {

		// My own poor attempt as Dijkstra's path finding algorithm.  Starting with the first node,
		// continue considering path distances to potential nodes and recording the results.  Keep branching out to the
		// next node until target node is found.  When found, trace the path backward to start and capture as MazePath - TAD.
		let considered = new PathNodeList();
		let visited = new Map<string, PathNode>();
		let startingNode = new PathNode(fromNodeId);

		startingNode.distance = 0;
		startingNode.previous = null;

		considered.insert(startingNode);

		while(considered.getLength() > 0) {

			let currentPathNode = considered.unshift();

			if (currentPathNode.id === toNodeId) {
				return MazePatternFinder.buildPath(currentPathNode);
			}

			let currentMazeNode = maze.getNodeWithId(currentPathNode.id);
			currentMazeNode.getNeighborIds().forEach((id) => {

				if (!visited.has(id)) {

					let neighborPathNode = new PathNode(id);
					let thisPathDistance = currentPathNode.distance + 1;

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

	private static buildPath(current: PathNode): MazePath {

		let reversePath: PathNode[] = [];
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

	public static getTilesWithinRange(fromNodeId: string, range: number, maze: Maze): PathNodeList {

		let candidates = new PathNodeList();
		let visited = new Map<string, PathNode>();
		let startingNode = new PathNode(fromNodeId);

		candidates.insert(startingNode);

		startingNode.distance = 0;
		startingNode.previous = null;

		while(candidates.getLength() > 0) {

			let currentPathNode = candidates.unshift();
			let currentMazeNode = maze.getNodeWithId(currentPathNode.id);

			currentMazeNode.getNeighborIds().forEach((id) => {

				if (!visited.has(id)) {

					let neighborPathNode = new PathNode(id);
					let thisPathDistance = currentPathNode.distance + 1;

					if (thisPathDistance >= range) {
						visited.set(id, currentPathNode);
						return;
					}

					if (neighborPathNode.distance == -1 ) {
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

		let viableNodes = new PathNodeList();
		Array.from(visited.values()).forEach((pathNode: PathNode) => {
			viableNodes.insert(pathNode);
		});

		return viableNodes;
	}
}




