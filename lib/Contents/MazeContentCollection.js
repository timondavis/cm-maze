"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeContentCollection = void 0;
const CollectibleList_1 = require("./CollectibleList");
const cm_domain_utilities_1 = require("cm-domain-utilities");
class MazeContentCollection extends cm_domain_utilities_1.SerializableModel {
    constructor(collectionName, maze) {
        super();
        this.state = {
            collectibleResidency: new Map(),
            collectionName: collectionName,
            nodeContent: new Map(),
            subCollectionEntities: new Map(),
            entitySubCollectionIndex: new Map(),
        };
        maze.getNodesArray().forEach((node) => {
            this.state.nodeContent.set(node.id, new CollectibleList_1.CollectibleList());
        });
    }
    get collectionName() {
        return this.state.collectionName;
    }
    get size() {
        return this.state.collectibleResidency.size;
    }
    get items() {
        return Array.from(this.state.collectibleResidency.keys());
    }
    get subCollectionNames() {
        return Array.from(this.state.subCollectionEntities.keys());
    }
    getSubCollectionSize(subCollectionName, isolateSubCollection = false) {
        return this.getItemsFromCollection(subCollectionName, isolateSubCollection).length;
    }
    getItemsFromCollection(subCollectionName = null, isolateSubCollection = false) {
        subCollectionName = this.formatSubCollectionName(subCollectionName);
        let items = [];
        if (isolateSubCollection) {
            // Use concat so that we get a clone.  Passing the natural array back will break encapsulation.
            items = items.concat(this.state.subCollectionEntities.get(subCollectionName).toArray());
        }
        else {
            this.state.subCollectionEntities.forEach((list, key) => {
                if (key.indexOf(subCollectionName) !== -1) {
                    items = items.concat(list.toArray());
                }
            });
        }
        return (items.length > 0) ? items : null;
    }
    getItemFromNode(itemId, mazeNode) {
        let contentList = this.state.nodeContent.get(mazeNode.id);
        if (!contentList.hasItemWithId(itemId)) {
            return null;
        }
        return contentList.findItemWithId(itemId);
    }
    getItemSubCollectionName(item) {
        return this.state.entitySubCollectionIndex.get(item.id);
    }
    addItemToNode(item, mazeNode, subCollectionName = null) {
        if (subCollectionName) {
            if (subCollectionName.indexOf(this.collectionName) === -1) {
                subCollectionName = `${this.collectionName}:${subCollectionName}`;
            }
        }
        else {
            subCollectionName = this.collectionName;
        }
        if (!this.isItemInCollection(item.id, subCollectionName)) {
            this.addItemToCollection(item, subCollectionName);
        }
        let nodeCollection = this.state.nodeContent.get(mazeNode.id);
        nodeCollection.insert(item);
        this.state.collectibleResidency.set(item, mazeNode);
    }
    moveItemToNode(item, mazeNode) {
        this.removeItemFromNode(item, this.getItemNode(item));
        this.addItemToNode(item, mazeNode);
    }
    moveItemToSubCollection(item, newSubCollectionName, demandCollectionAlreadyExists = false) {
        newSubCollectionName = this.formatSubCollectionName(newSubCollectionName);
        if (!this.state.entitySubCollectionIndex.has(item.id)) {
            throw `Cannot transfer item to new subcollection ${newSubCollectionName} - The item is not registered in the master collection group.`;
        }
        if (!this.state.subCollectionEntities.has(newSubCollectionName)) {
            if (demandCollectionAlreadyExists) {
                throw `Cannot transfer item to new subcollection ${newSubCollectionName} - The sub collection name does not exist.`;
            }
            else {
                this.state.subCollectionEntities.set(newSubCollectionName, new CollectibleList_1.CollectibleList());
            }
        }
        let oldSubCollectionName = this.getItemSubCollectionName(item);
        this.state.entitySubCollectionIndex.set(item.id, newSubCollectionName);
        this.state.subCollectionEntities.get(oldSubCollectionName).delete(item);
        this.state.subCollectionEntities.get(newSubCollectionName).insert(item);
    }
    getItemsFromNode(node, subCollectionName = null, isolateSubCollection = false) {
        subCollectionName = this.formatSubCollectionName(subCollectionName);
        let foundList = this.state.nodeContent.get(node.id);
        let returnList = new CollectibleList_1.CollectibleList();
        foundList.forEach((item) => {
            let itemSubCollectionName = this.getItemSubCollectionName(item);
            if (isolateSubCollection) {
                if (itemSubCollectionName === subCollectionName) {
                    returnList.insert(item);
                }
            }
            else {
                if (itemSubCollectionName.indexOf(subCollectionName) !== -1) {
                    returnList.insert(item);
                }
            }
        });
        return returnList.toArray();
    }
    forEachAtNode(mazeNode, callback, subCollectionName = null, isolateSubCollection = false) {
        return this.getItemsFromNode(mazeNode, subCollectionName, isolateSubCollection).forEach(callback);
    }
    forEachInCollection(callback, subCollectionName = null, isolateSubCollection = false) {
        subCollectionName = this.formatSubCollectionName(subCollectionName);
        let map = this.getItemsFromCollection(subCollectionName, isolateSubCollection);
        map.forEach((value, index, array) => {
            let itemSubCollectionName = this.getItemSubCollectionName(value);
            if (itemSubCollectionName.indexOf(subCollectionName) !== -1) {
                callback(value, index, array);
            }
        });
    }
    removeItemFromNode(item, mazeNode) {
        let collection = this.state.nodeContent;
        let nodeCollection = collection.get(mazeNode.id);
        nodeCollection.delete(item);
        this.removeItemFromCollection(item);
    }
    getItemNode(item) {
        return this.state.collectibleResidency.get(item);
    }
    isItemInCollection(itemId, subCollectionName = null, isolateSubCollection = false) {
        subCollectionName = this.formatSubCollectionName(subCollectionName);
        let item = this.getItemFromCollection(itemId);
        if (!item) {
            return false;
        }
        if (isolateSubCollection) {
            return (this.getItemSubCollectionName(item) === subCollectionName);
        }
        else {
            return (this.getItemSubCollectionName(item).indexOf(subCollectionName) !== -1);
        }
    }
    getItemFromCollection(itemId) {
        let itemFound = null;
        Array.from(this.state.collectibleResidency.keys()).forEach((item) => {
            if (item.id == itemId) {
                itemFound = item;
            }
        });
        return itemFound;
    }
    isItemAtNode(itemId, node) {
        let itemFound = false;
        if (this.isItemInCollection(itemId)) {
            let items = this.getItemsFromNode(node);
            items.forEach((item) => {
                if (item.id === itemId) {
                    itemFound = true;
                }
            });
        }
        return itemFound;
    }
    addItemToCollection(item, subCollectionName = null) {
        if (this.state.entitySubCollectionIndex.has(item.id)) {
            throw `Cannot add item with id ${item.id} to collection - item already exists in collection`;
        }
        if (!this.state.subCollectionEntities.has(subCollectionName)) {
            this.state.subCollectionEntities.set(subCollectionName, new CollectibleList_1.CollectibleList());
        }
        this.state.subCollectionEntities.get(subCollectionName).insert(item);
        this.state.entitySubCollectionIndex.set(item.id, subCollectionName);
    }
    removeItemFromCollection(item) {
        let node = this.state.collectibleResidency.get(item);
        let subCollectionName = this.state.entitySubCollectionIndex.get(item.id);
        this.state.entitySubCollectionIndex.delete(item.id);
        this.state.subCollectionEntities.get(subCollectionName).delete(item);
        if (node) {
            let collection = this.state.nodeContent;
            let nodeCollection = collection.get(node.id);
            nodeCollection.delete(item);
        }
        this.state.collectibleResidency.delete(item);
    }
    formatSubCollectionName(proposedSubCollectionName) {
        let subCollectionName = "";
        if (proposedSubCollectionName === null) {
            subCollectionName = this.collectionName;
        }
        else {
            subCollectionName = (proposedSubCollectionName.indexOf(this.state.collectionName) === -1) ?
                `${this.collectionName}:${proposedSubCollectionName}` : proposedSubCollectionName;
        }
        return subCollectionName;
    }
}
exports.MazeContentCollection = MazeContentCollection;
