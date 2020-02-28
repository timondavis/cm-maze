import {Collectible} from "../../";
import {CollectibleList} from "../../";
import {expect} from 'chai';
import 'mocha';
import {IdentificationGenerator} from "cm-domain-utilities";

describe('CollectibleList', () => {

   it ('is aware of its size', () => {
   		let testPassesRequired = 10;
   		let testSampleMax = 1000;

   		for (let testPass = 0 ; testPass < testPassesRequired ; testPass++) {
			let newSize = Math.round(Math.random() * testSampleMax) + 1;
			let list = new CollectibleList<ConcreteCollectible>();

			for (let i = 0 ; i < newSize ; i++ ) {
				list.insert(new ConcreteCollectible(IdentificationGenerator.UUID()));
			}

			expect(list.size).to.be.equal(newSize);
		}
   });

   it ('facilitates forEach through ordered items', () => {
   		let testSampleMax = 100;
   		let testPassesRequired = 5;

   		for (let testPass = 0 ; testPass < testPassesRequired ; testPass++) {
   			let testSampleSize = Math.round(Math.random() * testSampleMax) + 1;
   			let list = new CollectibleList<ConcreteCollectible>();
			let ids: string[] = [];

			for (let testSampleIndex = 0 ; testSampleIndex < testSampleSize ; testSampleIndex++) {
   				ids[testSampleIndex] = (IdentificationGenerator.UUID());
   				list.insert(new ConcreteCollectible(ids[testSampleIndex]));
			}

   			expect(ids.length).to.be.equal(testSampleSize);
   			expect(list.size).to.be.equal(ids.length);

   			list.forEach((item: ConcreteCollectible) => {
   				ids.splice(ids.indexOf(item.id), 1);
			});

   			expect(ids.length).to.be.equal(0);
		}
   });

   it ( 'allows contents to be inserted and deleted', () => {
		let item1 = new ConcreteCollectible('1');
		let item2 = new ConcreteCollectible('2');
		let item3 = new ConcreteCollectible('3');
		let item4 = new ConcreteCollectible('4');

		let list = new CollectibleList<ConcreteCollectible>();

		list.insert(item1); list.insert(item2); list.insert(item3);

		expect(list.size).to.be.equal(3);
		expect(list.findItemWithId('2')).to.be.equal(item2);

		expect(list.findItemWithId('3')).to.be.equal(item3);
		list.delete(item3);
		expect(list.size).to.be.equal(2);
		expect(list.findItemWithId('3')).to.be.null;

		list.insert(item4);
		expect(list.size).to.be.equal(3);
		expect(list.findItemWithId('1')).to.be.equal(item1);
	    expect(list.findItemWithId('4')).to.be.equal(item4);
   });

   it ('can report on items are present or not present in the collection', () => {
   		let testPasses = 5;
   		let testRangeMax = 100;

   		for(let testPass = 0 ; testPass < testPasses ; testPass++) {
   			let itemsIn: ConcreteCollectible[] = [];
			let itemsOut: ConcreteCollectible[] = [];
			let testRange = Math.round(Math.random() * testRangeMax) + 10;
			let list = new CollectibleList<ConcreteCollectible>();

			for (let i = 0 ; i < testRange ; i++) {
				itemsIn[i] = new ConcreteCollectible(IdentificationGenerator.UUID());
				itemsOut[i] = new ConcreteCollectible(IdentificationGenerator.UUID());
				list.insert(itemsIn[i])
			}

			for (let i = 0 ; i < testRange ; i++) {
				expect(list.findItemWithId(itemsIn[i].id)).to.be.equal(itemsIn[i]);
				expect(list.findItemWithId(itemsOut[i].id)).to.be.null;
			}
		}
   });

   it ( 'can find Collection items and retrieve them when given an ID', () => {});

   it ('can add and remove items from the collection reliably', () => {});
});

class ConcreteCollectible implements Collectible{
    constructor(public id: string) {}
    getId(): string { return this.id; }
};
