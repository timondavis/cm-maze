/**
 * Wrapper for path finder nodes in the PathFinderNodeList.  Simple links to data value and next PathFinderNodeListNode.
 */
import { PathNode } from "./PathNode";
export declare class PathNodeListNode {
    data: PathNode;
    constructor(data: PathNode);
    next: PathNodeListNode;
}
