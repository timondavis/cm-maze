import { Maze } from "..";
import { MazeContentCollection } from "./MazeContentCollection";
import { Collectible } from "./Collectible";
export declare class MazeContentAtlas {
    private maze;
    private contentCollections;
    constructor(maze: Maze);
    collectionExists(collectionName: string): boolean;
    getCollection<T extends Collectible>(collectionName: string): MazeContentCollection<T>;
    createCollection<T extends Collectible>(collectionName: string): MazeContentCollection<T>;
}
