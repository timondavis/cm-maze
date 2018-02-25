import {MazeNode} from "./MazeNode";
import { CardinalityBehavior } from "./Behavior/CardinalityBehavior"
import {MazeCoordinates} from "./MazeCoordinates/MazeCoordinates";
import {CardinalityBehaviorFour2D} from "./Behavior/CardinalityBehaviorFour2D";
import {MazeCoordinates2D} from "./MazeCoordinates/MazeCoordinates2D";
import {Maze} from "./Maze";
import {CardinalityBehaviorEight2D} from "./Behavior/CardinalityBehaviorEight2D";

export class MazeBuilder {

    complexity : number;
    entry : MazeNode;
    cardinalityBehavior : CardinalityBehavior;
    occupiedCoordinates : { [key:string] : MazeNode } = {};
    nodeCounter: number = 0;

    public constructor( cardinalityBehavior? : CardinalityBehavior, complexity: number = 100 ) {

        this.cardinalityBehavior = ( cardinalityBehavior ) ? cardinalityBehavior : new CardinalityBehaviorFour2D();
        this.complexity = complexity;
    }

    public buildMaze(): Maze {

        let startingCoordinates = this.cardinalityBehavior.generateCoordinates();
        this.entry = new MazeNode( this.cardinalityBehavior );
        this.nodeCounter++;
        this.entry.setName( this.nodeCounter.toString() );
        this.occupiedCoordinates[startingCoordinates.toString()] = this.entry;

        this.generateRandomPathFrom( this.entry );

        for( let i = 0 ; i < this.complexity ; i++ ) {

            this.seekAndGenerateRandomPath( this.entry );
        }

        const m: Maze = new Maze();

        m.setCardinalityBehavior( this.cardinalityBehavior );
        m.setNodes( this.normalizeNodeCoordinates() );
        m.setCurrentNode( this.entry );
        m.setStartNode( this.entry );
        m.setFinishNode( this.selectRandomNode() );
        m.setDimensions( this.getDimensions() );

        return m;
    }

    public static rand( max: number = 100, min: number = 1 ) : number {

       const number =  Math.floor( Math.random() * max ) + min;
       return Math.min( max, number );
    }

    public generateRandomPathFrom( pointer : MazeNode, depth: number = this.complexity ) : MazeBuilder {

        let newDirection = -1;
        let openExits: number[] = [];
        let occupiedExits: number[];
        let nextExitPosition: number;

        // Create node connections (to new or existing nodes) - 1 for each level of depth declared.
        for ( let i = 0 ; i < depth ; i++ ) {

            // Pick a random exit point on this node.  If there is no open exit, traverse to the next node and continue.
            openExits = pointer.getOpenExitPoints();
            if (openExits.length == 0) {
                pointer = this.hopToNextNode(pointer);
                continue;
            }
            newDirection = openExits[MazeBuilder.rand(openExits.length, 0)];

            // Start by attempting to connect to a random new or existing node gracefully...
            nextExitPosition = this.buildNextNodeOnRandomPath( pointer, newDirection );
            if ( nextExitPosition >= 0 ) {
                pointer = pointer.getNeighborAt( nextExitPosition );
                continue;
            }

            // ... look for alternative ways of extending to another node if necessary...
            nextExitPosition = this.tryNodeConnectionFromEveryAvailableExit( pointer, openExits );
            if ( nextExitPosition >= 0 ) {
                pointer = pointer.getNeighborAt( nextExitPosition );
                continue;
            }

            // .. retreat if unsuccessful, fallback to a previously connected node ...
            occupiedExits = pointer.getOccupiedExitPoints();

            if ( occupiedExits.length > 0 ) {
                pointer = pointer.getNeighborAt( MazeBuilder.rand( occupiedExits.length - 1, 0 ) );
            }

            // .. and, finally, surrender if we can't find any valid connected nodes.
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
                pointer = neighbors[ MazeBuilder.rand( neighbors.length, 0 ) ];
            }

            else break;
        }

        if ( pointer ) {
            this.generateRandomPathFrom( pointer );
        }
        return this;
    }

    /**
     * Get the collection of declared coordinates tracked in the map building process.
     *
     * @return {{[key:string] : MazeNode}}
     */
    public getCoordinatesCollection(): {[key:string] : MazeNode} {

        return this.occupiedCoordinates;
    }

    /**
     * Try every available exit on the node for connection to a new or existing node.  Return the index of the
     * successful connections exit point when new connection is made.  If no connection is made, returns -1.
     *
     * @param {MazeNode} pointer
     * @param {number[]} openExits
     * @returns {number}
     */
    private tryNodeConnectionFromEveryAvailableExit( pointer: MazeNode, openExits: number[] ): number {

        let validExitIndexFound: boolean = false;
        let newDirection = -1;
        let candidateExitPosition = -1;

        for ( let i = 0 ; i < openExits.length ; i++ ) {

            let index: number = MazeBuilder.rand( openExits.length, 0 );
            newDirection = openExits[index];
            openExits = openExits.splice( index, 1 );

            candidateExitPosition = this.buildNextNodeOnRandomPath( pointer, newDirection );

            if ( candidateExitPosition > 0 ) {
                validExitIndexFound = true;
                break;
            }
        }

        return ( validExitIndexFound ) ? candidateExitPosition : -1;
    }

    /**
     * Convenince function to simply get the next node WHEN ALL EXIT POINTS ARE CLAIMED
     *
     * @pre  All exit points on the node must connect to other nodes.  Ignoring this precondition
     * may result in exceptions being thrown.
     *
     * @param {MazeNode} pointer
     */
    private hopToNextNode( pointer: MazeNode ) : MazeNode {

        return pointer.getNeighborAt(
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

           tempNextNode.setMaxExits(
               MazeBuilder.rand( this.cardinalityBehavior.getCardinality(), 1 )
           );

           this.nodeCounter++;
           tempNextNode.setName( this.nodeCounter.toString() );
        }

        return tempNextNode;
    }

    /**
     * Convenience method for producing (or finding), and then reporting the exit point connecting to,
     * the next node on a given path. Returns the index of the connected path, or -1 if failure took place
     *
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {number}
     */
    private buildNextNodeOnRandomPath( pointer: MazeNode, exitPoint : number ) : number {
        let tempNextNode: MazeNode;

        // Get or create the node at the next position.
        tempNextNode = this.getNextNodeAtExit( pointer, exitPoint );

        // If the logical entry point is open on the next node, we'll connect the nodes and traverse
        // to the next node.
        if ( pointer.isPointOpen( exitPoint ) && tempNextNode.isPointOpen( this.cardinalityBehavior.getOpposingPoint( exitPoint ))) {

            pointer.connectTo( tempNextNode, exitPoint );
            pointer = tempNextNode;

            this.occupiedCoordinates[pointer.getCoordinates().toString()] = pointer;
            return exitPoint;
        }

        return -1;
    }

    private normalizeNodeCoordinates(): { [key:string] : MazeNode } {

        let adjustedCoordinates : { [key:string] : MazeNode } = {};
        let dimensionsUsed = this.getCoordinatesCollection()["[0,0]"].getCoordinates().getDimensions();
        let minCoordinateValuesInrange: number[] = [];
        let currentValue: number;
        let currentMin: number = 0;
        let adjustmentsByIndex: number[] = [];
        let currentNode: MazeNode;

        // O(d * n)
        for ( let i = 0 ; i < dimensionsUsed ; i++ ) {

            Object.keys( this.getCoordinatesCollection() ).forEach( (key) => {

                currentValue = this.getCoordinatesCollection()[key].getCoordinates().getDimension( i );
                currentMin = ( currentValue < currentMin ) ? currentValue : currentMin;
            });

            minCoordinateValuesInrange[i] = currentMin;
        }

        // O(d)
        for( let i = 0 ; i < dimensionsUsed ; i++ ) {

            adjustmentsByIndex[i] = Math.abs( minCoordinateValuesInrange[i] );
        }

        // O(d * n)
        for ( let i = 0 ; i < dimensionsUsed ; i++ ) {

            Object.keys( this.getCoordinatesCollection() ).forEach( (key) => {

                currentNode = this.getCoordinatesCollection()[key];
                currentNode.getCoordinates().adjustDimension( i, adjustmentsByIndex[i] );
            });
        }

        // O(n)
        Object.keys( this.getCoordinatesCollection() ).forEach( (key) => {

            currentNode = this.getCoordinatesCollection()[key];
            adjustedCoordinates[currentNode.getCoordinates().toString()] = currentNode;
        });

        return adjustedCoordinates;
    }

    private getDimensions() : number[] {

        let dimensionsUsed = this.entry.getCoordinates().getDimensions();
        let node : MazeNode;
        let currentValue : number;
        let maxValue : number;
        let minValue : number;
        let dimensions = [];

        for ( let i = 0 ; i < dimensionsUsed ; i++ ) {

            maxValue = 0;
            minValue = 0;

            Object.keys( this.getCoordinatesCollection() ).forEach( (key: string) => {

                node = this.getCoordinatesCollection()[key];
                currentValue = node.getCoordinates().getDimension( i );
                maxValue = ( currentValue > maxValue ) ? currentValue : maxValue;
                minValue = ( currentValue < minValue ) ? currentValue : minValue;
            });

            dimensions.push( ( maxValue - minValue ) + 1 );
        }

        return dimensions;
    }

    private selectRandomNode() : MazeNode {

        let coordinateList = Object.keys( this.getCoordinatesCollection() );
        let index = MazeBuilder.rand( coordinateList.length, 0 );

        return this.getCoordinatesCollection()[coordinateList[index]];
    }
}