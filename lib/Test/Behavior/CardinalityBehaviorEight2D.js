"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var NodeLocation2D_1 = require("../../MazeCoordinates/NodeLocation2D");
var Compass8_1 = require("../../Behavior/Compass8");
var Compass8_2 = require("../../Behavior/Compass8");
describe('Compass8', function () {
    var cb8 = new Compass8_2.Compass8();
    it('represents an eight directional compass: N, NE, E, SE, S, SW, W, and NW , clockwise from the top', function () {
        chai_1.expect(Compass8_1.C8.NORTH).to.be.equal(0);
        chai_1.expect(Compass8_1.C8.N).to.be.equal(0);
        chai_1.expect(Compass8_1.C8.NORTH_EAST).to.be.equal(1);
        chai_1.expect(Compass8_1.C8.NE).to.be.equal(1);
        chai_1.expect(Compass8_1.C8.EAST).to.be.equal(2);
        chai_1.expect(Compass8_1.C8.E).to.be.equal(2);
        chai_1.expect(Compass8_1.C8.SOUTH_EAST).to.be.equal(3);
        chai_1.expect(Compass8_1.C8.SE).to.be.equal(3);
        chai_1.expect(Compass8_1.C8.SOUTH).to.be.equal(4);
        chai_1.expect(Compass8_1.C8.S).to.be.equal(4);
        chai_1.expect(Compass8_1.C8.SOUTH_WEST).to.be.equal(5);
        chai_1.expect(Compass8_1.C8.SW).to.be.equal(5);
        chai_1.expect(Compass8_1.C8.WEST).to.be.equal(6);
        chai_1.expect(Compass8_1.C8.W).to.be.equal(6);
        chai_1.expect(Compass8_1.C8.NORTH_WEST).to.be.equal(7);
        chai_1.expect(Compass8_1.C8.NW).to.be.equal(7);
    });
    it('has a cardinality of 8 (ie it represents 8 directional points', function () {
        chai_1.expect(cb8.getConnectionPointCount()).to.be.equal(8);
    });
    it('can validate a position number (referring to an exit on the node), ' +
        'and throw an exception if the position is invalid', function () {
        chai_1.expect(function () { return cb8.validateConnectionPoint(0); }).not.to.throw();
        chai_1.expect(function () { return cb8.validateConnectionPoint(-1); }).to.throw();
        chai_1.expect(function () { return cb8.validateConnectionPoint(7); }).not.to.throw();
        chai_1.expect(function () { return cb8.validateConnectionPoint(8); }).to.throw();
    });
    it('can provide a given exit position\'s diametrically opposed position index', function () {
        chai_1.expect(cb8.getOpposingConnectionPoint(Compass8_1.C8.NORTH)).to.be.equal(Compass8_1.C8.SOUTH);
        chai_1.expect(cb8.getOpposingConnectionPoint(Compass8_1.C8.SOUTH)).to.be.equal(Compass8_1.C8.NORTH);
        chai_1.expect(cb8.getOpposingConnectionPoint(Compass8_1.C8.NW)).to.be.equal(Compass8_1.C8.SE);
        chai_1.expect(cb8.getOpposingConnectionPoint(Compass8_1.C8.SE)).to.be.equal(Compass8_1.C8.NW);
        chai_1.expect(cb8.getOpposingConnectionPoint(Compass8_1.C8.EAST)).to.be.equal(Compass8_1.C8.WEST);
        chai_1.expect(cb8.getOpposingConnectionPoint(Compass8_1.C8.WEST)).to.be.equal(Compass8_1.C8.EAST);
        chai_1.expect(cb8.getOpposingConnectionPoint(Compass8_1.C8.SW)).to.be.equal(Compass8_1.C8.NE);
        chai_1.expect(cb8.getOpposingConnectionPoint(Compass8_1.C8.NE)).to.be.equal(Compass8_1.C8.SW);
    });
    it('can convert a tuple array to a MazeCoordinate2D instance representing the given position', function () {
        var position = [1, 6];
        var positionCoordinates = cb8.generateNodeLocation(position);
        chai_1.expect(positionCoordinates).to.be.an.instanceOf(NodeLocation2D_1.NodeLocation2D);
        chai_1.expect(positionCoordinates.dimensions).to.be.equal(2);
        chai_1.expect(positionCoordinates.position).to.be.equal(position);
    });
    it('can generate new neighboring coordinate objects, given a current coordinate object and a desired direction', function () {
        var spot = new NodeLocation2D_1.NodeLocation2D([0, 0]);
        chai_1.expect(cb8.getNextLocation(spot, Compass8_1.C8.NORTH).position.toString()).to.be.equal([0, -1].toString());
        chai_1.expect(cb8.getNextLocation(spot, Compass8_1.C8.NE).position.toString()).to.be.equal([1, -1].toString());
        chai_1.expect(cb8.getNextLocation(spot, Compass8_1.C8.EAST).position.toString()).to.be.equal([1, 0].toString());
        chai_1.expect(cb8.getNextLocation(spot, Compass8_1.C8.SE).position.toString()).to.be.equal([1, 1].toString());
        chai_1.expect(cb8.getNextLocation(spot, Compass8_1.C8.SOUTH).position.toString()).to.be.equal([0, 1].toString());
        chai_1.expect(cb8.getNextLocation(spot, Compass8_1.C8.SW).position.toString()).to.be.equal([-1, 1].toString());
        chai_1.expect(cb8.getNextLocation(spot, Compass8_1.C8.WEST).position.toString()).to.be.equal([-1, 0].toString());
        chai_1.expect(cb8.getNextLocation(spot, Compass8_1.C8.NW).position.toString()).to.be.equal([-1, -1].toString());
    });
});
