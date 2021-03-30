import { MazeNode } from "./MazeNode";
import { Maze } from "./Maze";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IMazeAnalysis extends ISerializableModel {
    nodeIdsAdjacentToBorderAtExitPoint: Map<number, string[]>;
    maze: Maze;
    mazeLocationIndex: Map<string, MazeNode>;
    mazeCardinalityPoints: number;
}
export declare class MazeAnalysis extends SerializableModel {
    protected state: IMazeAnalysis;
    get nodeIdsAdjacentToBorderAtExitPoint(): Map<number, string[]>;
    /**
     * @param maze {Maze}
     */
    constructor(maze: Maze);
    /**
     * Analyze the maze so that all public reporting stats are accurate and available.
     */
    private analyzeMaze;
    private scanNodesWithVacantNeighbors;
}
