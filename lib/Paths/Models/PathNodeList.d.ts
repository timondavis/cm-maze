/**
 * Simple ordered list implementation.  Could be improved with indexing!  But generally just keeps and ordered list which
 * pops off the lowest distance value among all registered nodes.
 */
import { PathNode } from "./PathNode";
import { PathNodeListNode } from "./PathNodeListNode";
export declare class PathNodeList {
    private _length;
    head: PathNodeListNode;
    get length(): number;
    insert(newPathNode: PathNode): void;
    /**
     * Pop the left value off of the list and return.  It will have the lowest distance value among all nodes in the list.
     *
     * @return PathFinderNode
     */
    unshift(): PathNode;
}
