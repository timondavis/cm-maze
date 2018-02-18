import {MazeCoordinates} from "./MazeCoordinates/MazeCoordinates";
import {CardinalityBehavior} from "./Behavior/CardinalityBehavior";

export class MazeNode {

    protected neighbors : MazeNode[];
    protected cardinality : CardinalityBehavior;
    protected name = "";
    protected coordinates : MazeCoordinates;

    public constructor( cardinality: CardinalityBehavior, coordinates? : MazeCoordinates ) {

        this.cardinality = cardinality;
        this.neighbors = new Array<MazeNode>( cardinality.getCardinality() );

        this.coordinates = ( coordinates ) ? coordinates : this.cardinality.generateCoordinates();
    }

    /**
     * Connects one MazeNode instance to another.  Implicitly bi-directional, but directed edges between nodes
     * can be crated by passing in the autoConnect parameter as false.
     *
     * @param {MazeNode} node           The node to connect to this node
     * @param {number} exitPosition     The cardinality position you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will position back to this node.
     * @returns {MazeNode}
     */
    public connectTo( node: MazeNode, exitPosition: number, autoConnect: boolean = true ): MazeNode  {

        if ( exitPosition >= this.cardinality.getCardinality() || exitPosition < 0 ) {
            throw( "Indicated exitPosition value exceeds maximum MazeNode cardinality range" );
        }

        if ( ! this.neighbors[exitPosition] === undefined ) {
            throw( "Indicated exitPosition exitPosition is already occupied.  Two exits/entries may not occupy the same exitPosition" );
        }

        this.neighbors[exitPosition] = node;

        if ( autoConnect ) {

            let entryPosition = this.cardinality.getOpposingPoint( exitPosition );
            if ( autoConnect && node.isPositionOccupied( entryPosition ) ) {
                throw( "Cannot auto-connect to proposed MazeNode.  The automated connectTo node entry exitPosition is occupied." );
            }

            node.connectTo( this, entryPosition, false );
        }

        return this;
    }

    /**
     * Find out of the indicated exitPosition of cardinality is occupied on this node
     *
     * @param {number} exitPosition
     * @returns {boolean}
     */
    public isPositionOccupied( exitPosition : number ) : boolean {

        return( this.neighbors[exitPosition] === null );
    }

    /**
     * Get a connected node by indicating the exit (cardinality position) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {MazeNode}
     */
    public getNeighborAt( exitPosition : number ) {

        if ( exitPosition >= this.cardinality.getCardinality() || exitPosition < 0 ) {
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

        for ( let i = 0 ; i < this.cardinality.getCardinality() ; i++ ) {

            if ( node == this.neighbors[i] ) { return true; }
        }

        return false;
    }

    /**
     * Get a list of occupied exit positions on the node.
     *
     * @returns {MazeNode[]}
     */
    public getOccupiedExitPoints() : number[] {

        let positions: number[] = [];

        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for ( let i = 0 ; i < this.cardinality.getCardinality() ; i++ ) {

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
    public getOpenExitPoints() : number[] {

        let positions: number[] = [];

        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for ( let i = 0 ; i < this.cardinality.getCardinality() ; i++ ) {

           if ( this.neighbors[i] == undefined ) {
               positions.push( i );
           }
        }

        return positions;
    }

    /**
     * Get an array of neighboring nodes.
     *
     * @boolean {includeOpenNodes}  Get the array with null nodes in-tact.  Useful for mapping.  Defaults to FALSE.
     * @returns {MazeNode[]}
     */
    public getNeighbors( includeOpenNodes = false ): MazeNode[] {

        let positions: MazeNode[] = [];

        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for ( let i = 0 ; i < this.cardinality.getCardinality() ; i++ ) {

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
     * @param {number} position
     * @returns {boolean}
     */
    public isPointOpen( position: number ) {

        this.cardinality.validatePosition( position );

        return ( this.neighbors[position] === undefined );
    }

    /**
     * Set the coordinates for this node
     *
     * @param {MazeCoordinates} coordinates
     * @returns {this}
     */
    public setCoordinates( coordinates: MazeCoordinates) {

        this.coordinates = coordinates;
        return this;
    }

    /**
     * Get the coordinates for this node
     * @returns {MazeCoordinates}
     */
    public getCoordinates() : MazeCoordinates {

        return this.coordinates;
    }
}