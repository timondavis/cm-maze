"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var Compass4_1 = require("../../Behavior/Compass4");
var NodeLocation2D_1 = require("../../MazeCoordinates/NodeLocation2D");
describe('Compass4', function () {
    var cb4 = new Compass4_1.Compass4();
    it('represents a four directional compass: north, east, south and west, in CSS border ordering', function () {
        chai_1.expect(Compass4_1.C4.NORTH).to.be.equal(0);
        chai_1.expect(Compass4_1.C4.N).to.be.equal(0);
        chai_1.expect(Compass4_1.C4.EAST).to.be.equal(1);
        chai_1.expect(Compass4_1.C4.E).to.be.equal(1);
        chai_1.expect(Compass4_1.C4.SOUTH).to.be.equal(2);
        chai_1.expect(Compass4_1.C4.S).to.be.equal(2);
        chai_1.expect(Compass4_1.C4.WEST).to.be.equal(3);
        chai_1.expect(Compass4_1.C4.W).to.be.equal(3);
    });
    it('has a cardinality of 4 (ie it represents 4 directional points', function () {
        chai_1.expect(cb4.getConnectionPointCount()).to.be.equal(4);
    });
    it('can validate a position number (referring to an exit on the node), ' +
        'and throw an exception if the position is invalid', function () {
        chai_1.expect(function () { return cb4.validateConnectionPoint(0); }).not.to.throw();
        chai_1.expect(function () { return cb4.validateConnectionPoint(-1); }).to.throw();
        chai_1.expect(function () { return cb4.validateConnectionPoint(3); }).not.to.throw();
        chai_1.expect(function () { return cb4.validateConnectionPoint(4); }).to.throw();
    });
    it('can provide a given exit position\'s diametrically opposed position index', function () {
        chai_1.expect(cb4.getOpposingConnectionPoint(Compass4_1.C4.NORTH)).to.be.equal(Compass4_1.C4.SOUTH);
        chai_1.expect(cb4.getOpposingConnectionPoint(Compass4_1.C4.SOUTH)).to.be.equal(Compass4_1.C4.NORTH);
        chai_1.expect(cb4.getOpposingConnectionPoint(Compass4_1.C4.EAST)).to.be.equal(Compass4_1.C4.WEST);
        chai_1.expect(cb4.getOpposingConnectionPoint(Compass4_1.C4.WEST)).to.be.equal(Compass4_1.C4.EAST);
    });
    it('can convert a tuple array to a MazeCoordinate2D instance representing the given position', function () {
        var position = [1, 6];
        var positionCoordinates = cb4.generateNodeLocation(position);
        chai_1.expect(positionCoordinates).to.be.an.instanceOf(NodeLocation2D_1.NodeLocation2D);
        chai_1.expect(positionCoordinates.dimensions).to.be.equal(2);
        chai_1.expect(positionCoordinates.position).to.be.equal(position);
    });
    it('can generate new neighboring coordinate objects, given a current coordinate object and a desired direction', function () {
        var spot = new NodeLocation2D_1.NodeLocation2D([0, 0]);
        chai_1.expect(cb4.getNextLocation(spot, Compass4_1.C4.NORTH).position.toString()).to.be.equal([0, -1].toString());
        chai_1.expect(cb4.getNextLocation(spot, Compass4_1.C4.EAST).position.toString()).to.be.equal([1, 0].toString());
        chai_1.expect(cb4.getNextLocation(spot, Compass4_1.C4.SOUTH).position.toString()).to.be.equal([0, 1].toString());
        chai_1.expect(cb4.getNextLocation(spot, Compass4_1.C4.WEST).position.toString()).to.be.equal([-1, 0].toString());
    });
});
