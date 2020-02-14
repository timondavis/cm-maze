import {Cardinality} from "./Behavior/Cardinality";
import {MazeNode} from "./MazeNode";

export interface MazeInterface {
	cardinality : Cardinality;
	nodes : { [key:string] : MazeNode };
	currentNode : MazeNode;
	dimensions: number[];
	start: MazeNode;
	finish: MazeNode;
	id: string;
}