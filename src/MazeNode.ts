import {NodeLocation} from "./MazeCoordinates/NodeLocation";
import {Cardinality} from "./Behavior/Cardinality";

/**
 * @class MazeNode
 *
 * The MazeNode represents a node or 'room' in a maze.  It is designed to facilitate connection and traversal
 * to other MazeNode instances.
 */
export class MazeNode {

	/**
	 * Index ID Incrementor
	 */
	private static indexIdCounter: number = 0;

    /**
     * Debug Mode
     * @type {boolean}
     */
    protected static debug: boolean = false;

    /**
     * A collection of index ids for neighboring nodes
     * @type { MazeNode[] }
     */
    protected neighbors : string[];

    /**
     * Provides services and constraints allowing for the logical connection and traversal between this and other nodes
     */
    protected cardinality : Cardinality;

    /**
     * The name of this node
     *
     * @type {string}
     */
    protected name: string = "";

	/**
	 * Unique index assigned to every new node.
	 */
	private _indexId: number;

    /**
     * Unique string key for maze node
     */
    protected mazeNodeId: string = "";

    /**
     * The NodeLocation track the location of this node relative to other nodes
     *
     * @type { NodeLocation }
     */
    protected coordinates : NodeLocation;

    /**
     * The maximum number of exits on this node which connect to other nodes.  A node cannot have more neighbors
     * than what is dictated by this value.
     */
    protected maxExits: number;

	/**
	 * Contents of the maze node.  Maps within a map.
	 * The master map ties a string id to a consuming developers custom defined Map.
	 */
	public contents: Map<string, Map<any, any>>;

    public constructor(cardinality: Cardinality, id: string = null, coordinates? : NodeLocation, maxConnections: number = null) {

        this.cardinality = cardinality;
        this.neighbors = new Array<string>( cardinality.getConnectionPointCount() );

        this.coordinates = ( coordinates ) ? coordinates : this.cardinality.generateNodeLocation();
        this.maxExits = (maxConnections) ? maxConnections : this.cardinality.getConnectionPointCount();

        this.mazeNodeId = (id) ? id : MazeNode.generateKey();

        MazeNode.indexIdCounter++;
        this._indexId = MazeNode.indexIdCounter;

        this.contents = new Map<string, Map<any, any>>();
    }

    public getId(): string {
        return this.mazeNodeId;
    }

    public getIndexId(): number {
    	return this._indexId
	}

    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.  If either node is maxed out, no connection will be made.
     *
     * @param {string} mazeNodeId           The node Id to connect to this node
     * @param {number} exitPosition     The cardinality position you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will position back to this node.
     * @returns {MazeNode}
     */
    public connectTo( node: MazeNode, exitPosition: number, autoConnect: boolean = true ): MazeNode  {

        if ( ! this.isConnectionPointOpen(exitPosition) )  {

            throw( "One-Way connection failed: " +
                "Indicated node reports that given exit is not available for connection.." );
        }

        if ( exitPosition >= this.cardinality.getConnectionPointCount() || exitPosition < 0 ) {
            throw( "Indicated exitPosition value exceeds maximum MazeNode cardinality range" );
        }

        if ( ! this.neighbors[exitPosition] === undefined ) {
            throw( "Indicated exitPosition exitPosition is already occupied.  Two exits/entries may not occupy the same exitPosition" );
        }

        this.neighbors[exitPosition] = node.getId();

        if ( autoConnect ) {

            if ( ! node.isConnectionPointOpen(node.getCardinality().getOpposingConnectionPoint(exitPosition)) ) {

                throw( "Two-Way conneciton failed.  Indicated node will not tolerate any more additonal connections, " +
                    "maximum reached.")
            }

            let entryPosition = this.cardinality.getOpposingConnectionPoint( exitPosition );

            node.connectTo( this, entryPosition, false );

            if ( MazeNode.debug ) {

                console.log( "CONNECTING NODES\n" );
                console.log( this.getName() + " (" + exitPosition + ")  <=> (" + entryPosition + ") " + node.getName() );
            }
        }

        return this;
    }

    /**
     * Get a connected node by indicating the exit (cardinality position) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {string} Maze node ID
     */
    public getNeighborIdAt( exitPosition : number ): string {

        if ( exitPosition >= this.cardinality.getConnectionPointCount() || exitPosition < 0 ) {
            throw( "Indicated cardinality position is outside of the valid range" );
        }

        return this.neighbors[exitPosition];
    }

    /**
     * Give this node a name, if you like
     *
     * @param {string} name
     * @returns {MazeNode}
     */
    public setName( name: string ): MazeNode {

        this.name = name;
        return this;
    }

    /**
     * Get the name of this node
     *
     * @param {string} name
     */
    public getName(): string {

        return this.name;
    }

    /**
     * Find out if the indicated node indicated to this node directly, as a neighbor
     *
     * @param {MazeNode} node
     * @returns {boolean}
     */
    public isNeighborsWith( node: MazeNode ): boolean {

        for (let i = 0 ; i < this.cardinality.getConnectionPointCount() ; i++ ) {

            if (node.getId() == this.neighbors[i]) { return true; }
        }

        return false;
    }

    /**
     * Get a list of occupied exit positions on the node.
     *
     * @returns {MazeNode[]}
     */
    public getOccupiedConnectionPoints() : number[] {

        let positions: number[] = [];

        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (let i = 0 ; i < this.cardinality.getConnectionPointCount() ; i++ ) {

            if ( this.neighbors[i] != undefined ) {

                positions.push( i );
            }
        }

        return positions;
    }

    /**
     * Get a list of unoccupied exit positions on the node
     *
     * @returns {number[]}
     */
    public getAvailableConnectionPoints() : number[] {

        let positions: number[] = [];

        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for (let i = 0 ; i < this.cardinality.getConnectionPointCount() ; i++ ) {

           if ( this.neighbors[i] == undefined ) {
               positions.push( i );
           }
        }

        return positions;
    }

    /**
     * Get an array of neighboring node ids.
     *
     * @boolean {includeOpenNodes}  Get the array with null nodes in-tact.  Useful for mapping.  Defaults to FALSE.
     * @returns {string[]}
     */
    public getNeighborIds( includeOpenNodes = false ): string[] {

        let positions: string[] = [];

        for (let i = 0 ; i < this.cardinality.getConnectionPointCount() ; i++ ) {

            if ( this.neighbors[i] != undefined ) {

                positions.push( this.neighbors[i] );
            } else if ( includeOpenNodes ) {

                positions.push( this.neighbors[i] );
            }
        }

        return positions;
    }

    /**
     * Find out whether an entry/exit position on the node is empty.
     *
     * @param {number} point
     * @returns {boolean}
     */
    public isConnectionPointOpen( point: number ): boolean {

        if ( this.getMaxConnections() >= 0 && (this.getOccupiedConnectionPoints().length + 1) > this.getMaxConnections()) {
            return false;
        }

        this.cardinality.validateConnectionPoint( point );
        return ( this.neighbors[point] === undefined )
    }

    /**
     * Find out whether an entry/exit position on the node is occupied
     * @param {number} point
     * @returns {boolean}
     */
    public isConnectionPointOccupied( point: number ) : boolean {

        this.cardinality.validateConnectionPoint( point );
        return ( this.neighbors[point] !== undefined );
    }

    /**
     * @use Location
     * Set the coordinates for this node
     * @param {NodeLocation} coordinates
     * @returns {this}
     */
    public setLocation(coordinates: NodeLocation) {

        this.coordinates = coordinates;
        return this;
    }

    /**
     * @use Location
     * Get the coordinates for this node
     * @returns {NodeLocation}
     */
    public getLocation() : NodeLocation {

        return this.coordinates;
    }

    /**
     * Get a string ID for this location
     * @return {string}
     */
    public getLocationId() : string {
        return this.getLocation().toString();
    }

    /**
     * Get the cardinality behavior object associated with this node.
     * @returns {Cardinality}
     */
    public getCardinality() : Cardinality {
        return this.cardinality;
    }

    /**
     * Stringify the output for human console consumption
     *
     * @returns {string}
     */
    public toString() : string {

        let output: string = "";
        let occupiedExitPoints = this.getOccupiedConnectionPoints();

        output += this.getName() + ": \n";
        output += "Coordinates: " + this.getLocation().toString() + "\n";
        output += "Exits:";
        for( let i = 0 ; i < occupiedExitPoints.length ; i++ ) {

            output+= " " + occupiedExitPoints[i] + " ";
        }

        output += "\n";
        output += "Max Exits: " + this.getMaxConnections();
        output += "\n\n";

        return output;
    }

    /**
     * Set the maximum amount of nodes that this node can connect to.
     *
     * @param {number} maxConnections
     * @returns {MazeNode}
     */
    public setMaxConnections(maxConnections: number) : MazeNode {

        this.maxExits = maxConnections;
        return this;
    }

    /**
     * Get the maximum amount of nodes that this node can connect to.
     *
     * @returns {number}
     */
    public getMaxConnections() : number {

        return this.maxExits;
    }

    /**
     * Toggle debugging messages
     *
     * @param {boolean} toggle
     */
    public static toggleDebug( toggle? : boolean ) {

        if ( toggle === undefined ) {

            MazeNode.debug = !MazeNode.debug;
        }
        else {
            MazeNode.debug = toggle;
        }
    }

    /**
     * Generate a unique key
     */
    public static generateKey() {

        let uuid = require('uuid/v4');
        return uuid();
    }
}
