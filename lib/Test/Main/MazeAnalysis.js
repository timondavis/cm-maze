"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const Compass4_1 = require("../../Behavior/Compass4");
const MazeBuilder_1 = require("../../Maze/MazeBuilder");
const MazeAnalysis_1 = require("../../Maze/MazeAnalysis");
describe('MazeAnalysis', () => {
    it('builds an accurate collection of nodes that share an edge with a vacant space at the given node exit point', () => {
        let mb = new MazeBuilder_1.MazeBuilder(new Compass4_1.Compass4());
        // Make multiple attempts - randomization means that there will be times that bugs related to this test
        // do not manifest themselves.
        for (let attempt = 0; attempt < 25; attempt++) {
            let maze = mb.buildMaze();
            let analysis = new MazeAnalysis_1.MazeAnalysis(maze);
            let node;
            let nodeIds;
            for (let direction = 0; direction < 4; direction++) {
                nodeIds = analysis.nodeIdsAdjacentToBorderAtExitPoint.get(direction);
                for (let idIndex = 0; idIndex < nodeIds.length; idIndex++) {
                    node = maze.getNodeWithId(nodeIds[idIndex]);
                    if (node && node.id.indexOf('EXIT-'))
                        chai_1.expect(node.getNeighborIdAt(direction) === undefined ||
                            node.getNeighborIdAt(direction).indexOf('EXIT-') === 0).to.be.true;
                }
            }
        }
    });
});
