import {expect} from 'chai';
import 'mocha';
import {Compass4} from "../../Behavior/Compass4";
import {MazeBuilder} from "../../MazeBuilder";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {MazeNode} from "../../MazeNode";

describe ('MazeAnalysis', () => {

    it( 'builds an accurate collection of nodes that share an edge with a vacant space at the given node exit point', () => {

        let mb: MazeBuilder = new MazeBuilder(new Compass4());

        // Make multiple attempts - randomization means that there will be times that bugs related to this test
        // do not manifest themselves.
        for (let attempt = 0 ; attempt < 25 ; attempt++ ) {

            let maze = mb.buildMaze();
            let analysis = new MazeAnalysis(maze);

            let node: MazeNode;
            let nodeIds: string[];

            for (let direction = 0 ; direction < 4 ; direction++) {

                nodeIds = analysis.nodeIdsWithVacanciesAtDirection.get(direction);

                for (let idIndex = 0 ; idIndex < nodeIds.length ; idIndex++) {
                    node = maze.getNodeWithId(nodeIds[idIndex]);

                    if (node === null) {
                        console.log(`Missing Node ID: ${nodeIds[direction]}`);
                        console.log(`Node ID List: ${nodeIds}`);
                        console.log(`i: ${direction}`);
                        console.log(`idIndex: ${idIndex}`);
                    }

                    expect(node.getNeighborIdAt(direction)).to.be.undefined;
                }
            }
        }
    });
});