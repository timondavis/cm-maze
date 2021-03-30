/**
 * An appendable list of ids belonging to nodes which can be traversed in the given order.
 */
import { Maze } from "../Maze/Maze";
import { MazeNode } from "../Maze/MazeNode";
export interface IMazePath {
    pathId: number;
    firstNodeId: string;
    lastNodeId: string;
    pointerIndex: number;
    path: string[];
}
export declare class MazePath {
    protected state: IMazePath;
    private static pathIdCounter;
    constructor();
    get id(): number;
    first(): string;
    last(): string;
    reset(): void;
    next(): string;
    current(): string;
    append(nodeId: string): void;
    get length(): number;
    toIdArray(): string[];
    toMazeNodeArray(maze: Maze): MazeNode[];
}
