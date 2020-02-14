import {MazeContentAtlas} from "./MazeContentAtlas";
import {MazeNode} from "cm-maze";
import {Collectible} from "./Collectible";
import {AbstractSerializable} from "../AbstractSerializable";

export class MazeContentCollection<T extends Collectible> extends AbstractSerializable {

    constructor(protected _collectionName: string, protected _mazeContentAtlas: MazeContentAtlas) {
    	super();
	}

    public get collectionName() {
        return this._collectionName;
    }

    public get size(): number {
        let count = 0 ;
        this._mazeContentAtlas.forEachItemInCollection(this.collectionName, (item) => { count++; });
        return count;
    }

    public get items() : T[]{
       return this._mazeContentAtlas.getItemsFromCollection<T>(this.collectionName);
    }

    public getItemFromNode(itemId: string, mazeNode: MazeNode) {
        return this._mazeContentAtlas.getItemsFromNode(this.collectionName, mazeNode).findItemWithId(itemId);
    }

    public addItemToNode(item: T, mazeNode: MazeNode) {
        return this._mazeContentAtlas.addItemToNode(this.collectionName, item, mazeNode);
    }

    public moveItemToNode(item: T, mazeNode: MazeNode) {
        return this._mazeContentAtlas.moveItemToNode(this.collectionName, item, mazeNode);
    }

    public forEachAtNode(mazeNode: MazeNode, callback: (item: T, index: number, array: Collectible[]) => void) {
        return this._mazeContentAtlas.getItemsFromNode(this.collectionName, mazeNode).forEach(callback);
    }

    public forEachInCollection(callback: (value: T, index: number, array: T[]) => void) {
        this._mazeContentAtlas.forEachItemInCollection<T>(this.collectionName, callback);
    }

    public removeItemFromNode(item: T, mazeNode: MazeNode) {
        return this._mazeContentAtlas.removeItemFromNode(this.collectionName, item, mazeNode);
    }

    public removeItemFromCollection(item: T) {
        return this._mazeContentAtlas.removeItemFromCollection(this.collectionName, item);
    }

    public getItemNode(item: T) : MazeNode {
        return this._mazeContentAtlas.getItemNode(this.collectionName, item);
    }

    public isItemInCollection(itemId: string) : boolean {
        return this._mazeContentAtlas.isItemInCollection(this.collectionName, itemId);
    }

    public getItemFromCollection(itemId: string) : T {
        return this._mazeContentAtlas.getItemFromCollection<T>(this.collectionName, itemId);
    }

    public isItemAtNode(itemId: string, node: MazeNode) : boolean {
        return this._mazeContentAtlas.isItemAtNode(this.collectionName, itemId, node);
    }
}
