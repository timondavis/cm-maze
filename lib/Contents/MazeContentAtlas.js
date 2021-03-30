"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeContentAtlas = void 0;
const MazeContentCollection_1 = require("./MazeContentCollection");
class MazeContentAtlas {
    constructor(maze) {
        this.maze = maze;
        this.contentCollections = new Map();
    }
    collectionExists(collectionName) {
        return this.contentCollections.has(collectionName);
    }
    ;
    getCollection(collectionName) {
        return this.contentCollections.get(collectionName);
    }
    createCollection(collectionName) {
        if (this.collectionExists(collectionName)) {
            throw "Failed to create new MazeContentCollection.  Named collection already exists.";
        }
        this.contentCollections.set(collectionName, new MazeContentCollection_1.MazeContentCollection(collectionName, this.maze));
        return this.contentCollections.get(collectionName);
    }
}
exports.MazeContentAtlas = MazeContentAtlas;
