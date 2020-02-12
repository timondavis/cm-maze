import {MazeContentAtlas} from "./MazeContentAtlas";
import {Maze, MazeNode} from "cm-maze";
import {MazeContentCollection} from "./MazeContentCollection";

/**
describe('MazeContentCollection', () => {

    let getNewMaze = async() => {
        let mazeService = TestBed.get(MazeService);
        return new Promise((resolve, reject) => {
            mazeService.createMaze().subscribe((maze: Maze) => {
                resolve(maze);
            }, (err) => console.error(err));
        });
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [ HttpClientModule ]
        });
    });

    it('knows the name of its bound collection', async () => {
        let utilityService = TestBed.get(UtilityService);
        let collectionName = utilityService.generateUniqueId();
        let newMaze = await getNewMaze() as Maze;
        let atlas = new MazeContentAtlas(newMaze);
        let collection: MazeContentCollection<ConcreteCollectible> = atlas.createCollection<ConcreteCollectible>(collectionName);
        expect(collection.collectionName).toBe(collectionName);
    });

    it( 'can recall items items stored on a given maze node', async () => {
        let newMaze = await getNewMaze() as Maze;
        let atlas = new MazeContentAtlas(newMaze);
        let collection = atlas.createCollection<ConcreteCollectible>('collection');
        let startNode = newMaze.getStartNode();

        let collectionStore: ConcreteCollectible[] = [];
        let collectionStoreSize = Math.floor(Math.random() * 1000);
        let utilityService = TestBed.get(UtilityService);

        for (let i = 0 ; i < collectionStoreSize ; i++){
            collectionStore.push(new ConcreteCollectible(utilityService.generateUniqueId()));
            collection.addItemToNode(collectionStore[i], startNode);
        }

        for (let i = 0 ; i < collectionStoreSize ; i++) {
            let itemFromStore = collectionStore[i];
            expect(collection.getItemFromNode(itemFromStore.getId(), startNode)).toBeTruthy();
            collection.removeItemFromNode(itemFromStore, startNode);
            expect(collection.getItemFromNode(itemFromStore.getId(), startNode)).toBeFalsy();
        }

        expect(collection.size).toBe(0);
    });

    it ( 'is aware of its size', async () => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;

        let maze = await getNewMaze() as Maze;
        let atlas = new MazeContentAtlas(maze);
        let collection = atlas.createCollection<ConcreteCollectible>('collection');

        let itemCount = Math.floor(Math.random() * 10000);

        for (let i = 0 ; i < itemCount ; i++) {
            collection.addItemToNode(new ConcreteCollectible(utilityService.generateUniqueId()), maze.getStartNode());
        }

        expect(collection.size).toBe(itemCount);
    });

    it ('facilitates transfer of item from one node to another', async () => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;

        let maze = await getNewMaze() as Maze;
        let atlas = new MazeContentAtlas(maze);
        let collection = atlas.createCollection<ConcreteCollectible>('collection');

        let itemCount = Math.floor(Math.random() * 10000);
        let newHomes = new Map<ConcreteCollectible, MazeNode>();
        let nodesArray = maze.getNodesArray();

        for (let i = 0 ; i < itemCount ; i++) {
            let nodeIndex = Math.floor(Math.random() * (nodesArray.length - 1));
            let targetNode = nodesArray[nodeIndex];

            if (targetNode.getId() === maze.getStartNode().getId()) {
                i--;
                continue;
            }

            let item: ConcreteCollectible = new ConcreteCollectible(utilityService.generateUniqueId());
            collection.addItemToNode(item, maze.getStartNode());
            newHomes.set(item, targetNode);
        }

        Array.from(newHomes.keys()).forEach((item: ConcreteCollectible) => {
            collection.moveItemToNode(item, newHomes.get(item));
            expect(collection.getItemFromNode(item.getId(), newHomes.get(item)).getId()).toBe(item.getId());
            expect(collection.getItemFromNode(item.getId(), maze.getStartNode())).toBeFalsy();
        });

        Array.from(newHomes.keys()).forEach((item: ConcreteCollectible) => {
            expect(item.getId()).toBeTruthy();
            expect(item.getId().length).toBe(36); // uuid length
            expect(collection.getItemFromNode(item.getId(), newHomes.get(item)).getId()).toBe(item.getId());
        })
    });

    it ( 'provides a forEach method to traverse the collection contents at a given node', async () => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await getNewMaze() as Maze;
        let atlas = new MazeContentAtlas(maze);
        let collection = atlas.createCollection<ConcreteCollectible>('collection');

        let myArray: ConcreteCollectible[] = [];

        let itemCount = Math.floor(Math.random() * 10000);
        for ( let i = 0 ; i < itemCount ; i++ ) {
            let item = new ConcreteCollectible(utilityService.generateUniqueId());
            collection.addItemToNode(item, maze.getStartNode());
            myArray.push(item);
        }
        expect(myArray.length).toBe(itemCount);

        collection.forEachAtNode(maze.getStartNode(), (item) => {
            let index = myArray.indexOf(item);
            expect(myArray[index].getId()).toBe(item.getId());
            myArray.splice(index, 1);
        });

        expect(myArray.length).toBe(0);
    });

    it ('provides a foreach method to visit each item in the collection, regardless of location', async () => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await getNewMaze() as Maze;
        let mazeNodes = maze.getNodesArray();
        let atlas = new MazeContentAtlas(maze);
        let collection = atlas.createCollection<ConcreteCollectible>('collection');
        let itemsArray: ConcreteCollectible[] = [];

        let collectionSize = Math.floor(Math.random() * 10000);

        for(let i = 0 ; i < collectionSize ; i++) {
            let item = new ConcreteCollectible(utilityService.generateUniqueId());
            itemsArray.push(item);
            collection.addItemToNode(item, mazeNodes[Math.floor(Math.random() * (mazeNodes.length - 1))]);
        }

        expect(collection.size).toBe(collectionSize);

        collection.forEachInCollection((item) => {
            let node = collection.getItemNode(item);
            expect(item.getId().length).toBe(36);
            expect(collection.getItemFromNode(item.getId(), node).getId()).toBe(item.getId());
            collection.removeItemFromNode(item, node);
        });

        expect(collection.size).toBe(0);
    });

    it ('allows items to be removed from a given node by providing the item id', async () => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await getNewMaze() as Maze;
        let atlas = new MazeContentAtlas(maze);
        let collection = atlas.createCollection<ConcreteCollectible>('collection');
        let itemsCreated: ConcreteCollectible[] = [];

        let collectionSize = Math.floor(Math.random() * 10000);

        for (let i = 0; i < collectionSize ; i++) {
            let item = new ConcreteCollectible(utilityService.generateUniqueId());
            collection.addItemToNode(item, maze.getStartNode());
            itemsCreated[i] = item;
        }

        expect(collection.size).toBe(collectionSize);

        for (let i = 0 ; i < collectionSize ; i++) {
            collection.removeItemFromNode(itemsCreated[i], maze.getStartNode());
        }

        expect(collection.size).toBe(0);
    });

    it ('recalls the node containing a given item', async() => {
        let utilityService = TestBed.get(UtilityService) as UtilityService;
        let maze = await getNewMaze() as Maze;
        let nodesArray = maze.getNodesArray();
        let atlas = new MazeContentAtlas(maze);
        let collection = atlas.createCollection<ConcreteCollectible>('collection');
        let itemsCreated: ConcreteCollectible[] = [];
        let nodeCreationIndex: number[] = [];

        let collectionSize = Math.floor(Math.random() * 10000);

        for (let i = 0 ; i < collectionSize ; i++) {
            let item = new ConcreteCollectible(utilityService.generateUniqueId());
            let nodeIndex = Math.floor(Math.random() * (nodesArray.length - 1));
            let node  = nodesArray[nodeIndex];

            nodeCreationIndex[i] = nodeIndex;
            itemsCreated[i] = item;
            collection.addItemToNode(item, node);
        }

        for (let i = 0 ; i < collectionSize ; i++) {
            let node = nodesArray[nodeCreationIndex[i]];
            let item = itemsCreated[i];
            expect(collection.getItemNode(item).getId()).toBe(node.getId());
        }
    });

    it ('should restrict contents of the collection to items of the same type or subtype of its template');
});

class ConcreteCollectible implements Collectible {

    constructor(private _id: string) {}

    getId(): string {
        return this._id;
    }
}

class OtherCollectible implements Collectible {
    constructor(private _id: string) {}

    getId(): string {
        return this._id;
    }

    setId(val: string) {
        this._id = val;
    }
}
*/
