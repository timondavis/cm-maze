import { CardinalityBehavior } from "./CardinalityBehavior";
import { MazeCoordinates2D } from "../MazeCoordinates/MazeCoordinates2D";
import { MazeCoordinates } from "../MazeCoordinates/MazeCoordinates";
export declare enum CB4_CARD {
    N = 0,
    NORTH = 0,
    E = 1,
    EAST = 1,
    S = 2,
    SOUTH = 2,
    W = 3,
    WEST = 3,
}
export declare class CardinalityBehaviorFour2D extends CardinalityBehavior {
    getCardinality(): number;
    getNextCoordinates(currentCoordinates: MazeCoordinates2D, exitPosition: number): MazeCoordinates2D;
    generateCoordinates(position?: number[]): MazeCoordinates;
}
