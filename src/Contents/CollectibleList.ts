import {Collectible} from "./Collectible";
import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface ICollectibleList<T> extends ISerializableModel {
	contents: T[];
}

/**
 * Collectible list hides an array under the hood, inserting at O(n) and finding by O(logn), insertions are stored
 * sorted by Collectible.getId() value.
 */
export class CollectibleList<T extends Collectible> extends SerializableModel {

	protected state: ICollectibleList<T>;

	public constructor(state: ICollectibleList<T> = null) {
		super();

		this.state = (state) ? state : { contents: [] };
	}

    public get size(): number {
        return this.state.contents.length;
    }

    public forEach(callback: (item: T, index: number, array: T[]) => void) {
        return this.state.contents.forEach(callback);
    }

    public insert(item: T) {
        if (!this.size) {
           this.state.contents.push(item);
           return;
        }

        let size = this.size;

        for (let i = 0 ; i < size ; i++) {
            if (this.compare(item, this.state.contents[i]) < 0 ) {
                this.state.contents.splice(i, 0, item);
                break;
            } else if (i == this.size -1) {
                this.state.contents.push(item);
            }
        }
    }

    public delete(item: T) {
        let index = this.findItemIndex(item);

        if (index !== null) {
            this.state.contents.splice(index, 1);
        }
    }

    public deleteItemWithId(itemId: string) {
        let index = this.findItemIndexWithId(itemId);

        if (index != null) {
            this.state.contents.splice(index, 1);
        }
    }

    public findItemWithId(itemId: string): T {
        let index = this.findItemIndexWithId(itemId);
        if (index !== null) {
            return this.state.contents[index];
        }
        return null;
    }

    public hasItem(item: T): boolean {
        return (this.findItemWithId(item.id) !== null)
    }

    public hasItemWithId(itemId: string): boolean {
        return (this.findItemWithId(itemId) !== null)
    }

    public compare = (a: T, b: T): number => {
        if (a.id === b.id ) { return 0; }
        return (a.id < b.id) ? -1 : 1;
    };

    private findItemIndex(item: T) {
        return this.findItemIndexWithId(item.id);
    }

    private findItemIndexWithId(itemId: string): number {
        if (!this.size) { return null; }
        if (this.size == 1 && (this.state.contents[0].id == itemId)) { return 0; }

        let leftPointer = 0;
        let rightPointer = this.size - 1;

        let halfway: number;
        while (leftPointer != rightPointer) {

            if (this.state.contents[leftPointer].id == itemId)  { return leftPointer; }
            if (this.state.contents[rightPointer].id == itemId) { return rightPointer; }

            if (rightPointer - 1 <= leftPointer) {
                break;
            }

            halfway = Math.floor((rightPointer + leftPointer) / 2);

            if (this.state.contents[halfway].id < itemId) {
                leftPointer = halfway;
            } else {
                rightPointer = halfway;
            }
        }

        return null;
    }

    public toArray(): T[]{
    	return this.state.contents;
	}
}

