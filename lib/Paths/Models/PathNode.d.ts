/**
 * Special private node class.  This node represents a maze node, but tracks its path tracking metadata, separate
 * from the actual maze node value.
 */
export declare class PathNode {
    id: string;
    previous: PathNode;
    distance: number;
    constructor(id: string);
}
