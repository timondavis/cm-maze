"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MazeCoordinates2D_1 = require("../../../lib/MazeCoordinates/MazeCoordinates2D");
var chai_1 = require("chai");
require("mocha");
var MazeBuilder_1 = require("../../MazeBuilder");
describe('MazeCoordinates2D', function () {
    var mc = new MazeCoordinates2D_1.MazeCoordinates2D();
    var r = 10; // This is the base random number used throughout the tests
    it('can be instantiated to 0,0 by default, or coordinates can be passed into the constructor', function () {
        var x = MazeBuilder_1.MazeBuilder.rand(r);
        var y = MazeBuilder_1.MazeBuilder.rand(r);
        mc = new MazeCoordinates2D_1.MazeCoordinates2D();
        chai_1.expect(mc.getPosition().toString()).to.be.equal([0, 0].toString());
        mc = new MazeCoordinates2D_1.MazeCoordinates2D([x, y]);
        chai_1.expect(mc.getPosition().toString()).to.be.equal([x, y].toString());
    });
    it('facilitates updates to the coordinate\'s entire position', function () {
        var old = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        var next = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        mc = new MazeCoordinates2D_1.MazeCoordinates2D(old);
        mc.updatePosition(next);
        chai_1.expect(mc.getPosition().toString()).to.be.equal(next.toString());
    });
    it('facilitates updates to a single dimension by providing a new value (ie. update X or Y)', function () {
        var old = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        var next = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        mc = new MazeCoordinates2D_1.MazeCoordinates2D(old);
        mc.updateDimension(1, next[1]);
        chai_1.expect(mc.getPosition().toString()).to.be.equal([old[0], next[1]].toString());
    });
    it('facilitates updates to a single dimension by providing a delta value (ie. update X or Y', function () {
        var old = [MazeBuilder_1.MazeBuilder.rand(r), MazeBuilder_1.MazeBuilder.rand(r)];
        var delta = MazeBuilder_1.MazeBuilder.rand(r);
        mc = new MazeCoordinates2D_1.MazeCoordinates2D(old);
        mc.adjustDimension(0, delta);
        chai_1.expect(mc.getPosition().toString()).to.be.equal([old[0] + delta, old[1]].toString());
    });
});
