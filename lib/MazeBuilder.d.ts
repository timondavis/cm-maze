import { MazeNode } from "./MazeNode";
import { CardinalityBehavior } from "./Behavior/CardinalityBehavior";
import { Maze } from "./Maze";
export declare class MazeBuilder {
    complexity: number;
    entry: MazeNode;
    cardinalityBehavior: CardinalityBehavior;
    occupiedCoordinates: {
        [key: string]: MazeNode;
    };
    nodeCounter: number;
    constructor(cardinalityBehavior?: CardinalityBehavior, complexity?: number);
    buildMaze(): Maze;
    static rand(max?: number, min?: number): number;
    generateRandomPathFrom(pointer: MazeNode, depth?: number): MazeBuilder;
    seekAndGenerateRandomPath(startingNode: MazeNode, maxDepth?: number): MazeBuilder;
    /**
     * Get the collection of declared coordinates tracked in the map building process.
     *
     * @return {{[key:string] : MazeNode}}
     */
    getCoordinatesCollection(): {
        [key: string]: MazeNode;
    };
    /**
     * Try every available exit on the node for connection to a new or existing node.  Return the index of the
     * successful connections exit point when new connection is made.  If no connection is made, returns -1.
     *
     * @param {MazeNode} pointer
     * @param {number[]} openExits
     * @returns {number}
     */
    private tryNodeConnectionFromEveryAvailableExit(pointer, openExits);
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
     * Convenience method for producing (or finding), and then reporting the exit point connecting to,
     * the next node on a given path. Returns the index of the connected path, or -1 if failure took place
     *
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {number}
     */
    private buildNextNodeOnRandomPath(pointer, exitPoint);
    private normalizeNodeCoordinates();
    private getDimensions();
}
