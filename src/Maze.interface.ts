import {Cardinality} from "./Behavior/Cardinality";
import {MazeNode} from "./MazeNode";
import {SerializableDataInterface} from "./SerializableData.interface";

export interface MazeInterface extends SerializableDataInterface {
	cardinality : Cardinality;
	nodes : { [key:string] : MazeNode };
	currentNode : MazeNode;
	dimensions: number[];
	start: MazeNode;
	finish: MazeNode;
	id: string;
}