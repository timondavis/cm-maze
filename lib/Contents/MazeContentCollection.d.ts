import { Maze, MazeNode } from "..";
import { Collectible } from "./Collectible";
import { CollectibleList } from "./CollectibleList";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IMazeContentCollection extends ISerializableModel {
    nodeContent: Map<string, CollectibleList<Collectible>>;
    collectibleResidency: Map<Collectible, MazeNode>;
    subCollectionEntities: Map<string, CollectibleList<Collectible>>;
    entitySubCollectionIndex: Map<string, string>;
    collectionName: string;
}
export declare class MazeContentCollection<T extends Collectible> extends SerializableModel {
    protected state: IMazeContentCollection;
    constructor(collectionName: string, maze: Maze);
    get collectionName(): string;
    get size(): number;
    get items(): T[];
    get subCollectionNames(): string[];
    getSubCollectionSize(subCollectionName: string, isolateSubCollection?: boolean): number;
    getItemsFromCollection(subCollectionName?: string, isolateSubCollection?: boolean): T[];
    getItemFromNode(itemId: string, mazeNode: MazeNode): T;
    getItemSubCollectionName(item: T): string;
    addItemToNode(item: T, mazeNode: MazeNode, subCollectionName?: string): void;
    moveItemToNode(item: T, mazeNode: MazeNode): void;
    moveItemToSubCollection(item: T, newSubCollectionName: string, demandCollectionAlreadyExists?: boolean): void;
    getItemsFromNode(node: MazeNode, subCollectionName?: string, isolateSubCollection?: boolean): T[];
    forEachAtNode(mazeNode: MazeNode, callback: (item: T, index: number, array: Collectible[]) => void, subCollectionName?: string, isolateSubCollection?: boolean): void;
    forEachInCollection(callback: (value: T, index: number, array: T[]) => void, subCollectionName?: string, isolateSubCollection?: boolean): void;
    removeItemFromNode(item: T, mazeNode: MazeNode): void;
    getItemNode(item: T): MazeNode;
    isItemInCollection(itemId: string, subCollectionName?: string, isolateSubCollection?: boolean): boolean;
    getItemFromCollection(itemId: string): T;
    isItemAtNode(itemId: string, node: MazeNode): boolean;
    private addItemToCollection;
    private removeItemFromCollection;
    private formatSubCollectionName;
}
