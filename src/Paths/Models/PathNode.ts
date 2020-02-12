/**
 * Special private node class.  This node represents a maze node, but tracks its path tracking metadata, separate
 * from the actual maze node value.
 */
export class PathNode {
	previous: PathNode = null;
	distance: number = -1;

	constructor(public id: string) {}
}