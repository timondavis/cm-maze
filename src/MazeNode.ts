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
     * @param {number} exitPoint        The cardinality point you want to connect this node with
     * @param {boolean} autoConnect     Defaults to TRUE.  If true, the connectTo node will point back to this node.
     * @returns {MazeNode}
     */
    public connectTo( node: MazeNode, exitPoint: number, autoConnect: boolean = true ): MazeNode  {

        if ( exitPoint >= this.cardinality.getCardinality() || exitPoint < 0 ) {
            throw( "Indicated exitPoint value exceeds maximum MazeNode cardinality range" );
        }

        if ( ! this.neighbors[exitPoint] === undefined ) {
            throw( "Indicated exitPoint position is already occupied.  Two exits/entries may not occupy the same exitPoint" );
        }

        this.neighbors[exitPoint] = node;

        if ( autoConnect ) {

            let entryPoint = this.cardinality.getOpposingPoint( exitPoint );
            if ( autoConnect && node.isPositionOccupied( entryPoint ) ) {
                throw( "Cannot auto-connect to proposed MazeNode.  The automated connectTo node entry position is occupied." );
            }

            node.connectTo( this, entryPoint, false );
        }

        return this;
    }

    /**
     * Find out of the indicated position of cardinality is occupied on this node
     *
     * @param {number} exitPosition
     * @returns {boolean}
     */
    public isPositionOccupied( exitPosition : number ) : boolean {

        return( this.neighbors[exitPosition] === null );
    }

    /**
     * Get a connected node by indicating the exit (cardinality point) that leads to the node.
     *
     * @param {number} cardinalityPoint
     * @returns {MazeNode}
     */
    public getNeighborAt( exitPosition : number ) {

        if ( exitPosition >= this.cardinality.getCardinality() || exitPosition < 0 ) {
            throw( "Indicated cardinality point is outside of the valid range" );
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
     * Get a list of occupied exit points on the node.
     *
     * @returns {MazeNode[]}
     */
    public getOccupiedExitPoints() : number[] {

        let points: number[] = [];

        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for ( let i = 0 ; i < this.cardinality.getCardinality() ; i++ ) {

            if ( this.neighbors[i] != undefined ) {

                points.push( i );
            }
        }

        return points;
    }

    /**
     * Get a list of unoccupied exit points on the node
     *
     * @returns {number[]}
     */
    public getOpenExitPoints() : number[] {

        let points: number[] = [];

        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for ( let i = 0 ; i < this.cardinality.getCardinality() ; i++ ) {

           if ( this.neighbors[i] == undefined ) {
               points.push( i );
           }
        }

        return points;
    }

    /**
     * Get an array of neighboring nodes.
     *
     * @boolean {includeOpenNodes}  Get the array with null nodes in-tact.  Useful for mapping.  Defaults to FALSE.
     * @returns {MazeNode[]}
     */
    public getNeighbors( includeOpenNodes = false ): MazeNode[] {

        let points: MazeNode[] = [];

        /* @TODO o(n) where n is cardinality.  Can this be improved? */
        for ( let i = 0 ; i < this.cardinality.getCardinality() ; i++ ) {

            if ( this.neighbors[i] != undefined ) {

                points.push( this.neighbors[i] );
            } else if ( includeOpenNodes ) {

                points.push( this.neighbors[i] );
            }
        }

        return points;
    }

    /**
     * Find out whether an entry/exit point on the node is empty.
     *
     * @param {number} point
     * @returns {boolean}
     */
    public isPointOpen( point: number ) {

        this.cardinality.validatePosition( point );

        return ( this.neighbors[point] === undefined );
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