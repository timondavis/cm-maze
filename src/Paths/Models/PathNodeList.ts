/**
 * Simple ordered list implementation.  Could be improved with indexing!  But generally just keeps and ordered list which
 * pops off the lowest distance value among all registered nodes.
 */
import {PathNode} from "./PathNode";
import {PathNodeListNode} from "./PathNodeListNode";
import {AbstractSerializable} from "../../AbstractSerializable";

export class PathNodeList extends AbstractSerializable {

	private _length = 0;
	public head: PathNodeListNode;

	public get length() {
		return this._length;
	}

	public insert(newPathNode: PathNode) {

		if (this._length === 0) {
			this.head = new PathNodeListNode(newPathNode);
			this._length++;
			return;
		}

		let tempListNode = this.head;

		while (tempListNode !== undefined) {

			if (tempListNode.next === undefined) {
				tempListNode.next = new PathNodeListNode(newPathNode);
				this._length++;
				break;
			}

			if (newPathNode.distance > tempListNode.data.distance &&
				newPathNode.distance < tempListNode.next.data.distance) {
				let newListNode = new PathNodeListNode(newPathNode);
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
	public unshift() : PathNode {

		if (!this.head) { return null; }

		let node = new PathNode(this.head.data.id);
		node.distance = this.head.data.distance;
		node.previous = this.head.data.previous;

		this.head = this.head.next;
		this._length--;

		return node;
	}
}