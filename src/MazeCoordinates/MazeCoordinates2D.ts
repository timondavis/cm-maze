import {MazeCoordinates} from "./MazeCoordinates";

export enum D2D { X = 0, Y = 1 };
export class MazeCoordinates2D extends MazeCoordinates {

    protected getDimensionValue(): number {
        return 2;
    }
}