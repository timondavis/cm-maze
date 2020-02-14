import { NodeLocation } from "./MazeCoordinates/NodeLocation";
import { Cardinality } from "./Behavior/Cardinality";
import { ConcreteSerializable } from "./ConcreteSerializable";
/**
 * @class MazeNode
 *
 * The MazeNode represents a node or 'room' in a maze.  It is designed to facilitate connection and traversal
 * to other MazeNode instances.
 */
export declare class MazeNode extends ConcreteSerializable {
    /**
     * Index ID Incrementor
     */
    private static indexIdCounter;
    /**
     * Provides services and constraints allowing for the logical connection and traversal between this and other nodes
     */
    private readonly _cardinality;
    /**
     * Unique index assigned to every new node.
     */
    private readonly _indexId;
    /**
     * Unique string key for maze node
     */
    private readonly _mazeNodeId;
    /**
     * The name of this node
     *
     * @type {string}
     */
    private _name;
    /**
     * A collection of index ids for neighboring nodes
     * @type { MazeNode[] }
     */
    private _neighbors;
    /**
     * The maximum number of exits on this node which connect to other nodes.  A node cannot have more neighbors
     * than what is dictated by this value.
     */
    private _maxExits;
    /**
     * Debug Mode
     * @type {boolean}
     */
    protected static debug: boolean;
    /**
     * The NodeLocation track the location of this node relative to other nodes
     *
     * @type { NodeLocation }
     */
    private _coordinates;
    /**
     * Contents of the maze node.  Maps within a map.
     * The master map ties a string id to a consuming developers custom defined Map.
     */
    contents: Map<string, Map<any, any>>;
    constructor(cardinality: Cardinality, id?: string, coordinates?: NodeLocation, maxConnections?: number);
    readonly id: string;
    private readonly indexId;
    location: NodeLocation;
    readonly locationId: string;
    readonly neighbors: string[];
    name: string;
    maxConnections: number;
    readonly cardinality: Cardinality;
    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.  If either node is maxed out, no connection will be made.
     *
     * @param {string} mazeNodeId           The node Id to connect to this node
     * @param {number} exitPosition     The cardinality position you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will position back to this node.
     * @returns {MazeNode}
     */
    connectTo(node: MazeNode, exitPosition: number, autoConnect?: boolean): MazeNode;
    /**
     * Get a connected node by indicating the exit (cardinality position) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {string} Maze node ID
     */
    getNeighborIdAt(exitPosition: number): string;
    /**
     * Find out if the indicated node indicated to this node directly, as a neighbor
     *
     * @param {MazeNode} node
     * @returns {boolean}
     */
    isNeighborsWith(node: MazeNode): boolean;
    /**
     * Get a list of occupied exit positions on the node.
     *
     * @returns {MazeNode[]}
     */
    getOccupiedConnectionPoints(): number[];
    /**
     * Get a list of unoccupied exit positions on the node
     *
     * @returns {number[]}
     */
    getAvailableConnectionPoints(): number[];
    /**
     * Get an array of neighboring node ids.
     *
     * @boolean {includeOpenNodes}  Get the array with null nodes in-tact.  Useful for mapping.  Defaults to FALSE.
     * @returns {string[]}
     */
    getNeighborIds(includeOpenNodes?: boolean): string[];
    /**
     * Find out whether an entry/exit position on the node is empty.
     *
     * @param {number} point
     * @returns {boolean}
     */
    isConnectionPointOpen(point: number): boolean;
    /**
     * Find out whether an entry/exit position on the node is occupied
     * @param {number} point
     * @returns {boolean}
     */
    isConnectionPointOccupied(point: number): boolean;
    /**
     * Stringify the output for human console consumption
     *
     * @returns {string}
     */
    toString(): string;
    /**
     * Toggle debugging messages
     *
     * @param {boolean} toggle
     */
    static toggleDebug(toggle?: boolean): void;
    /**
     * Generate a unique key
     */
    static generateKey(): any;
}
