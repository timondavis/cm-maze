import {Maze} from "../../Maze";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {NodeLocation2D} from "../../MazeCoordinates/NodeLocation2D"
import {MazeNode} from "../../MazeNode";

export abstract class GoalStrategy {

    protected entranceNodeId: string;
    protected directionIntoEntrance: number;
    protected exitNodeId: string;
    protected directionIntoExit: number;

    constructor(protected maze: Maze, protected mazeAnalysis: MazeAnalysis) {}

    abstract placeEntrance(): void;
    abstract placeExit(): void;

    /**
     * Given the direction from which a vacant node location would enter into an occupied node location,
     * select a node that fits this description.
     *
     * @param direction
     * @param cardinalityPointCandidates
     */
    protected findBorderNodeEnteringFromDirection(direction: number, excludedNodeIds: string[] = []): MazeNode {
        let nodesAvailableFromDirection: string[];
        let randomNodeIndex: number;
        let selectedNode: MazeNode = null;

        nodesAvailableFromDirection = this.mazeAnalysis.nodeIdsWithVacanciesInDirection.get(direction);

        while(nodesAvailableFromDirection.length > 0) {

            // Pick Random Node from Collection
            randomNodeIndex = Math.floor(Math.random() * (nodesAvailableFromDirection.length - 1));
            selectedNode = this.maze.getNodeWithId(nodesAvailableFromDirection[randomNodeIndex]);

            if (excludedNodeIds.indexOf(selectedNode.getId()) === -1) {
                this.entranceNodeId = selectedNode.getId();
                this.exitNodeId = selectedNode.getId();
                break;
            } else {
                nodesAvailableFromDirection.splice(nodesAvailableFromDirection.indexOf(selectedNode.getId()), 1);
            }
        }

        return selectedNode;
    }

    protected findBorderNodeEnteringFromRandomDirection(excludedNodeIds: string[] = [], excludedDirections: number[] = []): { node: MazeNode, direction: number} {
        let cardinalityPointsRemaining: number[];
        let cardinalityPoints = this.maze.getCardinality().getConnectionPointCount();
        let selectedNode: MazeNode;
        let randomCardinalityPoint: number;
        for ( let i = 0 ; i < cardinalityPoints ; i++ ) {
            if (excludedDirections.indexOf(i) !== -1) {
                cardinalityPointsRemaining.push(i);
            }
        }

        if (!cardinalityPointsRemaining || cardinalityPointsRemaining.length <= 0) {
            throw "No valid cardinality points available for random node selection";
        }

        while (cardinalityPointsRemaining.length > 0) {

            randomCardinalityPoint = Math.floor(Math.random() * (cardinalityPointsRemaining.length - 1));

            if (selectedNode = this.findBorderNodeEnteringFromDirection(randomCardinalityPoint)) {
                if (excludedNodeIds.indexOf(selectedNode.getId()) === -1) {
                    break;
                }
            } else {
                cardinalityPointsRemaining.splice(cardinalityPointsRemaining.indexOf(randomCardinalityPoint), 1);
            }
        }

        return { node: selectedNode, direction: randomCardinalityPoint };
    }
}