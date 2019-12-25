import {Cardinality} from "./Behavior/Cardinality";
import {MazeNode} from "./MazeNode";
import {NodeLocation} from "./MazeCoordinates/NodeLocation";

/**
 * @class Maze
 *
 * A traverse-able maze, which manifests as a graph of interconnected nodes.
 */
export class Maze {

    /**
     * The Cardinality concrete instance which describes how nodes connect and traverse.
     *
     * @type {CardinalityBehavior}
     */
    protected cardinality : Cardinality;

    /**
     * A "Dictionary" of nodes in the maze, indexed by string ( @see MazeNode.getLocation().toString() )
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

    private id: string;

    public constructor(mazeData: any = null) {
        if (mazeData === null) { return; }

        this.cardinality = mazeData.cardinality;
        this.id = Maze.generateKey();
    }

    /**
     * Get the unique GUID for this maze
     */
    public getId() {
        return this.id;
    }


    /**
     * Set the cardinality behavior for nodes on this maze.
     *
     * @param {CardinalityBehavior} cardinality
     */
    public setCardinality(cardinality : Cardinality) {
        this.cardinality = cardinality;
    }


    /**
     * Get the cardinality  for nodes on this maze.
     *
     * @returns {Cardinality}
     */
    public getCardinality(): Cardinality {

        return this.cardinality;
    }

    /**
     * Assign a "dictionary" of maze nodes to this maze.
     *
     * @param {{[p: string]: MazeNode}} nodes
     */
    public setNodes(nodes: { [key:string] : MazeNode }) {

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
     * Get the Maze Node with the given ID, if it exists.  Returns null if not found.
     * @param mazeNodeId
     */
    public getNodeWithId(mazeNodeId: string) : MazeNode {
        if (this.containsNodeWithId(mazeNodeId)) {
            return this.nodes[mazeNodeId];
        }
        return null;
    }

    /**
     * Does the maze node dictionary have an entry with the given ID?
     * @param mazeNodeId
     */
    public containsNodeWithId(mazeNodeId: string) : boolean {
        let nodeIdFound = false;
        Object.keys(this.nodes).forEach((key) => {
            if (key === mazeNodeId) {
                nodeIdFound = true;
            }
        });

        return nodeIdFound;
    }

    /**
     * Get all nodes as an array instead of a map (which is the native structure).
     */
    public getNodesArray() : MazeNode[] {
        let nodesArray: MazeNode[];
        nodesArray = [];

        Object.keys(this.getNodes()).forEach(key => {
            nodesArray.push(this.nodes[key]);
        });

        return nodesArray;
    }

    /**
     * Add a node to the node array
     * @param key
     * @param mazeNode
     */
    public addNode(mazeNode: MazeNode, demandUniqueLocations: boolean = true) {
        if (demandUniqueLocations && this.getNodeAtLocation(mazeNode.getLocation())) { throw "Duplicate key assignment on Maze nodes"; }
        this.nodes[mazeNode.getId()] = mazeNode;
    }

    /**
     * Iterate through the maze nodes by calling in a callback function.  Callback
     * function will be processed on each MazeNode in the collection.
     *
     * @param callback (node: MazeNode, key: string, nodes: { [key: string] : MazeNode }) => void
     */
    public forEachNode(callback: (node: MazeNode, key: string, nodes: { [key: string] : MazeNode}) => void) : void {
        Object.keys(this.getNodes()).forEach((key) => {
            callback(this.getNodes()[key], key, this.getNodes());
        });
    }

    /**
     * Get the MazeNode at the given location, if available.
     *
     * @param {NodeLocation} location
     * @returns {MazeNode}
     */
    public getNodeAtLocation( location : NodeLocation ) : MazeNode {

       const keys = Object.keys(this.nodes);
       let tryNode: MazeNode = null;
       let foundNode: MazeNode = null;
       let key: string = "";

       for (let keyIndex = 0 ; keyIndex < keys.length ; keyIndex++) {
           key = keys[keyIndex];
           tryNode = this.getNodeWithId(key);

           if (tryNode && tryNode.getLocation().toString() === location.toString()) {
               foundNode = this.nodes[key];
               break;
           }
       }

       return foundNode;

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
     * @returns {MazeNode}
     */
    public getFinishNode() : MazeNode {

        return this.finish;
    }

    /**
     * Get the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6 (y axis)) will
     * return [4, 6].
     *
     * @returns {number[]}
     */
    public getDimensions() {
        return this.dimensions;
    }

    /**
     * Set the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6(y axis)) will
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

    public getLocationKeyIndex(): Map<string, MazeNode> {

        let node: MazeNode;
        let location : NodeLocation;
        let mazeArray : MazeNode[][] = this.prepareMazeIndexArray();

        Object.keys(this.getNodes()).forEach((key) => {
            node = <MazeNode> this.getNodeWithId(key);
            location = node.getLocation();
            mazeArray[location.getPosition()[0]][location.getPosition()[1]] = node;
        });

        return this.generate2DMazeIndex(mazeArray);
    }

    /**
     * Move the 'current' node pointer for this maze in the indicated direction, if available.  Returns
     * the new node if successful, or otherwise FALSE
     *
     * @param {number} direction
     * @returns {MazeNode | boolean}
     */
    public move( direction : number ) : MazeNode | boolean {

        if ( this.currentNode.isConnectionPointOccupied(direction) ) {
            this.currentNode = this.getNodeWithId(this.currentNode.getNeighborIdAt( direction ));
            return this.currentNode;
        }

        return false;
    }

    private prepareMazeIndexArray(): MazeNode[][] {
        let mazeArray : MazeNode[][] = [];

        for (let x = 0 ; x < this.dimensions[0] ; x++ ) {
            mazeArray[x] = [];
            for (let y = 0 ; y < this.dimensions[1] ; y++ ) {
                mazeArray[x][y] = null;
            }
        }

        return mazeArray;
    }

    private generate2DMazeIndex(mazeArray: MazeNode[][]) : Map<string, MazeNode> {
        let index : Map<string, MazeNode> = new Map<string, MazeNode>();

        for ( let x = 0 ; x < this.dimensions[0] ; x++ ) {
            for ( let y = 0 ; y < this.dimensions[1] ; y++ ) {
                if (mazeArray[x][y] !== null) {
                    index.set(mazeArray[x][y].getLocation().toString(),  mazeArray[x][y]);
                }
            }
        }

        return index;
    }


    /**
     * Generate a unique key
     */
    private static generateKey() {

        let uuid = require('uuid/v4');
        return uuid();
    }
}
