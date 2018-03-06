"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var CardinalityBehaviorFour2D_1 = require("../../Behavior/CardinalityBehaviorFour2D");
var MazeCoordinates2D_1 = require("../../MazeCoordinates/MazeCoordinates2D");
describe('CardinalityBehaviorFour2D', function () {
    var cb4 = new CardinalityBehaviorFour2D_1.CardinalityBehaviorFour2D();
    it('represents a four directional compass: north, east, south and west, in CSS border ordering', function () {
        chai_1.expect(CardinalityBehaviorFour2D_1.CB4_CARD.NORTH).to.be.equal(0);
        chai_1.expect(CardinalityBehaviorFour2D_1.CB4_CARD.N).to.be.equal(0);
        chai_1.expect(CardinalityBehaviorFour2D_1.CB4_CARD.EAST).to.be.equal(1);
        chai_1.expect(CardinalityBehaviorFour2D_1.CB4_CARD.E).to.be.equal(1);
        chai_1.expect(CardinalityBehaviorFour2D_1.CB4_CARD.SOUTH).to.be.equal(2);
        chai_1.expect(CardinalityBehaviorFour2D_1.CB4_CARD.S).to.be.equal(2);
        chai_1.expect(CardinalityBehaviorFour2D_1.CB4_CARD.WEST).to.be.equal(3);
        chai_1.expect(CardinalityBehaviorFour2D_1.CB4_CARD.W).to.be.equal(3);
    });
    it('has a cardinality of 4 (ie it represents 4 directional points', function () {
        chai_1.expect(cb4.getCardinality()).to.be.equal(4);
    });
    it('can validate a position number (referring to an exit on the node), ' +
        'and throw an exception if the position is invalid', function () {
        chai_1.expect(function () { return cb4.validatePosition(0); }).not.to.throw();
        chai_1.expect(function () { return cb4.validatePosition(-1); }).to.throw();
        chai_1.expect(function () { return cb4.validatePosition(3); }).not.to.throw();
        chai_1.expect(function () { return cb4.validatePosition(4); }).to.throw();
    });
    it('can provide a given exit position\'s diametrically opposed position index', function () {
        chai_1.expect(cb4.getOpposingPoint(CardinalityBehaviorFour2D_1.CB4_CARD.NORTH)).to.be.equal(CardinalityBehaviorFour2D_1.CB4_CARD.SOUTH);
        chai_1.expect(cb4.getOpposingPoint(CardinalityBehaviorFour2D_1.CB4_CARD.SOUTH)).to.be.equal(CardinalityBehaviorFour2D_1.CB4_CARD.NORTH);
        chai_1.expect(cb4.getOpposingPoint(CardinalityBehaviorFour2D_1.CB4_CARD.EAST)).to.be.equal(CardinalityBehaviorFour2D_1.CB4_CARD.WEST);
        chai_1.expect(cb4.getOpposingPoint(CardinalityBehaviorFour2D_1.CB4_CARD.WEST)).to.be.equal(CardinalityBehaviorFour2D_1.CB4_CARD.EAST);
    });
    it('can convert a tuple array to a MazeCoordinate2D instance representing the given position', function () {
        var position = [1, 6];
        var positionCoordinates = cb4.generateCoordinates(position);
        chai_1.expect(positionCoordinates).to.be.an.instanceOf(MazeCoordinates2D_1.MazeCoordinates2D);
        chai_1.expect(positionCoordinates.getDimensions()).to.be.equal(2);
        chai_1.expect(positionCoordinates.getPosition()).to.be.equal(position);
    });
    it('can generate new neighboring coordinate objects, given a current coordinate object and a desired direction', function () {
        var spot = new MazeCoordinates2D_1.MazeCoordinates2D([0, 0]);
        chai_1.expect(cb4.getNextCoordinates(spot, CardinalityBehaviorFour2D_1.CB4_CARD.NORTH).getPosition().toString()).to.be.equal([0, -1].toString());
        chai_1.expect(cb4.getNextCoordinates(spot, CardinalityBehaviorFour2D_1.CB4_CARD.EAST).getPosition().toString()).to.be.equal([1, 0].toString());
        chai_1.expect(cb4.getNextCoordinates(spot, CardinalityBehaviorFour2D_1.CB4_CARD.SOUTH).getPosition().toString()).to.be.equal([0, 1].toString());
        chai_1.expect(cb4.getNextCoordinates(spot, CardinalityBehaviorFour2D_1.CB4_CARD.WEST).getPosition().toString()).to.be.equal([-1, 0].toString());
    });
});
