import {MazeContentAtlas} from "../../Contents/MazeContentAtlas";
import {Maze, MazeNode, Collectible} from "../..";
import {MazeContentCollection} from "../../Contents/MazeContentCollection";
import {expect} from 'chai';
import 'mocha';


describe('MazeContentCollection', () => {

    it('knows the name of its bound collection', async () => { });

    it('can recall items items stored on a given maze node', async () => { });

    it ('is aware of its size', async () => { });

    it ('facilitates transfer of item from one node to another', async () => { });

    it ('provides a forEach method to traverse the collection contents at a given node', async () => { });

    it ('provides a foreach method to visit each item in the collection, regardless of location', async () => { });

    it ('allows items to be removed from a given node by providing the item id', async () => { });

    it ('recalls the node containing a given item', async() => { });

    it ('should restrict contents of the collection to items of the same type or subtype of its template');
});

class ConcreteCollectible implements Collectible {
    constructor(public id: string) {}
}

class OtherCollectible implements Collectible {
    constructor(public id: string) {}
}
