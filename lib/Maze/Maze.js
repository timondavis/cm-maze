"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maze = void 0;
const cm_domain_utilities_1 = require("cm-domain-utilities");
/**
 * @class Maze
 *
 * A traverse-able maze, which manifests as a graph of interconnected nodes.
 */
class Maze extends cm_domain_utilities_1.SerializableModel {
    constructor(mazeData = null) {
        super();
        if (mazeData) {
            this.state = mazeData;
        }
        else {
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
    get id() {
        return this.state.id;
    }
    /**
     * Set the cardinality behavior for nodes on this maze.
     *
     * @param {CardinalityBehavior} cardinality
     */
    setCardinality(cardinality) {
        this.state.cardinality = cardinality;
    }
    /**
     * Get the cardinality  for nodes on this maze.
     *
     * @returns {Cardinality}
     */
    getCardinality() {
        return this.state.cardinality;
    }
    /**
     * Assign a "dictionary" of maze nodes to this maze.
     *
     * @param {{[p: string]: MazeNode}} nodes
     */
    setNodes(nodes) {
        this.state.nodes = nodes;
    }
    /**
     * Get the "dictionary" of maze nodes contained in this maze.
     * @returns {{[p: string]: MazeNode}}
     */
    getNodes() {
        return this.state.nodes;
    }
    /**
     * Get the Maze Node with the given ID, if it exists.  Returns null if not found.
     * @param mazeNodeId
     */
    getNodeWithId(mazeNodeId) {
        if (this.containsNodeWithId(mazeNodeId)) {
            return this.state.nodes[mazeNodeId];
        }
        return null;
    }
    /**
     * Does the maze node dictionary have an entry with the given ID?
     * @param mazeNodeId
     */
    containsNodeWithId(mazeNodeId) {
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
    getNodesArray() {
        let nodesArray;
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
    addNode(mazeNode, demandUniqueLocations = true) {
        if (demandUniqueLocations && this.getNodeAtLocation(mazeNode.location)) {
            throw "Duplicate location assignment on Maze nodes";
        }
        this.state.nodes[mazeNode.id] = mazeNode;
    }
    /**
     * Iterate through the maze nodes by calling in a callback function.  Callback
     * function will be processed on each MazeNode in the collection.
     *
     * @param callback (node: MazeNode, key: string, nodes: { [key: string] : MazeNode }) => void
     */
    forEachNode(callback) {
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
    getNodeAtLocation(location) {
        const keys = Object.keys(this.state.nodes);
        let tryNode = null;
        let foundNode = null;
        let key = "";
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
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
    getRandomNode() {
        let randomIndex = Math.floor(Math.random() * (this.getNodesArray().length - 1));
        return this.getNodesArray()[randomIndex];
    }
    /**
     * Assign the indicated node a 'starting point' status.
     *
     * @param {MazeNode} node
     */
    setStartNode(node) {
        this.state.start = node;
    }
    /**
     * Get the node which is defined as the 'starting point', if available.
     *
     * @returns {MazeNode}
     */
    getStartNode() {
        return this.state.start;
    }
    /**
     * Assign the indicated node a 'finishing point' status.
     *
     * @param {MazeNode} node
     */
    setFinishNode(node) {
        this.state.finish = node;
    }
    /**
     * Get the node which is defined as the 'finishing point', if available.
     *
     * @returns {MazeNode}
     */
    getFinishNode() {
        return this.state.finish;
    }
    /**
     * Get the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6 (y axis)) will
     * return [4, 6].
     *
     * @returns {number[]}
     */
    getDimensions() {
        return this.state.dimensions;
    }
    /**
     * Set the range of each dimension of this maze.  For example, a 4 x 6 maze ( w = 4 (x axis), l = 6(y axis)) will
     * be assigned with an array defined as [4, 6].
     *
     * @returns {number[]}
     */
    setDimensions(dimensions) {
        this.state.dimensions = dimensions;
    }
    /**
     * Get the total number of nodes belonging to this maze.
     * @returns {number}
     */
    getSize() {
        return Object.keys(this.state.nodes).length;
    }
    /**
     * Set the 'current' node pointer at the indicated node.
     *
     * @param {MazeNode} node
     */
    setCurrentNode(node) {
        this.state.currentNode = node;
    }
    /**
     * Get the 'current' node pointer at the indicated node.
     * @returns {MazeNode}
     */
    getCurrentNode() {
        return this.state.currentNode;
    }
    getLocationKeyIndex() {
        let node;
        let location;
        let mazeArray = this.prepareMazeIndexArray();
        Object.keys(this.getNodes()).forEach((key) => {
            node = this.getNodeWithId(key);
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
    move(direction) {
        if (this.state.currentNode.isConnectionPointOccupied(direction)) {
            this.state.currentNode = this.getNodeWithId(this.state.currentNode.getNeighborIdAt(direction));
            return this.state.currentNode;
        }
        return false;
    }
    prepareMazeIndexArray() {
        let mazeArray = [];
        for (let x = 0; x < this.state.dimensions[0]; x++) {
            mazeArray[x] = [];
            for (let y = 0; y < this.state.dimensions[1]; y++) {
                mazeArray[x][y] = null;
            }
        }
        return mazeArray;
    }
    generate2DMazeIndex(mazeArray) {
        let index = new Map();
        for (let x = 0; x < this.state.dimensions[0]; x++) {
            for (let y = 0; y < this.state.dimensions[1]; y++) {
                if (mazeArray[x][y] !== null) {
                    index.set(mazeArray[x][y].location.toString(), mazeArray[x][y]);
                }
            }
        }
        return index;
    }
    /**
     * Generate a unique key
     */
    static generateKey() {
        let uuid = require('uuid/v4');
        return uuid();
    }
}
exports.Maze = Maze;
