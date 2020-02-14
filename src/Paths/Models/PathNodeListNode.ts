/**
 * Wrapper for path finder nodes in the PathFinderNodeList.  Simple links to data value and next PathFinderNodeListNode.
 */
import {PathNode} from "./PathNode";
import {AbstractSerializable} from "../../AbstractSerializable";

export class PathNodeListNode extends AbstractSerializable{

	constructor(public data: PathNode) {
		super();
	}
	public next: PathNodeListNode;
}
