"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const MazeBuilder_1 = require("../../Maze/MazeBuilder");
const __1 = require("../..");
describe('MazePath', () => {
    it('provides an interface to get the path expressed as an array of MazeNode ids', () => {
        let MB = new MazeBuilder_1.MazeBuilder();
        let maze = MB.buildMaze();
        let path = __1.MazePatternFinder.findPath(maze.getStartNode().id, maze.getFinishNode().id, maze);
        let pathIds = path.toIdArray();
        chai_1.expect(path.length).to.be.greaterThan(0);
        pathIds.forEach((id) => {
            chai_1.expect(path.next()).to.be.equal(id);
        });
    });
    it('provides an interface to get the path expressed as an array of MazeNodes', () => {
        let MB = new MazeBuilder_1.MazeBuilder();
        let maze = MB.buildMaze();
        let path = __1.MazePatternFinder.findPath(maze.getStartNode().id, maze.getFinishNode().id, maze);
        let pathNodes = path.toMazeNodeArray(maze);
        chai_1.expect(path.length).to.be.greaterThan(0);
        pathNodes.forEach((node) => {
            chai_1.expect(JSON.stringify(maze.getNodeWithId(path.next()))).to.be.equal(JSON.stringify(node));
        });
    });
});
