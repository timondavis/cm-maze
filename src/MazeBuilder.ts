/// <reference path="../node_modules/@types/node/index.d.ts" />
import {MazeNode} from "./MazeNode";
import { CardinalityBehavior } from "./Behavior/CardinalityBehavior"
import {MazeCoordinates} from "./MazeCoordinates/MazeCoordinates";
import {CardinalityBehaviorFour2D} from "./Behavior/CardinalityBehaviorFour2D";

export class MazeBuilder {

    complexity : number;
    entry : MazeNode;
    cardinalityBehavior : CardinalityBehavior;
    occupiedCoordinates : { [key:string] : MazeNode } = {};

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
        let pointer: MazeNode = new MazeNode( this.cardinalityBehavior );
        let validExitIndexFound = false;

        // Create node connections (to new or existing nodes) - 1 for each level of depth declared.
        for ( let i = 0 ; i < depth ; i++ ) {

            // Pick a random exit point on this node.  If there is no open exit, traverse to the next node and continue.
            openExits = pointer.getOpenExitPoints();
            if (openExits.length == 0) {
                this.hopToNextNode(pointer);
                continue;
            }
            newDirection = openExits[MazeBuilder.rand(openExits.length - 1, 0)];

            if ( this.buildNextNodeOnRandomPath(pointer, newDirection) ) { continue; }

            for ( let i = 0 ; i < openExits.length ; i++ ) {
                newDirection = openExits[i];

                if ( this.buildNextNodeOnRandomPath(pointer, newDirection) ) {
                   validExitIndexFound = true;
                   break;
                }
            }

            if ( validExitIndexFound ) { continue; }
            break;
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

    /**
     * Convenince function to simply get the next node WHEN ALL EXIT POINTS ARE CLAIMED
     *
     * @pre  All exit points on the node must connect to other nodes.  Ignoring this precondition
     * may result in exceptions being thrown.
     *
     * @param {MazeNode} pointer
     */
    private hopToNextNode( pointer: MazeNode ) {

        pointer.getNeighborAt(
            MazeBuilder.rand(
                this.cardinalityBehavior.getCardinality(),
                0
            )
        );
    }


    /**
     * Finds out if there is a neighboring node at the indicated exit.  If a node is found, returns that node,
     * otherwise generates a new node and returns that.  Coordinates will be set on the node returned.
     *
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {MazeNode}
     */
    private getNextNodeAtExit( pointer: MazeNode, exitPoint: number ): MazeNode {

        let lastCoordinates: MazeCoordinates;
        let nextCoordinates: MazeCoordinates;
        let tempNextNode: MazeNode;

        // Determine coordinates for the new and existing nodes
        lastCoordinates = pointer.getCoordinates();
        nextCoordinates = this.cardinalityBehavior.getNextCoordinates( lastCoordinates, exitPoint );

        // If the next node's coordinate is already taken point our Next Node to that node.  Otherwise,
        // if the space in unoccupied, create a new node.
        if( this.occupiedCoordinates.hasOwnProperty(nextCoordinates.toString() ) ) {
           tempNextNode = this.occupiedCoordinates[ nextCoordinates.toString() ];
        } else {
           tempNextNode = new MazeNode( this.cardinalityBehavior );
           tempNextNode.setCoordinates(nextCoordinates);
        }

        return tempNextNode;
    }

    /**
     * Convenience method for producing (or finding), and then traversing to, the next node on a given path.
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {boolean}
     */
    private buildNextNodeOnRandomPath( pointer: MazeNode, exitPoint : number ) : boolean {
        let tempNextNode: MazeNode;

        // Get or create the node at the next position.
        tempNextNode = this.getNextNodeAtExit( pointer, exitPoint );

        // If the logical entry point is open on the next node, we'll connect the nodes and traverse
        // to the next node.
        if ( tempNextNode.isPointOpen( this.cardinalityBehavior.getOpposingPoint( exitPoint ))) {

            pointer.connectTo( tempNextNode, exitPoint );
            pointer = pointer.getNeighborAt( exitPoint );

            this.occupiedCoordinates[pointer.getCoordinates().toString()] = pointer;
            return true;
        }

        return false;
    }
}