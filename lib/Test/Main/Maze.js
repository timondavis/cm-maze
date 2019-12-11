"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MazeBuilder_1 = require("../../MazeBuilder");
var Maze_1 = require("../../Maze");
var Compass4_1 = require("../../Behavior/Compass4");
var chai_1 = require("chai");
require("mocha");
var MazeNode_1 = require("../../MazeNode");
var NodeLocation2D_1 = require("../../MazeCoordinates/NodeLocation2D");
describe('Maze', function () {
    var m = new Maze_1.Maze();
    it('allows CardinalityBehavior to be set and reported on the Maze', function () {
        m = new Maze_1.Maze();
        m.setCardinality(new Compass4_1.Compass4());
        chai_1.expect(m.getCardinality()).to.be.instanceOf(Compass4_1.Compass4);
    });
    it('can be assigned a node dictionary, and it can report the dictionary back to a caller', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var d = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var e = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var nodeCollection = {};
        var capturedNodeCollection;
        nodeCollection[a.getId()] = a;
        nodeCollection[b.getId()] = b;
        nodeCollection[c.getId()] = c;
        nodeCollection[d.getId()] = d;
        nodeCollection[e.getId()] = e;
        m.setNodes(nodeCollection);
        capturedNodeCollection = m.getNodes();
        chai_1.expect(capturedNodeCollection[a.getId()]).to.be.equal(a);
        chai_1.expect(capturedNodeCollection[b.getId()]).to.be.equal(b);
        chai_1.expect(capturedNodeCollection[c.getId()]).to.be.equal(c);
        chai_1.expect(capturedNodeCollection[d.getId()]).to.be.equal(d);
        chai_1.expect(capturedNodeCollection[e.getId()]).to.be.equal(e);
    });
    it('can return nodes residing at the indicated coordinates', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var nodeCollection = {};
        a.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 1]));
        b.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 2]));
        nodeCollection[a.getId()] = a;
        nodeCollection[b.getId()] = b;
        m.setNodes(nodeCollection);
        chai_1.expect(m.getNodeAtLocation(new NodeLocation2D_1.NodeLocation2D([1, 2])).getId()).to.be.equal(b.getId());
    });
    it('facilitates definition of "starting" and "ending" nodes', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var nodeCollection = {};
        a.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 1]));
        b.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 2]));
        c.setLocation(new NodeLocation2D_1.NodeLocation2D([2, 1]));
        m.setStartNode(a);
        m.setFinishNode(c);
        nodeCollection[a.getLocation().toString()] = a;
        nodeCollection[b.getLocation().toString()] = b;
        nodeCollection[c.getLocation().toString()] = c;
        m.setNodes(nodeCollection);
        chai_1.expect(m.getStartNode()).to.be.equal(a);
        chai_1.expect(m.getFinishNode()).to.be.equal(c);
    });
    it('it should have accurate setters and getters for dimensional size', function () {
        m = new Maze_1.Maze();
        var size;
        m.setDimensions([4, 3]);
        size = m.getDimensions();
        chai_1.expect(size[0]).to.be.equal(4);
        chai_1.expect(size[1]).to.be.equal(3);
    });
    it('it should report on the current amount of nodes included in the maze', function () {
        var mb = new MazeBuilder_1.MazeBuilder();
        var maze = mb.buildMaze();
        var contents = maze.getNodes();
        chai_1.expect(maze.getSize()).to.be.equal(Object.keys(contents).length);
    });
    it('has a working getter/setter for the current node pointer', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        a.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 1]));
        b.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 2]));
        c.setLocation(new NodeLocation2D_1.NodeLocation2D([2, 1]));
        var nodeCollection = {};
        nodeCollection[a.getLocation().toString()] = a;
        nodeCollection[b.getLocation().toString()] = b;
        nodeCollection[c.getLocation().toString()] = c;
        m.setNodes(nodeCollection);
        m.setCurrentNode(b);
        chai_1.expect(m.getCurrentNode()).to.be.equal(b);
    });
    it('facilitates traversal through cardinal movement', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var d = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var e = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var nodeCollection = {};
        a.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 1])).setName("A");
        b.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 2])).setName("B");
        c.setLocation(new NodeLocation2D_1.NodeLocation2D([2, 1])).setName("C");
        d.setLocation(new NodeLocation2D_1.NodeLocation2D([2, 0])).setName("D");
        e.setLocation(new NodeLocation2D_1.NodeLocation2D([0, 1])).setName("E");
        a.connectTo(e, Compass4_1.C4.N);
        a.connectTo(c, Compass4_1.C4.E);
        a.connectTo(b, Compass4_1.C4.S);
        b.connectTo(d, Compass4_1.C4.W);
        nodeCollection[a.getId()] = a;
        nodeCollection[b.getId()] = b;
        nodeCollection[c.getId()] = c;
        nodeCollection[d.getId()] = d;
        nodeCollection[e.getId()] = e;
        m.setNodes(nodeCollection);
        m.setCurrentNode(a);
        chai_1.expect(m.move(Compass4_1.C4.N)).to.be.equal(e);
        chai_1.expect(m.move(Compass4_1.C4.S)).to.be.equal(a);
        chai_1.expect(m.move(Compass4_1.C4.E)).to.be.equal(c);
        chai_1.expect(m.move(Compass4_1.C4.W)).to.be.equal(a);
        chai_1.expect(m.move(Compass4_1.C4.S)).to.be.equal(b);
        chai_1.expect(m.move(Compass4_1.C4.W)).to.be.equal(d);
    });
    it('also returns maze nodes back as an array on demand', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var nodeCollection = {};
        a.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 1]));
        b.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 2]));
        c.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 3]));
        nodeCollection[a.getLocation().toString()] = a;
        nodeCollection[b.getLocation().toString()] = b;
        m.setNodes(nodeCollection);
        var nodesArray = m.getNodesArray();
        chai_1.expect(nodesArray.indexOf(a)).to.not.be.equal(-1);
        chai_1.expect(nodesArray.indexOf(b)).to.not.be.equal(-1);
        chai_1.expect(nodesArray.indexOf(c)).to.be.equal(-1);
    });
    it('facilitates forEeach traversal by employing a callback function parameter', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var nodeCollection = {};
        a.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 1]));
        a.setName(a.getLocation().toString());
        b.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 2]));
        b.setName(b.getLocation().toString());
        c.setLocation(new NodeLocation2D_1.NodeLocation2D([1, 3]));
        c.setName(c.getLocation().toString());
        nodeCollection[a.getLocation().toString()] = a;
        nodeCollection[b.getLocation().toString()] = b;
        m.setNodes(nodeCollection);
        var nodesArray;
        var nodesNames;
        nodesArray = [];
        nodesNames = [];
        m.forEachNode(function (node, key, nodes) {
            nodesArray.push(node);
            nodesNames.push(key);
            chai_1.expect(nodes).to.have.property(a.getLocation().toString());
            chai_1.expect(nodes).to.have.property(b.getLocation().toString());
            chai_1.expect(nodes).not.to.have.property(c.getLocation().toString());
        });
        chai_1.expect(nodesArray).to.have.lengthOf(2);
        chai_1.expect(nodesNames).to.have.lengthOf(2);
        chai_1.expect(nodesArray.indexOf(a)).not.to.be.equal(-1);
        chai_1.expect(nodesArray.indexOf(b)).not.to.be.equal(-1);
        chai_1.expect(nodesArray.indexOf(c)).to.be.equal(-1);
        chai_1.expect(nodesNames.indexOf(a.getName())).not.to.be.equal(-1);
        chai_1.expect(nodesNames.indexOf(b.getName())).not.to.be.equal(-1);
        chai_1.expect(nodesNames.indexOf(c.getName())).to.be.equal(-1);
    });
    it('can be translated into a valid JSON string', function () {
        var mb = new MazeBuilder_1.MazeBuilder();
        var maze = mb.buildMaze();
        chai_1.expect(function () { JSON.stringify(maze); }).not.to.throw();
    });
    it('provides a method to generate its node collection indexed by location key', function () {
        var mb = new MazeBuilder_1.MazeBuilder();
        var maze = mb.buildMaze();
        var nodes = maze.getNodes();
        var indexedNodes = maze.getLocationKeyIndex();
        var matchedNodeCount = 0;
        // Indexes and nodes should have contents
        chai_1.expect(nodes).to.not.be.null;
        chai_1.expect(indexedNodes).to.not.be.null;
        chai_1.expect(Object.keys(indexedNodes)).length.to.be.above(0);
        //
        var notes = [];
        maze.getNodesArray().forEach(function (node) {
            var locationString = node.getLocation().toString();
            if (notes.indexOf(locationString) >= 0) {
                debugger;
            }
            notes.push(locationString);
        });
        //
        chai_1.expect(Object.keys(indexedNodes).length).be.equal(Object.keys(nodes).length);
        var node;
        var correspondingNode;
        var location;
        var nodeId;
        // Crawling the maze nodes in order should give us nodes with the corresponding locations.
        // We'll also compare and delete each node from the nodes list as we encounter them via the index.
        // When we're done, all node pointers should point to null.
        for (var x = 0; x < maze.getDimensions()[0]; x++) {
            for (var y = 0; y < maze.getDimensions()[1]; y++) {
                node = indexedNodes[new NodeLocation2D_1.NodeLocation2D([x, y]).toString()];
                if (typeof node === 'undefined') {
                    continue;
                }
                location = node.getLocation();
                correspondingNode = maze.getNodeAtLocation(location);
                nodeId = node.getId();
                chai_1.expect(location.getPosition()[0]).to.be.equal(x);
                chai_1.expect(location.getPosition()[1]).to.be.equal(y);
                chai_1.expect(correspondingNode).to.be.equal(node);
                chai_1.expect(maze.getNodeWithId(nodeId)).to.be.equal(node);
                nodes[nodeId] = null;
                chai_1.expect(maze.getNodeWithId(nodeId)).to.be.null;
            }
        }
        console.log(nodes);
        maze.setNodes(nodes);
        // Go through the nodes list and make sure all entries were deleted from the list.
        Object.keys(maze.getNodes()).forEach(function (key) {
            chai_1.expect(maze.getNodeWithId(key)).to.be.null;
        });
    });
});
