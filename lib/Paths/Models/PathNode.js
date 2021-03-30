"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathNode = void 0;
/**
 * Special private node class.  This node represents a maze node, but tracks its path tracking metadata, separate
 * from the actual maze node value.
 */
class PathNode {
    constructor(id) {
        this.id = id;
        this.previous = null;
        this.distance = -1;
    }
}
exports.PathNode = PathNode;
