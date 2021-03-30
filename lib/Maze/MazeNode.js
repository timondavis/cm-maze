"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeNode = void 0;
const cm_domain_utilities_1 = require("cm-domain-utilities");
/**
 * @class MazeNode
 *
 * The MazeNode represents a node or 'room' in a maze.  It is designed to facilitate connection and traversal
 * to other MazeNode instances.
 */
class MazeNode extends cm_domain_utilities_1.SerializableModel {
    constructor(cardinality, id = null, coordinates, maxConnections = null) {
        super();
        this.state = {
            cardinality: cardinality,
            contents: new Map(),
            coordinates: (coordinates) ? coordinates : cardinality.generateNodeLocation(),
            indexId: MazeNode.indexIdCounter,
            maxExits: (maxConnections) ? maxConnections : cardinality.getConnectionPointCount(),
            mazeNodeId: (id) ? id : MazeNode.generateKey(),
            name: "",
            neighbors: new Array(cardinality.getConnectionPointCount())
        };
    }
    get id() {
        return this.state.mazeNodeId;
    }
    get indexId() {
        return this.state.indexId;
    }
    set location(value) {
        this.state.coordinates = value;
    }
    get location() {
        return this.state.coordinates;
    }
    get locationId() {
        return this.location.toString();
    }
    get neighbors() {
        return this.state.neighbors;
    }
    set name(name) {
        this.state.name = name;
    }
    get name() {
        return this.state.name;
    }
    set maxConnections(maxConnections) {
        this.state.maxExits = maxConnections;
    }
    get maxConnections() {
        return this.state.maxExits;
    }
    get cardinality() {
        return this.state.cardinality;
    }
    get contents() {
        return this.state.contents;
    }
    set contents(contents) {
        this.state.contents = contents;
    }
    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.  If either node is maxed out, no connection will be made.
     *
     * @param {string} mazeNodeId           The node Id to connect to this node
     * @param {number} exitPosition     The cardinality position you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will position back to this node.
     * @returns {MazeNode}
     */
    connectTo(node, exitPosition, autoConnect = true) {
        if (!this.isConnectionPointOpen(exitPosition)) {
            throw ("One-Way connection failed: " +
                "Indicated node reports that given exit is not available for connection..");
        }
        if (exitPosition >= this.cardinality.getConnectionPointCount() || exitPosition < 0) {
            throw ("Indicated exitPosition value exceeds maximum MazeNode cardinality range");
        }
        if (!this.neighbors[exitPosition] === undefined) {
            throw ("Indicated exitPosition exitPosition is already occupied.  Two exits/entries may not occupy the same exitPosition");
        }
        this.neighbors[exitPosition] = node.id;
        if (autoConnect) {
            if (!node.isConnectionPointOpen(node.cardinality.getOpposingConnectionPoint(exitPosition))) {
                throw ("Two-Way conneciton failed.  Indicated node will not tolerate any more additonal connections, " +
                    "maximum reached.");
            }
            let entryPosition = this.cardinality.getOpposingConnectionPoint(exitPosition);
            node.connectTo(this, entryPosition, false);
            if (MazeNode.debug) {
                console.log("CONNECTING NODES\n");
                console.log(this.name + " (" + exitPosition + ")  <=> (" + entryPosition + ") " + node.name);
            }
        }
        return this;
    }
    /**
     * Get a connected node by indicating the exit (cardinality position) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {string} Maze node ID
     */
    getNeighborIdAt(exitPosition) {
        if (exitPosition >= this.cardinality.getConnectionPointCount() || exitPosition < 0) {
            throw ("Indicated cardinality position is outside of the valid range");
        }
        return this.neighbors[exitPosition];
    }
    /**
     * Find out if the indicated node indicated to this node directly, as a neighbor
     *
     * @param {MazeNode} node
     * @returns {boolean}
     */
    isNeighborsWith(node) {
        for (let i = 0; i < this.cardinality.getConnectionPointCount(); i++) {
            if (node.id == this.neighbors[i]) {
                return true;
            }
        }
        return false;
    }
    /**
     * Get a list of occupied exit positions on the node.
     *
     * @returns {MazeNode[]}
     */
    getOccupiedConnectionPoints() {
        let positions = [];
        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (let i = 0; i < this.cardinality.getConnectionPointCount(); i++) {
            if (this.neighbors[i] != undefined) {
                positions.push(i);
            }
        }
        return positions;
    }
    /**
     * Get a list of unoccupied exit positions on the node
     *
     * @returns {number[]}
     */
    getAvailableConnectionPoints() {
        let positions = [];
        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (let i = 0; i < this.cardinality.getConnectionPointCount(); i++) {
            if (this.neighbors[i] == undefined) {
                positions.push(i);
            }
        }
        return positions;
    }
    /**
     * Get an array of neighboring node ids.
     *
     * @boolean {includeOpenNodes}  Get the array with null nodes in-tact.  Useful for mapping.  Defaults to FALSE.
     * @returns {string[]}
     */
    getNeighborIds(includeOpenNodes = false) {
        let positions = [];
        for (let i = 0; i < this.cardinality.getConnectionPointCount(); i++) {
            if (this.neighbors[i] != undefined) {
                positions.push(this.neighbors[i]);
            }
            else if (includeOpenNodes) {
                positions.push(this.neighbors[i]);
            }
        }
        return positions;
    }
    /**
     * Find out whether an entry/exit position on the node is empty.
     *
     * @param {number} point
     * @returns {boolean}
     */
    isConnectionPointOpen(point) {
        if (this.maxConnections >= 0 && (this.getOccupiedConnectionPoints().length + 1) > this.maxConnections) {
            return false;
        }
        this.cardinality.validateConnectionPoint(point);
        return (this.neighbors[point] === undefined);
    }
    /**
     * Find out whether an entry/exit position on the node is occupied
     * @param {number} point
     * @returns {boolean}
     */
    isConnectionPointOccupied(point) {
        this.cardinality.validateConnectionPoint(point);
        return (this.neighbors[point] !== undefined);
    }
    /**
     * Stringify the output for human console consumption
     *
     * @returns {string}
     */
    toString() {
        let output = "";
        let occupiedExitPoints = this.getOccupiedConnectionPoints();
        output += this.name + ": \n";
        output += "Coordinates: " + this.location.toString() + "\n";
        output += "Exits:";
        for (let i = 0; i < occupiedExitPoints.length; i++) {
            output += " " + occupiedExitPoints[i] + " ";
        }
        output += "\n";
        output += "Max Exits: " + this.maxConnections;
        output += "\n\n";
        return output;
    }
    /**
     * Toggle debugging messages
     *
     * @param {boolean} toggle
     */
    static toggleDebug(toggle) {
        if (toggle === undefined) {
            MazeNode.debug = !MazeNode.debug;
        }
        else {
            MazeNode.debug = toggle;
        }
    }
    /**
     * Generate a unique key
     */
    static generateKey() {
        let uuid = require('uuid/v4');
        return uuid();
    }
}
exports.MazeNode = MazeNode;
MazeNode.debug = false;
MazeNode.indexIdCounter = 0;
