"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeBuilder = void 0;
const MazeNode_1 = require("./MazeNode");
const Compass4_1 = require("../Behavior/Compass4");
const Maze_1 = require("./Maze");
const MazeBuilderExitPlacement_1 = require("../MazeBuilder/MazeBuilderExitPlacement");
const InternalExitsStrategy_1 = require("../MazeBuilder/ExitPlacementBehavior/InternalExitsStrategy");
const ExternalExitsOpenStrategy_1 = require("../MazeBuilder/ExitPlacementBehavior/ExternalExitsOpenStrategy");
const ExternalExitsSealedStrategy_1 = require("../MazeBuilder/ExitPlacementBehavior/ExternalExitsSealedStrategy");
/**
 * @class MazeBuilder
 *
 * Instanceable builder class which generates randomized Mazes in their most basic form.  This class can be
 * extended to handle the creation of a specialized maze or a derivative thereof.
 */
class MazeBuilder {
    /**
     * Constructor
     *
     * @param configs : any
     */
    constructor(configs = null) {
        this.cardinality = (configs && configs.hasOwnProperty('cardinality')) ? configs.cardinality : new Compass4_1.Compass4();
        this.complexity = (configs && configs.hasOwnProperty('complexity')) ? configs.complexity : 100;
        this.exitPlacement = (configs && configs.hasOwnProperty('exitPlacement')) ?
            configs.exitPlacement : MazeBuilderExitPlacement_1.MazeBuilderExitPlacement.EXTERNAL_OPEN;
    }
    placeExits() {
        let exitsStrategy;
        switch (this.exitPlacement) {
            case (MazeBuilderExitPlacement_1.MazeBuilderExitPlacement.INTERNAL): {
                exitsStrategy = new InternalExitsStrategy_1.InternalExitsStrategy(this.maze);
                break;
            }
            case (MazeBuilderExitPlacement_1.MazeBuilderExitPlacement.EXTERNAL_OPEN): {
                exitsStrategy = new ExternalExitsOpenStrategy_1.ExternalExitsOpenStrategy(this.maze);
                break;
            }
            case (MazeBuilderExitPlacement_1.MazeBuilderExitPlacement.EXTERNAL_SEALED): {
                exitsStrategy = new ExternalExitsSealedStrategy_1.ExternalExitsSealedStrategy(this.maze);
                break;
            }
            default: {
                throw `Invalid exit strategy supplied: ${this.exitPlacement}`;
                break;
            }
        }
        exitsStrategy.placeEntrance();
        exitsStrategy.placeExit();
    }
    /**
     * Build a new randomized maze instance based on local instance configurations
     *
     * @returns {Maze}
     */
    buildMaze() {
        this.maze = new Maze_1.Maze();
        // Start entry node at 0,0
        let startingCoordinates = this.cardinality.generateNodeLocation();
        this.entry = new MazeNode_1.MazeNode(this.cardinality, "Origin");
        this.maze.addNode(this.entry);
        this.generateRandomPathFrom(this.entry);
        for (let i = 0; i < this.complexity; i++) {
            this.seekAndGenerateRandomPath(this.entry);
        }
        this.maze.setCardinality(this.cardinality);
        this.maze.setNodes(this.normalizeNodeCoordinates());
        this.maze.setCurrentNode(this.entry);
        this.maze.setDimensions(this.getDimensions());
        this.placeExits();
        return this.maze;
    }
    /**
     * Convenience function (static) for shorthand randomization.
     *
     * @TODO !BUG! max cannot be reached by this algorithm, but instead max - 1
     *
     * @param {number} max
     * @param {number} min
     * @returns {number}
     */
    static rand(max = 100, min = 1) {
        max += 1;
        const number = Math.floor(Math.random() * max) + min;
        return Math.min(max, number);
    }
    /**
     * Generate a new random path sourcing from the indicated node.
     *
     * @param {MazeNode} pointer
     * @param {number} depth
     * @returns {MazeBuilder}
     */
    generateRandomPathFrom(pointer, depth = this.complexity) {
        let newDirection = -1;
        let exitsAvailable = [];
        let occupiedExits;
        let nextExitPosition;
        // Create node connections (to new or existing nodes) - 1 for each level of depth declared.
        for (let i = 0; i < depth; i++) {
            exitsAvailable = pointer.getAvailableConnectionPoints();
            /**
             * If node connections are all employed, traverse to a random neighboring node.
             */
            if (exitsAvailable.length == 0) {
                pointer = this.hopToNextNodeInRandomDirection(pointer);
                continue;
            }
            /**
             * Otherwise, we'll pick a direction for travel based on the exits available.
             */
            // Pick a random direction
            newDirection = exitsAvailable[MazeBuilder.rand(exitsAvailable.length - 1, 0)];
            // Start by attempting to connect to a random new or existing node gracefully.  If found,
            // traverse to new direction.
            nextExitPosition = this.attemptBuildNextNodeOnPath(pointer, newDirection);
            if (nextExitPosition >= 0) {
                let pointerId = pointer.getNeighborIdAt(nextExitPosition);
                pointer = this.maze.getNodeWithId(pointerId);
                continue;
            }
            // If our selected direction is not available, disregard randomization and attempt to
            // connect to, or build, a node in the indicated direction.  If such a node is found, traverse in the
            // new direction.
            nextExitPosition = this.attemptNodeConnectionFromEveryAvailableExit(pointer, exitsAvailable);
            if (nextExitPosition >= 0) {
                let pointerId = pointer.getNeighborIdAt(nextExitPosition);
                pointer = this.maze.getNodeWithId(pointerId);
                continue;
            }
            // If no valid exit point could be found, traverse to previous node.
            occupiedExits = pointer.getOccupiedConnectionPoints();
            if (occupiedExits.length > 0) {
                let pointerId = pointer.getNeighborIdAt(MazeBuilder.rand(occupiedExits.length - 1, 0));
                pointer = this.maze.getNodeWithId(pointerId);
            }
            // No valid exits could be found.  Stop searching and do not traverse.  Result is that the current node will be returned.
            break;
        }
        return this;
    }
    /**
     * Builder will seek a random node within the defined parameters.  Once node is identified, it will branch
     * out a new randomized path of nodes.
     *
     * @param {MazeNode} startingNode
     * @param {number} maxDepth
     * @returns {MazeBuilder}
     */
    seekAndGenerateRandomPath(startingNode, maxDepth = this.complexity) {
        const depth = MazeBuilder.rand(maxDepth, 0);
        let neighbors;
        let pointer = startingNode;
        for (let i = 0; i < depth; i++) {
            neighbors = pointer.getNeighborIds();
            let index = MazeBuilder.rand(neighbors.length - 1, 0);
            if (neighbors.length > 0) {
                pointer = this.maze.getNodeWithId(neighbors[index]);
            }
            else
                break;
        }
        if (pointer) {
            this.generateRandomPathFrom(pointer);
        }
        return this;
    }
    /**
     * Try every available connection point on the node and attempt to connect to a new or existing node.
     * Return the index of the successful connections connection point when new connection is made.
     * If no connection is made, returns -1.
     *
     * @param {MazeNode} pointer
     * @param {number[]} openConnectionPoints
     * @returns {number}
     */
    attemptNodeConnectionFromEveryAvailableExit(pointer, openConnectionPoints) {
        let validExitIndexFound = false;
        let newDirection = -1;
        let candidateExitPosition = -1;
        for (let i = 0; i < openConnectionPoints.length; i++) {
            let index = MazeBuilder.rand(openConnectionPoints.length - 1, 0);
            newDirection = openConnectionPoints[index];
            openConnectionPoints = openConnectionPoints.splice(index, 1);
            candidateExitPosition = this.attemptBuildNextNodeOnPath(pointer, newDirection);
            if (candidateExitPosition > 0) {
                validExitIndexFound = true;
                break;
            }
        }
        return (validExitIndexFound) ? candidateExitPosition : -1;
    }
    /**
     * Convenience function to simply get the next node WHEN ALL EXIT POINTS ARE CLAIMED
     *
     * @pre  All exit points on the node must connect to other nodes.  Ignoring this precondition
     * may result in exceptions being thrown.
     *
     * @param {MazeNode} pointer
     */
    hopToNextNodeInRandomDirection(pointer) {
        return this.maze.getNodeWithId(pointer.getNeighborIdAt(MazeBuilder.rand(this.cardinality.getConnectionPointCount() - 1, 0)));
    }
    /**
     * Finds out if there is a neighboring node at the indicated exit.  If a node is found, returns that node,
     * otherwise generates a new node and returns that.  Coordinates will be set on the node returned.
     *
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {MazeNode}
     */
    getNextNodeAtExit(pointer, exitPoint) {
        let lastCoordinates;
        let nextCoordinates;
        let tempNextNode;
        let nodeAtNextLocation;
        // Determine coordinates for the new and existing nodes
        lastCoordinates = pointer.location;
        nextCoordinates = this.cardinality.getNextLocation(lastCoordinates, exitPoint);
        nodeAtNextLocation = this.maze.getNodeAtLocation(nextCoordinates);
        // If the next node's coordinate is already taken point our Next Node to that node.  Otherwise,
        // if the space in unoccupied, create a new node.
        if (nodeAtNextLocation) {
            tempNextNode = nodeAtNextLocation;
        }
        else {
            tempNextNode = new MazeNode_1.MazeNode(this.cardinality);
            tempNextNode.location = nextCoordinates;
            tempNextNode.maxConnections = Math.ceil(Math.random() * this.cardinality.getConnectionPointCount());
            this.maze.addNode(tempNextNode);
        }
        return tempNextNode;
    }
    /**
     * Convenience method for producing or finding the next node at the given exitPoint.
     * If the next node has an available connection point for a logical connection to the supplied pointer,
     * the connection will be made between the supplied node and the next node.
     *
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {number}  If successful, the exit position on the supplied pointer, which leads to the adjoining node, will return.
     *                    Otherwise, -1 will be returned.
     */
    attemptBuildNextNodeOnPath(pointer, exitPoint) {
        if (!pointer.isConnectionPointOpen(exitPoint)) {
            return -1;
        }
        let tempNextNode;
        // Get or create the node at the next position.
        tempNextNode = this.getNextNodeAtExit(pointer, exitPoint);
        // If the logical entry point is open on the next node, we'll connect the nodes and traverse
        // to the next node.
        if (tempNextNode.isConnectionPointOpen(this.cardinality.getOpposingConnectionPoint(exitPoint))) {
            pointer.connectTo(tempNextNode, exitPoint);
            return exitPoint;
        }
        return -1;
    }
    /**
     * If the indicated dictionary has negative node values (a natural result of the current version of
     * the generation process), push all of the node coordinates up so that 0,0 represents the top left.
     *
     * This ultimately updates the map so that it will fit nicely within quadrant II of the cartesian graph.
     *
     * @returns {{[p: string]: MazeNode}}
     */
    normalizeNodeCoordinates() {
        let adjustedCoordinates = {};
        let dimensionsUsed = this.maze.getNodeWithId("Origin").location.dimensions;
        let minCoordinateValuesInrange = [];
        let currentValue;
        let currentMin = 0;
        let adjustmentsByIndex = [];
        let currentNode;
        // O(d * n)
        for (let i = 0; i < dimensionsUsed; i++) {
            Object.keys(this.maze.getNodes()).forEach((key) => {
                currentValue = this.maze.getNodeWithId(key).location.getAxisPoint(i);
                currentMin = (currentValue < currentMin) ? currentValue : currentMin;
            });
            minCoordinateValuesInrange[i] = currentMin;
        }
        // O(d)
        for (let i = 0; i < dimensionsUsed; i++) {
            adjustmentsByIndex[i] = Math.abs(minCoordinateValuesInrange[i]);
        }
        // O(d * n)
        for (let i = 0; i < dimensionsUsed; i++) {
            Object.keys(this.maze.getNodes()).forEach((key) => {
                currentNode = this.maze.getNodeWithId(key);
                currentNode.location.adjustAxisPoint(i, adjustmentsByIndex[i]);
            });
        }
        // O(n)
        Object.keys(this.maze.getNodes()).forEach((key) => {
            currentNode = this.maze.getNodeWithId(key);
            adjustedCoordinates[currentNode.id] = currentNode;
        });
        return adjustedCoordinates;
    }
    /**
     * Get the size of each dimension of this maze (for example, if
     * width = 6 and length = 4, this function will return [6, 4]).
     *
     * @returns {number[]}
     */
    getDimensions() {
        let dimensionsUsed = this.entry.location.dimensions;
        let node;
        let currentValue;
        let maxValue;
        let minValue;
        let dimensions = [];
        for (let i = 0; i < dimensionsUsed; i++) {
            maxValue = 0;
            minValue = 0;
            Object.keys(this.maze.getNodes()).forEach((key) => {
                node = this.maze.getNodes()[key];
                currentValue = node.location.getAxisPoint(i);
                maxValue = (currentValue > maxValue) ? currentValue : maxValue;
                minValue = (currentValue < minValue) ? currentValue : minValue;
            });
            dimensions.push((maxValue - minValue) + 1);
        }
        return dimensions;
    }
    /**
     * Select a random node on the existing maze.
     *
     * @returns {MazeNode}
     */
    selectRandomNode() {
        let coordinateList = Object.keys(this.maze.getNodes());
        let index = MazeBuilder.rand(coordinateList.length - 1, 0);
        return this.maze.getNodes()[coordinateList[index]];
    }
}
exports.MazeBuilder = MazeBuilder;
