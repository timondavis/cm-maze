/// <reference path="../node_modules/@types/node/index.d.ts" />
import {MazeNode} from "./MazeNode";
import { CardinalityBehavior } from "./Behavior/CardinalityBehavior"
import {MazeCoordinates} from "./MazeCoordinates/MazeCoordinates";
import {CardinalityBehaviorFour2D} from "./Behavior/CardinalityBehaviorFour2D";

export class MazeBuilder {

    complexity : number;
    entry : MazeNode;
    cardinalityBehavior : CardinalityBehavior;
    occupiedCoordinates : { [key: string] : MazeCoordinates } = {};

    public constructor( cardinalityBehavior? : CardinalityBehavior, complexity: number = 5 ) {

        this.cardinalityBehavior = ( cardinalityBehavior ) ? cardinalityBehavior : new CardinalityBehaviorFour2D();
        this.complexity = complexity;
    }

    public buildMaze(): void {

       this.entry = new MazeNode( this.cardinalityBehavior );

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
        let lastCoordinates: MazeCoordinates;
        let nextCoordinates: MazeCoordinates;

        for ( let i = 0 ; i < depth ; i++ ) {

            openExits = pointer.getOpenExitPoints();
            newDirection = openExits[ MazeBuilder.rand( openExits.length - 1, 0 ) ];

            lastCoordinates = pointer.getCoordinates();
            nextCoordinates = this.cardinalityBehavior.getNextCoordinates( lastCoordinates, newDirection );

            pointer.connectTo( new MazeNode( this.cardinalityBehavior ), newDirection );
            pointer = pointer.getNeighborAt( newDirection );
            pointer.setCoordinates( nextCoordinates );

            this.occupiedCoordinates[nextCoordinates.toString()] = nextCoordinates;
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