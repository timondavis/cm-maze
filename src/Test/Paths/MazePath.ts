import { expect } from 'chai';
import 'mocha';
import {MazeBuilder} from "../../Maze/MazeBuilder";
import {MazeNode} from "../../Maze/MazeNode";
import {MazePatternFinder} from "../..";

describe( 'MazePath', () => {

	it ('provides an interface to get the path expressed as an array of MazeNode ids', () => {
		let MB = new MazeBuilder();
		let maze = MB.buildMaze();

		let path = MazePatternFinder.findPath(maze.getStartNode().id, maze.getFinishNode().id, maze);
		let pathIds = path.toIdArray();

		expect(path.length).to.be.greaterThan(0);

		pathIds.forEach((id) => {
			expect(path.next()).to.be.equal(id);
		})
	});

	it ('provides an interface to get the path expressed as an array of MazeNodes', () => {

		let MB = new MazeBuilder();
		let maze = MB.buildMaze();

		let path = MazePatternFinder.findPath(maze.getStartNode().id, maze.getFinishNode().id, maze);
		let pathNodes = path.toMazeNodeArray(maze);

		expect(path.length).to.be.greaterThan(0);

		pathNodes.forEach((node: MazeNode) => {
			expect(JSON.stringify(maze.getNodeWithId(path.next()))).to.be.equal(JSON.stringify(node));
		})
	});
});
