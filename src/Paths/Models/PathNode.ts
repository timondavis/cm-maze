/**
 * Special private node class.  This node represents a maze node, but tracks its path tracking metadata, separate
 * from the actual maze node value.
 */
import {AbstractSerializable} from "../../AbstractSerializable";

export class PathNode extends AbstractSerializable{
	previous: PathNode = null;
	distance: number = -1;

	constructor(public id: string) {
		super();
	}
}