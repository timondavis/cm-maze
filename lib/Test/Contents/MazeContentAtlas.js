"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const MazeContentAtlas_1 = require("../../Contents/MazeContentAtlas");
const chai_1 = require("chai");
require("mocha");
const cm_domain_utilities_1 = require("cm-domain-utilities");
describe('MazeContentAtlas', () => {
    let mb;
    let maze;
    before(() => {
        mb = new __1.MazeBuilder();
    });
    beforeEach(() => {
        maze = mb.buildMaze();
    });
    it('reports on whether a collection with a given name exists within the atlas', () => __awaiter(void 0, void 0, void 0, function* () {
        let testPasses = 5;
        let testMaxRange = 100;
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let atlas = new MazeContentAtlas_1.MazeContentAtlas(maze);
            let name = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let badName = cm_domain_utilities_1.IdentificationGenerator.UUID();
            atlas.createCollection(name);
            chai_1.expect(atlas.collectionExists(name)).to.be.true;
            chai_1.expect(atlas.collectionExists(badName)).to.be.false;
        }
    }));
    it('creates, stores and recalls collections', () => __awaiter(void 0, void 0, void 0, function* () {
        let testPasses = 5;
        let testMaxRange = 100;
        for (let testPass = 0; testPass < testPasses; testPass++) {
            let atlas = new MazeContentAtlas_1.MazeContentAtlas(maze);
            let name = cm_domain_utilities_1.IdentificationGenerator.UUID();
            let testRange = Math.round(Math.random() * testMaxRange) + 1;
            let collection = atlas.createCollection(name);
            let items = [];
            for (let i = 0; i < testRange; i++) {
                let uuid = cm_domain_utilities_1.IdentificationGenerator.UUID();
                let node = maze.getRandomNode();
                items.push(new ConcreteCollectible(uuid));
                collection.addItemToNode(items[i], node);
            }
            let recalledCollection = atlas.getCollection(name);
            chai_1.expect(recalledCollection).to.exist;
            chai_1.expect(recalledCollection.size).to.be.equal(testRange);
            chai_1.expect(items.length).to.be.equal(testRange);
            recalledCollection.forEachInCollection((item) => {
                chai_1.expect(recalledCollection.isItemInCollection(item.id)).to.be.true;
                items.splice(items.indexOf(item), 1);
            });
            chai_1.expect(items.length).to.be.equal(0);
        }
    }));
});
class ConcreteCollectible {
    constructor(id) {
        this.id = id;
    }
    getId() { return this.id; }
}
