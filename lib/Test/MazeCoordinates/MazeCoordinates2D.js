"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeLocation2D_1 = require("../../MazeCoordinates/NodeLocation2D");
var chai_1 = require("chai");
require("mocha");
var MazeBuilder_1 = require("../../MazeBuilder");
describe('NodeLocation2D', function () {
    var mc = new NodeLocation2D_1.NodeLocation2D();
    var r = 10; // This is the base random number used throughout the tests
    it('can be instantiated to 0,0 by default, or coordinates can be passed into the constructor', function () {
        var x = MazeBuilder_1.MazeBuilder.rand(r);
        var y = MazeBuilder_1.MazeBuilder.rand(r);
        mc = new NodeLocation2D_1.NodeLocation2D();
        chai_1.expect(mc.getPosition().toString()).to.be.equal([0, 0].toString());
        mc = new NodeLocation2D_1.NodeLocation2D([x, y]);
        chai_1.expect(mc.getPosition().toString()).to.be.equal([x, y].toString());
    });
    it('facilitates updates to the coordinate\'s entire position', function () {
        var old = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        var next = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        mc = new NodeLocation2D_1.NodeLocation2D(old);
        mc.updatePosition(next);
        chai_1.expect(mc.getPosition().toString()).to.be.equal(next.toString());
    });
    it('facilitates updates to a single dimension by providing a new value (ie. update X or Y)', function () {
        var old = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        var next = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        mc = new NodeLocation2D_1.NodeLocation2D(old);
        mc.updateAxisPoint(1, next[1]);
        chai_1.expect(mc.getPosition().toString()).to.be.equal([old[0], next[1]].toString());
    });
    it('facilitates updates to a single dimension by providing a delta value (ie. update X or Y', function () {
        var old = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        var delta = MazeBuilder_1.MazeBuilder.rand(r);
        mc = new NodeLocation2D_1.NodeLocation2D(old);
        mc.adjustAxisPoint(0, delta);
        chai_1.expect(mc.getPosition().toString()).to.be.equal([old[0] + delta, old[1]].toString());
    });
    it('provides reports on position by dimension, among other means (provided by other tests)', function () {
        var old = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        mc = new NodeLocation2D_1.NodeLocation2D(old);
        chai_1.expect(mc.getAxisPoint(0)).to.be.equal(old[0]);
        chai_1.expect(mc.getAxisPoint(1)).to.be.equal(old[1]);
    });
    it('provides reports on position by returning a 2-element array (x,y)', function () {
        var old = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        mc = new NodeLocation2D_1.NodeLocation2D(old);
        chai_1.expect(mc.getPosition().toString()).to.be.equal(old.toString());
    });
    it('converts arrays into strings as a static service, which facilitates hashmapping and comparisons', function () {
        var old = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        mc = new NodeLocation2D_1.NodeLocation2D(old);
        chai_1.expect(NodeLocation2D_1.NodeLocation2D.encodePositionArray(old)).to.be.equal("[" + old.toString() + "]");
        chai_1.expect("[" + old.toString() + "]").to.be.equal(NodeLocation2D_1.NodeLocation2D.encodePositionArray(old));
    });
    it('should report, as a number, how many dimensions this coordinate facilitates', function () {
        mc = new NodeLocation2D_1.NodeLocation2D();
        chai_1.expect(mc.getDimensions()).to.be.equal(2);
    });
    it('facilitates capturing location with a getter', function () {
        var nodeLocation = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        mc = new NodeLocation2D_1.NodeLocation2D(nodeLocation);
        chai_1.expect(mc.getPosition()).to.be.equal(nodeLocation);
    });
    it('provides X and Y coordinates with specific named functions (specialized for 2D version', function () {
        var nodeLocation = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        mc = new NodeLocation2D_1.NodeLocation2D(nodeLocation);
        chai_1.expect(mc.getX()).to.be.equal(nodeLocation[0]);
        chai_1.expect(mc.getY()).to.be.equal(nodeLocation[1]);
    });
});
