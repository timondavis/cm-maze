import {Maze} from "../../Maze";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {MazeNode} from "../../MazeNode";
import {Cardinality} from "../../Behavior/Cardinality";
import {MazeBuilder} from "../../MazeBuilder";

export abstract class ExitPlacementBehavior {

    private static generatedExitCount: number = 0;

    constructor(protected maze: Maze, protected mazeAnalysis: MazeAnalysis) {}

    abstract placeEntrance(): void;
    abstract placeExit(): void;

    protected generateExitNode(cardinality: Cardinality) {

        let node = new MazeNode(cardinality, `EXIT-${ExitPlacementBehavior.generatedExitCount}`);
        node.maxConnections = 2;
        node.name = `Exit-${ExitPlacementBehavior.generatedExitCount}`;
        ExitPlacementBehavior.generatedExitCount++;

        return node;
    }

    protected findRandomNodeAdjacentToBorderAtExitPoint(exitPoint: number, excludedNodeIds: string[] = []): MazeNode {

    	// Copy an array of border node IDs from the maze analysis
    	let availableNodeIds = [];
    	this.mazeAnalysis.nodeIdsAdjacentToBorderAtExitPoint.get(exitPoint).forEach((id) => {
    			availableNodeIds.push(id);
		});

    	// If there are excluded IDs, remove them from the collection of available IDs
		if (excludedNodeIds.length > 0) {
			for ( let excludedIdIndex = 0 ; excludedIdIndex < excludedNodeIds.length ; excludedIdIndex++) {
				availableNodeIds = availableNodeIds.filter(id => id !== excludedNodeIds[excludedIdIndex]);
			}
		}

		// Pick a random node ID and ship it back.
		if (availableNodeIds.length == 0) {
			throw `Could not find any eligible border nodes to select at exit point ${exitPoint}`;
		}

		return this.selectRandomNodeFromIdCollection(availableNodeIds);
	}

    protected findRandomBorderNode(excludedNodeIds: string[] = []): MazeNode {

    	let exitPoint: number = Math.floor(Math.random() * this.maze.getCardinality().getConnectionPointCount());
    	exitPoint = this.maze.getCardinality().roundConnectionPointToPrimeCardinality(exitPoint);
    	return this.findRandomNodeAdjacentToBorderAtExitPoint(exitPoint, []);
    }

    /**
     * Select a random node on the existing maze.
     *
     * @returns {MazeNode}
     */
    protected selectRandomNode() : MazeNode {

        let coordinateList = Object.keys( this.maze.getNodes() );
        let index = MazeBuilder.rand( coordinateList.length - 1, 0 );

        return this.maze.getNodes()[coordinateList[index]];
    }

    private selectRandomNodeFromIdCollection(availableNodeIds: string[]) : MazeNode {

		let availableNodeIndex: number; let nodeId: string;

		availableNodeIndex = Math.floor(Math.random() * availableNodeIds.length);
		nodeId = availableNodeIds[availableNodeIndex];
		return this.maze.getNodeWithId(nodeId);
	}
}
