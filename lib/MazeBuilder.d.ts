import { MazeNode } from "./MazeNode";
export declare class MazeBuilder {
    cardinality: number;
    complexity: number;
    buildMaze(): void;
    protected buildCoreRoute(m: MazeNode, depth?: number): void;
    static rand(max?: number, min?: number): number;
}
