import { MazeNode } from "./MazeNode";
import { CardinalityBehavior } from "./Behavior/CardinalityBehavior";
import { Maze } from "./Maze";
/**
 * @class MazeBuilder
 *
 * Instanceable builder class which generates randomized Mazes in their most basic form.  This class can be
 * extended to handle the creation of a specialized maze or a derivative thereof.
 */
export declare class MazeBuilder {
    /**
     * Complexity factor of the maze to be generated
     *
     * @type {number}
     */
    protected complexity: number;
    /**
     * The 'entry' point of the generated maze (will not be poplated until buildMaze() is run).
     *
     * @type {MazeNode}
     */
    protected entry: MazeNode;
    /**
     *  An instance of the CardinalityBehavior instance responsible for facilitating node connection and traversal
     *  logic.
     *
     *  @type {CardinalityBehavior}
     */
    cardinalityBehavior: CardinalityBehavior;
    /**
     * A "Dictionary" of nodes in the generated maze, referenced by a string (@see MazeCoordinates.toString() );
     * @type {{ [key:stirng] : MazeNode }}
     */
    occupiedCoordinates: {
        [key: string]: MazeNode;
    };
    /**
     * Inrementing count of how many -considerations- have been made to build nodes.  Here for convenience (namely
     * in labelling).  Don't rely on this value for anything consistent.
     *
     * @type {number}
     */
    nodeCounter: number;
    constructor(cardinalityBehavior?: CardinalityBehavior, complexity?: number);
    /**
     * Build a new randomized maze instance based on local instance configurations
     *
     * @returns {Maze}
     */
    buildMaze(): Maze;
    /**
     * Convenience function (static) for shorthand randomization.
     *
     * @TODO !BUG! max cannot be reached by this algorithm, but instead max - 1
     *
     * @param {number} max
     * @param {number} min
     * @returns {number}
     */
    static rand(max?: number, min?: number): number;
    /**
     * Generate a new random path sourcing from the indicated node.
     *
     * @param {MazeNode} pointer
     * @param {number} depth
     * @returns {MazeBuilder}
     */
    generateRandomPathFrom(pointer: MazeNode, depth?: number): MazeBuilder;
    /**
     * Builder will seek a random node within the defined parameters.  Once node is identified, it will branch
     * out a new randomized path of nodes.
     *
     * @param {MazeNode} startingNode
     * @param {number} maxDepth
     * @returns {MazeBuilder}
     */
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
    /**
     * If the indicated dictionary has negative node values (a natural result of the current version of
     * the generation process), push all of the node coordinates up so that 0,0 represents the top left.
     *
     * This ultimately updates the map so that it will fit nicely within quadrant IV of the cartesian graph.
     *
     * @returns {{[p: string]: MazeNode}}
     */
    private normalizeNodeCoordinates();
    /**
     * Get the size of each dimension of this maze (for example, if
     * width = 6 and length = 4, this function will return [6, 4]).
     *
     * @returns {number[]}
     */
    private getDimensions();
    /**
     * Select a random node on the existing maze.
     *
     * @returns {MazeNode}
     */
    private selectRandomNode();
}
