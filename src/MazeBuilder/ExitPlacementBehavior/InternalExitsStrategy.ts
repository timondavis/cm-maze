import {ExitPlacementBehavior} from "./ExitPlacementBehavior";
import {Maze} from "../../Maze";
import {MazeAnalysis} from "../../Maze/MazeAnalysis";
import {MazeNode} from "../../MazeNode";

export class InternalExitsStrategy extends ExitPlacementBehavior {

    constructor(maze:Maze) {
        super(maze, new MazeAnalysis(maze));
    }

    placeEntrance(): void {
        this.maze.setStartNode(this.maze.getNodeWithId("Origin"));
    }

    placeExit(): void {
        let randomNode: MazeNode;

        do {
           randomNode = this.selectRandomNode();
        } while (randomNode === this.maze.getStartNode());
        this.maze.setFinishNode(randomNode);
    }
}