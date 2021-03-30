"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
require("mocha");
const cm_domain_utilities_1 = require("cm-domain-utilities");
describe('CollectibleList', () => {
    it('is aware of its size', () => {
        let testPassesRequired = 10;
        let testSampleMax = 1000;
        for (let testPass = 0; testPass < testPassesRequired; testPass++) {
            let newSize = Math.round(Math.random() * testSampleMax) + 1;
            let list = new __1.CollectibleList();
            for (let i = 0; i < newSize; i++) {
                list.insert(new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID()));
            }
            chai_1.expect(list.size).to.be.equal(newSize);
        }
    });
    it('facilitates forEach through ordered items', () => {
        let testSampleMax = 100;
        let testPassesRequired = 5;
        for (let testPass = 0; testPass < testPassesRequired; testPass++) {
            let testSampleSize = Math.round(Math.random() * testSampleMax) + 1;
            let list = new __1.CollectibleList();
            let ids = [];
            for (let testSampleIndex = 0; testSampleIndex < testSampleSize; testSampleIndex++) {
                ids[testSampleIndex] = (cm_domain_utilities_1.IdentificationGenerator.UUID());
                list.insert(new ConcreteCollectible(ids[testSampleIndex]));
            }
            chai_1.expect(ids.length).to.be.equal(testSampleSize);
            chai_1.expect(list.size).to.be.equal(ids.length);
            list.forEach((item) => {
                ids.splice(ids.indexOf(item.id), 1);
            });
            chai_1.expect(ids.length).to.be.equal(0);
        }
    });
    it('allows contents to be inserted and deleted reliably', () => {
        let item1 = new ConcreteCollectible('1');
        let item2 = new ConcreteCollectible('2');
        let item3 = new ConcreteCollectible('3');
        let item4 = new ConcreteCollectible('4');
        let list = new __1.CollectibleList();
        list.insert(item1);
        list.insert(item2);
        list.insert(item3);
        chai_1.expect(list.size).to.be.equal(3);
        chai_1.expect(list.findItemWithId('2')).to.be.equal(item2);
        chai_1.expect(list.findItemWithId('3')).to.be.equal(item3);
        list.delete(item3);
        chai_1.expect(list.size).to.be.equal(2);
        chai_1.expect(list.findItemWithId('3')).to.be.null;
        list.insert(item4);
        chai_1.expect(list.size).to.be.equal(3);
        chai_1.expect(list.findItemWithId('1')).to.be.equal(item1);
        chai_1.expect(list.findItemWithId('4')).to.be.equal(item4);
    });
    it('can report on items are present or not present in the collection', () => {
        let testPasses = 5;
        let testRangeMax = 100;
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let itemsIn = [];
            let itemsOut = [];
            let testRange = Math.round(Math.random() * testRangeMax) + 10;
            let list = new __1.CollectibleList();
            for (let i = 0; i < testRange; i++) {
                itemsIn[i] = new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID());
                itemsOut[i] = new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID());
                list.insert(itemsIn[i]);
            }
            for (let i = 0; i < testRange; i++) {
                chai_1.expect(list.findItemWithId(itemsIn[i].id)).to.be.equal(itemsIn[i]);
                chai_1.expect(list.findItemWithId(itemsOut[i].id)).to.be.null;
            }
        }
    });
    it('can find Collection items and retrieve them when given an ID', () => {
        let testPasses = 5;
        let testRangeMax = 100;
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let items = [];
            let list = new __1.CollectibleList();
            for (let i = 0; i < testRangeMax; i++) {
                items[i] = new ConcreteCollectible(cm_domain_utilities_1.IdentificationGenerator.UUID());
                list.insert(items[i]);
            }
            let randomItem = items[Math.round(Math.random() * testRangeMax)];
            let foundItemFromList = list.findItemWithId(randomItem.id);
            chai_1.expect(randomItem).to.be.equal(foundItemFromList);
        }
    });
});
class ConcreteCollectible {
    constructor(id) {
        this.id = id;
    }
    getId() { return this.id; }
}
;
