import {ExitPlacementBehavior} from "./ExitPlacementBehavior";
import {Maze} from "../../Maze";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {MazeNode} from "../../MazeNode";

export class ExternalExitsOpenStrategy extends ExitPlacementBehavior {

    constructor(maze: Maze) {
        super(maze, new MazeAnalysis(maze));
    }

    placeEntrance() {

        let nodeData : {node: MazeNode, direction: number} = this.findBorderNodeEnteringFromRandomDirection();
        if (!nodeData.node) {
            throw "Entrance Node could not be established."
        }

        let node = nodeData.node;
        let direction = nodeData.direction;

        // Identified node may have maxed out its max connections - set at random by the maze builder.  Increment
        // by 1 as long as it is valid to do so (if its not valid, something went wrong - candidate nodes should not be maxed out
        // on total potential exit points).
        if (node.getOccupiedConnectionPoints().length >= node.getMaxConnections()) {

            if (node.getMaxConnections() < node.getCardinality().getConnectionPointCount()) {
                node.setMaxConnections(node.getMaxConnections() + 1);
            } else {

                throw "Attempting to increment max connections on a node already at max.  " +
                "This scenario indicates an invalild state - nodes with maximum possible connections in place " +
                "should not have been supplied."
            }
        }

        this.entranceNodeId = node.getId();
        this.directionIntoEntrance = direction;
        try {
            node.connectTo(this.generateExitNode(node.getCardinality()),  this.maze.getCardinality().getOpposingConnectionPoint(direction));
        }
        catch (ex) {
            let a = 1;
        }
        this.maze.setStartNode(node);
    }

    placeExit() {

        let nodeData : {node: MazeNode, direction: number} = this.findBorderNodeEnteringFromRandomDirection([this.entranceNodeId]);
        if (!nodeData.node) {
            throw "Exit Node could not be established";
        }

        let node = nodeData.node;
        let direction = nodeData.direction;

        // Identified node may have maxed out its max connections - set at random by the maze builder.  Increment
        // by 1 as long as it is valid to do so (if its not valid, something went wrong - candidate nodes should not be maxed out
        // on total potential exit points).
        if (nodeData.node.getOccupiedConnectionPoints().length >= nodeData.node.getMaxConnections()) {

            if (nodeData.node.getMaxConnections() < nodeData.node.getCardinality().getConnectionPointCount()) {
                nodeData.node.setMaxConnections(nodeData.node.getMaxConnections() + 1);
            } else {

                throw "Attempting to increment max connections on a node already at max.  " +
                "This scenario indicates an invalild state - nodes with maximum possible connections in place " +
                "should not have been supplied."
            }
        }

        this.exitNodeId = node.getId();
        this.directionIntoEntrance = direction;
        try {
            node.connectTo(this.generateExitNode(node.getCardinality()),  this.maze.getCardinality().getOpposingConnectionPoint(direction));
        }
        catch(ex) {
            let a = 1;
        }

        this.maze.setFinishNode(node);
    }
}