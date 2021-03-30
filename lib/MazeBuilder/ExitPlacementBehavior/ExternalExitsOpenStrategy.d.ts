import { ExitPlacementBehavior } from "./ExitPlacementBehavior";
import { Maze } from "../../Maze/Maze";
export declare class ExternalExitsOpenStrategy extends ExitPlacementBehavior {
    private consumedNodeIds;
    constructor(maze: Maze);
    placeEntrance(): void;
    placeExit(): void;
}
