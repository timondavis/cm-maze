import { MazeCoordinates } from "./MazeCoordinates";
export declare enum D2D {
    X = 0,
    Y = 1,
}
export declare class MazeCoordinates2D extends MazeCoordinates {
    protected getDimensionValue(): number;
}
