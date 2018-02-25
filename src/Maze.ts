import {CardinalityBehavior} from "./Behavior/CardinalityBehavior";
import {MazeNode} from "./MazeNode";
import {MazeCoordinates} from "./MazeCoordinates/MazeCoordinates";

export class Maze {

    protected cardinalityBehavior : CardinalityBehavior;
    protected nodes : { [key:string] : MazeNode } = {};
    protected currentNode : MazeNode;
    protected size : number;
    protected dimensions: number[] = [];
    protected start: MazeNode;
    protected finish: MazeNode;

    public setCardinalityBehavior( cardinalityBehavior : CardinalityBehavior ) {
        this.cardinalityBehavior = cardinalityBehavior;
    }

    public getCardinalityBehavior() : CardinalityBehavior {

        return this.cardinalityBehavior;
    }

    public setNodes( nodes: { [key:string] : MazeNode } ) {

        this.nodes = nodes;
    }

    public getNodes() : { [key:string] : MazeNode } {
        return this.nodes;
    }

    public getNode( coordinates : MazeCoordinates ) : MazeNode {

       return this.nodes[coordinates.toString()];
    }

    public setStartNode( node: MazeNode ) {

        this.start = node;
    }

    public getStartNode() : MazeNode {

        return this.start;
    }

    public getFinishNode() : MazeNode | boolean {

        if ( typeof this.finish !== 'undefined' ) {

            return this.finish;
        }

        return false;
    }

    public getDimensions() {
        return this.dimensions;
    }

    public setDimensions( dimensions: number[] ) {
        this.dimensions = dimensions;
    }

    public getSize() : number {
        return this.size;
    }

    public setCurrentNode( node : MazeNode ) {

        this.currentNode = node;
    }

    public move( direction : number ) : MazeNode | boolean {

        if ( this.currentNode.isPointOccupied( direction ) ) {
            this.currentNode.getNeighborAt( direction );
            return this.currentNode;
        }

        return false;
    }

    protected setSize( size : number ) {
        this.size = size;
    }
}