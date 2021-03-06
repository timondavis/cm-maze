import { Cardinality } from "../Behavior/Cardinality";
import { MazeNode } from "./MazeNode";
import { NodeLocation } from "../MazeCoordinates/NodeLocation";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IMaze extends ISerializableModel {
    cardinality: Cardinality;
    nodes: {
        [key: string]: MazeNode;
    };
    currentNode: MazeNode;
    dimensions: number[];
    start: MazeNode;
    finish: MazeNode;
    id: string;
}
/**
 * @class Maze
 *
 * A traverse-able maze, which manifests as a graph of interconnected nodes.
 */
export declare class Maze extends SerializableModel {
    protected state: IMaze;
    constructor(mazeData?: IMaze);
    /**
     * Get the unique GUID for this maze
     */
    get id(): string;
    /**
     * Set the cardinality behavior for nodes on this maze.
     *
     * @param {CardinalityBehavior} cardinality
     */
    setCardinality(cardinality: Cardinality): void;
    /**
     * Get the cardinality  for nodes on this maze.
     *
     * @returns {Cardinality}
     */
    getCardinality(): Cardinality;
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
     * Get the Maze Node with the given ID, if it exists.  Returns null if not found.
     * @param mazeNodeId
     */
    getNodeWithId(mazeNodeId: string): MazeNode;
    /**
     * Does the maze node dictionary have an entry with the given ID?
     * @param mazeNodeId
     */
    containsNodeWithId(mazeNodeId: string): boolean;
    /**
     * Get all nodes as an array instead of a map (which is the native structure).
     */
    getNodesArray(): MazeNode[];
    /**
     * Add a node to the node array
     * @param key
     * @param mazeNode
     */
    addNode(mazeNode: MazeNode, demandUniqueLocations?: boolean): void;
    /**
     * Iterate through the maze nodes by calling in a callback function.  Callback
     * function will be processed on each MazeNode in the collection.
     *
     * @param callback (node: MazeNode, key: string, nodes: { [key: string] : MazeNode }) => void
     */
    forEachNode(callback: (node: MazeNode, key: string, nodes: {
        [key: string]: MazeNode;
    }) => void): void;
    /**
     * Get the MazeNode at the given location, if available.
     *
     * @param {NodeLocation} location
     * @returns {MazeNode}
     */
    getNodeAtLocation(location: NodeLocation): MazeNode;
    /**
     * Get a random node from the maze.
     */
    getRandomNode(): MazeNode;
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
     * @returns {MazeNode}
     */
    getFinishNode(): MazeNode;
    /**
     * Get the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6 (y axis)) will
     * return [4, 6].
     *
     * @returns {number[]}
     */
    getDimensions(): number[];
    /**
     * Set the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6(y axis)) will
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
     * Get the 'current' node pointer at the indicated node.
     * @returns {MazeNode}
     */
    getCurrentNode(): MazeNode;
    getLocationKeyIndex(): Map<string, MazeNode>;
    /**
     * Move the 'current' node pointer for this maze in the indicated direction, if available.  Returns
     * the new node if successful, or otherwise FALSE
     *
     * @param {number} direction
     * @returns {MazeNode | boolean}
     */
    move(direction: number): MazeNode | boolean;
    private prepareMazeIndexArray;
    private generate2DMazeIndex;
    /**
     * Generate a unique key
     */
    private static generateKey;
}
