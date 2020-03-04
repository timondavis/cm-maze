import {Maze, MazeNode} from "..";
import {Collectible} from "./Collectible";
import {CollectibleList} from "./CollectibleList";
import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface IMazeContentCollection extends ISerializableModel {
	nodeContent: Map<MazeNode, CollectibleList<Collectible>>;
	collectibleResidency: Map<Collectible, MazeNode>;
	subCollectionEntities: Map<string, CollectibleList<Collectible>>;
	entitySubCollectionIndex: Map<string, string>;
	collectionName: string;
}

export class MazeContentCollection<T extends Collectible> extends SerializableModel {

	protected state: IMazeContentCollection;

    constructor(collectionName: string, maze: Maze) {
    	super();
    	this.state = {
			collectibleResidency: new Map<T, MazeNode>(),
			collectionName: collectionName,
			nodeContent: new Map<MazeNode, CollectibleList<T>>(),
			subCollectionEntities : new Map<string, CollectibleList<T>>(),
			entitySubCollectionIndex: new Map<string, string>(),
		};

    	maze.getNodesArray().forEach((node: MazeNode) => {
			this.state.nodeContent.set(node, new CollectibleList());
		});
	}

    public get collectionName() {
        return this.state.collectionName;
    }

    public get size(): number {
    	return this.state.collectibleResidency.size;
    }

    public get items() : T[]{
		return Array.from(this.state.collectibleResidency.keys()) as T[];
    }

    public get subCollectionNames(): string[] {
    	return Array.from(this.state.subCollectionEntities.keys()) as string[];
	}

	public getSubCollectionSize(subCollectionName: string, isolateSubCollection: boolean = false) {
    	return this.getItemsFromCollection(subCollectionName, isolateSubCollection).length;
	}

	public getItemsFromCollection(subCollectionName: string = null, isolateSubCollection: boolean = false): T[] {
    	if (subCollectionName === null) { subCollectionName = this.collectionName; }

		subCollectionName = (subCollectionName.indexOf(this.state.collectionName) === -1) ?
			`${this.collectionName}:${subCollectionName}` : subCollectionName;


		let items: T[] = [];

		if (isolateSubCollection) {
			items = items.concat(this.state.subCollectionEntities.get(subCollectionName).toArray() as T[]);
		} else {
			this.state.subCollectionEntities.forEach((list: CollectibleList<T>, key: string) => {
				if (key.indexOf(subCollectionName) !== -1) {
					items = items.concat(list.toArray());
				}
			});
		}

		return (items.length > 0) ? items : null;
	}

    public getItemFromNode(itemId: string, mazeNode: MazeNode) {
		return this.state.nodeContent.get(mazeNode) as CollectibleList<T>;
    }

    public getItemSubCollectionName(item: T) : string {
    	return this.state.entitySubCollectionIndex.get(item.id);
	}

    public addItemToNode(item: T, mazeNode: MazeNode, subCollectionName: string = null) {

    	if (subCollectionName) {
    		if (subCollectionName.indexOf(this.collectionName) === -1) {
    			subCollectionName = `${this.collectionName}:${subCollectionName}`;
			}
		} else {
    		subCollectionName = this.collectionName;
		}

    	if (!this.isItemInCollection(item.id, subCollectionName)) {
			this.addItemToCollection(item, subCollectionName);
		}

		let nodeCollection = this.state.nodeContent.get(mazeNode);
		nodeCollection.insert(item);

		this.state.collectibleResidency.set(item, mazeNode);
	}

    public moveItemToNode(item: T, mazeNode: MazeNode, subCollectionName: string = null) {
		this.removeItemFromNode(item, this.getItemNode(item));
		this.addItemToNode(item, mazeNode);
    }

    public transferItemToSubCollection(item: T, newSubCollectionName: string) {
    	if (!this.state.entitySubCollectionIndex.has(item.id)) {
    		throw `Cannot transfer item to new subcollection ${newSubCollectionName} - The item is not registered in the master collection group.`
		}
    	if (!this.state.subCollectionEntities.has(newSubCollectionName)) {
    		throw `Cannot transfer item to new subcollection ${newSubCollectionName} - The sub collection name does not exist.`
		}

    	let oldSubCollectionName = this.getItemSubCollectionName(item);

    	this.state.entitySubCollectionIndex.set(item.id, newSubCollectionName);
    	this.state.subCollectionEntities.get(oldSubCollectionName).delete(item);
    	this.state.subCollectionEntities.get(newSubCollectionName).insert(item);
	}

	public getItemsFromNode(node: MazeNode, subCollectionName: string = null, isolateSubCollection: boolean = false): T[] {
		if (subCollectionName === null) { subCollectionName = this.collectionName; }

		subCollectionName = (subCollectionName.indexOf(this.state.collectionName) === -1) ?
			`${this.collectionName}:${subCollectionName}` : subCollectionName;

		let foundList = this.state.nodeContent.get(node) as CollectibleList<T>;
		if (subCollectionName === null) { return foundList.toArray(); }

		let returnList = new CollectibleList<T>();

		foundList.forEach((item: T) => {
			let itemSubCollectionName = this.getItemSubCollectionName(item);
			if (itemSubCollectionName.indexOf(subCollectionName) !== -1) {
				returnList.insert(item);
			}
		});

		return returnList.toArray();
	}

	public forEachAtNode(mazeNode: MazeNode, callback: (item: T, index: number, array: Collectible[]) => void,
						 subCollectionName: string = null) {
        return this.getItemsFromNode(mazeNode, subCollectionName).forEach(callback);
    }

    public forEachInCollection(callback: (value: T, index: number, array: T[]) => void,
							   subCollectionName: string = null) {
		let map = this.state.collectibleResidency;
		if (subCollectionName === null) {
			Array.from(map.keys()).forEach(callback);
		} else {
			Array.from(map.keys()).forEach((value: T, index: number, array: T[]) => {
				let itemSubCollectionName = this.getItemSubCollectionName(value);
				if (itemSubCollectionName.indexOf(subCollectionName) !== -1) {
					callback(value, index, array);
				}
			});
		}
    }

    public removeItemFromNode(item: T, mazeNode: MazeNode) {
		let collection = this.state.nodeContent;
		let nodeCollection = collection.get(mazeNode);
		nodeCollection.delete(item);

		this.removeItemFromCollection(item);
    }

    public getItemNode(item: T) : MazeNode {
		return this.state.collectibleResidency.get(item);
    }

    public isItemInCollection(itemId: string, subCollectionName: string = null) : boolean {
    	let item = this.getItemFromCollection(itemId);

    	if (!item) { return false; }

    	if (subCollectionName === null) { return true; }

    	return this.getItemSubCollectionName(item).indexOf(subCollectionName) !== -1;
    }

    public getItemFromCollection(itemId: string) : T {
		let itemFound: T  = null;
		Array.from(this.state.collectibleResidency.keys()).forEach((item: Collectible) => {
			if (item.id == itemId) {
				itemFound = item as T;
			}
		});
		return itemFound;
    }

    public isItemAtNode(itemId: string, node: MazeNode) : boolean {
		let itemFound = false;
		if (this.isItemInCollection(itemId)) {
			let items = this.getItemsFromNode(node);
			items.forEach((item: Collectible) => {
				if (item.id === itemId) {
					itemFound = true;
				}
			});
		}

		return itemFound;
    }

	private addItemToCollection(item, subCollectionName: string = null) {
		if (this.state.entitySubCollectionIndex.has(item.id)) {
			throw `Cannot add item with id ${item.id} to collection - item already exists in collection`;
		}

		if (!this.state.subCollectionEntities.has(subCollectionName)) {
			this.state.subCollectionEntities.set(subCollectionName, new CollectibleList<T>());
		}

		this.state.subCollectionEntities.get(subCollectionName).insert(item);
		this.state.entitySubCollectionIndex.set(item.id, subCollectionName);
	}

	private removeItemFromCollection(item: T) {
		let node = this.state.collectibleResidency.get(item);
		let subCollectionName = this.state.entitySubCollectionIndex.get(item.id);
		this.state.entitySubCollectionIndex.delete(item.id);
		this.state.subCollectionEntities.get(subCollectionName).delete(item);

		if (node) {
			let collection = this.state.nodeContent;
			let nodeCollection = collection.get(node);
			nodeCollection.delete(item);
		}

		this.state.collectibleResidency.delete(item);
	}
}
