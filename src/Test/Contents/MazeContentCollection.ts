import {MazeContentAtlas} from "../../Contents/MazeContentAtlas";
import {Maze, MazeNode, Collectible, MazeBuilder} from "../..";
import {MazeContentCollection} from "../../Contents/MazeContentCollection";
import {expect} from 'chai';
import 'mocha';
import {IdentificationGenerator} from "cm-domain-utilities";


describe('MazeContentCollection', () => {

	let mb: MazeBuilder;
	let maze: Maze;

	before(() => {
		mb = new MazeBuilder();
	});

	beforeEach(() => {
		maze = mb.buildMaze();
	});


	it( 'stores and can report on its own name', () => {
		let testPasses = 5;
		let testRunMax = 100;

		let atlas = new MazeContentAtlas(maze);
		for (let testPass = 0 ; testPass < testPasses ; testPass++) {
			let testRunSize = Math.round(Math.random() * testRunMax) + 1;
			let collectionNames: string[] = [];

			for (let i = 0 ; i < testRunSize ; i++) {
				collectionNames[i] = IdentificationGenerator.UUID();
				atlas.createCollection(collectionNames[i]);
			}


			for (let i = 0 ; i < testRunSize ; i++) {
				let retrievedCollection = atlas.getCollection(collectionNames[i]);
				expect(retrievedCollection).to.exist;
				expect(retrievedCollection.collectionName).to.be.equal(collectionNames[i]);
			}
		}
	});

	it ('manages and reports on the number of items contained in the collection');
	it ('manages and reports on the number items contained in sub-collections');
	it ('will return an array of the contents stored in the collection');
	it ('will return an array of the contents stored in a sub-collection');
	it ('returns a collection of items stored on a specific maze node');
	it ( 'returns a collection of items stored on a specific maze node, filtered by sub-collection');
	it ('returns a specific stored on a specific maze node');
	it ('facilitates additions to the item collection by adding the item to a maze node');
	it ('facilitates transfer of items from one maze node to another');
	it ('facilitates transfer of items from one sub-collection to another');
	it ('facilitates forEach callback traversal of every item in the collection');
	it ('facilitates forEach callback traversal of every item in a sub-collection');
	it ('facilitates forEach callback traversal of every item stored in a given maze node');
	it ('facilitates forEach callback traversal of every item stored in a given maze node, filtered by sub-collection');
	it ('facilitates removal of an item from the collection by way of removing the item from its node');
	it ('facilitates the capture of a given item belonging to a given sub-collection');
	it ('reports on whether a given item resides on a given maze node');
});

class ConcreteCollectible implements Collectible {
    constructor(public id: string) {}
}

class OtherCollectible implements Collectible {
    constructor(public id: string) {}
}
