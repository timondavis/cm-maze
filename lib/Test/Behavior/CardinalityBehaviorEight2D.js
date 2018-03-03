"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var MazeCoordinates2D_1 = require("../../MazeCoordinates/MazeCoordinates2D");
var CardinalityBehaviorEight2D_1 = require("../../../lib/Behavior/CardinalityBehaviorEight2D");
var CardinalityBehaviorEight2D_2 = require("../../Behavior/CardinalityBehaviorEight2D");
describe('CardinalityBehaviorEight2D', function () {
    var cb8 = new CardinalityBehaviorEight2D_2.CardinalityBehaviorEight2D();
    it('represents an eight directional compass: N, NE, E, SE, S, SW, W, and NW , clockwise from the top', function () {
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.NORTH).to.be.equal(0);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.N).to.be.equal(0);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.NORTH_EAST).to.be.equal(1);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.NE).to.be.equal(1);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.EAST).to.be.equal(2);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.E).to.be.equal(2);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.SOUTH_EAST).to.be.equal(3);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.SE).to.be.equal(3);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.SOUTH).to.be.equal(4);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.S).to.be.equal(4);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.SOUTH_WEST).to.be.equal(5);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.SW).to.be.equal(5);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.WEST).to.be.equal(6);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.W).to.be.equal(6);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.NORTH_WEST).to.be.equal(7);
        chai_1.expect(CardinalityBehaviorEight2D_1.CB8_CARD.NW).to.be.equal(7);
    });
    it('has a cardinality of 8 (ie it represents 8 directional points', function () {
        chai_1.expect(cb8.getCardinality()).to.be.equal(8);
    });
    it('can validate a position number (referring to an exit on the node), ' +
        'and throw an exception if the position is invalid', function () {
        chai_1.expect(function () { return cb8.validatePosition(0); }).not.to.throw();
        chai_1.expect(function () { return cb8.validatePosition(-1); }).to.throw();
        chai_1.expect(function () { return cb8.validatePosition(7); }).not.to.throw();
        chai_1.expect(function () { return cb8.validatePosition(8); }).to.throw();
    });
    it('can provide a given exit position\'s diametrically opposed position index', function () {
        chai_1.expect(cb8.getOpposingPoint(CardinalityBehaviorEight2D_1.CB8_CARD.NORTH)).to.be.equal(CardinalityBehaviorEight2D_1.CB8_CARD.SOUTH);
        chai_1.expect(cb8.getOpposingPoint(CardinalityBehaviorEight2D_1.CB8_CARD.SOUTH)).to.be.equal(CardinalityBehaviorEight2D_1.CB8_CARD.NORTH);
        chai_1.expect(cb8.getOpposingPoint(CardinalityBehaviorEight2D_1.CB8_CARD.NW)).to.be.equal(CardinalityBehaviorEight2D_1.CB8_CARD.SE);
        chai_1.expect(cb8.getOpposingPoint(CardinalityBehaviorEight2D_1.CB8_CARD.SE)).to.be.equal(CardinalityBehaviorEight2D_1.CB8_CARD.NW);
        chai_1.expect(cb8.getOpposingPoint(CardinalityBehaviorEight2D_1.CB8_CARD.EAST)).to.be.equal(CardinalityBehaviorEight2D_1.CB8_CARD.WEST);
        chai_1.expect(cb8.getOpposingPoint(CardinalityBehaviorEight2D_1.CB8_CARD.WEST)).to.be.equal(CardinalityBehaviorEight2D_1.CB8_CARD.EAST);
        chai_1.expect(cb8.getOpposingPoint(CardinalityBehaviorEight2D_1.CB8_CARD.SW)).to.be.equal(CardinalityBehaviorEight2D_1.CB8_CARD.NE);
        chai_1.expect(cb8.getOpposingPoint(CardinalityBehaviorEight2D_1.CB8_CARD.NE)).to.be.equal(CardinalityBehaviorEight2D_1.CB8_CARD.SW);
    });
    it('can convert a tuple array to a MazeCoordinate2D instance representing the given position', function () {
        var position = [1, 6];
        var positionCoordinates = cb8.generateCoordinates(position);
        chai_1.expect(positionCoordinates).to.be.an.instanceOf(MazeCoordinates2D_1.MazeCoordinates2D);
        chai_1.expect(positionCoordinates.getDimensions()).to.be.equal(2);
        chai_1.expect(positionCoordinates.getPosition()).to.be.equal(position);
    });
    it('can generate new neighboring coordinate objects, given a current coordinate object and a desired direction', function () {
        var spot = new MazeCoordinates2D_1.MazeCoordinates2D([0, 0]);
        chai_1.expect(cb8.getNextCoordinates(spot, CardinalityBehaviorEight2D_1.CB8_CARD.NORTH).getPosition().toString()).to.be.equal([0, -1].toString());
        chai_1.expect(cb8.getNextCoordinates(spot, CardinalityBehaviorEight2D_1.CB8_CARD.NE).getPosition().toString()).to.be.equal([1, -1].toString());
        chai_1.expect(cb8.getNextCoordinates(spot, CardinalityBehaviorEight2D_1.CB8_CARD.EAST).getPosition().toString()).to.be.equal([1, 0].toString());
        chai_1.expect(cb8.getNextCoordinates(spot, CardinalityBehaviorEight2D_1.CB8_CARD.SE).getPosition().toString()).to.be.equal([1, 1].toString());
        chai_1.expect(cb8.getNextCoordinates(spot, CardinalityBehaviorEight2D_1.CB8_CARD.SOUTH).getPosition().toString()).to.be.equal([0, 1].toString());
        chai_1.expect(cb8.getNextCoordinates(spot, CardinalityBehaviorEight2D_1.CB8_CARD.SW).getPosition().toString()).to.be.equal([-1, 1].toString());
        chai_1.expect(cb8.getNextCoordinates(spot, CardinalityBehaviorEight2D_1.CB8_CARD.WEST).getPosition().toString()).to.be.equal([-1, 0].toString());
        chai_1.expect(cb8.getNextCoordinates(spot, CardinalityBehaviorEight2D_1.CB8_CARD.NW).getPosition().toString()).to.be.equal([-1, -1].toString());
    });
});
