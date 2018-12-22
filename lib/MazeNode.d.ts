import { NodeLocation } from "./MazeCoordinates/NodeLocation";
import { Cardinality } from "./Behavior/Cardinality";
/**
 * @class MazeNode
 *
 * The MazeNode represents a node or 'room' in a maze.  It is designed to facilitate connection and traversal
 * to other MazeNode instances.
 */
export declare class MazeNode {
    /**
     * Debug Mode
     * @type {boolean}
     */
    protected static debug: boolean;
    /**
     * A collection of neighboring nodes, stored by exit point index
     * @type { MazeNode[] }
     */
    protected neighbors: MazeNode[];
    /**
     * Provides services and constraints allowing for the logical connection and traversal between this and other nodes
     */
    protected cardinality: Cardinality;
    /**
     * The name of this node
     *
     * @type {string}
     */
    protected name: string;
    /**
     * The NodeLocation track the location of this node relative to other nodes
     *
     * @type { NodeLocation }
     */
    protected coordinates: NodeLocation;
    /**
     * The maximum number of exits on this node which connect to other nodes.  A node cannot have more neighbors
     * than what is dictated by this value.
     */
    protected maxExits: number;
    constructor(cardinality: Cardinality, coordinates?: NodeLocation);
    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.  If either node is maxed out, no connection will be made.
     *
     * @param {MazeNode} node           The node to connect to this node
     * @param {number} exitPosition     The cardinality position you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will position back to this node.
     * @returns {MazeNode}
     */
    connectTo(node: MazeNode, exitPosition: number, autoConnect?: boolean): MazeNode;
    /**
     * Get a connected node by indicating the exit (cardinality position) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {MazeNode}
     */
    getNeighborAt(exitPosition: number): MazeNode;
    /**
     * Give this node a name, if you like
     *
     * @param {string} name
     * @returns {MazeNode}
     */
    setName(name: string): MazeNode;
    /**
     * Get the name of this node
     *
     * @param {string} name
     */
    getName(): string;
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
    getOpenConnectionPoints(): number[];
    /**
     * Get an array of neighboring nodes.
     *
     * @boolean {includeOpenNodes}  Get the array with null nodes in-tact.  Useful for mapping.  Defaults to FALSE.
     * @returns {MazeNode[]}
     */
    getNeighbors(includeOpenNodes?: boolean): MazeNode[];
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
     * @deprecated
     * @use Location
     * Set the coordinates for this node
     * @param {NodeLocation} coordinates
     * @returns {this}
     */
    setLocation(coordinates: NodeLocation): this;
    /**
     * @deprecated
     * @use Location
     * Get the coordinates for this node
     * @returns {NodeLocation}
     */
    getLocation(): NodeLocation;
    /**
     * Get the coordinate information for this node
     * @returns {NodeLocation}
     */
    /**
     * Set the coordinates for this node
     * @param {NodeLocation} value
     */
    Location: NodeLocation;
    /**
     * Get the cardinality behavior object associated with this node.
     * @returns {Cardinality}
     */
    getCardinality(): Cardinality;
    /**
     * Stringify the output for human console consumption
     *
     * @returns {string}
     */
    toString(): string;
    /**
     * Set the maximum amount of nodes that this node can connect to.
     *
     * @param {number} maxConnections
     * @returns {MazeNode}
     */
    setMaxConnections(maxConnections: number): MazeNode;
    /**
     * Get the maximum amount of nodes that this node can connect to.
     *
     * @returns {number}
     */
    getMaxConnections(): number;
    /**
     * Toggle debugging messages
     *
     * @param {boolean} toggle
     */
    static toggleDebug(toggle?: boolean): void;
}
