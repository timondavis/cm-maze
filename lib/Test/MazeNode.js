"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var MazeNode_1 = require("../MazeNode");
var CardinalityBehaviorFour2D_1 = require("../Behavior/CardinalityBehaviorFour2D");
var CardinalityBehaviorEight2D_1 = require("../Behavior/CardinalityBehaviorEight2D");
describe('MazeNode', function () {
    it('connects bidirectionally to each node by default, but can be done in directed graph fashion', function () {
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D());
        var b = new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D());
        var c = new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D());
        // A < -- > B connect
        a.connectTo(b, 3);
        chai_1.expect(a.isNeighborsWith(b)).to.be.true;
        chai_1.expect(b.isNeighborsWith(a)).to.be.true;
        chai_1.expect(a.getNeighborAt(3)).to.be.equal(b);
        chai_1.expect(b.getNeighborAt(7)).to.be.equal(a);
        // B -> C connect
        b.connectTo(c, 1, false);
        chai_1.expect(b.isNeighborsWith(c)).to.be.true;
        chai_1.expect(c.isNeighborsWith(b)).to.be.false;
        chai_1.expect(b.getNeighborAt(1)).to.be.equal(c);
        chai_1.expect(c.getNeighborAt(5)).to.be.undefined;
    });
    it('can be explicitly named', function () {
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D);
        a.setName("My Name");
        chai_1.expect(a.getName()).to.be.equal("My Name");
    });
    it('can report on who its neighboring nodes are', function () {
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()).setName("A");
        var neighborsOfA;
        var neighborsOfB;
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()).setName("C"), CardinalityBehaviorFour2D_1.CB4_CARD.N, false);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()).setName("B"), CardinalityBehaviorFour2D_1.CB4_CARD.E);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()).setName("D"), CardinalityBehaviorFour2D_1.CB4_CARD.S, false);
        neighborsOfA = a.getNeighbors();
        neighborsOfB = a.getNeighborAt(1).getNeighbors();
        chai_1.expect(neighborsOfA[0].getName()).to.be.equal("C");
        chai_1.expect(neighborsOfA[1].getName()).to.be.equal("B");
        chai_1.expect(neighborsOfA[2].getName()).to.be.equal("D");
        chai_1.expect(neighborsOfB[0].getName()).to.be.equal("A");
        neighborsOfA = a.getNeighbors(true);
        neighborsOfB = a.getNeighborAt(1).getNeighbors(true);
        chai_1.expect(neighborsOfA).to.have.lengthOf(4);
        chai_1.expect(neighborsOfA[0].getName()).to.be.equal("C");
        chai_1.expect(neighborsOfA[1].getName()).to.be.equal("B");
        chai_1.expect(neighborsOfA[2].getName()).to.be.equal("D");
        chai_1.expect(neighborsOfA[3]).to.be.undefined;
        chai_1.expect(neighborsOfB).to.have.lengthOf(4);
        chai_1.expect(neighborsOfB[0]).to.be.undefined;
        chai_1.expect(neighborsOfB[1]).to.be.undefined;
        chai_1.expect(neighborsOfB[2]).to.be.undefined;
        chai_1.expect(neighborsOfB[3].getName()).to.be.equal("A");
    });
    it('can report on what its occupied exit points are', function () {
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()).setName("A");
        var exitsOfA;
        var exitsOfC;
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()).setName("B"), CardinalityBehaviorFour2D_1.CB4_CARD.W, false);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()).setName("C"), CardinalityBehaviorFour2D_1.CB4_CARD.E);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()).setName("D"), CardinalityBehaviorFour2D_1.CB4_CARD.S, false);
        exitsOfA = a.getOccupiedExitPoints();
        exitsOfC = a.getNeighborAt(1).getOccupiedExitPoints();
        chai_1.expect(a.getNeighborAt(exitsOfA[0]).getName()).to.be.equal("C");
        chai_1.expect(a.getNeighborAt(exitsOfA[1]).getName()).to.be.equal("D");
        chai_1.expect(a.getNeighborAt(exitsOfA[2]).getName()).to.be.equal("B");
        chai_1.expect(a.getNeighborAt(1).getNeighborAt(exitsOfC[0]).getName()).to.be.equal("A");
    });
    it('can report on what its open exit points are', function () {
        var exitsOpenOnA;
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D());
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D()), CardinalityBehaviorEight2D_1.CB8_CARD.N);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D()), CardinalityBehaviorEight2D_1.CB8_CARD.E);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D()), CardinalityBehaviorEight2D_1.CB8_CARD.S);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D()), CardinalityBehaviorEight2D_1.CB8_CARD.W);
        exitsOpenOnA = a.getOpenExitPoints();
        chai_1.expect(exitsOpenOnA).to.have.lengthOf(4);
        chai_1.expect(exitsOpenOnA[0]).to.be.equal(1);
        chai_1.expect(exitsOpenOnA[1]).to.be.equal(3);
        chai_1.expect(exitsOpenOnA[2]).to.be.equal(5);
        chai_1.expect(exitsOpenOnA[3]).to.be.equal(7);
    });
    it('can accept and report 2 dimensional coordinates');
});
