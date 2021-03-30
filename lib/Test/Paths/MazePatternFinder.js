"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const MazeBuilder_1 = require("../../Maze/MazeBuilder");
const MazePatternFinder_1 = require("../../Paths/MazePatternFinder");
describe('MazePatternFinder', () => {
    it('should find the shortest distance between two maze nodes', () => {
        let MB = new MazeBuilder_1.MazeBuilder();
        let maze = MB.buildMaze();
        let path = MazePatternFinder_1.MazePatternFinder.findPath(maze.getStartNode().id, maze.getFinishNode().id, maze);
        let previous;
        let current = maze.getNodeWithId(path.next());
        let isPathConnected = false;
        let isPathGuaranteedToFinishOnCorrectNode = false;
        chai_1.expect(path.length).to.be.greaterThan(0);
        while (path.next()) {
            isPathGuaranteedToFinishOnCorrectNode = false;
            previous = maze.getNodeWithId(current.id);
            current = maze.getNodeWithId(path.current());
            chai_1.expect(previous.isNeighborsWith(current)).to.be.true;
            chai_1.expect(current.isNeighborsWith(previous)).to.be.true;
            if (current.id === maze.getFinishNode().id) {
                isPathConnected = true;
                isPathGuaranteedToFinishOnCorrectNode = true;
            }
        }
        chai_1.expect(isPathConnected).to.be.true;
        chai_1.expect(isPathGuaranteedToFinishOnCorrectNode).to.be.true;
    });
    it('should report all nodes within a given range of the supplied node', () => {
        let MB = new MazeBuilder_1.MazeBuilder();
        let maze = MB.buildMaze();
        let loops = 5;
        let maximumRange = 7;
        let minimumRange = 1;
        for (let loop = 0; loop < loops; loop++) {
            let range = Math.floor(Math.random() * (maximumRange - minimumRange)) + minimumRange;
            let sourceNode = maze.getRandomNode();
            let candidates = MazePatternFinder_1.MazePatternFinder.getTilesWithinRange(sourceNode.id, range, maze);
            let i = 0;
            chai_1.expect(candidates.length).to.be.greaterThan(0);
            for (; i < candidates.length; i++) {
                let targetNode = candidates[0];
                let path = MazePatternFinder_1.MazePatternFinder.findPath(targetNode.id, sourceNode.id, maze);
                chai_1.expect(path.length).to.be.greaterThan(0);
                chai_1.expect(path.length).to.be.lessThan(range + 1);
            }
            chai_1.expect(candidates.length).to.be.equal(i);
        }
    });
    it('converts paths to a maze node id array', () => {
        let MB = new MazeBuilder_1.MazeBuilder();
        let maze = MB.buildMaze();
        let path = MazePatternFinder_1.MazePatternFinder.findPath(maze.getStartNode().id, maze.getFinishNode().id, maze);
        let pathIds = path.toIdArray();
        chai_1.expect(path.length).to.be.greaterThan(0);
        pathIds.forEach((id) => {
            chai_1.expect(path.next()).to.be.equal(id);
        });
    });
});
