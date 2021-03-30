"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const MazeNode_1 = require("../../Maze/MazeNode");
const Compass4_1 = require("../../Behavior/Compass4");
const Compass8_1 = require("../../Behavior/Compass8");
const MazeBuilder_1 = require("../../Maze/MazeBuilder");
const NodeLocation2D_1 = require("../../MazeCoordinates/NodeLocation2D");
const Cardinality_1 = require("../../Behavior/Cardinality");
const Maze_1 = require("../../Maze/Maze");
describe('MazeNode', () => {
    let r = 10; // Default randomize ceiling
    it('connects bidirectionally to each node by default, but can be done in directed graph fashion', () => {
        let m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass8_1.Compass8());
        let b = new MazeNode_1.MazeNode(new Compass8_1.Compass8());
        let c = new MazeNode_1.MazeNode(new Compass8_1.Compass8());
        m.addNode(a, false);
        m.addNode(b, false);
        m.addNode(c, false);
        // A < -- > B connect
        a.connectTo(b, 3);
        chai_1.expect(a.isNeighborsWith(b)).to.be.true;
        chai_1.expect(b.isNeighborsWith(a)).to.be.true;
        chai_1.expect(a.getNeighborIdAt(3)).to.be.equal(b.id);
        chai_1.expect(b.getNeighborIdAt(7)).to.be.equal(a.id);
        // B -> C connect
        b.connectTo(c, 1, false);
        chai_1.expect(b.isNeighborsWith(c)).to.be.true;
        chai_1.expect(c.isNeighborsWith(b)).to.be.false;
        chai_1.expect(m.getNodeWithId(b.getNeighborIdAt(1))).to.be.equal(c);
        chai_1.expect(m.getNodeWithId(c.getNeighborIdAt(5))).to.be.null;
    });
    it('can be explicitly named', () => {
        let m = new Maze_1.Maze();
        const a = new MazeNode_1.MazeNode(new Compass4_1.Compass4);
        a.name = "My Name";
        chai_1.expect(a.name).to.be.equal("My Name");
    });
    it('can report on who its neighboring nodes are', function () {
        let m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        a.name = "A";
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        b.name = "B";
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        c.name = "C";
        let d = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        d.name = "D";
        m.addNode(a, false);
        m.addNode(b, false);
        m.addNode(c, false);
        m.addNode(d, false);
        let neighborsOfA;
        let neighborsOfB;
        a.connectTo(c, Compass4_1.C4.N, false);
        a.connectTo(b, Compass4_1.C4.E);
        a.connectTo(d, Compass4_1.C4.S, false);
        neighborsOfA = a.getNeighborIds();
        neighborsOfB = m.getNodeWithId(a.getNeighborIdAt(1)).getNeighborIds();
        chai_1.expect(m.getNodeWithId(neighborsOfA[0]).name).to.be.equal("C");
        chai_1.expect(m.getNodeWithId(neighborsOfA[1]).name).to.be.equal("B");
        chai_1.expect(m.getNodeWithId(neighborsOfA[2]).name).to.be.equal("D");
        chai_1.expect(m.getNodeWithId(neighborsOfB[0]).name).to.be.equal("A");
        neighborsOfA = a.getNeighborIds(true);
        neighborsOfB = m.getNodeWithId(a.getNeighborIdAt(1)).getNeighborIds(true);
        chai_1.expect(neighborsOfA).to.have.lengthOf(4);
        chai_1.expect(m.getNodeWithId(neighborsOfA[0]).name).to.be.equal("C");
        chai_1.expect(m.getNodeWithId(neighborsOfA[1]).name).to.be.equal("B");
        chai_1.expect(m.getNodeWithId(neighborsOfA[2]).name).to.be.equal("D");
        chai_1.expect(neighborsOfA[3]).to.be.undefined;
        chai_1.expect(neighborsOfB).to.have.lengthOf(4);
        chai_1.expect(neighborsOfB[0]).to.be.undefined;
        chai_1.expect(neighborsOfB[1]).to.be.undefined;
        chai_1.expect(neighborsOfB[2]).to.be.undefined;
        chai_1.expect(m.getNodeWithId(neighborsOfB[3]).name).to.be.equal("A");
    });
    it('can report on what its occupied exit points are', function () {
        let m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        a.name = "A";
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        b.name = "B";
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        c.name = "C";
        let d = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        d.name = "D";
        m.addNode(a, false);
        m.addNode(b, false);
        m.addNode(c, false);
        m.addNode(d, false);
        let exitsOfA;
        let exitsOfC;
        a.connectTo(b, Compass4_1.C4.W, false);
        a.connectTo(c, Compass4_1.C4.E);
        a.connectTo(d, Compass4_1.C4.S, false);
        exitsOfA = a.getOccupiedConnectionPoints();
        exitsOfC = m.getNodeWithId(a.getNeighborIdAt(1)).getOccupiedConnectionPoints();
        chai_1.expect(m.getNodeWithId(a.getNeighborIdAt(exitsOfA[0])).name).to.be.equal("C");
        chai_1.expect(m.getNodeWithId(a.getNeighborIdAt(exitsOfA[1])).name).to.be.equal("D");
        chai_1.expect(m.getNodeWithId(a.getNeighborIdAt(exitsOfA[2])).name).to.be.equal("B");
        chai_1.expect(m.getNodeWithId(m.getNodeWithId(a.getNeighborIdAt(1)).getNeighborIdAt(exitsOfC[0])).name).to.be.equal("A");
    });
    it('can report on what its open exit points are', () => {
        let m = new Maze_1.Maze();
        let exitsOpenOnA;
        let exitsOccupiedOnA;
        let a = new MazeNode_1.MazeNode(new Compass8_1.Compass8());
        a.connectTo(new MazeNode_1.MazeNode(new Compass8_1.Compass8()), Compass8_1.C8.N);
        a.connectTo(new MazeNode_1.MazeNode(new Compass8_1.Compass8()), Compass8_1.C8.E);
        a.connectTo(new MazeNode_1.MazeNode(new Compass8_1.Compass8()), Compass8_1.C8.S);
        a.connectTo(new MazeNode_1.MazeNode(new Compass8_1.Compass8()), Compass8_1.C8.W);
        exitsOpenOnA = a.getAvailableConnectionPoints();
        exitsOccupiedOnA = a.getOccupiedConnectionPoints();
        chai_1.expect(exitsOpenOnA).to.have.lengthOf(4);
        chai_1.expect(exitsOpenOnA[0]).to.be.equal(1);
        chai_1.expect(exitsOpenOnA[1]).to.be.equal(3);
        chai_1.expect(exitsOpenOnA[2]).to.be.equal(5);
        chai_1.expect(exitsOpenOnA[3]).to.be.equal(7);
        chai_1.expect(exitsOccupiedOnA[0]).to.be.equal(0);
        chai_1.expect(exitsOccupiedOnA[1]).to.be.equal(2);
        chai_1.expect(exitsOccupiedOnA[2]).to.be.equal(4);
        chai_1.expect(exitsOccupiedOnA[3]).to.be.equal(6);
    });
    it('confirms whether another supplied node is neighbors with this node', () => {
        let m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let d = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        m.addNode(a, false);
        m.addNode(b, false);
        m.addNode(c, false);
        m.addNode(d, false);
        a.connectTo(b, Compass4_1.C4.NORTH);
        a.connectTo(d, Compass4_1.C4.WEST);
        b.connectTo(c, Compass4_1.C4.WEST);
        d.connectTo(c, Compass4_1.C4.NORTH);
        chai_1.expect(a.isNeighborsWith(b)).to.be.true;
        chai_1.expect(a.isNeighborsWith(d)).to.be.true;
        chai_1.expect(c.isNeighborsWith(b)).to.be.true;
        chai_1.expect(d.isNeighborsWith(c)).to.be.true;
        chai_1.expect(a.isNeighborsWith(c)).to.be.false;
        chai_1.expect(c.isNeighborsWith(a)).to.be.false;
        chai_1.expect(b.isNeighborsWith(d)).to.be.false;
    });
    it('can accept and report 2 dimensional coordinates (as instances of NodeLocation2D objects)', () => {
        let m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass8_1.Compass8());
        const coords = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        a.location = new NodeLocation2D_1.NodeLocation2D(coords);
        chai_1.expect(a.location.toString()).to.be.equal(new NodeLocation2D_1.NodeLocation2D(coords).toString());
    });
    it('reports on whether a given exit point on the node is occupied or empty (two separate functions)', () => {
        let m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let b = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let c = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        a.connectTo(b, Compass4_1.C4.NORTH);
        a.connectTo(c, Compass4_1.C4.SOUTH);
        chai_1.expect(a.isConnectionPointOpen(0)).to.be.false;
        chai_1.expect(a.isConnectionPointOpen(1)).to.be.true;
        chai_1.expect(a.isConnectionPointOpen(2)).to.be.false;
        chai_1.expect(a.isConnectionPointOpen(3)).to.be.true;
        chai_1.expect(a.isConnectionPointOccupied(0)).to.be.true;
        chai_1.expect(a.isConnectionPointOccupied(1)).to.be.false;
        chai_1.expect(a.isConnectionPointOccupied(2)).to.be.true;
        chai_1.expect(a.isConnectionPointOccupied(3)).to.be.false;
        chai_1.expect(b.isConnectionPointOpen(0)).to.be.true;
        chai_1.expect(b.isConnectionPointOpen(1)).to.be.true;
        chai_1.expect(b.isConnectionPointOpen(2)).to.be.false;
        chai_1.expect(b.isConnectionPointOpen(3)).to.be.true;
        chai_1.expect(b.isConnectionPointOccupied(0)).to.be.false;
        chai_1.expect(b.isConnectionPointOccupied(1)).to.be.false;
        chai_1.expect(b.isConnectionPointOccupied(2)).to.be.true;
        chai_1.expect(b.isConnectionPointOccupied(3)).to.be.false;
        chai_1.expect(c.isConnectionPointOpen(0)).to.be.false;
        chai_1.expect(c.isConnectionPointOpen(1)).to.be.true;
        chai_1.expect(c.isConnectionPointOpen(2)).to.be.true;
        chai_1.expect(c.isConnectionPointOpen(3)).to.be.true;
        chai_1.expect(c.isConnectionPointOccupied(0)).to.be.true;
        chai_1.expect(c.isConnectionPointOccupied(1)).to.be.false;
        chai_1.expect(c.isConnectionPointOccupied(2)).to.be.false;
        chai_1.expect(c.isConnectionPointOccupied(3)).to.be.false;
    });
    it('reports the cardinality behavior instance assigned to the node on demand', () => {
        let m = new Maze_1.Maze();
        let a = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        chai_1.expect(a.cardinality).to.be.instanceOf(Cardinality_1.Cardinality);
        chai_1.expect(a.cardinality).to.be.instanceOf(Compass4_1.Compass4);
        chai_1.expect(a.cardinality).not.to.be.instanceOf(Compass8_1.Compass8);
    });
    it('accepts and respects limits to the amount of nodes that this node can be connected to', () => {
        let m = new Maze_1.Maze();
        let unlimited = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let limitedToOne = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        let limitedToThree = new MazeNode_1.MazeNode(new Compass4_1.Compass4());
        limitedToOne.maxConnections = 1;
        limitedToThree.maxConnections = 3;
        for (let i = 0; i < 4; i++) {
            chai_1.expect(() => { unlimited.connectTo(new MazeNode_1.MazeNode(new Compass4_1.Compass4()), i); })
                .not.to.throw();
            //
            if (i < 1) {
                chai_1.expect(() => { limitedToOne.connectTo(new MazeNode_1.MazeNode(new Compass4_1.Compass4()), i); })
                    .not.to.throw();
            }
            else {
                chai_1.expect(() => { limitedToOne.connectTo(new MazeNode_1.MazeNode(new Compass4_1.Compass4()), i); })
                    .to.throw();
            }
            if (i < 3) {
                chai_1.expect(() => { limitedToThree.connectTo(new MazeNode_1.MazeNode(new Compass4_1.Compass4()), i); })
                    .not.to.throw();
            }
            else {
                chai_1.expect(() => { limitedToThree.connectTo(new MazeNode_1.MazeNode(new Compass4_1.Compass4()), i); })
                    .to.throw();
            }
        }
    });
});
