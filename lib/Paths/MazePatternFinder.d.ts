import { Maze } from "../Maze/Maze";
import { MazePath } from "./MazePath";
import { MazeNode } from "../Maze/MazeNode";
/**
 * Static methods to find minimal paths between maze nodes.
 */
export declare class MazePatternFinder {
    /**
     * Get a path between two nodes on the given maze.  Nodes identified by ID.
     *
     * @param fromNodeId
     * @param toNodeId
     * @param maze
     *
     * @return MazePath
     */
    static findPath(fromNodeId: string, toNodeId: string, maze: Maze): MazePath;
    private static buildPath;
    static getTilesWithinRange(fromNodeId: string, range: number, maze: Maze): MazeNode[];
}
