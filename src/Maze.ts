import {Cardinality} from "./Behavior/Cardinality";
import {MazeNode} from "./MazeNode";
import {NodeLocation} from "./MazeCoordinates/NodeLocation";

export interface IMaze {

	cardinality : Cardinality;
	nodes : { [key:string] : MazeNode };
	currentNode : MazeNode;
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
export class Maze {

	protected state: IMaze;

    public constructor(mazeData: IMaze = null) {

    	if (mazeData) {
    		this.state = mazeData;
		} else {
    		this.state = {
				cardinality: undefined,
				currentNode: undefined,
				dimensions: [],
				finish: undefined,
				id: Maze.generateKey(),
				nodes: {},
				start: undefined
			};
		}
    }

    /**
     * Get the unique GUID for this maze
     */
    public get id() {
        return this.state.id;
    }


    /**
     * Set the cardinality behavior for nodes on this maze.
     *
     * @param {CardinalityBehavior} cardinality
     */
    public setCardinality(cardinality : Cardinality) {
        this.state.cardinality = cardinality;
    }


    /**
     * Get the cardinality  for nodes on this maze.
     *
     * @returns {Cardinality}
     */
    public getCardinality(): Cardinality {
        return this.state.cardinality;
    }

    /**
     * Assign a "dictionary" of maze nodes to this maze.
     *
     * @param {{[p: string]: MazeNode}} nodes
     */
    public setNodes(nodes: { [key:string] : MazeNode }) {

        this.state.nodes = nodes;
    }

    /**
     * Get the "dictionary" of maze nodes contained in this maze.
     * @returns {{[p: string]: MazeNode}}
     */
    public getNodes() : { [key:string] : MazeNode } {
        return this.state.nodes;
    }

    /**
     * Get the Maze Node with the given ID, if it exists.  Returns null if not found.
     * @param mazeNodeId
     */
    public getNodeWithId(mazeNodeId: string) : MazeNode {
        if (this.containsNodeWithId(mazeNodeId)) {
            return this.state.nodes[mazeNodeId];
        }
        return null;
    }

    /**
     * Does the maze node dictionary have an entry with the given ID?
     * @param mazeNodeId
     */
    public containsNodeWithId(mazeNodeId: string) : boolean {
        let nodeIdFound = false;
        Object.keys(this.state.nodes).forEach((key) => {
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
            nodesArray.push(this.state.nodes[key]);
        });

        return nodesArray;
    }

    /**
     * Add a node to the node array
     * @param key
     * @param mazeNode
     */
    public addNode(mazeNode: MazeNode, demandUniqueLocations: boolean = true) {
        if (demandUniqueLocations && this.getNodeAtLocation(mazeNode.location)) { throw "Duplicate location assignment on Maze nodes"; }
        this.state.nodes[mazeNode.id] = mazeNode;
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

       const keys = Object.keys(this.state.nodes);
       let tryNode: MazeNode = null;
       let foundNode: MazeNode = null;
       let key: string = "";

       for (let keyIndex = 0 ; keyIndex < keys.length ; keyIndex++) {
           key = keys[keyIndex];
           tryNode = this.getNodeWithId(key);

           if (tryNode && tryNode.location.toString() === location.toString()) {
               foundNode = this.state.nodes[key];
               break;
           }
       }

       return foundNode;
    }

	/**
	 * Get a random node from the maze.
	 */
	public getRandomNode() {
    	let randomIndex = Math.floor(Math.random() * (this.getNodesArray().length - 1));

    	return this.getNodesArray()[randomIndex];
	}

    /**
     * Assign the indicated node a 'starting point' status.
     *
     * @param {MazeNode} node
     */
    public setStartNode( node: MazeNode ) {

        this.state.start = node;
    }

    /**
     * Get the node which is defined as the 'starting point', if available.
     *
     * @returns {MazeNode}
     */
    public getStartNode() : MazeNode {

        return this.state.start;
    }

    /**
     * Assign the indicated node a 'finishing point' status.
     *
     * @param {MazeNode} node
     */
    public setFinishNode( node: MazeNode ) : void {

        this.state.finish = node;
    }

    /**
     * Get the node which is defined as the 'finishing point', if available.
     *
     * @returns {MazeNode}
     */
    public getFinishNode() : MazeNode {

        return this.state.finish;
    }

    /**
     * Get the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6 (y axis)) will
     * return [4, 6].
     *
     * @returns {number[]}
     */
    public getDimensions() {
        return this.state.dimensions;
    }

    /**
     * Set the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6(y axis)) will
     * be assigned with an array defined as [4, 6].
     *
     * @returns {number[]}
     */
    public setDimensions( dimensions: number[] ) {
        this.state.dimensions = dimensions;
    }

    /**
     * Get the total number of nodes belonging to this maze.
     * @returns {number}
     */
    public getSize() : number {
		return Object.keys(this.state.nodes).length;
	}

    /**
     * Set the 'current' node pointer at the indicated node.
     *
     * @param {MazeNode} node
     */
    public setCurrentNode( node: MazeNode ) {

        this.state.currentNode = node;
    }

    /**
     * Get the 'current' node pointer at the indicated node.
     * @returns {MazeNode}
     */
    public getCurrentNode(): MazeNode {

        return this.state.currentNode;
    }

    public getLocationKeyIndex(): Map<string, MazeNode> {

        let node: MazeNode;
        let location : NodeLocation;
        let mazeArray : MazeNode[][] = this.prepareMazeIndexArray();

        Object.keys(this.getNodes()).forEach((key) => {
            node = <MazeNode> this.getNodeWithId(key);
            location = node.location;
            mazeArray[location.position[0]][location.position[1]] = node;
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

        if ( this.state.currentNode.isConnectionPointOccupied(direction) ) {
            this.state.currentNode = this.getNodeWithId(this.state.currentNode.getNeighborIdAt( direction ));
            return this.state.currentNode;
        }

        return false;
    }

    private prepareMazeIndexArray(): MazeNode[][] {
        let mazeArray : MazeNode[][] = [];

        for (let x = 0 ; x < this.state.dimensions[0] ; x++ ) {
            mazeArray[x] = [];
            for (let y = 0 ; y < this.state.dimensions[1] ; y++ ) {
                mazeArray[x][y] = null;
            }
        }

        return mazeArray;
    }

    private generate2DMazeIndex(mazeArray: MazeNode[][]) : Map<string, MazeNode> {
        let index : Map<string, MazeNode> = new Map<string, MazeNode>();

        for ( let x = 0 ; x < this.state.dimensions[0] ; x++ ) {
            for ( let y = 0 ; y < this.state.dimensions[1] ; y++ ) {
                if (mazeArray[x][y] !== null) {
                    index.set(mazeArray[x][y].location.toString(),  mazeArray[x][y]);
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
