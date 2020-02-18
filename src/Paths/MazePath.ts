/**
 * An appendable list of ids belonging to nodes which can be traversed in the given order.
 */
import {Maze} from "../Maze";
import {MazeNode} from "../MazeNode";

export interface IMazePath {
	pathId: number;
	firstNodeId: string;
	lastNodeId: string;
	pointerIndex: number;
	path: string[];
}

export class MazePath {

	protected state: IMazePath;
	private static pathIdCounter: number = 0;

	public constructor() {
		MazePath.pathIdCounter++;

		this.state = {
			firstNodeId: "",
			lastNodeId: "",
			path: [],
			pathId: MazePath.pathIdCounter,
			pointerIndex: -1
		};
	}

	public get id() {
		return this.state.pathId;
	}

	public first() {
		return this.state.firstNodeId;
	}

	public last() {
		return this.state.lastNodeId;
	}

	public reset() {
		this.state.pointerIndex = 0;
	}

	public next() : string {
		if (this.state.pointerIndex + 1 < this.state.path.length) {
			this.state.pointerIndex++;
		} else {
			return null;
		}

		return this.state.path[this.state.pointerIndex];
	}

	public current() {

		if (this.state.pointerIndex < this.state.path.length) {
			return this.state.path[this.state.pointerIndex];
		}
	}

	public append(nodeId: string): void {

		if (this.state.path.length === 0) {
			this.state.firstNodeId = this.state.lastNodeId = nodeId;
		} else {
			this.state.lastNodeId = nodeId;
		}

		this.state.path.push(nodeId);
	}

	public get length() {
		return this.state.path.length;
	}

	public toIdArray(): string[] {

		if (this.state.path.length === 0) { return []; }

		let tempPointerIndex: number = 0;
		let idArray: string[] = [];
		while (tempPointerIndex < this.state.path.length) {
			idArray.push(this.state.path[tempPointerIndex]);
			tempPointerIndex++;
		}

		return idArray;
	}

	public toMazeNodeArray(maze: Maze): MazeNode[] {
		if (this.state.path.length === 0) { return []; }

		let tempPointerIndex: number = 0;
		let nodeArray: MazeNode[] = [];
		while (tempPointerIndex < this.state.path.length) {
			nodeArray.push(maze.getNodeWithId(this.state.path[tempPointerIndex]));
			tempPointerIndex++;
		}

		return nodeArray;
	}
}