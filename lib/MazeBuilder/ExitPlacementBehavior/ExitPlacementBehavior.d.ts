import { Maze } from "../../Maze/Maze";
import { MazeAnalysis } from "../../Maze/MazeAnalysis";
import { MazeNode } from "../../Maze/MazeNode";
import { Cardinality } from "../../Behavior/Cardinality";
export declare abstract class ExitPlacementBehavior {
    protected maze: Maze;
    protected mazeAnalysis: MazeAnalysis;
    private static generatedExitCount;
    constructor(maze: Maze, mazeAnalysis: MazeAnalysis);
    abstract placeEntrance(): void;
    abstract placeExit(): void;
    protected generateExitNode(cardinality: Cardinality): MazeNode;
    protected findRandomNodeAdjacentToBorderAtExitPoint(exitPoint: number, excludedNodeIds?: string[]): MazeNode;
    protected findRandomBorderNode(excludedNodeIds?: string[]): MazeNode;
    /**
     * Select a random node on the existing maze.
     *
     * @returns {MazeNode}
     */
    protected selectRandomNode(): MazeNode;
    private selectRandomNodeFromIdCollection;
}
