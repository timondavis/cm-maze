import { MazeCoordinates } from "./MazeCoordinates/MazeCoordinates";
import { CardinalityBehavior } from "./Behavior/CardinalityBehavior";
export declare class MazeNode {
    protected static debug: boolean;
    protected neighbors: MazeNode[];
    protected cardinality: CardinalityBehavior;
    protected name: string;
    protected coordinates: MazeCoordinates;
    protected maxExits: number;
    constructor(cardinality: CardinalityBehavior, coordinates?: MazeCoordinates);
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
     * Find out of the indicated exitPosition of cardinality is occupied on this node
     *
     * @param {number} exitPosition
     * @returns {boolean}
     */
    isPositionOccupied(exitPosition: number): boolean;
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
    getOccupiedExitPoints(): number[];
    /**
     * Get a list of unoccupied exit positions on the node
     *
     * @returns {number[]}
     */
    getOpenExitPoints(): number[];
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
     * @param {number} position
     * @returns {boolean}
     */
    isPointOpen(position: number): boolean;
    /**
     * Set the coordinates for this node
     *
     * @param {MazeCoordinates} coordinates
     * @returns {this}
     */
    setCoordinates(coordinates: MazeCoordinates): this;
    /**
     * Get the coordinates for this node
     * @returns {MazeCoordinates}
     */
    getCoordinates(): MazeCoordinates;
    /**
     * Get the cardinality behavior object associated with this node.
     * @returns {CardinalityBehavior}
     */
    getCardinality(): CardinalityBehavior;
    /**
     * Stringify the output for human console consumption
     *
     * @returns {string}
     */
    toString(): string;
    setMaxExits(maxExits: number): MazeNode;
    getMaxExits(): number;
    /**
     * Toggle debugging messages
     *
     * @param {boolean} toggle
     */
    static toggleDebug(toggle?: boolean): void;
}
