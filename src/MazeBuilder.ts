import {MazeNode} from "./MazeNode";
import {MazeCardinality} from "./MazeCardinality";

export class MazeBuilder {

    cardinality : MazeCardinality = MazeCardinality.FOUR;
    complexity : number = 5;
    entry : MazeNode;

    public buildMaze(): void {

       this.entry = new MazeNode( this.cardinality );

       this.generateRandomPathFrom( this.entry );

       for( let i = 0 ; i < this.complexity ; i++ ) {

           this.seekAndGenerateRandomPath( this.entry );
       }
    }

    public static rand( max: number = 100, min: number = 1 ) : number {

       const number =  Math.floor( Math.random() * max ) + min;
       return Math.min( max, number );
    }

    public generateRandomPathFrom( node : MazeNode, depth: number = this.complexity ) : MazeBuilder {

        let newDirection = -1;
        let openExits: number[];
        let pointer: MazeNode = node;

        for ( let i = 0 ; i < depth ; i++ ) {

            openExits = pointer.getOpenExitPoints();
            newDirection = openExits[ MazeBuilder.rand( openExits.length - 1, 0 ) ];
            pointer.connectTo( new MazeNode( this.cardinality ), newDirection );
            pointer = pointer.getNeighborAt( newDirection );
        }

        return this;
    }

    public seekAndGenerateRandomPath( startingNode : MazeNode, maxDepth: number = this.complexity ) : MazeBuilder {

        const depth = MazeBuilder.rand( maxDepth, 0 );
        let neighbors : MazeNode[];
        let pointer: MazeNode = startingNode;

        for ( let i = 0 ; i < depth ; i++ ) {

            neighbors = pointer.getNeighbors();

            if ( neighbors.length > 0 ) {
                pointer = neighbors[ MazeBuilder.rand( neighbors.length - 1, 0 ) ];
            }

            else break;
        }

        this.generateRandomPathFrom( pointer );
        return this;
    }
}