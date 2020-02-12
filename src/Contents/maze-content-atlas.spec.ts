import {Maze, MazeNode} from "cm-maze";
import {MazeContentAtlas} from "./MazeContentAtlas";

/*
describe('MazeContentAtlas', () => {

    beforeEach(async () => { TestBed.configureTestingModule({ imports: [ HttpClientModule ] }); });

    let createNewMaze = async() => {
        let mazeService = TestBed.get(MazeService) as MazeService;
        return new Promise((resolve, reject) => {
            mazeService.createMaze().subscribe((maze: Maze) => {
                resolve(maze);
            })
        });
    };

    it( 'should confirm the existence or non-existence of a member collection by name', async () => {
        let maze = await createNewMaze() as Maze;
        let atlas = new MazeContentAtlas(maze);
        atlas.createCollection<ConcreteCollectible>('collection');

        expect(atlas.collectionExists('collection')).toBeTruthy();
        expect(atlas.collectionExists('not-valid')).toBeFalsy();
    });

    it ('should retrieve existing collections by demand, given the collection name', async () => {
         let utilityService = TestBed.get(UtilityService) as UtilityService;
         let maze = await createNewMaze() as Maze;
         let atlas = new MazeContentAtlas(maze);
         let name = utilityService.generateUniqueId();
         atlas.createCollection<ConcreteCollectible>(name);

         let collection = atlas.getCollection(name);
         expect(collection.collectionName).toBe(name);
    });

    it ( 'should serve as a factory for MazeContentCollections', async() => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await createNewMaze() as Maze;
        let atlas = new MazeContentAtlas(maze);
        let name = utilityService.generateUniqueId();
        let collection = atlas.createCollection<ConcreteCollectible>(name);

        expect(collection.collectionName).toBe(name);
    });

    it ('should store data for its member MazeContentCollections', async() => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await createNewMaze() as Maze;
        let atlas = new MazeContentAtlas(maze);
        let collection = atlas.createCollection<ConcreteCollectible>('collection');
        let items: ConcreteCollectible[] = [];

        let collectionSize = Math.floor(Math.random() * 3);
        for (let i = 0 ; i < collectionSize ; i++) {
            items[i] = new ConcreteCollectible(utilityService.generateUniqueId());
            collection.addItemToNode(items[i], maze.getStartNode());
        }

        let collectionAlso = atlas.getCollection<ConcreteCollectible>('collection');
        expect(collectionAlso.size).toBe(collectionSize);
        expect(collectionAlso.size).toBe(collection.size);

        for (let i = 0 ; i < collectionSize ; i++) {
            let item = collectionAlso.getItemFromNode(items[i].getId(), maze.getStartNode());
            expect(item.getId()).toBe(items[i].getId());
        }
    });

    it ('should make the category contents of a node accessible as a CollectibleList' , async () => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await createNewMaze() as Maze;
        let atlas = new MazeContentAtlas(maze);
        let collectionId = utilityService.generateUniqueId();
        let items: ConcreteCollectible[] = [];
        let collectionSize = Math.floor(Math.random() * 10);
        atlas.createCollection<ConcreteCollectible>(collectionId);

        for (let i = 0 ; i < collectionSize ; i++) {
            items[i] = new ConcreteCollectible(utilityService.generateUniqueId());
            atlas.addItemToNode(collectionId, items[i], maze.getStartNode());
        }

        let list: CollectibleList<ConcreteCollectible> = atlas.getItemsFromNode(collectionId, maze.getStartNode());
        expect(list.size).toBe(collectionSize);

        for (let i = 0 ; i < collectionSize ; i++) {
            expect(list.findItemWithId(items[i].getId()).getId()).toBe(items[i].getId());
        }
    });

    it ('should facilitate the addition and removal of items from the named collection', async () => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await createNewMaze() as Maze;
        let atlas = new MazeContentAtlas(maze);
        let collectionId = utilityService.generateUniqueId();
        let items: ConcreteCollectible[] = [];
        let collectionSize = Math.floor(Math.random() * 10);
        atlas.createCollection<ConcreteCollectible>(collectionId);

        for (let i = 0 ; i < collectionSize ; i++) {
            items[i] = new ConcreteCollectible(utilityService.generateUniqueId());
            atlas.addItemToNode(collectionId, items[i], maze.getStartNode());
        }

        let list: CollectibleList<ConcreteCollectible> = atlas.getItemsFromNode(collectionId, maze.getStartNode());
        expect(list.size).toBe(collectionSize);

        for (let i = 0 ; i < collectionSize ; i++) {
            expect(list.findItemWithId(items[i].getId()).getId()).toBe(items[i].getId());
        }

        for (let i = 0 ; i < collectionSize ; i++) {
            list.delete(items[i]);
        }
    });

    it ( 'should know which node every item within a collection resides on the maze', async () => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await createNewMaze() as Maze;
        let nodesArray = maze.getNodesArray();
        let atlas = new MazeContentAtlas(maze);
        atlas.createCollection<ConcreteCollectible>('collection');

        let nodes: MazeNode[] = [];
        let items: ConcreteCollectible[] = [];

        let itemCount = Math.floor(Math.random() * 1000);

        for ( let i = 0 ; i < itemCount ; i++ ) {
            let item = new ConcreteCollectible(utilityService.generateUniqueId());
            items[i] = item;
            let nodeIndex = Math.floor(Math.random() * (nodesArray.length - 1));
            let node = nodesArray[nodeIndex];
            nodes[i] = node;
            atlas.addItemToNode<ConcreteCollectible>('collection', item, node);
        }

        for (let i = 0 ; i < itemCount ; i++) {
            let node = nodes[i];
            let item = items[i];
            expect(atlas.getItemNode('collection', item).getId()).toBe(node.getId());
        }
    });

    it ('should provide a forEach method to traverse through contents of a given node', async() => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await createNewMaze() as Maze;
        let nodesArray = maze.getNodesArray();
        let atlas = new MazeContentAtlas(maze);
        atlas.createCollection<ConcreteCollectible>('collection');

        let items: ConcreteCollectible[] = [];
        let nodeIndexes : number[] = [];

        let itemCount = Math.floor(Math.random() * 1000);

        for (let i = 0 ; i < itemCount ; i++) {
            items[i] = new ConcreteCollectible(utilityService.generateUniqueId());
            let nodeIndex = Math.floor(Math.random() * nodesArray.length);
            nodeIndexes[i] = nodeIndex;
            atlas.addItemToNode<ConcreteCollectible>('collection', items[i], nodesArray[nodeIndex]);
        }

        expect(items.length).toBe(itemCount);

        atlas.forEachItemInCollection<ConcreteCollectible>('collection', (item: ConcreteCollectible) => {
            expect(atlas
                .getItemNode('collection', item).getId())
                .toBe(nodesArray[nodeIndexes[items.indexOf(item)]].getId());
        });
    });
});

class ConcreteCollectible implements Collectible {
    constructor (private _id: string) {}
    getId(): string { return this._id; }
}
 */
