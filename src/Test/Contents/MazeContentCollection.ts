import {MazeContentAtlas} from "../../Contents/MazeContentAtlas";
import {Maze, MazeNode, Collectible, MazeBuilder} from "../..";
import {MazeContentCollection} from "../../Contents/MazeContentCollection";
import {expect} from 'chai';
import 'mocha';
import {IdentificationGenerator} from "cm-domain-utilities";


describe('MazeContentCollection', () => {

	let mb: MazeBuilder;
	let maze: Maze;
	let atlas: MazeContentAtlas;
	let testPasses = 5;
	let testRunMax = 1000;

	before(() => {
		mb = new MazeBuilder();
	});

	beforeEach(() => {
		maze = mb.buildMaze();
		atlas = new MazeContentAtlas(maze);
	});

	it( 'stores and can report on its own name', () => {
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

	it ('manages and reports on the number of items contained in the collection', () => {

		for (let testPass = 0 ; testPass < testPasses ; testPass++) {
			let collectionName = IdentificationGenerator.UUID();
			let collection = atlas.createCollection<ConcreteCollectible>(collectionName);
			let generatedItemIds: string[] = [];

			let testRunSize = Math.round(Math.random() * testRunMax) + 50;
			for (let i = 0 ; i < testRunSize ; i++) {
				generatedItemIds[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(generatedItemIds[i]), maze.getRandomNode());
			}

			let removeFromTestRun = testRunSize - Math.round(Math.random() * testRunSize);
			for (let i = 0 ; i < removeFromTestRun ; i++) {
				let item = collection.getItemFromCollection(generatedItemIds[i]);
				let node = collection.getItemNode(item);
				collection.removeItemFromNode(item, node);
			}

			expect(atlas.getCollection(collectionName).size).to.be.equal(testRunSize - removeFromTestRun);
		}
	});

	it ('manages and reports on the number items contained in sub-collections', () => {
		for (let testPass = 0 ; testPass < testPasses ; testPass++) {
			let collectionName = IdentificationGenerator.UUID();
			let subCollectionName = IdentificationGenerator.UUID();
			let subCollectionNameBottom = `${subCollectionName}:${IdentificationGenerator.UUID()}`;
			let collection = atlas.createCollection(collectionName);
			let items: ConcreteCollectible[];

			let testRunTop = Math.round(Math.random() * testRunMax) + 50;
			let removeFromTestRunTop = Math.round(Math.random() * testRunTop);
			let testRunMiddle = Math.round(Math.random() * testRunMax + 50);
			let removeFromTestRunMiddle = Math.round(Math.random() * testRunMiddle);
			let testRunBottom = Math.round(Math.random() * testRunMax + 50);
			let removeFromTestRunBottom = Math.round(Math.random() * testRunBottom);

			for (let i = 0 ; i < testRunTop ; i++) {
				collection.addItemToNode(new ConcreteCollectible(IdentificationGenerator.UUID()), maze.getRandomNode());
			}

			for(let i = 0 ; i < testRunMiddle ; i++) {
				collection.addItemToNode(
					new ConcreteCollectible(IdentificationGenerator.UUID()),
					maze.getRandomNode(),
					subCollectionName
				)
			}

			for(let i = 0 ; i < testRunBottom ; i++) {
				collection.addItemToNode(
					new ConcreteCollectible(IdentificationGenerator.UUID()),
					maze.getRandomNode(),
					subCollectionNameBottom
				)
			}

			items = collection.getItemsFromCollection(subCollectionNameBottom);
			expect(items.length).to.be.equal(testRunBottom);
			for( let i = 0 ; i < removeFromTestRunBottom ; i++) {
				let targetNode = collection.getItemNode(items[i]);
				collection.removeItemFromNode(items[i], targetNode);
			}
			expect(collection.getSubCollectionSize(subCollectionNameBottom))
				.to.be.equal(testRunBottom - removeFromTestRunBottom);
			expect(collection.size)
				.to.be.equal(testRunTop + testRunMiddle + testRunBottom - removeFromTestRunBottom);

			items = collection.getItemsFromCollection(subCollectionName, true);
			expect(items.length).to.be.equal(testRunMiddle);
			for( let i = 0 ; i < removeFromTestRunMiddle ; i++) {
				let targetNode = collection.getItemNode(items[i]);
				collection.removeItemFromNode(items[i], targetNode);
			}
			expect(collection.getSubCollectionSize(subCollectionName))
				.to.be.equal(testRunBottom + testRunMiddle - removeFromTestRunBottom - removeFromTestRunMiddle);
			expect(collection.getSubCollectionSize(subCollectionName, true))
				.to.be.equal(testRunMiddle - removeFromTestRunMiddle);
			expect(collection.size)
				.to.be.equal(testRunTop + testRunMiddle + testRunBottom - removeFromTestRunBottom - removeFromTestRunMiddle);

			items = collection.getItemsFromCollection(null, true);
			expect(items.length).to.be.equal(testRunTop);
			for(let i = 0 ; i < removeFromTestRunTop ; i++) {
				let targetNode = collection.getItemNode(items[i]);
				collection.removeItemFromNode(items[i], targetNode);
			}
			expect(collection.getSubCollectionSize(null, true))
				.to.be.equal(testRunTop - removeFromTestRunTop);
			expect(collection.size).to.be.equal(
				testRunTop + testRunMiddle + testRunBottom - removeFromTestRunTop - removeFromTestRunMiddle - removeFromTestRunBottom
			);
		}
	});

	it ('will return an array of the contents stored in the collection', () => {
		for (let testPass = 0 ; testPass < testPasses ; testPass++) {
			let collection = atlas.createCollection(IdentificationGenerator.UUID());
			let testRun = Math.round(Math.random() * testRunMax) + 1;

			let itemIds: string[] = [];

			for (let i = 0 ; i < testRun ; i++ ) {
				itemIds[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(itemIds[i]), maze.getRandomNode());
			}

			expect(collection.size).to.be.equal(testRun);
			expect(itemIds.length).to.be.equal(collection.size);
			let collectionItems = collection.getItemsFromCollection();
			collectionItems.forEach((item: ConcreteCollectible) => {
				itemIds.splice(itemIds.indexOf(item.id), 1);
			});
			expect(itemIds.length).to.be.equal(0);
		}
	});

	it ('will return an array of the contents stored in a sub-collection', () => {
		for(let testPass = 0 ; testPass < testPasses ; testPass++) {
			let testRunTop = Math.round(Math.random() * testRunMax) + 1;
			let testRunMiddle = Math.round( Math.random() * testRunMax) + 1;
			let testRunBottom = Math.round( Math.random() * testRunMax) + 1;

			let collectionName = IdentificationGenerator.UUID();
			let collectionNameMiddle = IdentificationGenerator.UUID();
			let collectionNameBottom = `${collectionNameMiddle}:${IdentificationGenerator.UUID()}`;
			let collection = atlas.createCollection<ConcreteCollectible>(collectionName);

			let topCollectionIds: string[] = [];
			let middleCollectionIds: string[] = [];
			let bottomCollectionIds: string[] = [];

			for (let i = 0 ; i < testRunTop ; i++) {
				topCollectionIds[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(topCollectionIds[i]), maze.getRandomNode());
			}

			for (let i = 0 ; i < testRunMiddle ; i++) {
				middleCollectionIds[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(middleCollectionIds[i]), maze.getRandomNode(), collectionNameMiddle);
			}

			for (let i = 0 ; i < testRunBottom ; i++) {
				bottomCollectionIds[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(bottomCollectionIds[i]), maze.getRandomNode(), collectionNameBottom);
			}

			let bottomItemsCollectionArray = collection.getItemsFromCollection(collectionNameBottom);
			let middleAndBottomItemsCollectionArray = collection.getItemsFromCollection(collectionNameMiddle);
			let middleItemsCollectionArray = collection.getItemsFromCollection(collectionNameMiddle, true);
			let topMiddleAndBottomItemsCollectionArray = collection.getItemsFromCollection();
			let topItemsCollectionArray = collection.getItemsFromCollection(null, true);
			let idsFound : string[] = [];

			bottomItemsCollectionArray.forEach((item: ConcreteCollectible) => {
				expect(bottomCollectionIds.indexOf(item.id)).to.not.be.equal(-1);
				expect(idsFound.indexOf(item.id)).to.be.equal(-1);
				idsFound.push(item.id);
			});
			expect(idsFound.length).to.be.equal(testRunBottom);

			idsFound = [];
			middleAndBottomItemsCollectionArray.forEach((item:ConcreteCollectible) => {
				expect((bottomCollectionIds.indexOf(item.id) !== -1 ||
					middleCollectionIds.indexOf(item.id) !== -1)).to.be.true;
				expect(idsFound.indexOf(item.id)).to.be.equal(-1);
				idsFound.push(item.id);
			});
			expect(idsFound.length).to.be.equal(testRunBottom + testRunMiddle);

			idsFound = [];
			topMiddleAndBottomItemsCollectionArray.forEach((item: ConcreteCollectible) => {
				expect((
					bottomCollectionIds.indexOf(item.id) !== -1 ||
					middleCollectionIds.indexOf(item.id) !== -1 ||
					topCollectionIds.indexOf(item.id) !== -1
				)).to.be.true;
				expect(idsFound.indexOf(item.id)).to.be.equal(-1);
				idsFound.push(item.id);
			});
			expect(idsFound.length).to.be.equal(testRunTop + testRunMiddle + testRunBottom);

			idsFound = [];
			middleItemsCollectionArray.forEach((item: ConcreteCollectible) => {
				expect(middleCollectionIds.indexOf(item.id)).to.not.be.equal(-1);
				expect(idsFound.indexOf(item.id)).to.be.equal(-1);
				idsFound.push(item.id);
			});
			expect(idsFound.length).to.be.equal(testRunMiddle);

			idsFound = [];
			topItemsCollectionArray.forEach((item: ConcreteCollectible) => {
				expect(topCollectionIds.indexOf(item.id)).to.not.be.equal(-1);
				expect(idsFound.indexOf(item.id)).to.be.equal(-1);
				idsFound.push(item.id);
			});
			expect(idsFound.length).to.be.equal(testRunTop);
		}
	});

	it ('returns a collection of items stored on a specific maze node', () => {
		for (let testPass = 0 ; testPass < testPasses ; testPass++){
			let testRun = Math.round(Math.random() * testRunMax) + 1;
			let targetNode = maze.getRandomNode();
			let otherNode = maze.getRandomNode();
			let itemIdsTarget: string[] = [];
			let itemIdsOther: string[] = [];
			let collection = atlas.createCollection(IdentificationGenerator.UUID());

			while (targetNode.id === otherNode.id) {
				otherNode = maze.getRandomNode();
			}

			for (let i = 0 ; i < testRun ; i++) {
				itemIdsTarget[i] = IdentificationGenerator.UUID();
				itemIdsOther[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(itemIdsTarget[i]), targetNode);
				collection.addItemToNode(new ConcreteCollectible(itemIdsOther[i]), otherNode);
			}

			let idsChecked: string[] = [];
			collection.getItemsFromNode(targetNode).forEach((item: ConcreteCollectible) => {
				expect(idsChecked.indexOf(item.id)).to.be.equal(-1);
				expect(itemIdsTarget.indexOf(item.id)).to.not.be.equal(-1);
				idsChecked.push(item.id);
			});
		}
	});

	it ('returns a collection of items stored on a specific maze node, filtered by sub-collection', () => {
		for(let testPass = 0 ; testPass < 2 ; testPass++) {
			let topCollectionName = IdentificationGenerator.UUID();
			let middleCollectionName = IdentificationGenerator.UUID();
			let bottomCollectionName = `${middleCollectionName}:${IdentificationGenerator.UUID()}`;
			let runSize = Math.round(Math.random() * testRunMax) + 1;

			let topIdsTarget: string[] = [];
			let middleIdsTarget: string[] = [];
			let bottomIdsTarget: string[] = [];

			let collection = atlas.createCollection<ConcreteCollectible>(topCollectionName);

			let targetNode = maze.getRandomNode();
			let otherNode = maze.getRandomNode();

			while (targetNode.id == otherNode.id) {
				otherNode = maze.getRandomNode();
			}

			for( let i = 0 ; i < runSize ; i++ ) {
				topIdsTarget[i] = IdentificationGenerator.UUID();
				middleIdsTarget[i] = IdentificationGenerator.UUID();
				bottomIdsTarget[i] = IdentificationGenerator.UUID();

				collection.addItemToNode(new ConcreteCollectible(topIdsTarget[i]), targetNode);
				collection.addItemToNode(new ConcreteCollectible(IdentificationGenerator.UUID()), otherNode);
				collection.addItemToNode(new ConcreteCollectible(middleIdsTarget[i]), targetNode, middleCollectionName);
				collection.addItemToNode(new ConcreteCollectible(IdentificationGenerator.UUID()), otherNode, middleCollectionName);
				collection.addItemToNode(new ConcreteCollectible(bottomIdsTarget[i]), targetNode, bottomCollectionName);
				collection.addItemToNode(new ConcreteCollectible(IdentificationGenerator.UUID()), otherNode, bottomCollectionName);
			}

			let checkedIds = [];
			collection.getItemsFromNode(targetNode).forEach((item: ConcreteCollectible) => {
				expect((
					topIdsTarget.indexOf(item.id) !== -1 ||
					middleIdsTarget.indexOf(item.id) !== -1 ||
					bottomIdsTarget.indexOf(item.id) !== -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			});
			expect(checkedIds.length).to.be.equal(runSize * 3);

			checkedIds = [];
			collection.getItemsFromNode(targetNode, null, true).forEach((item: ConcreteCollectible) => {
				expect(topIdsTarget.indexOf(item.id)).to.not.be.equal(-1);
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			});
			expect(checkedIds.length).to.be.equal(runSize);

			checkedIds = [];
			collection.getItemsFromNode(targetNode, middleCollectionName).forEach((item: ConcreteCollectible) => {
				expect((
					middleIdsTarget.indexOf(item.id) !== -1 ||
					bottomIdsTarget.indexOf(item.id) !== -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			});
			expect(checkedIds.length).to.be.equal(runSize * 2);

			checkedIds = [];
			collection.getItemsFromNode(targetNode, middleCollectionName, true).forEach((item: ConcreteCollectible) => {
				expect(middleIdsTarget.indexOf(item.id)).to.not.be.equal(-1);
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			});
			expect(checkedIds.length).to.be.equal(runSize);

			checkedIds = [];
			collection.getItemsFromNode(targetNode, bottomCollectionName).forEach((item: ConcreteCollectible) => {
				expect(bottomIdsTarget.indexOf(item.id)).to.not.be.equal(-1);
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			});
		}
	});

	it ('returns a specific item stored on a specific maze node', () => {
		for(let testPass = 0 ; testPass < testPasses ; testPass++) {
			let testRun = Math.round(Math.random() * testRunMax) + 1;
			let itemsAtNodes = new Map<ConcreteCollectible, MazeNode>();
			let collection = atlas.createCollection<ConcreteCollectible>(IdentificationGenerator.UUID());
			for (let i = 0 ; i < testRun ; i++) {
				let item = new ConcreteCollectible(IdentificationGenerator.UUID());
				let node = maze.getRandomNode();
				collection.addItemToNode(item, node);
				itemsAtNodes.set(item, node);
			}

			let foundIds: string[] = [];
			itemsAtNodes.forEach((testNode: MazeNode, testItem: ConcreteCollectible) => {
				let foundItem = collection.getItemFromNode(testItem.id, testNode);
				expect(foundItem).to.exist;
				expect(foundIds.indexOf(foundItem.id)).to.be.equal(-1);
				expect(foundItem.id).to.be.equal(testItem.id);
				foundIds.push(foundItem.id);
			});

			expect(collection.getItemFromNode(IdentificationGenerator.UUID(), maze.getRandomNode())).to.be.null;
		}
	});

	it ('facilitates transfer of items from one maze node to another', () => {
		for (let testPass = 0 ; testPass < testPasses ; testPass++) {
			let collection = atlas.createCollection<ConcreteCollectible>(IdentificationGenerator.UUID());
			let testItemMap = new Map<ConcreteCollectible, MazeNode>();
			let testRun = Math.round(Math.random() * testRunMax) + 1;
			let startingNode = maze.getRandomNode();
			for(let i = 0 ; i < testRun ; i++) {
				let item = new ConcreteCollectible(IdentificationGenerator.UUID());
				collection.addItemToNode(item, startingNode);
			}
			collection.forEachInCollection((item: ConcreteCollectible) => {
				let moveToNode = maze.getRandomNode();

				while(moveToNode.id === startingNode.id) { moveToNode = maze.getRandomNode(); }

				testItemMap.set(item, moveToNode);
				collection.moveItemToNode(item, moveToNode);
			});

			collection.forEachInCollection((item: ConcreteCollectible) => {
				let residentNode = collection.getItemNode(item);
				expect(residentNode.id).to.be.equal(testItemMap.get(item).id);
				expect(residentNode.id).to.not.be.equal(startingNode.id);
				expect(collection.getItemFromNode(item.id, residentNode)).to.exist;
			});
		}
	});

	it ('facilitates transfer of items from one sub-collection to another', () => {
		for (let testPass = 0 ; testPass < testPasses ; testPass++) {
			let collection = atlas.createCollection<ConcreteCollectible>(IdentificationGenerator.UUID());
			let subCollectionNameA = IdentificationGenerator.UUID();
			let subCollectionNameB = IdentificationGenerator.UUID();
			let subCollectionNameB2 = `${subCollectionNameB}:${IdentificationGenerator.UUID()}`;
			let testRun = Math.round(Math.random() * testRunMax) + 1;

			// Divvy up items between master collection ownership and sub collection A
			for (let i = 0 ; i < testRun ; i++) {
				if (i % 2 === 0) {
					collection.addItemToNode(new ConcreteCollectible(IdentificationGenerator.UUID()), maze.getRandomNode());
				} else {
					collection.addItemToNode(new ConcreteCollectible(IdentificationGenerator.UUID()), maze.getRandomNode(), subCollectionNameA);
				}
			}
			expect(collection.size).to.be.equal(testRun);
			expect(collection.getSubCollectionSize(subCollectionNameA)).to.be.equal(Math.floor(testRun / 2));

			// Move master collection items to subcollectionNameB, move SubcollectionA members to subCollectionB2
			let itemsFromMasterCollection = collection.getItemsFromCollection(null, true);
			let itemsFromSubCollection = collection.getItemsFromCollection(subCollectionNameA);

			for(let i = 0 ; i < itemsFromMasterCollection.length ; i++) {
				collection.moveItemToSubCollection(itemsFromMasterCollection[i], subCollectionNameB);
			}

			for (let i = 0 ; i < itemsFromSubCollection.length ; i++) {
				collection.moveItemToSubCollection(itemsFromSubCollection[i], subCollectionNameB2);
			}

			let itemIds: string[] = [];
			collection.forEachInCollection((item: ConcreteCollectible) => {
				expect(itemIds.indexOf(item.id)).to.be.equal(-1);
				expect((
					itemsFromMasterCollection.indexOf(item) !== -1 ||
					itemsFromSubCollection.indexOf(item) !== -1
				)).to.be.true;
				itemIds.push(item.id);
			}, subCollectionNameB);
			expect(itemIds.length).to.be.equal(itemsFromMasterCollection.length + itemsFromSubCollection.length);
			expect(itemIds.length).to.be.equal(testRun);

			itemIds = [];
			collection.forEachInCollection((item: ConcreteCollectible) => {
				expect(itemIds.indexOf(item.id)).to.be.equal(-1);
				expect(itemsFromMasterCollection.indexOf(item)).to.not.be.equal(-1);
				itemIds.push(item.id);
			}, subCollectionNameB, true);
			expect(itemIds.length).to.be.equal(itemsFromMasterCollection.length);

			itemIds = [];
			collection.forEachInCollection((item: ConcreteCollectible) => {
				expect(itemIds.indexOf(item.id)).to.be.equal(-1);
				expect(itemsFromSubCollection.indexOf(item)).to.not.be.equal(-1);
				itemIds.push(item.id);
			}, subCollectionNameB2);
			expect(itemIds.length).to.be.equal(itemsFromSubCollection.length);
		}
	});

	it ('facilitates forEach callback traversal of every item in the collection or sub-collection', () => {
		for (let testPass = 0 ; testPass < testPasses ; testPass++) {
			let topRun = Math.round(Math.random() * testRunMax) + 1;
			let midRun = Math.round(Math.random() * testRunMax) + 1;
			let bottomRun = Math.round(Math.random() * testRunMax) + 1;
			let topCollectionName = IdentificationGenerator.UUID();
			let midCollectionName = IdentificationGenerator.UUID();
			let bottomCollectionName = `${midCollectionName}:${IdentificationGenerator.UUID()}`;
			let collection = atlas.createCollection(topCollectionName);
			let topIds: string[] = [];
			let midIds: string[] = [];
			let bottomIds: string[] = [];
			let checkedIds: string[] = [];

			for(let i = 0 ; i < topRun ; i++) {
				topIds[i] = IdentificationGenerator.UUID();

				// Both of the below should do the same thing.
				if (i % 2 === 0) {
					collection.addItemToNode(new ConcreteCollectible(topIds[i]), maze.getRandomNode());
				} else {
					collection.addItemToNode(new ConcreteCollectible(topIds[i]), maze.getRandomNode(), topCollectionName);
				}
			}

			for(let i = 0 ; i < midRun ; i++) {
				midIds[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(midIds[i]), maze.getRandomNode(), midCollectionName);
			}

			for(let i = 0 ; i < bottomRun ; i++) {
				bottomIds[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(bottomIds[i]), maze.getRandomNode(), bottomCollectionName);
			}

			checkedIds = [];
			collection.forEachInCollection((item) => {
				expect((
					topIds.indexOf(item.id) !== -1 ||
					midIds.indexOf(item.id) !== -1 ||
					bottomIds.indexOf(item.id) !== -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			});
			expect(checkedIds.length).to.be.equal(topRun + midRun + bottomRun);

			checkedIds = [];
			collection.forEachInCollection((item) => {
				expect((
					midIds.indexOf(item.id) !== -1 ||
					bottomIds.indexOf(item.id) !== -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				expect(topIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			}, midCollectionName)
			expect(checkedIds.length).to.be.equal(midRun + bottomRun);

			checkedIds = [];
			collection.forEachInCollection((item) => {
				expect(topIds.indexOf(item.id)).to.not.be.equal(-1);
				expect((
					midIds.indexOf(item.id) === -1 &&
					bottomIds.indexOf(item.id) === -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			}, topCollectionName, true);
			expect(checkedIds.length).to.be.equal(topRun);

			checkedIds = [];
			collection.forEachInCollection((item) => {
				expect(midIds.indexOf(item.id)).to.not.be.equal(-1);
				expect((
					topIds.indexOf(item.id) === -1 &&
					bottomIds.indexOf(item.id) === -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			}, midCollectionName, true);
			expect(checkedIds.length).to.be.equal(midRun);

			checkedIds = [];
			collection.forEachInCollection((item) => {
				expect(bottomIds.indexOf(item.id)).to.not.be.equal(-1);
				expect((
					topIds.indexOf(item.id) === -1 &&
					midIds.indexOf(item.id) === -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			}, bottomCollectionName)
			expect(checkedIds.length).to.be.equal(bottomRun);
		}
	});

	it ('facilitates forEach callback traversal of every item stored in a given maze node, filterable by sub-collection', () => {
		for (let testPass = 0 ; testPass < testPasses ; testPass++) {
			let topRun = Math.round(Math.random() * testRunMax) + 1;
			let midRun = Math.round(Math.random() * testRunMax) + 1;
			let bottomRun = Math.round(Math.random() * testRunMax) + 1;
			let topCollectionName = IdentificationGenerator.UUID();
			let midCollectionName = IdentificationGenerator.UUID();
			let bottomCollectionName = `${midCollectionName}:${IdentificationGenerator.UUID()}`;
			let collection = atlas.createCollection(topCollectionName);
			let topIds: string[] = [];
			let midIds: string[] = [];
			let bottomIds: string[] = [];
			let checkedIds: string[] = [];
			let commonNode = maze.getRandomNode();

			for(let i = 0 ; i < topRun ; i++) {
				topIds[i] = IdentificationGenerator.UUID();

				// Both of the below should do the same thing.
				if (i % 2 === 0) {
					collection.addItemToNode(new ConcreteCollectible(topIds[i]), commonNode);
				} else {
					collection.addItemToNode(new ConcreteCollectible(topIds[i]), commonNode, topCollectionName);
				}
			}

			for(let i = 0 ; i < midRun ; i++) {
				midIds[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(midIds[i]), commonNode, midCollectionName);
			}

			for(let i = 0 ; i < bottomRun ; i++) {
				bottomIds[i] = IdentificationGenerator.UUID();
				collection.addItemToNode(new ConcreteCollectible(bottomIds[i]), commonNode, bottomCollectionName);
			}

			checkedIds = [];
			collection.forEachAtNode(commonNode, (item) => {
				expect((
					topIds.indexOf(item.id) !== -1 ||
					midIds.indexOf(item.id) !== -1 ||
					bottomIds.indexOf(item.id) !== -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			});
			expect(checkedIds.length).to.be.equal(topRun + midRun + bottomRun);

			checkedIds = [];
			collection.forEachAtNode(commonNode, (item) => {
				expect((
					midIds.indexOf(item.id) !== -1 ||
					bottomIds.indexOf(item.id) !== -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				expect(topIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			}, midCollectionName)
			expect(checkedIds.length).to.be.equal(midRun + bottomRun);

			checkedIds = [];
			collection.forEachAtNode(commonNode, (item) => {
				expect(topIds.indexOf(item.id)).to.not.be.equal(-1);
				expect((
					midIds.indexOf(item.id) === -1 &&
					bottomIds.indexOf(item.id) === -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			}, topCollectionName, true);
			expect(checkedIds.length).to.be.equal(topRun);

			checkedIds = [];
			collection.forEachAtNode(commonNode, (item) => {
				expect(midIds.indexOf(item.id)).to.not.be.equal(-1);
				expect((
					topIds.indexOf(item.id) === -1 &&
					bottomIds.indexOf(item.id) === -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			}, midCollectionName, true);
			expect(checkedIds.length).to.be.equal(midRun);

			checkedIds = [];
			collection.forEachAtNode(commonNode, (item) => {
				expect(bottomIds.indexOf(item.id)).to.not.be.equal(-1);
				expect((
					topIds.indexOf(item.id) === -1 &&
					midIds.indexOf(item.id) === -1
				)).to.be.true;
				expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
				checkedIds.push(item.id);
			}, bottomCollectionName)
			expect(checkedIds.length).to.be.equal(bottomRun);
		}
	});

	it ('facilitates the addition or removal of an item from a given maze node', () => {
		for(let testPass = 0 ; testPass < testPasses ; testPass++) {
			let collection = atlas.createCollection(IdentificationGenerator.UUID());
			let targetNode = maze.getRandomNode();
			let itemId = IdentificationGenerator.UUID();
			let item = 	new ConcreteCollectible(itemId);
			let collectionSize = Math.ceil(Math.random() * testRunMax) + 2;

			for(let i = 0 ; i < Math.floor(collectionSize / 2) ; i++) {
				collection.addItemToNode(new ConcreteCollectible(IdentificationGenerator.UUID()), targetNode);
			}

			collection.addItemToNode(item, targetNode);

			for(let i = Math.ceil(collectionSize / 2) ; i < collectionSize ; i ++) {
				collection.addItemToNode(new ConcreteCollectible(IdentificationGenerator.UUID()), targetNode);
			}

			expect(collection.getItemFromNode(item.id, targetNode)).to.be.equal(item);
			collection.removeItemFromNode(item, targetNode);
			expect(collection.getItemFromNode(item.id, targetNode)).to.be.null;
		}
	});

	it ('reports on whether a given item resides on a given maze node');
	it ('reports on the current node that a given item is occupying');
	it ('can handle hierarchical ancestors of the defined collection class within sub-collections');
	it ('will handle subcollections queries that include or omit the base collection name in the request');
	it ('will remove items from the collection while removing the item registration from its current node simultaneously');
});

class ConcreteCollectible implements Collectible {
    constructor(public id: string) {}
}

class OtherCollectible implements Collectible {
    constructor(public id: string) {}
}
