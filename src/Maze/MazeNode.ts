import {NodeLocation} from "../MazeCoordinates/NodeLocation";
import {Cardinality} from "../Behavior/Cardinality";
import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface IMazeNode extends ISerializableModel {
	cardinality : Cardinality;
	indexId: number;
	mazeNodeId: string;
	name: string;
	neighbors : string[];
	maxExits: number;
	coordinates : NodeLocation;
	contents: Map<string, Map<any, any>>;
}

/**
 * @class MazeNode
 *
 * The MazeNode represents a node or 'room' in a maze.  It is designed to facilitate connection and traversal
 * to other MazeNode instances.
 */
export class MazeNode extends SerializableModel {

	public static debug: boolean = false;
	protected state: IMazeNode;
	private static indexIdCounter: number = 0;

    public constructor(cardinality: Cardinality, id: string = null, coordinates? : NodeLocation, maxConnections: number = null) {
		super();
    	this.state = {
			cardinality: cardinality,
			contents: new Map<string, Map<any, any>>(),
			coordinates: ( coordinates ) ? coordinates : cardinality.generateNodeLocation(),
			indexId: MazeNode.indexIdCounter,
			maxExits: (maxConnections) ? maxConnections :cardinality.getConnectionPointCount(),
			mazeNodeId:  (id) ? id : MazeNode.generateKey(),
			name: "",
			neighbors: new Array<string>(cardinality.getConnectionPointCount())
		};
    }

    public get id(): string {
        return this.state.mazeNodeId;
    }

    private get indexId(): number {
    	return this.state.indexId
	}

	public set location(value: NodeLocation) {
    	this.state.coordinates = value;
	}

	public get location() : NodeLocation {
		return this.state.coordinates;
	}

	public get locationId() : string {
		return this.location.toString();
	}

	public get neighbors() : string[]{
		return this.state.neighbors;
	}

	public set name( name: string ) {
		this.state.name = name;
	}

	public get name(): string {
		return this.state.name;
	}

	public set maxConnections(maxConnections: number) {
		this.state.maxExits = maxConnections;
	}

	public get maxConnections() : number {
		return this.state.maxExits;
	}

	public get cardinality() : Cardinality {
		return this.state.cardinality;
	}

	public get contents() : Map<string, Map<any, any>>  {
    	return this.state.contents;
	}

	public set contents(contents: Map<string, Map<any, any>>) {
    	this.state.contents = contents;
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

        this.neighbors[exitPosition] = node.id;

        if ( autoConnect ) {

            if ( ! node.isConnectionPointOpen(node.cardinality.getOpposingConnectionPoint(exitPosition)) ) {

                throw( "Two-Way conneciton failed.  Indicated node will not tolerate any more additonal connections, " +
                    "maximum reached.")
            }

            let entryPosition = this.cardinality.getOpposingConnectionPoint( exitPosition );

            node.connectTo( this, entryPosition, false );

            if ( MazeNode.debug ) {

                console.log( "CONNECTING NODES\n" );
                console.log( this.name + " (" + exitPosition + ")  <=> (" + entryPosition + ") " + node.name );
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
     * Find out if the indicated node indicated to this node directly, as a neighbor
     *
     * @param {MazeNode} node
     * @returns {boolean}
     */
    public isNeighborsWith( node: MazeNode ): boolean {

        for (let i = 0 ; i < this.cardinality.getConnectionPointCount() ; i++ ) {

            if (node.id == this.neighbors[i]) { return true; }
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

        if ( this.maxConnections >= 0 && (this.getOccupiedConnectionPoints().length + 1) > this.maxConnections) {
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
     * Stringify the output for human console consumption
     *
     * @returns {string}
     */
    public toString() : string {

        let output: string = "";
        let occupiedExitPoints = this.getOccupiedConnectionPoints();

        output += this.name + ": \n";
        output += "Coordinates: " + this.location.toString() + "\n";
        output += "Exits:";
        for( let i = 0 ; i < occupiedExitPoints.length ; i++ ) {

            output+= " " + occupiedExitPoints[i] + " ";
        }

        output += "\n";
        output += "Max Exits: " + this.maxConnections;
        output += "\n\n";

        return output;
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
