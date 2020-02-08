/**
 * An appendable list of ids belonging to nodes which can be traversed in the given order.
 */
export class MazePath {

	private static pathIdCounter: number = 0;
	private _pathId: number;
	private _firstNodeId: string;
	private _lastNodeId: string;
	private _pointerIndex: number = -1;

	private _path: string[] = [];

	public constructor(path: MazePath = null) {
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

	public getLength() {
		return this._path.length;
	}
}