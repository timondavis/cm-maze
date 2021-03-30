import { Collectible } from "./Collectible";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface ICollectibleList<T> extends ISerializableModel {
    contents: T[];
}
/**
 * Collectible list hides an array under the hood, inserting at O(n) and finding by O(logn), insertions are stored
 * sorted by Collectible.getId() value.
 */
export declare class CollectibleList<T extends Collectible> extends SerializableModel {
    protected state: ICollectibleList<T>;
    constructor();
    get size(): number;
    forEach(callback: (item: T, index: number, array: T[]) => void): void;
    insert(item: T): void;
    delete(item: T): void;
    deleteItemWithId(itemId: string): void;
    findItemWithId(itemId: string): T;
    hasItem(item: T): boolean;
    hasItemWithId(itemId: string): boolean;
    compare: (a: T, b: T) => number;
    private findItemIndex;
    private findItemIndexWithId;
    toArray(): T[];
}
