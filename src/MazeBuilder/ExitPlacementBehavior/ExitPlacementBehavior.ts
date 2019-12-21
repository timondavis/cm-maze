import {Maze} from "../../Maze";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {MazeNode} from "../../MazeNode";
import {Cardinality} from "../../Behavior/Cardinality";
import {MazeBuilder} from "../../MazeBuilder";

export abstract class ExitPlacementBehavior {

    protected entranceNodeId: string;
    protected directionIntoEntrance: number;
    protected exitNodeId: string;
    protected static exitId: number = 0;

    constructor(protected maze: Maze, protected mazeAnalysis: MazeAnalysis) {}

    abstract placeEntrance(): void;
    abstract placeExit(): void;

    protected generateExitNode(cardinality: Cardinality) {
        let node = new MazeNode(cardinality, 'EXIT-' + ExitPlacementBehavior.exitId);
        node.setMaxConnections(cardinality.getConnectionPointCount());
        return node;
    }

    /**
     * Given the direction from which a vacant node location would enter into an occupied node location,
     * select a node that fits this description.
     *
     * @param direction
     * @param cardinality
     * @param cardinalityPointCandidates
     */
    protected findBorderNodeEnteringFromDirection(direction: number, cardinality: Cardinality, excludedNodeIds: string[] = []): MazeNode {
        let nodesAvailableFromDirection: string[];
        let randomNodeIndex: number;
        let selectedNode: MazeNode = null;

        // Below is verified manually - works!
        nodesAvailableFromDirection = this.mazeAnalysis.nodeIdsWithVacanciesAtDirection.get(cardinality.getOpposingConnectionPoint(direction));

        while(nodesAvailableFromDirection.length > 0) {

            // Pick Random Node from Collection
            randomNodeIndex = Math.floor(Math.random() * (nodesAvailableFromDirection.length - 1));
            selectedNode = this.maze.getNodeWithId(nodesAvailableFromDirection[randomNodeIndex]);

            if (excludedNodeIds.indexOf(selectedNode.getId()) === -1) {
                break;
            } else {
                nodesAvailableFromDirection.splice(nodesAvailableFromDirection.indexOf(selectedNode.getId()), 1);
            }
        }

        return selectedNode;
    }

    protected findBorderNodeEnteringFromRandomDirection(excludedNodeIds: string[] = [], excludedDirections: number[] = []): { node: MazeNode, direction: number} {
        let cardinalityPointsRemaining: number[] = [];
        let cardinalityPoints = this.maze.getCardinality().getConnectionPointCount();
        let selectedNode: MazeNode;
        let randomCardinalityPoint: number;
        for ( let i = 0 ; i < cardinalityPoints ; i++ ) {
            if (excludedDirections.indexOf(i) === -1) {
                cardinalityPointsRemaining.push(i);
            }
        }

        if (!cardinalityPointsRemaining || cardinalityPointsRemaining.length <= 0) {
            throw "No valid cardinality points available for random node selection";
        }

        while (cardinalityPointsRemaining.length > 0) {

            randomCardinalityPoint = Math.floor(Math.random() * (cardinalityPointsRemaining.length - 1));

            if (excludedDirections.indexOf(randomCardinalityPoint) === -1) {
                selectedNode = this.findBorderNodeEnteringFromDirection(randomCardinalityPoint, this.maze.getCardinality())
                break;
            } else {
                cardinalityPointsRemaining.splice(cardinalityPointsRemaining.indexOf(randomCardinalityPoint), 1);
            }
        }

        return { node: selectedNode, direction: randomCardinalityPoint };
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
}