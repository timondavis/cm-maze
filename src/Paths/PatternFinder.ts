import {Maze} from "../Maze";
import {PathNodeList} from "./Models/PathNodeList";
import {PathNode} from "./Models/PathNode";
import {MazePath} from "./MazePath";
import {PathFinder} from "cm-maze";

export class PatternFinder extends PathFinder {

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