"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const MazeBuilder_1 = require("../../Maze/MazeBuilder");
const Compass8_1 = require("../../Behavior/Compass8");
const Compass4_1 = require("../../Behavior/Compass4");
describe('MazeBuilder', () => {
    let MB;
    it('generates randomized mazes composed of randomly interconnected graph nodes', () => {
        MB = new MazeBuilder_1.MazeBuilder();
        let a = MB.buildMaze();
        let b = MB.buildMaze();
        let c = MB.buildMaze();
        let d = MB.buildMaze();
        let e = MB.buildMaze();
        let f = MB.buildMaze();
        chai_1.expect(a.getSize() + b.getSize() + c.getSize()).not.to.be.equal(d.getSize() + e.getSize() + f.getSize());
    });
    it('can enforce cardinality behaviors to all MazeNodes by applying an instance of CardinalityBehavior', () => {
        MB = new MazeBuilder_1.MazeBuilder({ cardinality: new Compass8_1.Compass8() });
        let a = MB.buildMaze();
        chai_1.expect(a.getStartNode().cardinality).to.be.an.instanceOf(Compass8_1.Compass8);
        MB = new MazeBuilder_1.MazeBuilder();
        let b = MB.buildMaze();
        chai_1.expect(b.getStartNode().cardinality).to.be.an.instanceOf(Compass4_1.Compass4);
    });
    it('facilitates integer randomization as a static convenience service', () => {
        let min = 0;
        let max = 3;
        let numbersFound = [false, false, false, false];
        for (let i = 0; i < 1000; i++) {
            chai_1.expect(() => { numbersFound[MazeBuilder_1.MazeBuilder.rand(max, min)] = true; }).not.to.throw();
        }
        for (let i = 0; i <= max; i++) {
            chai_1.expect(numbersFound[i]).to.be.true;
        }
    });
    it('will provide a coordinate collection of nodes generated by the build algorithm', () => {
        MB = new MazeBuilder_1.MazeBuilder();
        let maze = MB.buildMaze();
        chai_1.expect(Object.keys(MB.maze.getNodes())).to.have.length.greaterThan(0);
    });
    it('will never create a room with all exits sealed', () => {
        let mb4 = new MazeBuilder_1.MazeBuilder({ cardinality: new Compass4_1.Compass4(), complexity: 150 });
        let mb8 = new MazeBuilder_1.MazeBuilder({ cardinality: new Compass8_1.Compass8(), complexity: 150 });
        let maze4 = mb4.buildMaze();
        let maze8 = mb8.buildMaze();
        maze4.getNodesArray().forEach((node) => {
            chai_1.expect(node.getAvailableConnectionPoints().length).not.to.be.equal(4);
        });
        maze8.getNodesArray().forEach((node) => {
            chai_1.expect(node.getAvailableConnectionPoints().length).not.to.be.equal(8);
        });
    });
    // Tricky/expensive to prove without a search algorithm.  Will implement this on the official.  Mean while, these tests are pending.
    it('can generate a random path from a given node');
    it('can generate a random path from a random existing node (sourced from provided node)');
    // Has consistency issues.  Foregoing testing until solved.
    it('has a configurable complexity which determines the size, difficulty of maze');
});
