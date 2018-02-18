"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var MazeBuilder_1 = require("../MazeBuilder");
describe('MazeBuilder', function () {
    it('generates node graphs with random layouts', function () {
        var M = new MazeBuilder_1.MazeBuilder();
        var N = new MazeBuilder_1.MazeBuilder();
        M.buildMaze();
        N.buildMaze();
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
