/// <reference path="../node_modules/@types/node/index.d.ts" />
import { MazeNode } from "./MazeNode";
import { CardinalityBehavior } from "./Behavior/CardinalityBehavior";
export declare class MazeBuilder {
    complexity: number;
    entry: MazeNode;
    cardinalityBehavior: CardinalityBehavior;
    occupiedCoordinates: {
        [key: string]: MazeNode;
    };
    constructor(cardinalityBehavior?: CardinalityBehavior, complexity?: number);
    buildMaze(): void;
    static rand(max?: number, min?: number): number;
    generateRandomPathFrom(node: MazeNode, depth?: number): MazeBuilder;
    seekAndGenerateRandomPath(startingNode: MazeNode, maxDepth?: number): MazeBuilder;
    /**
     * Convenince function to simply get the next node WHEN ALL EXIT POINTS ARE CLAIMED
     *
     * @pre  All exit points on the node must connect to other nodes.  Ignoring this precondition
     * may result in exceptions being thrown.
     *
     * @param {MazeNode} pointer
     */
    private hopToNextNode(pointer);
    /**
     * Finds out if there is a neighboring node at the indicated exit.  If a node is found, returns that node,
     * otherwise generates a new node and returns that.  Coordinates will be set on the node returned.
     *
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {MazeNode}
     */
    private getNextNodeAtExit(pointer, exitPoint);
    /**
     * Convenience method for producing (or finding), and then traversing to, the next node on a given path.
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {boolean}
     */
    private buildNextNodeOnRandomPath(pointer, exitPoint);
}
