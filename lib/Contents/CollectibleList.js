"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectibleList = void 0;
const cm_domain_utilities_1 = require("cm-domain-utilities");
/**
 * Collectible list hides an array under the hood, inserting at O(n) and finding by O(logn), insertions are stored
 * sorted by Collectible.getId() value.
 */
class CollectibleList extends cm_domain_utilities_1.SerializableModel {
    constructor(state = null) {
        super();
        this.compare = (a, b) => {
            if (a.id === b.id) {
                return 0;
            }
            return (a.id < b.id) ? -1 : 1;
        };
        this.state = (state) ? state : { contents: [] };
    }
    get size() {
        return this.state.contents.length;
    }
    forEach(callback) {
        return this.state.contents.forEach(callback);
    }
    insert(item) {
        if (!this.size) {
            this.state.contents.push(item);
            return;
        }
        let size = this.size;
        for (let i = 0; i < size; i++) {
            if (this.compare(item, this.state.contents[i]) < 0) {
                this.state.contents.splice(i, 0, item);
                break;
            }
            else if (i == this.size - 1) {
                this.state.contents.push(item);
            }
        }
    }
    delete(item) {
        let index = this.findItemIndex(item);
        if (index !== null) {
            this.state.contents.splice(index, 1);
        }
    }
    deleteItemWithId(itemId) {
        let index = this.findItemIndexWithId(itemId);
        if (index != null) {
            this.state.contents.splice(index, 1);
        }
    }
    findItemWithId(itemId) {
        let index = this.findItemIndexWithId(itemId);
        if (index !== null) {
            return this.state.contents[index];
        }
        return null;
    }
    hasItem(item) {
        return (this.findItemWithId(item.id) !== null);
    }
    hasItemWithId(itemId) {
        return (this.findItemWithId(itemId) !== null);
    }
    findItemIndex(item) {
        return this.findItemIndexWithId(item.id);
    }
    findItemIndexWithId(itemId) {
        if (!this.size) {
            return null;
        }
        if (this.size == 1 && (this.state.contents[0].id == itemId)) {
            return 0;
        }
        let leftPointer = 0;
        let rightPointer = this.size - 1;
        let halfway;
        while (leftPointer != rightPointer) {
            if (this.state.contents[leftPointer].id == itemId) {
                return leftPointer;
            }
            if (this.state.contents[rightPointer].id == itemId) {
                return rightPointer;
            }
            if (rightPointer - 1 <= leftPointer) {
                break;
            }
            halfway = Math.floor((rightPointer + leftPointer) / 2);
            if (this.state.contents[halfway].id < itemId) {
                leftPointer = halfway;
            }
            else {
                rightPointer = halfway;
            }
        }
        return null;
    }
    toArray() {
        return this.state.contents;
    }
}
exports.CollectibleList = CollectibleList;
