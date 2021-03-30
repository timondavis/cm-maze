import { ExitPlacementBehavior } from "./ExitPlacementBehavior";
import { Maze } from "../../Maze/Maze";
export declare class InternalExitsStrategy extends ExitPlacementBehavior {
    constructor(maze: Maze);
    placeEntrance(): void;
    placeExit(): void;
}
