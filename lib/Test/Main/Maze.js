"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MazeBuilder_1 = require("../../Maze/MazeBuilder");
const Maze_1 = require("../../Maze/Maze");
const Compass4_1 = require("../../Behavior/Compass4");
const chai_1 = require("chai");
require("mocha");
const MazeNode_1 = require("../../Maze/MazeNode");
const NodeLocation2D_1 = require("../../MazeCoordinates/NodeLocation2D");
describe('Maze', () => {
    let m = new Maze_1.Maze();
    it('allows CardinalityBehavior to be set and reported on the Maze', () => {
        m = new Maze_1.Maze();
        m.setCardinality(new Compass4_1.Compass4());
        chai_1.expect(m.getCardinality()).to.be.instanceOf(Compass4_1.Compass4);
    });
    it('can be assigned a node dictionary, and it can report the dictionary back to a caller', () => {
        m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let d = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let e = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let nodeCollection = {};
        let capturedNodeCollection;
        nodeCollection[a.id] = a;
        nodeCollection[b.id] = b;
        nodeCollection[c.id] = c;
        nodeCollection[d.id] = d;
        nodeCollection[e.id] = e;
        m.setNodes(nodeCollection);
        capturedNodeCollection = m.getNodes();
        chai_1.expect(capturedNodeCollection[a.id]).to.be.equal(a);
        chai_1.expect(capturedNodeCollection[b.id]).to.be.equal(b);
        chai_1.expect(capturedNodeCollection[c.id]).to.be.equal(c);
        chai_1.expect(capturedNodeCollection[d.id]).to.be.equal(d);
        chai_1.expect(capturedNodeCollection[e.id]).to.be.equal(e);
    });
    it('can return nodes residing at the indicated coordinates', () => {
        m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let nodeCollection = {};
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        nodeCollection[a.id] = a;
        nodeCollection[b.id] = b;
        m.setNodes(nodeCollection);
        chai_1.expect(m.getNodeAtLocation(new NodeLocation2D_1.NodeLocation2D([1, 2])).id).to.be.equal(b.id);
    });
    it('facilitates definition of "starting" and "ending" nodes', () => {
        m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let nodeCollection = {};
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        c.location = new NodeLocation2D_1.NodeLocation2D([2, 1]);
        m.setStartNode(a);
        m.setFinishNode(c);
        nodeCollection[a.location.toString()] = a;
        nodeCollection[b.location.toString()] = b;
        nodeCollection[c.location.toString()] = c;
        m.setNodes(nodeCollection);
        chai_1.expect(m.getStartNode()).to.be.equal(a);
        chai_1.expect(m.getFinishNode()).to.be.equal(c);
    });
    it('it should have accurate setters and getters for dimensional size', () => {
        m = new Maze_1.Maze();
        let size;
        m.setDimensions([4, 3]);
        size = m.getDimensions();
        chai_1.expect(size[0]).to.be.equal(4);
        chai_1.expect(size[1]).to.be.equal(3);
    });
    it('it should report on the current amount of nodes included in the maze', () => {
        let mb = new MazeBuilder_1.MazeBuilder({});
        let maze = mb.buildMaze();
        let contents = maze.getNodes();
        chai_1.expect(maze.getSize()).to.be.equal(Object.keys(contents).length);
    });
    it('has a working getter/setter for the current node pointer', () => {
        m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        c.location = new NodeLocation2D_1.NodeLocation2D([2, 1]);
        let nodeCollection = {};
        nodeCollection[a.location.toString()] = a;
        nodeCollection[b.location.toString()] = b;
        nodeCollection[c.location.toString()] = c;
        m.setNodes(nodeCollection);
        m.setCurrentNode(b);
        chai_1.expect(m.getCurrentNode()).to.be.equal(b);
    });
    it('facilitates traversal through cardinal movement', () => {
        m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let d = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let e = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let nodeCollection = {};
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        a.name = "A";
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        b.name = "B";
        c.location = new NodeLocation2D_1.NodeLocation2D([2, 1]);
        c.name = "C";
        d.location = new NodeLocation2D_1.NodeLocation2D([2, 0]);
        d.name = "D";
        e.location = new NodeLocation2D_1.NodeLocation2D([0, 1]);
        e.name = "E";
        a.connectTo(e, Compass4_1.C4.N);
        a.connectTo(c, Compass4_1.C4.E);
        a.connectTo(b, Compass4_1.C4.S);
        b.connectTo(d, Compass4_1.C4.W);
        nodeCollection[a.id] = a;
        nodeCollection[b.id] = b;
        nodeCollection[c.id] = c;
        nodeCollection[d.id] = d;
        nodeCollection[e.id] = e;
        m.setNodes(nodeCollection);
        m.setCurrentNode(a);
        chai_1.expect(m.move(Compass4_1.C4.N)).to.be.equal(e);
        chai_1.expect(m.move(Compass4_1.C4.S)).to.be.equal(a);
        chai_1.expect(m.move(Compass4_1.C4.E)).to.be.equal(c);
        chai_1.expect(m.move(Compass4_1.C4.W)).to.be.equal(a);
        chai_1.expect(m.move(Compass4_1.C4.S)).to.be.equal(b);
        chai_1.expect(m.move(Compass4_1.C4.W)).to.be.equal(d);
    });
    it('also returns maze nodes back as an array on demand', () => {
        m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let nodeCollection = {};
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        c.location = new NodeLocation2D_1.NodeLocation2D([1, 3]);
        nodeCollection[a.location.toString()] = a;
        nodeCollection[b.location.toString()] = b;
        m.setNodes(nodeCollection);
        let nodesArray = m.getNodesArray();
        chai_1.expect(nodesArray.indexOf(a)).to.not.be.equal(-1);
        chai_1.expect(nodesArray.indexOf(b)).to.not.be.equal(-1);
        chai_1.expect(nodesArray.indexOf(c)).to.be.equal(-1);
    });
    it('facilitates forEeach traversal by employing a callback function parameter', () => {
        m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let nodeCollection = {};
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        a.name = a.location.toString();
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        b.name = b.location.toString();
        c.location = new NodeLocation2D_1.NodeLocation2D([1, 3]);
        c.name = c.location.toString();
        nodeCollection[a.location.toString()] = a;
        nodeCollection[b.location.toString()] = b;
        m.setNodes(nodeCollection);
        let nodesArray;
        let nodesNames;
        nodesArray = [];
        nodesNames = [];
        m.forEachNode((node, key, nodes) => {
            nodesArray.push(node);
            nodesNames.push(key);
            chai_1.expect(nodes).to.have.property(a.location.toString());
            chai_1.expect(nodes).to.have.property(b.location.toString());
            chai_1.expect(nodes).not.to.have.property(c.location.toString());
        });
        chai_1.expect(nodesArray).to.have.lengthOf(2);
        chai_1.expect(nodesNames).to.have.lengthOf(2);
        chai_1.expect(nodesArray.indexOf(a)).not.to.be.equal(-1);
        chai_1.expect(nodesArray.indexOf(b)).not.to.be.equal(-1);
        chai_1.expect(nodesArray.indexOf(c)).to.be.equal(-1);
        chai_1.expect(nodesNames.indexOf(a.name)).not.to.be.equal(-1);
        chai_1.expect(nodesNames.indexOf(b.name)).not.to.be.equal(-1);
        chai_1.expect(nodesNames.indexOf(c.name)).to.be.equal(-1);
    });
    it('can be translated into a valid JSON string', () => {
        let mb = new MazeBuilder_1.MazeBuilder();
        let maze = mb.buildMaze();
        chai_1.expect(() => { JSON.stringify(maze); }).not.to.throw();
    });
    it('should return a random node from the maze on demand', () => __awaiter(void 0, void 0, void 0, function* () {
        let intervalTime = 10;
        let idsCaptured = [];
        let nodeTestCount = 50;
        let duplicatesTolerance = Math.floor(nodeTestCount * 0.10);
        let MB = new MazeBuilder_1.MazeBuilder();
        let maze = MB.buildMaze();
        let generateRandoms = () => __awaiter(void 0, void 0, void 0, function* () {
            return new Promise((resolve) => {
                let timeoutsExecuted = 0;
                let interval = setInterval(() => {
                    timeoutsExecuted++;
                    idsCaptured.push(maze.getRandomNode().id);
                    if (timeoutsExecuted > nodeTestCount) {
                        clearInterval(interval);
                        resolve(true); //adjusted to appease compiler after revival 1 year later.  value is now TRUE, don't know why.
                    }
                }, intervalTime);
            });
        });
        yield generateRandoms();
        let currentId;
        let matchesFound;
        for (let i = 0; i < nodeTestCount; i++) {
            matchesFound = 0;
            currentId = idsCaptured[i];
            for (let j = 0; j < nodeTestCount; j++) {
                if (i === j) {
                    continue;
                }
                if (idsCaptured[i] === idsCaptured[j]) {
                    matchesFound++;
                }
            }
            chai_1.expect(matchesFound).to.be.lessThan(duplicatesTolerance);
        }
    }));
    it('provides a method to generate its node collection indexed by location key', () => {
        let mb = new MazeBuilder_1.MazeBuilder();
        let maze = mb.buildMaze();
        let nodes = maze.getNodes();
        let indexedNodes = maze.getLocationKeyIndex();
        let nodesWithNoLocationCount = 0;
        // Indexes and nodes should have contents
        chai_1.expect(nodes).to.not.be.null;
        chai_1.expect(indexedNodes).to.not.be.null;
        chai_1.expect(indexedNodes.size).to.be.above(0);
        let node;
        let correspondingNode;
        let location;
        let nodeId;
        // Crawling the maze nodes in order should give us nodes with the corresponding locations.
        // We'll also compare and delete each node from the nodes list as we encounter them via the index.
        // When we're done, all node pointers should point to null.
        for (let x = 0; x < maze.getDimensions()[0]; x++) {
            for (let y = 0; y < maze.getDimensions()[1]; y++) {
                node = indexedNodes.get(new NodeLocation2D_1.NodeLocation2D([x, y]).toString());
                if (node === undefined) {
                    continue;
                }
                location = node.location;
                if (location === null) {
                    continue;
                }
                correspondingNode = maze.getNodeAtLocation(location);
                if (correspondingNode.id.indexOf('EXIT-') === 0) {
                    continue;
                }
                nodeId = node.id;
                chai_1.expect(location.position[0]).to.be.equal(x);
                chai_1.expect(location.position[1]).to.be.equal(y);
                chai_1.expect(correspondingNode).to.be.equal(node);
                chai_1.expect(maze.getNodeWithId(nodeId)).to.be.equal(node);
                nodes[nodeId] = null;
                chai_1.expect(maze.getNodeWithId(nodeId)).to.be.null;
            }
        }
        maze.setNodes(nodes);
        // Go through the nodes list and make sure all entries were deleted from the list.
        Object.keys(maze.getNodes()).forEach((key) => {
            let node = maze.getNodeWithId(key);
            if (node && node.id.indexOf('EXIT-') === 0) {
                return;
            }
            chai_1.expect(node).to.be.null;
        });
    });
});
