"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var MazeNode_1 = require("../MazeNode");
describe('MazeNode', function () {
    it('connects bidirectionally to each node by default, but can be done in directed graph fashion', function () {
        var a = new MazeNode_1.MazeNode(8);
        var b = new MazeNode_1.MazeNode(8);
        var c = new MazeNode_1.MazeNode(8);
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
        chai_1.expect(c.getNeighborAt(5)).to.be.null;
    });
});
