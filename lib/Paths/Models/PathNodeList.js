"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathNodeList = void 0;
/**
 * Simple ordered list implementation.  Could be improved with indexing!  But generally just keeps and ordered list which
 * pops off the lowest distance value among all registered nodes.
 */
const PathNode_1 = require("./PathNode");
const PathNodeListNode_1 = require("./PathNodeListNode");
class PathNodeList {
    constructor() {
        this._length = 0;
    }
    get length() {
        return this._length;
    }
    insert(newPathNode) {
        if (this._length === 0) {
            this.head = new PathNodeListNode_1.PathNodeListNode(newPathNode);
            this._length++;
            return;
        }
        let tempListNode = this.head;
        while (tempListNode !== undefined) {
            if (tempListNode.next === undefined) {
                tempListNode.next = new PathNodeListNode_1.PathNodeListNode(newPathNode);
                this._length++;
                break;
            }
            if (newPathNode.distance > tempListNode.data.distance &&
                newPathNode.distance < tempListNode.next.data.distance) {
                let newListNode = new PathNodeListNode_1.PathNodeListNode(newPathNode);
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
    unshift() {
        if (!this.head) {
            return null;
        }
        let node = new PathNode_1.PathNode(this.head.data.id);
        node.distance = this.head.data.distance;
        node.previous = this.head.data.previous;
        this.head = this.head.next;
        this._length--;
        return node;
    }
}
exports.PathNodeList = PathNodeList;
