import {Maze, MazeNode, Collectible, CollectibleList} from "../..";
import {MazeContentAtlas} from "../../Contents/MazeContentAtlas";
import {expect} from 'chai';
import 'mocha';


describe('MazeContentAtlas', () => {

    it( 'should confirm the existence or non-existence of a member collection by name', async () => { });

    it ('should retrieve existing collections by demand, given the collection name', async () => { });

    it ( 'should serve as a factory for MazeContentCollections', async() => { });

    it ('should store data for its member MazeContentCollections', async() => { });

    it ('should make the category contents of a node accessible as a CollectibleList' , async () => { });

    it ('should facilitate the addition and removal of items from the named collection', async () => { });

    it ( 'should know which node every item within a collection resides on the maze', async () => { });

    it ('should provide a forEach method to traverse through contents of a given node', async() => { });
});

class ConcreteCollectible implements Collectible {
    constructor (public id: string) {}
    getId(): string { return this.id; }
}
