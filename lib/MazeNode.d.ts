export declare class MazeNode {
    protected neighbors: MazeNode[];
    protected cardinality: number;
    protected name: string;
    constructor(cardinality: number);
    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.
     *
     * @param {MazeNode} connectTo      The node to connect to this node
     * @param {number} exitPoint        The cardinality point you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will point back to this node.
     */
    connectTo(node: MazeNode, exitPoint: number, autoConnect?: boolean): void;
    /**
     * Find out of the indicated position of cardinality is occupied on this node
     *
     * @param {number} exitPosition
     * @returns {boolean}
     */
    isPositionOccupied(exitPosition: number): boolean;
    /**
     * Get a connected node by indicating the exit (cardinality point) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {MazeNode}
     */
    getNeighborAt(exitPosition: number): MazeNode;
    /**
     * Give this node a name, if you like
     *
     * @param {string} name
     */
    setName(name: string): void;
    /**
     * Get the name of this node
     *
     * @param {string} name
     * @returns {string}
     */
    getName(name: string): string;
    /**
     * Find out if the indicated node indicated to this node directly, as a neighbor
     *
     * @param {MazeNode} node
     * @returns {boolean}
     */
    isNeighborsWith(node: MazeNode): boolean;
}
