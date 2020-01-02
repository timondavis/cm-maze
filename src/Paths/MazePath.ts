import {MazeNode} from "../MazeNode";
import {Maze} from "../Maze";

export class MazePath {

	private static pathIdCounter: number = 0;
	private _pathId: number;
	private _firstNodeId: string;
	private _lastNodeId: string;
	private _pointer: number = -1;

	private _path: string[] = [];
	private _sortedIds: string[] = [];

	public constructor(path: MazePath = null) {

		MazePath.pathIdCounter++;
		this._pathId = MazePath.pathIdCounter;

		if (path) {
			path.reset();
			while(path.next()) {
				if (!this.append(path.current())) {
					throw "Duplicate node key found in copy constructor for MazePath.  Definitely an invalid state!";
				}
			}
		}
	}

	public get pathId() {
		return this._pathId;
	}

	public first() {
		return this._firstNodeId;
	}

	public last() {
		return this._lastNodeId;
	}

	public reset() {
		this._pointer = -1;
	}

	public current(): string {
		if (this._pointer < this._path.length) {
			return this._path[this._pointer];
		}

		return null;
	}

	public next(): string {
		if (this._path.length === 0) { return null; }

		if ((this._pointer + 1) < this.length) {
			this._pointer++;
			return this._path[this._pointer];
		}

		return null;
	}

	/**
	 * Appends a new node to the tail of the path.  Nodes Duplicate to others in the collection
	 * will cause exception to be thrown.
	 *
	 * @post node will be added to the end of the path.  Pointer reset to -1.  Will return NULL if node ID is duplicate to path.
	 *
	 * @param node
	 */
	public append(nodeId: string): boolean {
		this.reset();

		if (this._sortedIds.length === 0) {
			this._firstNodeId = nodeId;
			this._lastNodeId = nodeId;
			this._sortedIds.push(nodeId);
			this._path.push(nodeId);
			this.reset();
			return true;
		}

		for (let i = 0 ; i < this._sortedIds.length ; i++) {
			if (this._sortedIds[i] === nodeId) {
				return false;
			}

			// Keep searching until the nodeID in question is 'smaller' than the current node id.  Add the current node ID to the path and sorted index.
			if (this._sortedIds[i] < nodeId) {
				this._sortedIds.splice(i, 0, nodeId);
				this._lastNodeId = nodeId;

				this._path.push(nodeId);
				break;
			}
		}

		this.reset();
		return true;
	}

	public isNodeIdUniqueToPath(nodeId: string): boolean {

		for (let i = 0 ; i < this._sortedIds.length ; i++) {
			if (this._sortedIds[i] == nodeId) { return false; }
			if (this._sortedIds[i] < nodeId) {
				break;
			}
		}

		return true;
	}

	public get length() {
		return this._path.length;
	}
}