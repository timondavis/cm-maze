import { NodeLocation } from "../MazeCoordinates/NodeLocation";
import { Cardinality } from "../Behavior/Cardinality";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IMazeNode extends ISerializableModel {
    cardinality: Cardinality;
    indexId: number;
    mazeNodeId: string;
    name: string;
    neighbors: string[];
    maxExits: number;
    coordinates: NodeLocation;
    contents: Map<string, Map<any, any>>;
}
/**
 * @class MazeNode
 *
 * The MazeNode represents a node or 'room' in a maze.  It is designed to facilitate connection and traversal
 * to other MazeNode instances.
 */
export declare class MazeNode extends SerializableModel {
    static debug: boolean;
    protected state: IMazeNode;
    private static indexIdCounter;
    constructor(cardinality: Cardinality, id?: string, coordinates?: NodeLocation, maxConnections?: number);
    get id(): string;
    private get indexId();
    set location(value: NodeLocation);
    get location(): NodeLocation;
    get locationId(): string;
    get neighbors(): string[];
    set name(name: string);
    get name(): string;
    set maxConnections(maxConnections: number);
    get maxConnections(): number;
    get cardinality(): Cardinality;
    get contents(): Map<string, Map<any, any>>;
    set contents(contents: Map<string, Map<any, any>>);
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
