import { ExitPlacementBehavior } from "./ExitPlacementBehavior";
import { Maze } from "../../Maze/Maze";
export declare class ExternalExitsSealedStrategy extends ExitPlacementBehavior {
    private consumedNodeIds;
    constructor(maze: Maze);
    placeEntrance(): void;
    placeExit(): void;
}
