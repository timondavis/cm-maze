import {CollectibleList} from "./CollectibleList";
import {Collectible} from "./Collectible";

/*
describe('CollectibleList', () => {

   beforeEach(() => TestBed.configureTestingModule({ }));

   it ('is aware of its size', () => {

       let startSize = Math.floor(Math.random() * 1000) + 500;
       let reduceSize = Math.floor(Math.random() * 100);

       let itemCollection = new CollectibleList();
       for (let i = 0 ; i < startSize ; i++) {
            itemCollection.insert(new ConcreteCollectible(i.toString())) ;
       }
       for (let i = 0 ; i < reduceSize ; i++) {
            itemCollection.deleteItemWithId(i.toString());
       }

       expect(itemCollection.size).toBe(startSize - reduceSize);
   });

   it ('can report on items are present or not present in the collection', () => {
       const utilityService: UtilityService = TestBed.get(UtilityService);

       let goodIds: string[] = [];
       let badIds: string[] = [];

       let testSize = Math.floor(Math.random() * 1000) + 500;
       let testCollection = new CollectibleList();

       for (let i = 0 ; i < testSize ; i++) {
           goodIds.push(utilityService.generateUniqueId());
           testCollection.insert(new ConcreteCollectible(goodIds[i]));
           badIds.push(utilityService.generateUniqueId());
       }

       for (let i = 0 ; i < testSize ; i++) {
           expect(testCollection.hasItem(new ConcreteCollectible(badIds[i]))).toBeFalsy();
           expect(testCollection.hasItemWithId(badIds[i])).toBeFalsy();
           expect(testCollection.hasItem(new ConcreteCollectible(goodIds[i]))).toBeTruthy();
           expect(testCollection.hasItemWithId(goodIds[i])).toBeTruthy();
       }
   });

   it ('can add and remove items from the collection reliably', () => {
       let itemCount = 1000;
        const utilityService: UtilityService = TestBed.get(UtilityService);
        let itemCollection = new CollectibleList();
        let itemIds: string[] = [];
        for (let i = 0 ; i < itemCount ; i++) {
            let id = utilityService.generateUniqueId();

            itemCollection.insert(new ConcreteCollectible(id));
            itemIds.push(id);
        }
        expect(itemCollection.size).toBe(itemCount);

        for (let i = 0 ; i < itemIds.length ; i++) {
           itemCollection.delete(new ConcreteCollectible(itemIds[i]));
        }
        expect(itemCollection.size).toBe(0);
   });

   it ( 'facilitates forEach through ordered items', () => {
       const utilityService: UtilityService = TestBed.get(UtilityService);
       let collectionSize = Math.floor(Math.random() * 1000);
       let testCollection = new CollectibleList();
       let ids = [];

       for ( let i = 0 ; i < collectionSize ; i++) {
           ids[i] = utilityService.generateUniqueId();
           testCollection.insert(new ConcreteCollectible(ids[i]));
       }

       testCollection.forEach((item: Collectible, i: number, testCollectionArray: Collectible[]) => {
           expect(ids.indexOf(testCollectionArray[i].getId())).toBeGreaterThanOrEqual(0);

           if (i > 0) {
               expect(testCollection.compare(testCollectionArray[i], testCollectionArray[i -1])).toBeGreaterThan(0);
           }
       });

   });
});

class ConcreteCollectible implements Collectible{
    constructor(private _id: string) {}
    getId(): string {
        return this._id;
    }
};
 */
