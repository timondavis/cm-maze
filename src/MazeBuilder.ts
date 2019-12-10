import {MazeNode} from "./MazeNode";
import {Cardinality} from "./Behavior/Cardinality"
import {NodeLocation} from "./MazeCoordinates/NodeLocation";
import {Compass4} from "./Behavior/Compass4";
import {Maze} from "./Maze";

/**
 * @class MazeBuilder
 *
 * Instanceable builder class which generates randomized Mazes in their most basic form.  This class can be
 * extended to handle the creation of a specialized maze or a derivative thereof.
 */
export class MazeBuilder {

    /**
     * Complexity factor of the maze to be generated
     *
     * @type {number}
     */
    protected complexity : number;

    /**
     * The 'entry' point of the generated maze (will not be poplated until buildMaze() is run).
     *
     * @type {MazeNode}
     */
    protected entry : MazeNode;

    /**
     *  A Cardinality instance responsible for facilitating node connection and traversal
     *  logic.
     *
     *  @type {Cardinality}
     */
    cardinality : Cardinality;

    /**
     * The maze being generated by the builder
     */
    maze: Maze;

    /**
     * Constructor
     *
     * @param {Cardinality} cardinality
     * @param {number} complexity
     */
    public constructor( cardinality? : Cardinality, complexity: number = 100 ) {

        this.cardinality = ( cardinality ) ? cardinality : new Compass4();
        this.complexity = complexity;
    }

    /**
     * Build a new randomized maze instance based on local instance configurations
     *
     * @returns {Maze}
     */
    public buildMaze(): Maze {

        this.maze = new Maze();

        // Start entry node at 0,0
        let startingCoordinates = this.cardinality.generateNodeLocation();

        this.entry = new MazeNode( this.cardinality, "Origin" );
        this.maze.addNode(this.entry);

        this.generateRandomPathFrom( this.entry );

        for( let i = 0 ; i < this.complexity ; i++ ) {

            this.seekAndGenerateRandomPath( this.entry );
        }

        this.maze.setCardinality( this.cardinality );
        this.maze.setNodes( this.normalizeNodeCoordinates() );
        this.maze.setCurrentNode( this.entry );
        this.maze.setStartNode( this.entry );
        this.maze.setFinishNode( this.selectRandomNode() );
        this.maze.setDimensions( this.getDimensions() );

        return this.maze;
    }

    /**
     * Convenience function (static) for shorthand randomization.
     *
     * @TODO !BUG! max cannot be reached by this algorithm, but instead max - 1
     *
     * @param {number} max
     * @param {number} min
     * @returns {number}
     */
    public static rand( max: number = 100, min: number = 1 ) : number {

       max += 1;

       const number =  Math.floor( Math.random() * max ) + min;
       return Math.min( max, number );
    }

    /**
     * Generate a new random path sourcing from the indicated node.
     *
     * @param {MazeNode} pointer
     * @param {number} depth
     * @returns {MazeBuilder}
     */
    public generateRandomPathFrom( pointer : MazeNode, depth: number = this.complexity ) : MazeBuilder {

        let newDirection = -1;
        let openExits: number[] = [];
        let occupiedExits: number[];
        let nextExitPosition: number;

        // Create node connections (to new or existing nodes) - 1 for each level of depth declared.
        for ( let i = 0 ; i < depth ; i++ ) {

            // Pick a random exit point on this node.  If there is no open exit, traverse to the next node and continue.
            openExits = pointer.getOpenConnectionPoints();
            if (openExits.length == 0) {
                pointer = this.hopToNextNode(pointer);
                continue;
            }
            newDirection = openExits[MazeBuilder.rand(openExits.length - 1, 0)];

            // Start by attempting to connect to a random new or existing node gracefully...
            nextExitPosition = this.buildNextNodeOnRandomPath( pointer, newDirection );
            if ( nextExitPosition >= 0 ) {
                let pointerId = pointer.getNeighborIdAt( nextExitPosition );
                pointer = this.maze.getNodeWithId(pointerId);
                continue;
            }

            // ... look for alternative ways of extending to another node if necessary...
            nextExitPosition = this.tryNodeConnectionFromEveryAvailableExit( pointer, openExits );
            if ( nextExitPosition >= 0 ) {
                let pointerId = pointer.getNeighborIdAt( nextExitPosition );
                pointer = this.maze.getNodeWithId(pointerId);
                continue;
            }

            // .. retreat if unsuccessful, fallback to a previously connected node ...
            occupiedExits = pointer.getOccupiedConnectionPoints();

            if ( occupiedExits.length > 0 ) {
                let pointerId = pointer.getNeighborIdAt( MazeBuilder.rand( occupiedExits.length - 1, 0 ) );
                pointer = this.maze.getNodeWithId(pointerId);
            }

            // .. and, finally, surrender if we can't find any valid connected nodes.
            break;
        }

        return this;
    }

    /**
     * Builder will seek a random node within the defined parameters.  Once node is identified, it will branch
     * out a new randomized path of nodes.
     *
     * @param {MazeNode} startingNode
     * @param {number} maxDepth
     * @returns {MazeBuilder}
     */
    public seekAndGenerateRandomPath( startingNode : MazeNode, maxDepth: number = this.complexity ) : MazeBuilder {

        const depth = MazeBuilder.rand( maxDepth, 0 );
        let neighbors : string[];
        let pointer: MazeNode = startingNode;

        for ( let i = 0 ; i < depth ; i++ ) {

            neighbors = pointer.getNeighborIds();

            let index = MazeBuilder.rand(neighbors.length - 1, 0);

            if ( neighbors.length > 0 ) {
                pointer = this.maze.getNodeWithId(neighbors[index]);
            }

            else break;
        }

        if ( pointer ) {
            this.generateRandomPathFrom( pointer );
        }
        return this;
    }


    /**
     * Try every available connection point on the node and attempt to connect to a new or existing node.
     * Return the index of the successful connections connection point when new connection is made.
     * If no connection is made, returns -1.
     *
     * @param {MazeNode} pointer
     * @param {number[]} openConnectionPoints
     * @returns {number}
     */
    private tryNodeConnectionFromEveryAvailableExit( pointer: MazeNode, openConnectionPoints: number[] ): number {

        let validExitIndexFound: boolean = false;
        let newDirection = -1;
        let candidateExitPosition = -1;

        for ( let i = 0 ; i < openConnectionPoints.length ; i++ ) {

            let index: number = MazeBuilder.rand( openConnectionPoints.length - 1, 0 );
            newDirection = openConnectionPoints[index];
            openConnectionPoints = openConnectionPoints.splice( index, 1 );

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

        return this.maze.getNodeWithId(pointer.getNeighborIdAt(
            MazeBuilder.rand(
                this.cardinality.getConnectionPointCount() - 1,
                0
            )
        ));
    }


    /**
     * Finds out if there is a neighboring node at the indicated exit.  If a node is found, returns that node,
     * otherwise generates a new node and returns that.  Coordinates will be set on the node returned.
     *
     * @param {MazeNode} pointer
     * @param {number} exitPoint
     * @returns {MazeNode}
     */
    private getNextNodeAtExit( pointer: MazeNode, exitPoint: number): MazeNode {

        let lastCoordinates: NodeLocation;
        let nextCoordinates: NodeLocation;
        let tempNextNode: MazeNode;
        let nodeAtNextLocation : MazeNode;

        // Determine coordinates for the new and existing nodes
        lastCoordinates = pointer.getLocation();
        nextCoordinates = this.cardinality.getNextLocation(lastCoordinates, exitPoint);
        nodeAtNextLocation = this.maze.getNodeAtLocation(nextCoordinates);

        // If the next node's coordinate is already taken point our Next Node to that node.  Otherwise,
        // if the space in unoccupied, create a new node.
        if( nodeAtNextLocation ) {
           tempNextNode = nodeAtNextLocation;
        } else {
           tempNextNode = new MazeNode( this.cardinality );
           tempNextNode.setLocation(nextCoordinates);

           tempNextNode.setMaxConnections(MazeBuilder.rand(this.cardinality.getConnectionPointCount() - 1, 1));

           this.maze.addNode(tempNextNode);
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
        if ( pointer.isConnectionPointOpen(exitPoint) && tempNextNode.isConnectionPointOpen(this.cardinality.getOpposingConnectionPoint(exitPoint))) {

            pointer.connectTo( tempNextNode, exitPoint );
            return exitPoint;
        }

        return -1;
    }

    /**
     * If the indicated dictionary has negative node values (a natural result of the current version of
     * the generation process), push all of the node coordinates up so that 0,0 represents the top left.
     *
     * This ultimately updates the map so that it will fit nicely within quadrant II of the cartesian graph.
     *
     * @returns {{[p: string]: MazeNode}}
     */
    private normalizeNodeCoordinates(): { [key:string] : MazeNode } {

        let adjustedCoordinates : { [key:string] : MazeNode } = {};
        let dimensionsUsed = this.maze.getNodeWithId("Origin").getLocation().getDimensions();
        let minCoordinateValuesInrange: number[] = [];
        let currentValue: number;
        let currentMin: number = 0;
        let adjustmentsByIndex: number[] = [];
        let currentNode: MazeNode;

        // O(d * n)
        for ( let i = 0 ; i < dimensionsUsed ; i++ ) {

            Object.keys( this.maze.getNodes() ).forEach( (key) => {
                currentValue = this.maze.getNodeWithId(key).getLocation().getAxisPoint(i);
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

            Object.keys( this.maze.getNodes() ).forEach( (key) => {

                currentNode = this.maze.getNodeWithId(key);
                currentNode.getLocation().adjustAxisPoint(i, adjustmentsByIndex[i]);
            });
        }

        // O(n)
        Object.keys( this.maze.getNodes() ).forEach( (key) => {

            currentNode = this.maze.getNodeWithId(key);
            adjustedCoordinates[currentNode.getId()] = currentNode;
        });

        return adjustedCoordinates;
    }

    /**
     * Get the size of each dimension of this maze (for example, if
     * width = 6 and length = 4, this function will return [6, 4]).
     *
     * @returns {number[]}
     */
    private getDimensions() : number[] {

        let dimensionsUsed = this.entry.getLocation().getDimensions();
        let node : MazeNode;
        let currentValue : number;
        let maxValue : number;
        let minValue : number;
        let dimensions = [];

        for ( let i = 0 ; i < dimensionsUsed ; i++ ) {

            maxValue = 0;
            minValue = 0;

            Object.keys( this.maze.getNodes() ).forEach( (key: string) => {

                node = this.maze.getNodes()[key];
                currentValue = node.getLocation().getAxisPoint(i);
                maxValue = ( currentValue > maxValue ) ? currentValue : maxValue;
                minValue = ( currentValue < minValue ) ? currentValue : minValue;
            });

            dimensions.push( ( maxValue - minValue ) + 1 );
        }

        return dimensions;
    }

    /**
     * Select a random node on the existing maze.
     *
     * @returns {MazeNode}
     */
    private selectRandomNode() : MazeNode {

        let coordinateList = Object.keys( this.maze.getNodes() );
        let index = MazeBuilder.rand( coordinateList.length - 1, 0 );

        return this.maze.getNodes()[coordinateList[index]];
    }
}