/**
 * An appendable list of ids belonging to nodes which can be traversed in the given order.
 */
import {Maze} from "../Maze";
import {MazeNode} from "../MazeNode";
import {AbstractSerializable} from "../AbstractSerializable";

export class MazePath extends AbstractSerializable {

	private static pathIdCounter: number = 0;
	private _pathId: number;
	private _firstNodeId: string;
	private _lastNodeId: string;
	private _pointerIndex: number = -1;

	private _path: string[] = [];

	public constructor() {
		super();
		MazePath.pathIdCounter++;
		this._pathId = MazePath.pathIdCounter;
	}

	public get id() {
		return this._pathId;
	}

	public first() {
		return this._firstNodeId;
	}

	public last() {
		return this._lastNodeId;
	}

	public reset() {
		this._pointerIndex = 0;
	}

	public next() : string {
		if (this._pointerIndex + 1 < this._path.length) {
			this._pointerIndex++;
		} else {
			return null;
		}

		return this._path[this._pointerIndex];
	}

	public current() {

		if (this._pointerIndex < this._path.length) {
			return this._path[this._pointerIndex];
		}
	}

	public append(nodeId: string): void {

		if (this._path.length === 0) {
			this._firstNodeId = this._lastNodeId = nodeId;
		} else {
			this._lastNodeId = nodeId;
		}

		this._path.push(nodeId);
	}

	public get length() {
		return this._path.length;
	}

	public toIdArray(): string[] {

		if (this._path.length === 0) { return []; }

		let tempPointerIndex: number = 0;
		let idArray: string[] = [];
		while (tempPointerIndex < this._path.length) {
			idArray.push(this._path[tempPointerIndex]);
			tempPointerIndex++;
		}

		return idArray;
	}

	public toMazeNodeArray(maze: Maze): MazeNode[] {
		if (this._path.length === 0) { return []; }

		let tempPointerIndex: number = 0;
		let nodeArray: MazeNode[] = [];
		while (tempPointerIndex < this._path.length) {
			nodeArray.push(maze.getNodeWithId(this._path[tempPointerIndex]));
			tempPointerIndex++;
		}

		return nodeArray;
	}
}