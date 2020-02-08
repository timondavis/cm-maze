import { expect } from 'chai';
import 'mocha';
import {MazeBuilder} from "../../MazeBuilder";
import {MazeNode} from "../../MazeNode";
import {MazePatternFinder} from "../../Paths/MazePatternFinder";

describe( 'MazePatternFinder', () => {
	it ('should find the shortest distance between two maze nodes', () => {

		let MB = new MazeBuilder();
		let maze = MB.buildMaze();

		let path = MazePatternFinder.findPath(maze.getStartNode().id, maze.getFinishNode().id, maze);

		let previous: MazeNode;
		let current = maze.getNodeWithId(path.next());
		let isPathConnected = false;
		let isPathGuaranteedToFinishOnCorrectNode = false;

		expect(path.getLength()).to.be.greaterThan(0);

		while( path.next() ) {
			isPathGuaranteedToFinishOnCorrectNode = false;

			previous = maze.getNodeWithId(current.id);
			current = maze.getNodeWithId(path.current());

			expect(previous.isNeighborsWith(current)).to.be.true;
			expect(current.isNeighborsWith(previous)).to.be.true;

			if (current.id === maze.getFinishNode().id) {
				isPathConnected = true;
				isPathGuaranteedToFinishOnCorrectNode = true;
			}
		}

		expect (isPathConnected).to.be.true;
		expect (isPathGuaranteedToFinishOnCorrectNode).to.be.true;
	});

	it ('should report all nodes within a given range of the supplied node', () => {

		let MB = new MazeBuilder();
		let maze = MB.buildMaze();
		let loops = 5;
		let maximumRange = 7;
		let minimumRange = 1;

		for (let loop = 0 ; loop < loops ; loop++) {

			let range = Math.floor(Math.random() * (maximumRange - minimumRange)) + minimumRange;
			let sourceNode = maze.getRandomNode();
			let candidates = MazePatternFinder.getTilesWithinRange(sourceNode.id, range, maze);

			expect(candidates.getLength()).to.be.greaterThan(0);
			while (candidates.getLength() > 0) {
				let targetNode = maze.getNodeWithId(candidates.unshift().id);
				let path = MazePatternFinder.findPath(targetNode.id, sourceNode.id, maze);
				expect(path.getLength()).to.be.greaterThan(0);
				expect(path.getLength()).to.be.lessThan(range + 1);
			}
			expect(candidates.getLength()).to.be.equal(0);
		}
	});
});
