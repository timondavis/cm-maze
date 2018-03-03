"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var MazeNode_1 = require("../MazeNode");
var CardinalityBehaviorFour2D_1 = require("../Behavior/CardinalityBehaviorFour2D");
var CardinalityBehaviorEight2D_1 = require("../Behavior/CardinalityBehaviorEight2D");
var MazeBuilder_1 = require("../MazeBuilder");
var MazeCoordinates2D_1 = require("../MazeCoordinates/MazeCoordinates2D");
var CardinalityBehavior_1 = require("../Behavior/CardinalityBehavior");
describe('MazeNode', function () {
    var r = 10; // Default randomize ceiling
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
        var exitsOccupiedOnA;
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D());
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D()), CardinalityBehaviorEight2D_1.CB8_CARD.N);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D()), CardinalityBehaviorEight2D_1.CB8_CARD.E);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D()), CardinalityBehaviorEight2D_1.CB8_CARD.S);
        a.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D()), CardinalityBehaviorEight2D_1.CB8_CARD.W);
        exitsOpenOnA = a.getOpenExitPoints();
        exitsOccupiedOnA = a.getOccupiedExitPoints();
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
    it('confirms whether another supplied node is neighbors with this node', function () {
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        var b = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        var c = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        var d = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        a.connectTo(b, CardinalityBehaviorFour2D_1.CB4_CARD.NORTH);
        a.connectTo(d, CardinalityBehaviorFour2D_1.CB4_CARD.WEST);
        b.connectTo(c, CardinalityBehaviorFour2D_1.CB4_CARD.WEST);
        d.connectTo(c, CardinalityBehaviorFour2D_1.CB4_CARD.NORTH);
        chai_1.expect(a.isNeighborsWith(b)).to.be.true;
        chai_1.expect(a.isNeighborsWith(d)).to.be.true;
        chai_1.expect(c.isNeighborsWith(b)).to.be.true;
        chai_1.expect(d.isNeighborsWith(c)).to.be.true;
        chai_1.expect(a.isNeighborsWith(c)).to.be.false;
        chai_1.expect(c.isNeighborsWith(a)).to.be.false;
        chai_1.expect(b.isNeighborsWith(d)).to.be.false;
    });
    it('can accept and report 2 dimensional coordinates (as instances of MazeCoordinates2D objects)', function () {
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D());
        var coords = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        a.setCoordinates(new MazeCoordinates2D_1.MazeCoordinates2D(coords));
        chai_1.expect(a.getCoordinates().toString()).to.be.equal(new MazeCoordinates2D_1.MazeCoordinates2D(coords).toString());
    });
    it('reports on whether a given exit point on the node is occupied or empty (two separate functions)', function () {
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        var b = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        var c = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        a.connectTo(b, CardinalityBehaviorFour2D_1.CB4_CARD.NORTH);
        a.connectTo(c, CardinalityBehaviorFour2D_1.CB4_CARD.SOUTH);
        chai_1.expect(a.isPointOpen(0)).to.be.false;
        chai_1.expect(a.isPointOpen(1)).to.be.true;
        chai_1.expect(a.isPointOpen(2)).to.be.false;
        chai_1.expect(a.isPointOpen(3)).to.be.true;
        chai_1.expect(a.isPointOccupied(0)).to.be.true;
        chai_1.expect(a.isPointOccupied(1)).to.be.false;
        chai_1.expect(a.isPointOccupied(2)).to.be.true;
        chai_1.expect(a.isPointOccupied(3)).to.be.false;
        chai_1.expect(b.isPointOpen(0)).to.be.true;
        chai_1.expect(b.isPointOpen(1)).to.be.true;
        chai_1.expect(b.isPointOpen(2)).to.be.false;
        chai_1.expect(b.isPointOpen(3)).to.be.true;
        chai_1.expect(b.isPointOccupied(0)).to.be.false;
        chai_1.expect(b.isPointOccupied(1)).to.be.false;
        chai_1.expect(b.isPointOccupied(2)).to.be.true;
        chai_1.expect(b.isPointOccupied(3)).to.be.false;
        chai_1.expect(c.isPointOpen(0)).to.be.false;
        chai_1.expect(c.isPointOpen(1)).to.be.true;
        chai_1.expect(c.isPointOpen(2)).to.be.true;
        chai_1.expect(c.isPointOpen(3)).to.be.true;
        chai_1.expect(c.isPointOccupied(0)).to.be.true;
        chai_1.expect(c.isPointOccupied(1)).to.be.false;
        chai_1.expect(c.isPointOccupied(2)).to.be.false;
        chai_1.expect(c.isPointOccupied(3)).to.be.false;
    });
    it('reports the cardinality behavior instance assigned to the node on demand', function () {
        var a = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        chai_1.expect(a.getCardinality()).to.be.instanceOf(CardinalityBehavior_1.CardinalityBehavior);
        chai_1.expect(a.getCardinality()).to.be.instanceOf(CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D);
        chai_1.expect(a.getCardinality()).not.to.be.instanceOf(CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D);
    });
    it('accepts and respects limits to the amount of nodes that the node can be connected to', function () {
        var unlimited = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        var limitedToOne = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        var limitedToThree = new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D());
        var _loop_1 = function (i) {
            chai_1.expect(function () { return unlimited.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()), i); })
                .not.to.throw;
            if (i < 1) {
                chai_1.expect(function () { return limitedToOne.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()), i); })
                    .not.to.throw;
            }
            else {
                chai_1.expect(function () { return limitedToOne.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()), i); })
                    .to.throw;
            }
            if (i < 3) {
                chai_1.expect(function () { return limitedToThree.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()), i); })
                    .not.to.throw;
            }
            else {
                chai_1.expect(function () { return limitedToThree.connectTo(new MazeNode_1.MazeNode(new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D()), i); })
                    .to.throw;
            }
        };
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    });
});
