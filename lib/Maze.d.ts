import { CardinalityBehavior } from "./Behavior/CardinalityBehavior";
import { MazeNode } from "./MazeNode";
import { MazeCoordinates } from "./MazeCoordinates/MazeCoordinates";
export declare class Maze {
    protected cardinalityBehavior: CardinalityBehavior;
    protected nodes: {
        [key: string]: MazeNode;
    };
    protected currentNode: MazeNode;
    protected size: number;
    protected dimensions: number[];
    protected start: MazeNode;
    protected finish: MazeNode;
    setCardinalityBehavior(cardinalityBehavior: CardinalityBehavior): void;
    getCardinalityBehavior(): CardinalityBehavior;
    setNodes(nodes: {
        [key: string]: MazeNode;
    }): void;
    getNodes(): {
        [key: string]: MazeNode;
    };
    getNode(coordinates: MazeCoordinates): MazeNode;
    setStartNode(node: MazeNode): void;
    getStartNode(): MazeNode;
    getFinishNode(): MazeNode | boolean;
    getDimensions(): number[];
    setDimensions(dimensions: number[]): void;
    getSize(): number;
    setCurrentNode(node: MazeNode): void;
    move(direction: number): MazeNode | boolean;
    protected setSize(size: number): void;
}
