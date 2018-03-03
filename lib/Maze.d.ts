import { CardinalityBehavior } from "./Behavior/CardinalityBehavior";
import { MazeNode } from "./MazeNode";
import { MazeCoordinates } from "./MazeCoordinates/MazeCoordinates";
/**
 * A traversable maze, which manifests as a graph of interconnected nodes.
 */
export declare class Maze {
    /**
     * The CardinalityBehavior concrete instance which describes how nodes connect and traverse.
     *
     * @type {CardinalityBehavior}
     */
    protected cardinalityBehavior: CardinalityBehavior;
    /**
     * A "Dictionary" of nodes in the maze, indexed by string ( @see MazeNode.getCoordinates().toString() )
     *
     * @type {{ [key:string] : MazeNode }}
     */
    protected nodes: {
        [key: string]: MazeNode;
    };
    /**
     *  The pointer to the 'current' node, consistent with standard graph traversal.
     */
    protected currentNode: MazeNode;
    /**
     * The # of nodes in this maze
     */
    protected size: number;
    /**
     * Contains the size of the range for each dimension of the maze.
     * @type {any[]}
     */
    protected dimensions: number[];
    /**
     * Pointer to the 'starting' node of this maze.  Not required to have a valid value.
     */
    protected start: MazeNode;
    /**
     * Pointer to the 'finishing' node of this maze.  Not requried to have a valid value.
     */
    protected finish: MazeNode;
    /**
     * Set the cardinality behavior for nodes on this maze.
     *
     * @param {CardinalityBehavior} cardinalityBehavior
     */
    setCardinalityBehavior(cardinalityBehavior: CardinalityBehavior): void;
    /**
     * Get the cardinality behavior for nodes on this maze.
     *
     * @returns {CardinalityBehavior}
     */
    getCardinalityBehavior(): CardinalityBehavior;
    /**
     * Assign a "dictionary" of maze nodes to this maze.
     *
     * @param {{[p: string]: MazeNode}} nodes
     */
    setNodes(nodes: {
        [key: string]: MazeNode;
    }): void;
    /**
     * Get the "dictionary" of maze nodes contained in this maze.
     * @returns {{[p: string]: MazeNode}}
     */
    getNodes(): {
        [key: string]: MazeNode;
    };
    /**
     * Get the MazeNode at the given coordinates, if available.
     *
     * @param {MazeCoordinates} coordinates
     * @returns {MazeNode}
     */
    getNode(coordinates: MazeCoordinates): MazeNode;
    /**
     * Assign the indicated node a 'starting point' status.
     *
     * @param {MazeNode} node
     */
    setStartNode(node: MazeNode): void;
    /**
     * Get the node which is defined as the 'starting point', if available.
     *
     * @returns {MazeNode}
     */
    getStartNode(): MazeNode;
    /**
     * Assign the indicated node a 'finishing point' status.
     *
     * @param {MazeNode} node
     */
    setFinishNode(node: MazeNode): void;
    /**
     * Get the node which is defined as the 'finishing point', if available.
     *
     * @returns {MazeNode | boolean}
     */
    getFinishNode(): MazeNode | boolean;
    /**
     * Get the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4, l = 6) will
     * return [4, 6].
     *
     * @returns {number[]}
     */
    getDimensions(): number[];
    /**
     * Set the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4, l = 6) will
     * be assigned with an array defined as [4, 6].
     *
     * @returns {number[]}
     */
    setDimensions(dimensions: number[]): void;
    /**
     * Get the total number of nodes belonging to this maze.
     * @returns {number}
     */
    getSize(): number;
    /**
     * Set the 'current' node pointer at the indicated node.
     *
     * @param {MazeNode} node
     */
    setCurrentNode(node: MazeNode): void;
    /**
     * Move the 'current' node pointer for this maze in the indicated direction, if available.  Returns
     * the new node if successful, or otherwise FALSE
     *
     * @param {number} direction
     * @returns {MazeNode | boolean}
     */
    move(direction: number): MazeNode | boolean;
}
