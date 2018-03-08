import {CardinalityBehavior} from "./Behavior/Cardinality";
import {MazeNode} from "./MazeNode";
import {NodeLocation} from "./MazeCoordinates/NodeLocation";

/**
 * @class Maze
 *
 * A traverse-able maze, which manifests as a graph of interconnected nodes.
 */
export class Maze {

    /**
     * The CardinalityBehavior concrete instance which describes how nodes connect and traverse.
     *
     * @type {CardinalityBehavior}
     */
    protected cardinalityBehavior : CardinalityBehavior;

    /**
     * A "Dictionary" of nodes in the maze, indexed by string ( @see MazeNode.getCoordinates().toString() )
     *
     * @type {{ [key:string] : MazeNode }}
     */
    protected nodes : { [key:string] : MazeNode } = {};

    /**
     *  The pointer to the 'current' node, consistent with standard graph traversal.
     *
     *  @type {MazeNode}
     */
    protected currentNode : MazeNode;

    /**
     * The # of nodes in this maze
     *
     * @type {number}
     */
    protected size : number;

    /**
     * Contains the size of the range for each dimension of the maze.
     * @type {any[]}
     */
    protected dimensions: number[] = [];

    /**
     * Pointer to the 'starting' node of this maze.  Not required to have a valid value.
     *
     * @type {MazeNode}
     */
    protected start: MazeNode;

    /**
     * Pointer to the 'finishing' node of this maze.  Not requried to have a valid value.
     *
     * @type {MazeNode}
     */
    protected finish: MazeNode;


    /**
     * Set the cardinality behavior for nodes on this maze.
     *
     * @param {CardinalityBehavior} cardinalityBehavior
     */
    public setCardinalityBehavior( cardinalityBehavior : CardinalityBehavior ) {
        this.cardinalityBehavior = cardinalityBehavior;
    }

    /**
     * Get the cardinality behavior for nodes on this maze.
     *
     * @returns {CardinalityBehavior}
     */
    public getCardinalityBehavior() : CardinalityBehavior {

        return this.cardinalityBehavior;
    }

    /**
     * Assign a "dictionary" of maze nodes to this maze.
     *
     * @param {{[p: string]: MazeNode}} nodes
     */
    public setNodes( nodes: { [key:string] : MazeNode } ) {

        this.nodes = nodes;
        this.size = Object.keys( nodes ).length;
    }

    /**
     * Get the "dictionary" of maze nodes contained in this maze.
     * @returns {{[p: string]: MazeNode}}
     */
    public getNodes() : { [key:string] : MazeNode } {
        return this.nodes;
    }

    /**
     * Get the MazeNode at the given coordinates, if available.
     *
     * @param {NodeLocation} coordinates
     * @returns {MazeNode}
     */
    public getNode( coordinates : NodeLocation ) : MazeNode {

       return this.nodes[coordinates.toString()];
    }

    /**
     * Assign the indicated node a 'starting point' status.
     *
     * @param {MazeNode} node
     */
    public setStartNode( node: MazeNode ) {

        this.start = node;
    }

    /**
     * Get the node which is defined as the 'starting point', if available.
     *
     * @returns {MazeNode}
     */
    public getStartNode() : MazeNode {

        return this.start;
    }

    /**
     * Assign the indicated node a 'finishing point' status.
     *
     * @param {MazeNode} node
     */
    public setFinishNode( node: MazeNode ) : void {

        this.finish = node;
    }

    /**
     * Get the node which is defined as the 'finishing point', if available.
     *
     * @returns {MazeNode | boolean}
     */
    public getFinishNode() : MazeNode | boolean {

        if ( typeof this.finish !== 'undefined' ) {

            return this.finish;
        }

        return false;
    }

    /**
     * Get the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4, l = 6) will
     * return [4, 6].
     *
     * @returns {number[]}
     */
    public getDimensions() {
        return this.dimensions;
    }

    /**
     * Set the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4, l = 6) will
     * be assigned with an array defined as [4, 6].
     *
     * @returns {number[]}
     */
    public setDimensions( dimensions: number[] ) {
        this.dimensions = dimensions;
    }

    /**
     * Get the total number of nodes belonging to this maze.
     * @returns {number}
     */
    public getSize() : number {
        return this.size;
    }

    /**
     * Set the 'current' node pointer at the indicated node.
     *
     * @param {MazeNode} node
     */
    public setCurrentNode( node: MazeNode ) {

        this.currentNode = node;
    }

    /**
     * Get the 'current' node pointer at the indicated node.
     * @returns {MazeNode}
     */
    public getCurrentNode(): MazeNode {

        return this.currentNode;
    }

    /**
     * Move the 'current' node pointer for this maze in the indicated direction, if available.  Returns
     * the new node if successful, or otherwise FALSE
     *
     * @param {number} direction
     * @returns {MazeNode | boolean}
     */
    public move( direction : number ) : MazeNode | boolean {

        if ( this.currentNode.isPointOccupied( direction ) ) {
            this.currentNode = this.currentNode.getNeighborAt( direction );
            return this.currentNode;
        }

        return false;
    }
}