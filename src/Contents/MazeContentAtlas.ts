import {Maze} from "..";
import {MazeContentCollection} from "./MazeContentCollection";
import {Collectible} from "./Collectible";

export class MazeContentAtlas {

    private contentCollections: Map<string, MazeContentCollection<Collectible>>;

    constructor(private maze: Maze) {
        this.contentCollections = new Map<string, MazeContentCollection<Collectible>>();
    }

    public collectionExists(collectionName: string): boolean {
        return this.contentCollections.has(collectionName);
    };

    public getCollection<T extends Collectible>(collectionName: string): MazeContentCollection<T> {
        return this.contentCollections.get(collectionName) as MazeContentCollection<T>;
    }

    public createCollection<T extends Collectible>(collectionName: string): MazeContentCollection<T> {
        if (this.collectionExists(collectionName)) {
        	throw "Failed to create new MazeContentCollection.  Named collection already exists."
        }

        this.contentCollections.set(collectionName, new MazeContentCollection<T>(collectionName, this.maze));
        return this.contentCollections.get(collectionName) as MazeContentCollection<T>;
    }
}
