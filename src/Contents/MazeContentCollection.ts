import {Maze, MazeNode} from "cm-maze";
import {Collectible} from "./Collectible";
import {CollectibleList} from "./CollectibleList";
import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface IMazeContentCollection extends ISerializableModel {
	nodeContent: Map<MazeNode, CollectibleList<Collectible>>;
	collectibleResidency: Map<Collectible, MazeNode>;
	collectionName: string;
}

export class MazeContentCollection<T extends Collectible> extends SerializableModel {

	protected state: IMazeContentCollection;

    constructor(collectionName: string, maze: Maze) {
    	super();
    	this.state = {
			collectibleResidency: new Map<T, MazeNode>(),
			collectionName: collectionName,
			nodeContent: new Map<MazeNode, CollectibleList<T>>()
		};

		maze.forEachNode((node: MazeNode) => {
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

    public getItemFromNode(itemId: string, mazeNode: MazeNode) {
		return this.state.nodeContent.get(mazeNode) as CollectibleList<T>;
    }

    public addItemToNode(item: T, mazeNode: MazeNode) {
		let nodeCollection = this.state.nodeContent.get(mazeNode);
		nodeCollection.insert(item);

		this.state.collectibleResidency.set(item, mazeNode);
    }

    public moveItemToNode(item: T, mazeNode: MazeNode) {
		this.removeItemFromNode(item, this.getItemNode(item));
		this.addItemToNode(item, mazeNode);
    }

	public getItemsFromNode(node: MazeNode): CollectibleList<T> {
		let collection = this.state.nodeContent;
		return collection.get(node) as CollectibleList<T>;
	}

	public forEachAtNode(mazeNode: MazeNode, callback: (item: T, index: number, array: Collectible[]) => void) {
        return this.getItemsFromNode(mazeNode).forEach(callback);
    }

    public forEachInCollection(callback: (value: T, index: number, array: T[]) => void) {
		let map = this.state.collectibleResidency;
		Array.from(map.keys()).forEach(callback);
    }

    public removeItemFromNode(item: T, mazeNode: MazeNode) {
		let collection = this.state.nodeContent;
		let nodeCollection = collection.get(mazeNode);
		nodeCollection.delete(item);
    }

    public removeItemFromCollection(item: T) {
		let node = this.state.collectibleResidency.get(item);

		if (node) {
			let collection = this.state.nodeContent;
			let nodeCollection = collection.get(node);
			nodeCollection.delete(item);
		}

		this.state.collectibleResidency.delete(item);
    }

    public getItemNode(item: T) : MazeNode {
		return this.state.collectibleResidency.get(item);
    }

    public isItemInCollection(itemId: string) : boolean {
		return !this.getItemFromCollection(itemId) === null;
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
}
