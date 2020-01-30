import {Maze, MazeNode} from "cm-maze";
import {MazeContentCollection} from "./MazeContentCollection";
import {CollectibleList} from "./CollectibleList";
import {Collectible} from "./Collectible";

export class MazeContentAtlas {

    private _nodeContent: Map<string, Map<MazeNode, CollectibleList<Collectible>>>; // collectionName => maze node => collection
    private _collectibleResidency: Map<string, Map<Collectible, MazeNode>>; // collectionName => collectible => maze node
    private _contentCollections: Map<string, MazeContentCollection<Collectible>>;

    constructor(private _maze: Maze) {
        this._nodeContent = new Map<string, Map<MazeNode, CollectibleList<Collectible>>>();
        this._collectibleResidency = new Map<string, Map<Collectible, MazeNode>>();
        this._contentCollections = new Map<string, MazeContentCollection<Collectible>>();
    }

    public collectionExists(collectionName: string): boolean {
        return this._contentCollections.has(collectionName);
    };

    public getCollection<T extends Collectible>(collectionName: string): MazeContentCollection<T> {
        return this._contentCollections.get(collectionName) as MazeContentCollection<T>;
    }

    public createCollection<T extends Collectible>(collectionName: string): MazeContentCollection<T> {
        if (this.collectionExists(collectionName)) { return; }

        let newNodeCollectionMap = new Map<MazeNode, CollectibleList<T>>();
        let newItemCollectionMap = new Map<T, MazeNode>();
        this._maze.forEachNode((node: MazeNode) => {
            newNodeCollectionMap.set(node, new CollectibleList());
        });
        this._nodeContent.set(collectionName, newNodeCollectionMap);
        this._collectibleResidency.set(collectionName, newItemCollectionMap);
        this._contentCollections.set(collectionName, new MazeContentCollection<T>(collectionName, this));

        return this._contentCollections.get(collectionName) as MazeContentCollection<T>;
    }

    public getItemsFromCollection<T extends Collectible>(collectionName) : T[] {
        return Array.from(this._collectibleResidency.get(collectionName).keys()) as T[];
    }

    public getItemsFromNode<T extends Collectible>(collectionName: string, node: MazeNode): CollectibleList<T> {
        let collection = this._nodeContent.get(collectionName);

        if (!collection) { throw `Collection "${collectionName}" not found in MazeContentCollectionController.`; }
        return collection.get(node) as CollectibleList<T>;
    }

    public addItemToCollection<T extends Collectible>(collectionName: string, item: T) {
        this.addItemToNode(collectionName, item, null);
    }

    public addItemToNode<T extends Collectible>(collectionName: string, item: T, node: MazeNode): Map<MazeNode, CollectibleList<T>> {
        let collection = this._nodeContent.get(collectionName) ;
        let nodeCollection = collection.get(node);
        nodeCollection.insert(item);

        this._collectibleResidency.get(collectionName).set(item, node);
        return collection as Map<MazeNode, CollectibleList<T>>;
    }

    public moveItemToNode(collectionName: string, item: Collectible, node: MazeNode) {
        this.removeItemFromNode(collectionName, item, this.getItemNode(collectionName, item ));
        this.addItemToNode(collectionName, item, node);
    }

    public removeItemFromNode(collectionName: string, item: Collectible, node: MazeNode) {
        let collection = this._nodeContent.get(collectionName);
        if (!collection) { throw `Collection "${collectionName}" not found in MazeContentCollectionController.`; }
        let nodeCollection = collection.get(node);
        nodeCollection.delete(item);
    }

    // @todo test.  Also test nullability for node addresses
    public removeItemFromCollection(collectionName: string, item: Collectible) {
        let node = this._collectibleResidency.get(collectionName).get(item);

        if (node) {
            let collection = this._nodeContent.get(collectionName);
            if (!collection) { throw `Collection "${collectionName}" not found in MazeContentCollectionController.`; }
            let nodeCollection = collection.get(node);
            nodeCollection.delete(item);
        }

        this._collectibleResidency.get(collectionName).delete(item);
    }

    public getItemNode(collectionName: string, item: Collectible): MazeNode {
        return this._collectibleResidency.get(collectionName).get(item);
    }

    public forEachItemInCollection<T extends Collectible>(collectionName, callback: (item: T, index: number, array: T[]) => void)  {
        let map = this._collectibleResidency.get(collectionName);
        Array.from(map.keys()).forEach(callback);
    }

    // @todo new test
    public isItemInCollection(collectionName: string, itemId: string): boolean {
        return !this.getItemFromCollection(collectionName, itemId) === null;
    }

    public getItemFromCollection<T extends Collectible>(collectionName: string, itemId: string) : T{
        let itemFound: T  = null;
        Array.from(this._collectibleResidency.get(collectionName).keys()).forEach((item: Collectible) => {
            if (item.getId() == itemId) {
                itemFound = item as T;
            }
        });
        return itemFound;
    }

    public isItemAtNode(collectionName: string, itemId: string, node: MazeNode): boolean {
        let itemFound = false;
        if (this.isItemInCollection(collectionName, itemId)) {
            let items = this.getItemsFromNode(collectionName, node);
            items.forEach((item: Collectible) => {
                if (item.getId() === itemId) {
                    itemFound = true;
                }
            });
        }

        return itemFound;
    }
}
