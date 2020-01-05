import {Maze} from "../Maze";
import {MazePath} from "./MazePath";

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

	private _length = 0;

	public head: PathFinderNodeListNode;
	public currentPointer: PathFinderNodeListNode;


	public getLength() {
		return this._length;
	}

	public reset() {
		this.currentPointer = this.head;
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

class PathFinderNodeListNode {

	constructor(public data: PathFinderNode) {}
	public next: PathFinderNodeListNode;
}
