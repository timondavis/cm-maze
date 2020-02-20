"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var MazeBuilder_1 = require("../../Maze/MazeBuilder");
var Maze_1 = require("../../Maze/Maze");
var Compass4_1 = require("../../Behavior/Compass4");
var chai_1 = require("chai");
require("mocha");
var MazeNode_1 = require("../../Maze/MazeNode");
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
    it('can return nodes residing at the indicated coordinates', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var nodeCollection = {};
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        nodeCollection[a.id] = a;
        nodeCollection[b.id] = b;
        m.setNodes(nodeCollection);
        chai_1.expect(m.getNodeAtLocation(new NodeLocation2D_1.NodeLocation2D([1, 2])).id).to.be.equal(b.id);
    });
    it('facilitates definition of "starting" and "ending" nodes', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var nodeCollection = {};
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
    it('it should have accurate setters and getters for dimensional size', function () {
        m = new Maze_1.Maze();
        var size;
        m.setDimensions([4, 3]);
        size = m.getDimensions();
        chai_1.expect(size[0]).to.be.equal(4);
        chai_1.expect(size[1]).to.be.equal(3);
    });
    it('it should report on the current amount of nodes included in the maze', function () {
        var mb = new MazeBuilder_1.MazeBuilder({});
        var maze = mb.buildMaze();
        var contents = maze.getNodes();
        chai_1.expect(maze.getSize()).to.be.equal(Object.keys(contents).length);
    });
    it('has a working getter/setter for the current node pointer', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        c.location = new NodeLocation2D_1.NodeLocation2D([2, 1]);
        var nodeCollection = {};
        nodeCollection[a.location.toString()] = a;
        nodeCollection[b.location.toString()] = b;
        nodeCollection[c.location.toString()] = c;
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
    it('also returns maze nodes back as an array on demand', function () {
        m = new Maze_1.Maze();
        var a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        var nodeCollection = {};
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        c.location = new NodeLocation2D_1.NodeLocation2D([1, 3]);
        nodeCollection[a.location.toString()] = a;
        nodeCollection[b.location.toString()] = b;
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
        a.location = new NodeLocation2D_1.NodeLocation2D([1, 1]);
        a.name = a.location.toString();
        b.location = new NodeLocation2D_1.NodeLocation2D([1, 2]);
        b.name = b.location.toString();
        c.location = new NodeLocation2D_1.NodeLocation2D([1, 3]);
        c.name = c.location.toString();
        nodeCollection[a.location.toString()] = a;
        nodeCollection[b.location.toString()] = b;
        m.setNodes(nodeCollection);
        var nodesArray;
        var nodesNames;
        nodesArray = [];
        nodesNames = [];
        m.forEachNode(function (node, key, nodes) {
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
    it('can be translated into a valid JSON string', function () {
        var mb = new MazeBuilder_1.MazeBuilder();
        var maze = mb.buildMaze();
        chai_1.expect(function () { JSON.stringify(maze); }).not.to.throw();
    });
    it('should return a random node from the maze on demand', function () { return __awaiter(_this, void 0, void 0, function () {
        var intervalTime, idsCaptured, nodeTestCount, duplicatesTolerance, MB, maze, generateRandoms, currentId, matchesFound, i, j;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    intervalTime = 10;
                    idsCaptured = [];
                    nodeTestCount = 50;
                    duplicatesTolerance = Math.floor(nodeTestCount * 0.10);
                    MB = new MazeBuilder_1.MazeBuilder();
                    maze = MB.buildMaze();
                    generateRandoms = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    var timeoutsExecuted = 0;
                                    var interval = setInterval(function () {
                                        timeoutsExecuted++;
                                        idsCaptured.push(maze.getRandomNode().id);
                                        if (timeoutsExecuted > nodeTestCount) {
                                            clearInterval(interval);
                                            resolve();
                                        }
                                    }, intervalTime);
                                })];
                        });
                    }); };
                    return [4 /*yield*/, generateRandoms()];
                case 1:
                    _a.sent();
                    for (i = 0; i < nodeTestCount; i++) {
                        matchesFound = 0;
                        currentId = idsCaptured[i];
                        for (j = 0; j < nodeTestCount; j++) {
                            if (i === j) {
                                continue;
                            }
                            if (idsCaptured[i] === idsCaptured[j]) {
                                matchesFound++;
                            }
                        }
                        chai_1.expect(matchesFound).to.be.lessThan(duplicatesTolerance);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('provides a method to generate its node collection indexed by location key', function () {
        var mb = new MazeBuilder_1.MazeBuilder();
        var maze = mb.buildMaze();
        var nodes = maze.getNodes();
        var indexedNodes = maze.getLocationKeyIndex();
        var nodesWithNoLocationCount = 0;
        // Indexes and nodes should have contents
        chai_1.expect(nodes).to.not.be.null;
        chai_1.expect(indexedNodes).to.not.be.null;
        chai_1.expect(indexedNodes.size).to.be.above(0);
        var node;
        var correspondingNode;
        var location;
        var nodeId;
        // Crawling the maze nodes in order should give us nodes with the corresponding locations.
        // We'll also compare and delete each node from the nodes list as we encounter them via the index.
        // When we're done, all node pointers should point to null.
        for (var x = 0; x < maze.getDimensions()[0]; x++) {
            for (var y = 0; y < maze.getDimensions()[1]; y++) {
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
        Object.keys(maze.getNodes()).forEach(function (key) {
            var node = maze.getNodeWithId(key);
            if (node && node.id.indexOf('EXIT-') === 0) {
                return;
            }
            chai_1.expect(node).to.be.null;
        });
    });
});
