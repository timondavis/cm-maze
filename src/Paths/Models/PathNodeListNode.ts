/**
 * Wrapper for path finder nodes in the PathFinderNodeList.  Simple links to data value and next PathFinderNodeListNode.
 */
import {PathNode} from "./PathNode";

export class PathNodeListNode {

	constructor(public data: PathNode) {}
	public next: PathNodeListNode;
}
