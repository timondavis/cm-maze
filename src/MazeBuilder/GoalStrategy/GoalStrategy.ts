import {Maze} from "../../Maze";
import {MazeNode} from "../../MazeNode";

export abstract class GoalStrategy {

    abstract placeEntrance(maze: Maze);
    abstract placeExit(maze: Maze);

}