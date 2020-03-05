import {Maze, MazeNode, Collectible, CollectibleList, MazeBuilder} from "../../"
import {MazeContentAtlas} from "../../Contents/MazeContentAtlas";
import {expect} from 'chai';
import 'mocha';
import {IdentificationGenerator} from "cm-domain-utilities";


describe('MazeContentAtlas', () => {

	let mb: MazeBuilder;
	let maze: Maze;

	before(() => {
		mb = new MazeBuilder();
	});

	beforeEach(() => {
		maze = mb.buildMaze();
	});

    it( 'reports on whether a collection with a given name exists within the atlas', async () => {
    	let testPasses = 5;
    	let testMaxRange = 100;

    	for(let testPass = 0 ; testPass < testPasses ; testPass++) {
			let atlas = new MazeContentAtlas(maze);
			let name = IdentificationGenerator.UUID();
			let badName = IdentificationGenerator.UUID();
			atlas.createCollection<ConcreteCollectible>(name);

			expect(atlas.collectionExists(name)).to.be.true;
			expect(atlas.collectionExists(badName)).to.be.false;
		}
	});

    it ('creates, stores and recalls collections', async () => {
		let testPasses = 5;
		let testMaxRange = 100;

		for(let testPass = 0 ; testPass < testPasses ; testPass++) {
			let atlas = new MazeContentAtlas(maze);
			let name = IdentificationGenerator.UUID();
			let testRange = Math.round(Math.random() * testMaxRange) + 1;
			let collection = atlas.createCollection<ConcreteCollectible>(name);

			let items: ConcreteCollectible[] = [];
			for( let i = 0; i < testRange ; i++) {
				let uuid = IdentificationGenerator.UUID();
				let node = maze.getRandomNode();
				items.push(new ConcreteCollectible(uuid));
				collection.addItemToNode(items[i], node);
			}

			let recalledCollection = atlas.getCollection<ConcreteCollectible>(name);
			expect(recalledCollection).to.exist;
			expect(recalledCollection.size).to.be.equal(testRange);
			expect(items.length).to.be.equal(testRange);
			recalledCollection.forEachInCollection((item: ConcreteCollectible) => {
				expect(recalledCollection.isItemInCollection(item.id)).to.be.true;
				items.splice(items.indexOf(item), 1);
			});

			expect(items.length).to.be.equal(0);
		}
	});
});

class ConcreteCollectible implements Collectible {
    constructor (public id: string) {}
    getId(): string { return this.id; }
}
