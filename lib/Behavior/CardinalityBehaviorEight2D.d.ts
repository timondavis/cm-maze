import { CardinalityBehavior } from "./CardinalityBehavior";
import { MazeCoordinates2D } from "../MazeCoordinates/MazeCoordinates2D";
import { MazeCoordinates } from "../MazeCoordinates/MazeCoordinates";
export declare enum CB8_CARD {
    N = 0,
    NORTH = 0,
    NE = 1,
    NORTH_EAST = 1,
    E = 2,
    EAST = 2,
    SE = 3,
    SOUTH_EAST = 3,
    S = 4,
    SOUTH = 4,
    SW = 5,
    SOUTH_WEST = 5,
    W = 6,
    WEST = 6,
    NW = 7,
    NORTH_WEST = 7,
}
export declare class CardinalityBehaviorEight2D extends CardinalityBehavior {
    getCardinality(): number;
    getNextCoordinates(currentCoordinates: MazeCoordinates2D, exitPosition: number): MazeCoordinates2D;
    generateCoordinates(position?: number[]): MazeCoordinates;
}
