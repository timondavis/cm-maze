"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MazeContentAtlas_1 = require("../../Contents/MazeContentAtlas");
const __1 = require("../..");
const chai_1 = require("chai");
require("mocha");
const cm_domain_utilities_1 = require("cm-domain-utilities");
describe('MazeContentCollection', () => {
    let mb;
    let maze;
    let atlas;
    let testPasses = 5;
    let testRunMax = 1000;
    before(() => {
        mb = new __1.MazeBuilder();
    });
    beforeEach(() => {
        maze = mb.buildMaze();
        atlas = new MazeContentAtlas_1.MazeContentAtlas(maze);
    });
    it('stores and can report on its own name', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let testRunSize = Math.round(Math.random() * testRunMax) + 1;
            let collectionNames = [];
            for (let i = 0; i < testRunSize; i++) {
                collectionNames[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                atlas.createCollection(collectionNames[i]);
            }
            for (let i = 0; i < testRunSize; i++) {
                let retrievedCollection = atlas.getCollection(collectionNames[i]);
                chai_1.expect(retrievedCollection).to.exist;
                chai_1.expect(retrievedCollection.collectionName).to.be.equal(collectionNames[i]);
            }
        }
    });
    it('manages and reports on the number of items contained in the collection', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let collectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let collection = atlas.createCollection(collectionName);
            let generatedItemIds = [];
            let testRunSize = Math.round(Math.random() * testRunMax) + 50;
            for (let i = 0; i < testRunSize; i++) {
                generatedItemIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(generatedItemIds[i]), maze.getRandomNode());
            }
            let removeFromTestRun = testRunSize - Math.round(Math.random() * testRunSize);
            for (let i = 0; i < removeFromTestRun; i++) {
                let item = collection.getItemFromCollection(generatedItemIds[i]);
                let node = collection.getItemNode(item);
                collection.removeItemFromNode(item, node);
            }
            chai_1.expect(atlas.getCollection(collectionName).size).to.be.equal(testRunSize - removeFromTestRun);
        }
    });
    it('manages and reports on the number items contained in sub-collections', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let collectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let subCollectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let subCollectionNameBottom = `${subCollectionName}:${cm_domain_utilities_1.IdentificationGenerator.UUID()}`;
            let collection = atlas.createCollection(collectionName);
            let items;
            let testRunTop = Math.round(Math.random() * testRunMax) + 50;
            let removeFromTestRunTop = Math.round(Math.random() * testRunTop);
            let testRunMiddle = Math.round(Math.random() * testRunMax + 50);
            let removeFromTestRunMiddle = Math.round(Math.random() * testRunMiddle);
            let testRunBottom = Math.round(Math.random() * testRunMax + 50);
            let removeFromTestRunBottom = Math.round(Math.random() * testRunBottom);
            for (let i = 0; i < testRunTop; i++) {
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), maze.getRandomNode());
            }
            for (let i = 0; i < testRunMiddle; i++) {
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), maze.getRandomNode(), subCollectionName);
            }
            for (let i = 0; i < testRunBottom; i++) {
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), maze.getRandomNode(), subCollectionNameBottom);
            }
            items = collection.getItemsFromCollection(subCollectionNameBottom);
            chai_1.expect(items.length).to.be.equal(testRunBottom);
            for (let i = 0; i < removeFromTestRunBottom; i++) {
                let targetNode = collection.getItemNode(items[i]);
                collection.removeItemFromNode(items[i], targetNode);
            }
            chai_1.expect(collection.getSubCollectionSize(subCollectionNameBottom))
                .to.be.equal(testRunBottom - removeFromTestRunBottom);
            chai_1.expect(collection.size)
                .to.be.equal(testRunTop + testRunMiddle + testRunBottom - removeFromTestRunBottom);
            items = collection.getItemsFromCollection(subCollectionName, true);
            chai_1.expect(items.length).to.be.equal(testRunMiddle);
            for (let i = 0; i < removeFromTestRunMiddle; i++) {
                let targetNode = collection.getItemNode(items[i]);
                collection.removeItemFromNode(items[i], targetNode);
            }
            chai_1.expect(collection.getSubCollectionSize(subCollectionName))
                .to.be.equal(testRunBottom + testRunMiddle - removeFromTestRunBottom - removeFromTestRunMiddle);
            chai_1.expect(collection.getSubCollectionSize(subCollectionName, true))
                .to.be.equal(testRunMiddle - removeFromTestRunMiddle);
            chai_1.expect(collection.size)
                .to.be.equal(testRunTop + testRunMiddle + testRunBottom - removeFromTestRunBottom - removeFromTestRunMiddle);
            items = collection.getItemsFromCollection(null, true);
            chai_1.expect(items.length).to.be.equal(testRunTop);
            for (let i = 0; i < removeFromTestRunTop; i++) {
                let targetNode = collection.getItemNode(items[i]);
                collection.removeItemFromNode(items[i], targetNode);
            }
            chai_1.expect(collection.getSubCollectionSize(null, true))
                .to.be.equal(testRunTop - removeFromTestRunTop);
            chai_1.expect(collection.size).to.be.equal(testRunTop + testRunMiddle + testRunBottom - removeFromTestRunTop - removeFromTestRunMiddle - removeFromTestRunBottom);
        }
    });
    it('will return an array of the contents stored in the collection', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let collection = atlas.createCollection(cm_domain_utilities_1.IdentificationGenerator.UUID());
            let testRun = Math.round(Math.random() * testRunMax) + 1;
            let itemIds = [];
            for (let i = 0; i < testRun; i++) {
                itemIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(itemIds[i]), maze.getRandomNode());
            }
            chai_1.expect(collection.size).to.be.equal(testRun);
            chai_1.expect(itemIds.length).to.be.equal(collection.size);
            let collectionItems = collection.getItemsFromCollection();
            collectionItems.forEach((item) => {
                itemIds.splice(itemIds.indexOf(item.id), 1);
            });
            chai_1.expect(itemIds.length).to.be.equal(0);
        }
    });
    it('will return an array of the contents stored in a sub-collection', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let testRunTop = Math.round(Math.random() * testRunMax) + 1;
            let testRunMiddle = Math.round(Math.random() * testRunMax) + 1;
            let testRunBottom = Math.round(Math.random() * testRunMax) + 1;
            let collectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let collectionNameMiddle = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let collectionNameBottom = `${collectionNameMiddle}:${cm_domain_utilities_1.IdentificationGenerator.UUID()}`;
            let collection = atlas.createCollection(collectionName);
            let topCollectionIds = [];
            let middleCollectionIds = [];
            let bottomCollectionIds = [];
            for (let i = 0; i < testRunTop; i++) {
                topCollectionIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(topCollectionIds[i]), maze.getRandomNode());
            }
            for (let i = 0; i < testRunMiddle; i++) {
                middleCollectionIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(middleCollectionIds[i]), maze.getRandomNode(), collectionNameMiddle);
            }
            for (let i = 0; i < testRunBottom; i++) {
                bottomCollectionIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(bottomCollectionIds[i]), maze.getRandomNode(), collectionNameBottom);
            }
            let bottomItemsCollectionArray = collection.getItemsFromCollection(collectionNameBottom);
            let middleAndBottomItemsCollectionArray = collection.getItemsFromCollection(collectionNameMiddle);
            let middleItemsCollectionArray = collection.getItemsFromCollection(collectionNameMiddle, true);
            let topMiddleAndBottomItemsCollectionArray = collection.getItemsFromCollection();
            let topItemsCollectionArray = collection.getItemsFromCollection(null, true);
            let idsFound = [];
            bottomItemsCollectionArray.forEach((item) => {
                chai_1.expect(bottomCollectionIds.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect(idsFound.indexOf(item.id)).to.be.equal(-1);
                idsFound.push(item.id);
            });
            chai_1.expect(idsFound.length).to.be.equal(testRunBottom);
            idsFound = [];
            middleAndBottomItemsCollectionArray.forEach((item) => {
                chai_1.expect((bottomCollectionIds.indexOf(item.id) !== -1 ||
                    middleCollectionIds.indexOf(item.id) !== -1)).to.be.true;
                chai_1.expect(idsFound.indexOf(item.id)).to.be.equal(-1);
                idsFound.push(item.id);
            });
            chai_1.expect(idsFound.length).to.be.equal(testRunBottom + testRunMiddle);
            idsFound = [];
            topMiddleAndBottomItemsCollectionArray.forEach((item) => {
                chai_1.expect((bottomCollectionIds.indexOf(item.id) !== -1 ||
                    middleCollectionIds.indexOf(item.id) !== -1 ||
                    topCollectionIds.indexOf(item.id) !== -1)).to.be.true;
                chai_1.expect(idsFound.indexOf(item.id)).to.be.equal(-1);
                idsFound.push(item.id);
            });
            chai_1.expect(idsFound.length).to.be.equal(testRunTop + testRunMiddle + testRunBottom);
            idsFound = [];
            middleItemsCollectionArray.forEach((item) => {
                chai_1.expect(middleCollectionIds.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect(idsFound.indexOf(item.id)).to.be.equal(-1);
                idsFound.push(item.id);
            });
            chai_1.expect(idsFound.length).to.be.equal(testRunMiddle);
            idsFound = [];
            topItemsCollectionArray.forEach((item) => {
                chai_1.expect(topCollectionIds.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect(idsFound.indexOf(item.id)).to.be.equal(-1);
                idsFound.push(item.id);
            });
            chai_1.expect(idsFound.length).to.be.equal(testRunTop);
        }
    });
    it('returns a collection of items stored on a specific maze node', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let testRun = Math.round(Math.random() * testRunMax) + 1;
            let targetNode = maze.getRandomNode();
            let otherNode = maze.getRandomNode();
            let itemIdsTarget = [];
            let itemIdsOther = [];
            let collection = atlas.createCollection(cm_domain_utilities_1.IdentificationGenerator.UUID());
            while (targetNode.id === otherNode.id) {
                otherNode = maze.getRandomNode();
            }
            for (let i = 0; i < testRun; i++) {
                itemIdsTarget[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                itemIdsOther[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(itemIdsTarget[i]), targetNode);
                collection.addItemToNode(new ConcreteCollectible(itemIdsOther[i]), otherNode);
            }
            let idsChecked = [];
            collection.getItemsFromNode(targetNode).forEach((item) => {
                chai_1.expect(idsChecked.indexOf(item.id)).to.be.equal(-1);
                chai_1.expect(itemIdsTarget.indexOf(item.id)).to.not.be.equal(-1);
                idsChecked.push(item.id);
            });
        }
    });
    it('returns a collection of items stored on a specific maze node, filtered by sub-collection', () => {
        for (let testPass = 0; testPass < 2; testPass++) {
            let topCollectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let middleCollectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let bottomCollectionName = `${middleCollectionName}:${cm_domain_utilities_1.IdentificationGenerator.UUID()}`;
            let runSize = Math.round(Math.random() * testRunMax) + 1;
            let topIdsTarget = [];
            let middleIdsTarget = [];
            let bottomIdsTarget = [];
            let collection = atlas.createCollection(topCollectionName);
            let targetNode = maze.getRandomNode();
            let otherNode = maze.getRandomNode();
            while (targetNode.id == otherNode.id) {
                otherNode = maze.getRandomNode();
            }
            for (let i = 0; i < runSize; i++) {
                topIdsTarget[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                middleIdsTarget[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                bottomIdsTarget[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(topIdsTarget[i]), targetNode);
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), otherNode);
                collection.addItemToNode(new ConcreteCollectible(middleIdsTarget[i]), targetNode, middleCollectionName);
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), otherNode, middleCollectionName);
                collection.addItemToNode(new ConcreteCollectible(bottomIdsTarget[i]), targetNode, bottomCollectionName);
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), otherNode, bottomCollectionName);
            }
            let checkedIds = [];
            collection.getItemsFromNode(targetNode).forEach((item) => {
                chai_1.expect((topIdsTarget.indexOf(item.id) !== -1 ||
                    middleIdsTarget.indexOf(item.id) !== -1 ||
                    bottomIdsTarget.indexOf(item.id) !== -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            });
            chai_1.expect(checkedIds.length).to.be.equal(runSize * 3);
            checkedIds = [];
            collection.getItemsFromNode(targetNode, null, true).forEach((item) => {
                chai_1.expect(topIdsTarget.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            });
            chai_1.expect(checkedIds.length).to.be.equal(runSize);
            checkedIds = [];
            collection.getItemsFromNode(targetNode, middleCollectionName).forEach((item) => {
                chai_1.expect((middleIdsTarget.indexOf(item.id) !== -1 ||
                    bottomIdsTarget.indexOf(item.id) !== -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            });
            chai_1.expect(checkedIds.length).to.be.equal(runSize * 2);
            checkedIds = [];
            collection.getItemsFromNode(targetNode, middleCollectionName, true).forEach((item) => {
                chai_1.expect(middleIdsTarget.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            });
            chai_1.expect(checkedIds.length).to.be.equal(runSize);
            checkedIds = [];
            collection.getItemsFromNode(targetNode, bottomCollectionName).forEach((item) => {
                chai_1.expect(bottomIdsTarget.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            });
        }
    });
    it('returns a specific item stored on a specific maze node', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let testRun = Math.round(Math.random() * testRunMax) + 1;
            let itemsAtNodes = new Map();
            let collection = atlas.createCollection(cm_domain_utilities_1.IdentificationGenerator.UUID());
            for (let i = 0; i < testRun; i++) {
                let item = new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID());
                let node = maze.getRandomNode();
                collection.addItemToNode(item, node);
                itemsAtNodes.set(item, node);
            }
            let foundIds = [];
            itemsAtNodes.forEach((testNode, testItem) => {
                let foundItem = collection.getItemFromNode(testItem.id, testNode);
                chai_1.expect(foundItem).to.exist;
                chai_1.expect(foundIds.indexOf(foundItem.id)).to.be.equal(-1);
                chai_1.expect(foundItem.id).to.be.equal(testItem.id);
                foundIds.push(foundItem.id);
            });
            chai_1.expect(collection.getItemFromNode(cm_domain_utilities_1.IdentificationGenerator.UUID(), maze.getRandomNode())).to.be.null;
        }
    });
    it('facilitates transfer of items from one maze node to another', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let collection = atlas.createCollection(cm_domain_utilities_1.IdentificationGenerator.UUID());
            let testItemMap = new Map();
            let testRun = Math.round(Math.random() * testRunMax) + 1;
            let startingNode = maze.getRandomNode();
            for (let i = 0; i < testRun; i++) {
                let item = new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID());
                collection.addItemToNode(item, startingNode);
            }
            collection.forEachInCollection((item) => {
                let moveToNode = maze.getRandomNode();
                while (moveToNode.id === startingNode.id) {
                    moveToNode = maze.getRandomNode();
                }
                testItemMap.set(item, moveToNode);
                collection.moveItemToNode(item, moveToNode);
            });
            collection.forEachInCollection((item) => {
                let residentNode = collection.getItemNode(item);
                chai_1.expect(residentNode.id).to.be.equal(testItemMap.get(item).id);
                chai_1.expect(residentNode.id).to.not.be.equal(startingNode.id);
                chai_1.expect(collection.getItemFromNode(item.id, residentNode)).to.exist;
            });
        }
    });
    it('facilitates transfer of items from one sub-collection to another', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let collection = atlas.createCollection(cm_domain_utilities_1.IdentificationGenerator.UUID());
            let subCollectionNameA = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let subCollectionNameB = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let subCollectionNameB2 = `${subCollectionNameB}:${cm_domain_utilities_1.IdentificationGenerator.UUID()}`;
            let testRun = Math.round(Math.random() * testRunMax) + 1;
            // Divvy up items between master collection ownership and sub collection A
            for (let i = 0; i < testRun; i++) {
                if (i % 2 === 0) {
                    collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), maze.getRandomNode());
                }
                else {
                    collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), maze.getRandomNode(), subCollectionNameA);
                }
            }
            chai_1.expect(collection.size).to.be.equal(testRun);
            chai_1.expect(collection.getSubCollectionSize(subCollectionNameA)).to.be.equal(Math.floor(testRun / 2));
            // Move master collection items to subcollectionNameB, move SubcollectionA members to subCollectionB2
            let itemsFromMasterCollection = collection.getItemsFromCollection(null, true);
            let itemsFromSubCollection = collection.getItemsFromCollection(subCollectionNameA);
            for (let i = 0; i < itemsFromMasterCollection.length; i++) {
                collection.moveItemToSubCollection(itemsFromMasterCollection[i], subCollectionNameB);
            }
            for (let i = 0; i < itemsFromSubCollection.length; i++) {
                collection.moveItemToSubCollection(itemsFromSubCollection[i], subCollectionNameB2);
            }
            let itemIds = [];
            collection.forEachInCollection((item) => {
                chai_1.expect(itemIds.indexOf(item.id)).to.be.equal(-1);
                chai_1.expect((itemsFromMasterCollection.indexOf(item) !== -1 ||
                    itemsFromSubCollection.indexOf(item) !== -1)).to.be.true;
                itemIds.push(item.id);
            }, subCollectionNameB);
            chai_1.expect(itemIds.length).to.be.equal(itemsFromMasterCollection.length + itemsFromSubCollection.length);
            chai_1.expect(itemIds.length).to.be.equal(testRun);
            itemIds = [];
            collection.forEachInCollection((item) => {
                chai_1.expect(itemIds.indexOf(item.id)).to.be.equal(-1);
                chai_1.expect(itemsFromMasterCollection.indexOf(item)).to.not.be.equal(-1);
                itemIds.push(item.id);
            }, subCollectionNameB, true);
            chai_1.expect(itemIds.length).to.be.equal(itemsFromMasterCollection.length);
            itemIds = [];
            collection.forEachInCollection((item) => {
                chai_1.expect(itemIds.indexOf(item.id)).to.be.equal(-1);
                chai_1.expect(itemsFromSubCollection.indexOf(item)).to.not.be.equal(-1);
                itemIds.push(item.id);
            }, subCollectionNameB2);
            chai_1.expect(itemIds.length).to.be.equal(itemsFromSubCollection.length);
        }
    });
    it('facilitates forEach callback traversal of every item in the collection or sub-collection', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let topRun = Math.round(Math.random() * testRunMax) + 1;
            let midRun = Math.round(Math.random() * testRunMax) + 1;
            let bottomRun = Math.round(Math.random() * testRunMax) + 1;
            let topCollectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let midCollectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let bottomCollectionName = `${midCollectionName}:${cm_domain_utilities_1.IdentificationGenerator.UUID()}`;
            let collection = atlas.createCollection(topCollectionName);
            let topIds = [];
            let midIds = [];
            let bottomIds = [];
            let checkedIds = [];
            for (let i = 0; i < topRun; i++) {
                topIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                // Both of the below should do the same thing.
                if (i % 2 === 0) {
                    collection.addItemToNode(new ConcreteCollectible(topIds[i]), maze.getRandomNode());
                }
                else {
                    collection.addItemToNode(new ConcreteCollectible(topIds[i]), maze.getRandomNode(), topCollectionName);
                }
            }
            for (let i = 0; i < midRun; i++) {
                midIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(midIds[i]), maze.getRandomNode(), midCollectionName);
            }
            for (let i = 0; i < bottomRun; i++) {
                bottomIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(bottomIds[i]), maze.getRandomNode(), bottomCollectionName);
            }
            checkedIds = [];
            collection.forEachInCollection((item) => {
                chai_1.expect((topIds.indexOf(item.id) !== -1 ||
                    midIds.indexOf(item.id) !== -1 ||
                    bottomIds.indexOf(item.id) !== -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            });
            chai_1.expect(checkedIds.length).to.be.equal(topRun + midRun + bottomRun);
            checkedIds = [];
            collection.forEachInCollection((item) => {
                chai_1.expect((midIds.indexOf(item.id) !== -1 ||
                    bottomIds.indexOf(item.id) !== -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                chai_1.expect(topIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            }, midCollectionName);
            chai_1.expect(checkedIds.length).to.be.equal(midRun + bottomRun);
            checkedIds = [];
            collection.forEachInCollection((item) => {
                chai_1.expect(topIds.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect((midIds.indexOf(item.id) === -1 &&
                    bottomIds.indexOf(item.id) === -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            }, topCollectionName, true);
            chai_1.expect(checkedIds.length).to.be.equal(topRun);
            checkedIds = [];
            collection.forEachInCollection((item) => {
                chai_1.expect(midIds.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect((topIds.indexOf(item.id) === -1 &&
                    bottomIds.indexOf(item.id) === -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            }, midCollectionName, true);
            chai_1.expect(checkedIds.length).to.be.equal(midRun);
            checkedIds = [];
            collection.forEachInCollection((item) => {
                chai_1.expect(bottomIds.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect((topIds.indexOf(item.id) === -1 &&
                    midIds.indexOf(item.id) === -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            }, bottomCollectionName);
            chai_1.expect(checkedIds.length).to.be.equal(bottomRun);
        }
    });
    it('facilitates forEach callback traversal of every item stored in a given maze node, filterable by sub-collection', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let topRun = Math.round(Math.random() * testRunMax) + 1;
            let midRun = Math.round(Math.random() * testRunMax) + 1;
            let bottomRun = Math.round(Math.random() * testRunMax) + 1;
            let topCollectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let midCollectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let bottomCollectionName = `${midCollectionName}:${cm_domain_utilities_1.IdentificationGenerator.UUID()}`;
            let collection = atlas.createCollection(topCollectionName);
            let topIds = [];
            let midIds = [];
            let bottomIds = [];
            let checkedIds = [];
            let commonNode = maze.getRandomNode();
            for (let i = 0; i < topRun; i++) {
                topIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                // Both of the below should do the same thing.
                if (i % 2 === 0) {
                    collection.addItemToNode(new ConcreteCollectible(topIds[i]), commonNode);
                }
                else {
                    collection.addItemToNode(new ConcreteCollectible(topIds[i]), commonNode, topCollectionName);
                }
            }
            for (let i = 0; i < midRun; i++) {
                midIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(midIds[i]), commonNode, midCollectionName);
            }
            for (let i = 0; i < bottomRun; i++) {
                bottomIds[i] = cm_domain_utilities_1.IdentificationGenerator.UUID();
                collection.addItemToNode(new ConcreteCollectible(bottomIds[i]), commonNode, bottomCollectionName);
            }
            checkedIds = [];
            collection.forEachAtNode(commonNode, (item) => {
                chai_1.expect((topIds.indexOf(item.id) !== -1 ||
                    midIds.indexOf(item.id) !== -1 ||
                    bottomIds.indexOf(item.id) !== -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            });
            chai_1.expect(checkedIds.length).to.be.equal(topRun + midRun + bottomRun);
            checkedIds = [];
            collection.forEachAtNode(commonNode, (item) => {
                chai_1.expect((midIds.indexOf(item.id) !== -1 ||
                    bottomIds.indexOf(item.id) !== -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                chai_1.expect(topIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            }, midCollectionName);
            chai_1.expect(checkedIds.length).to.be.equal(midRun + bottomRun);
            checkedIds = [];
            collection.forEachAtNode(commonNode, (item) => {
                chai_1.expect(topIds.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect((midIds.indexOf(item.id) === -1 &&
                    bottomIds.indexOf(item.id) === -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            }, topCollectionName, true);
            chai_1.expect(checkedIds.length).to.be.equal(topRun);
            checkedIds = [];
            collection.forEachAtNode(commonNode, (item) => {
                chai_1.expect(midIds.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect((topIds.indexOf(item.id) === -1 &&
                    bottomIds.indexOf(item.id) === -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            }, midCollectionName, true);
            chai_1.expect(checkedIds.length).to.be.equal(midRun);
            checkedIds = [];
            collection.forEachAtNode(commonNode, (item) => {
                chai_1.expect(bottomIds.indexOf(item.id)).to.not.be.equal(-1);
                chai_1.expect((topIds.indexOf(item.id) === -1 &&
                    midIds.indexOf(item.id) === -1)).to.be.true;
                chai_1.expect(checkedIds.indexOf(item.id)).to.be.equal(-1);
                checkedIds.push(item.id);
            }, bottomCollectionName);
            chai_1.expect(checkedIds.length).to.be.equal(bottomRun);
        }
    });
    it('facilitates the addition or removal of an item from a given maze node', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let collection = atlas.createCollection(cm_domain_utilities_1.IdentificationGenerator.UUID());
            let targetNode = maze.getRandomNode();
            let itemId = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let item = new ConcreteCollectible(itemId);
            let collectionSize = Math.ceil(Math.random() * testRunMax) + 2;
            for (let i = 0; i < Math.floor(collectionSize / 2); i++) {
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), targetNode);
            }
            collection.addItemToNode(item, targetNode);
            for (let i = Math.ceil(collectionSize / 2); i < collectionSize; i++) {
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), targetNode);
            }
            chai_1.expect(collection.getItemFromNode(item.id, targetNode)).to.be.equal(item);
            collection.removeItemFromNode(item, targetNode);
            chai_1.expect(collection.getItemFromNode(item.id, targetNode)).to.be.null;
        }
    });
    it('reports on whether a given item resides on a given maze node', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let collection = atlas.createCollection(cm_domain_utilities_1.IdentificationGenerator.UUID());
            let targetNode = maze.getRandomNode();
            let itemId = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let item = new ConcreteCollectible(itemId);
            let collectionSize = Math.ceil(Math.random() * testRunMax) + 2;
            for (let i = 0; i < Math.floor(collectionSize / 2); i++) {
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), targetNode);
            }
            collection.addItemToNode(item, targetNode);
            for (let i = Math.ceil(collectionSize / 2); i < collectionSize; i++) {
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), targetNode);
            }
            chai_1.expect(collection.isItemAtNode(item.id, targetNode)).to.be.true;
            chai_1.expect(collection.getItemFromNode(item.id, targetNode)).to.be.equal(item);
            collection.removeItemFromNode(item, targetNode);
            chai_1.expect(collection.getItemFromNode(item.id, targetNode)).to.be.null;
            chai_1.expect(collection.isItemAtNode(item.id, targetNode)).to.be.false;
        }
    });
    it('reports on the current node that a given item is occupying', () => {
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let collection = atlas.createCollection(cm_domain_utilities_1.IdentificationGenerator.UUID());
            let targetNode = maze.getRandomNode();
            let itemId = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let item = new ConcreteCollectible(itemId);
            let collectionSize = Math.ceil(Math.random() * testRunMax) + 2;
            for (let i = 0; i < Math.floor(collectionSize / 2); i++) {
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), targetNode);
            }
            collection.addItemToNode(item, targetNode);
            for (let i = Math.ceil(collectionSize / 2); i < collectionSize; i++) {
                collection.addItemToNode(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()), targetNode);
            }
            chai_1.expect(collection.isItemAtNode(item.id, targetNode)).to.be.true;
            let foundItem = collection.getItemFromNode(item.id, targetNode);
            chai_1.expect(collection.getItemNode(foundItem)).to.be.equal(targetNode);
            for (let tries = 0; tries < testPasses; tries++) {
                let nextNode = maze.getRandomNode();
                collection.moveItemToNode(foundItem, nextNode);
                chai_1.expect(collection.getItemNode(foundItem)).to.be.equal(nextNode);
            }
        }
    });
    it('can handle hierarchical ancestors of the defined collection class within sub-collections', () => {
        let collectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
        let subCollectionName = cm_domain_utilities_1.IdentificationGenerator.UUID();
        let collection = atlas.createCollection(collectionName);
        let topItem = new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID());
        let subItem = new OtherCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID());
        collection.addItemToNode(topItem, maze.getRandomNode());
        collection.addItemToNode(subItem, maze.getRandomNode(), subCollectionName);
        chai_1.expect(collection.getItemFromCollection(topItem.id)).to.be.equal(topItem);
        chai_1.expect(collection.getItemFromCollection(subItem.id)).to.be.equal(subItem);
    });
});
class ConcreteCollectible {
    constructor(id) {
        this.id = id;
    }
}
class OtherCollectible extends ConcreteCollectible {
    constructor(id) {
        super(id);
        this.id = id;
    }
}
