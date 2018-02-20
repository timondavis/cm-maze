"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var MazeBuilder_1 = require("../MazeBuilder");
var CardinalityBehaviorEight2D_1 = require("../Behavior/CardinalityBehaviorEight2D");
var MazeNode_1 = require("../MazeNode");
describe('MazeBuilder', function () {
    it('generates node graphs with random layouts', function () {
        MazeNode_1.MazeNode.toggleDebug(true);
        var M = new MazeBuilder_1.MazeBuilder(new CardinalityBehaviorEight2D_1.CardinalityBehaviorEight2D(), 20);
        M.buildMaze();
        var mc = M.getCoordinatesCollection();
        Object.keys(mc).forEach(function (key) { return console.log(mc[key].toString()); });
    });
    it('generates random numbers between a requested range', function () {
        var number = 0;
        for (var i = 0; i < 2000; i++) {
            number = MazeBuilder_1.MazeBuilder.rand(400, 200);
            chai_1.expect(number).to.be.greaterThan(199);
            chai_1.expect(number).to.be.lessThan(401);
        }
    });
});
