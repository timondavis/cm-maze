import {Collectible} from "./Collectible";

/**
 * Collectible list hides an array under the hood, inserting at O(n) and finding by O(logn), insertions are stored
 * sorted by Collectible.getId() value.
 */
export class CollectibleList<T extends Collectible> {

    private _contents: T[] = [];

    public get size(): number {
        return this._contents.length;
    }

    public forEach(callback: (item: T, index: number, array: T[]) => void) {
        return this._contents.forEach(callback);
    }

    public insert(item: T) {
        if (!this.size) {
           this._contents.push(item);
           return;
        }

        let size = this.size;

        for (let i = 0 ; i < size ; i++) {
            if (this.compare(item, this._contents[i]) < 0 ) {
                this._contents.splice(i, 0, item);
                break;
            } else if (i == this.size -1) {
                this._contents.push(item);
            }
        }
    }

    public delete(item: T) {
        let index = this.findItemIndex(item);

        if (index !== null) {
            this._contents.splice(index, 1);
        }
    }

    public deleteItemWithId(itemId: string) {
        let index = this.findItemIndexWithId(itemId);

        if (index != null) {
            this._contents.splice(index, 1);
        }
    }

    public findItemWithId(itemId: string): T {
        let index = this.findItemIndexWithId(itemId);
        if (index !== null) {
            return this._contents[index];
        }
        return null;
    }

    public hasItem(item: T): boolean {
        return (this.findItemWithId(item.getId()) !== null)
    }

    public hasItemWithId(itemId: string): boolean {
        return (this.findItemWithId(itemId) !== null)
    }

    public compare = (a: T, b: T): number => {
        if (a.getId() === b.getId()) { return 0; }
        return (a.getId() < b.getId()) ? -1 : 1;
    };

    private findItemIndex(item: T) {
        return this.findItemIndexWithId(item.getId());
    }

    private findItemIndexWithId(itemId: string): number {
        if (!this.size) { return null; }
        if (this.size == 1 && (this._contents[0].getId() == itemId)) { return 0; }

        let leftPointer = 0;
        let rightPointer = this.size - 1;

        let halfway: number;
        while (leftPointer != rightPointer) {

            if (this._contents[leftPointer].getId() == itemId)  { return leftPointer; }
            if (this._contents[rightPointer].getId() == itemId) { return rightPointer; }

            if (rightPointer - 1 <= leftPointer) {
                break;
            }

            halfway = Math.floor((rightPointer + leftPointer) / 2);

            if (this._contents[halfway].getId() < itemId) {
                leftPointer = halfway;
            } else {
                rightPointer = halfway;
            }
        }

        return null;
    }
}

