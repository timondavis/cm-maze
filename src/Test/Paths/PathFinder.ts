import { expect } from 'chai';
import 'mocha';
import {MazeBuilder} from "../../MazeBuilder";
import {PathFinder} from "../../Paths/PathFinder";

describe( 'PathFinder', () => {
	it ('can find the shortest distance between two maze nodes', () => {

		let MB = new MazeBuilder();
		let maze = MB.buildMaze();
		let pathFinder = new PathFinder(maze);

		let path = pathFinder.findPath(maze.getStartNode(), maze.getFinishNode());
		console.log(path);
		let a = 1;
	});
});
