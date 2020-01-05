import {Maze} from "../Maze";
import {MazePath} from "./MazePath";

/**
 * Static methods to find minimal paths between maze nodes.
 */
export class PathFinder {

	/**
	 * Get a path between two nodes on the given maze.  Nodes identified by ID.
	 *
	 * @param fromNodeId
	 * @param toNodeId
	 * @param maze
	 *
	 * @return MazePath
	 */
	public static findPath(fromNodeId: string, toNodeId: string, maze:Maze ) : MazePath {

		// My own poor attempt as Dijkstra's path finding algorithm.  Starting with the first node,
		// continue considering path distances to potential nodes and recording the results.  Keep branching out to the
		// next node until target node is found.  When found, trace the path backward to start and capture as MazePath - TAD.
		let considered = new PathFinderNodeList();
		let visited = new Map<string, PathFinderNode>();
		let startingNode = new PathFinderNode(fromNodeId);

		startingNode.distance = 0;
		startingNode.previous = null;

		considered.insert(startingNode);

		while(considered.getLength() > 0) {

			let currentPathNode = considered.unshift();

			if (currentPathNode.id === toNodeId) {
				return PathFinder.buildPath(currentPathNode);
			}

			let currentMazeNode = maze.getNodeWithId(currentPathNode.id);
			currentMazeNode.getNeighborIds().forEach((id) => {

				if (!visited.has(id)) {

					let neighborPathNode = new PathFinderNode(id);
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

	private static buildPath(current): MazePath {

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

/**
 * Special private node class.  This node represents a maze node, but tracks its path tracking metadata, separate
 * from the actual maze node value.
 */
class PathFinderNode {
	previous: PathFinderNode = null;
	distance: number = -1;

	constructor(public id: string) {}
}

/**
 * Simple ordered list implementation.  Could be improved with indexing!  But generally just keeps and ordered list which
 * pops off the lowest distance value among all registered nodes.
 */
class PathFinderNodeList {

	private _length = 0;
	public head: PathFinderNodeListNode;

	public getLength() {
		return this._length;
	}

	public insert(newPathNode: PathFinderNode) {

		if (this._length === 0) {
			this.head = new PathFinderNodeListNode(newPathNode);
			this._length++;
			return;
		}

		let tempListNode = this.head;

		while (tempListNode !== undefined) {

			if (tempListNode.next === undefined) {
				tempListNode.next = new PathFinderNodeListNode(newPathNode);
				this._length++;
				break;
			}

			if (newPathNode.distance > tempListNode.data.distance &&
				newPathNode.distance < tempListNode.next.data.distance) {
				let newListNode = new PathFinderNodeListNode(newPathNode);
				newListNode.next = tempListNode.next;
				tempListNode.next = newListNode;
				this._length++;
				break;
			}

			tempListNode = tempListNode.next;
		}
	}

	/**
	 * Pop the left value off of the list and return.  It will have the lowest distance value among all nodes in the list.
	 *
	 * @return PathFinderNode
	 */
	public unshift() : PathFinderNode {

		if (!this.head) { return null; }

		let node = new PathFinderNode(this.head.data.id);
		node.distance = this.head.data.distance;
		node.previous = this.head.data.previous;

		this.head = this.head.next;
		this._length--;

		return node;
	}
}

/**
 * Wrapper for path finder nodes in the PathFinderNodeList.  Simple links to data value and next PathFinderNodeListNode.
 */
class PathFinderNodeListNode {

	constructor(public data: PathFinderNode) {}
	public next: PathFinderNodeListNode;
}
