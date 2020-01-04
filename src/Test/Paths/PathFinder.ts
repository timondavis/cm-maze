import { expect } from 'chai';
import 'mocha';
import {MazeBuilder} from "../../MazeBuilder";
import {PathFinder} from "../../Paths/PathFinder";
import {MazeNode} from "../../MazeNode";

describe( 'PathFinder', () => {
	it ('can find the shortest distance between two maze nodes', () => {

		let MB = new MazeBuilder();
		let maze = MB.buildMaze();

		let path = PathFinder.findPath(maze.getStartNode().getId(), maze.getFinishNode().getId(), maze);
		console.log(path);

		let previous: MazeNode;
		let current = maze.getNodeWithId(path.next());
		let isPathConnected = false;
		let isPathGuaranteedToFinishOnCorrectNode = false;

		expect(path.getLength()).to.be.greaterThan(0);

		while( path.next() ) {
			isPathGuaranteedToFinishOnCorrectNode = false;

			previous = maze.getNodeWithId(current.getId());
			current = maze.getNodeWithId(path.current());

			expect(previous.isNeighborsWith(current)).to.be.true;
			expect(current.isNeighborsWith(previous)).to.be.true;

			if (current.getId() === maze.getFinishNode().getId()) {
				isPathConnected = true;
				isPathGuaranteedToFinishOnCorrectNode = true;
			}
		}

		expect (isPathConnected).to.be.true;
		expect (isPathGuaranteedToFinishOnCorrectNode).to.be.true;
	});
});
