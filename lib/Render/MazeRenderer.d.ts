import { Maze } from "../Maze/Maze";
export declare class MazeRenderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    maze: Maze;
    canvasDimensions: number[];
    constructor(canvasElementId: string, maze: Maze, dimensions?: number);
    render2D(): void;
}
