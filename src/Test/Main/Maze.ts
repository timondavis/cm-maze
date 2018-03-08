import {MazeBuilder} from "../../MazeBuilder";
import {Maze} from "../../Maze";
import {Compass4, C4} from "../../Behavior/Compass4";
import {expect} from 'chai';
import 'mocha';
import {MazeNode} from "../../MazeNode";
import {NodeLocation2D} from "../../MazeCoordinates/NodeLocation2D";

describe( 'Maze', () => {

    let m = new Maze();

    it( 'allows CardinalityBehavior to be set and reported on the Maze', () => {

        m = new Maze();
        m.setCardinalityBehavior( new Compass4() );

       expect( m.getCardinalityBehavior() ).to.be.instanceOf( Compass4 );
    });

    it( 'can be assigned a node dictionary, and it can report the dictionary back to a caller', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );
        let d = new MazeNode( new Compass4() );
        let e = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};
        let capturedNodeCollection: { [key:string] : MazeNode };

        a.setCoordinates( new NodeLocation2D( [1, 1] ));
        b.setCoordinates( new NodeLocation2D( [1, 2] ));
        c.setCoordinates( new NodeLocation2D( [2, 1] ));
        d.setCoordinates( new NodeLocation2D( [2, 0] ));
        e.setCoordinates( new NodeLocation2D( [0, 1] ));

        nodeCollection[ a.getCoordinates().toString() ] = a;
        nodeCollection[ b.getCoordinates().toString() ] = b;
        nodeCollection[ c.getCoordinates().toString() ] = c;
        nodeCollection[ d.getCoordinates().toString() ] = d;
        nodeCollection[ e.getCoordinates().toString() ] = e;

        m.setNodes( nodeCollection );
        capturedNodeCollection = m.getNodes();

        expect( capturedNodeCollection[a.getCoordinates().toString() ] ).to.be.equal( a );
        expect( capturedNodeCollection[b.getCoordinates().toString() ] ).to.be.equal( b );
        expect( capturedNodeCollection[c.getCoordinates().toString() ] ).to.be.equal( c );
        expect( capturedNodeCollection[d.getCoordinates().toString() ] ).to.be.equal( d );
        expect( capturedNodeCollection[e.getCoordinates().toString() ] ).to.be.equal( e );
    });

    it( 'can return nodes residing at the indicated coordinates', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setCoordinates( new NodeLocation2D( [1, 1] ));
        b.setCoordinates( new NodeLocation2D( [1, 2] ));

        nodeCollection[ a.getCoordinates().toString() ] = a;
        nodeCollection[ b.getCoordinates().toString() ] = b;

        m.setNodes( nodeCollection );

        expect( m.getNode( new NodeLocation2D( [1,2] ))).to.be.equal( b );
    });

    it( 'facilitates definition of "starting" and "ending" nodes', () =>  {
        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setCoordinates( new NodeLocation2D( [1, 1] ));
        b.setCoordinates( new NodeLocation2D( [1, 2] ));
        c.setCoordinates( new NodeLocation2D( [2, 1] ));

        m.setStartNode( a );
        m.setFinishNode( c );

        nodeCollection[ a.getCoordinates().toString() ] = a;
        nodeCollection[ b.getCoordinates().toString() ] = b;
        nodeCollection[ c.getCoordinates().toString() ] = c;

        m.setNodes( nodeCollection );

        expect( m.getStartNode() ).to.be.equal( a );
        expect( m.getFinishNode() ).to.be.equal( c );
    });

    it( 'it should have accurate setters and getters for dimensional size', () => {

        m = new Maze();
        let size: number[];

        m.setDimensions( [4, 3] );
        size = m.getDimensions();

        expect( size[0] ).to.be.equal( 4 );
        expect( size[1] ).to.be.equal( 3 );
    });

    it( 'it should report on the current amount of nodes included in the maze', () => {

        let mb: MazeBuilder = new MazeBuilder();
        let maze: Maze = mb.buildMaze();

        let contents = maze.getNodes();

        expect( maze.getSize() ).to.be.equal( Object.keys( contents ).length );
    });

    it( 'has a working getter/setter for the current node pointer', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setCoordinates( new NodeLocation2D( [1, 1] ));
        b.setCoordinates( new NodeLocation2D( [1, 2] ));
        c.setCoordinates( new NodeLocation2D( [2, 1] ));

        nodeCollection[ a.getCoordinates().toString() ] = a;
        nodeCollection[ b.getCoordinates().toString() ] = b;
        nodeCollection[ c.getCoordinates().toString() ] = c;

        m.setNodes( nodeCollection );
        m.setCurrentNode( b );

        expect( m.getCurrentNode() ).to.be.equal( b );
    });

    it( 'facilitates traversal through cardinal movement', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );
        let d = new MazeNode( new Compass4() );
        let e = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setCoordinates( new NodeLocation2D( [1, 1] )).setName( "A" );
        b.setCoordinates( new NodeLocation2D( [1, 2] )).setName( "B" );
        c.setCoordinates( new NodeLocation2D( [2, 1] )).setName( "C" );
        d.setCoordinates( new NodeLocation2D( [2, 0] )).setName( "D" );
        e.setCoordinates( new NodeLocation2D( [0, 1] )).setName( "E" );

        a.connectTo( e, C4.N );
        a.connectTo( c, C4.E );
        a.connectTo( b, C4.S );
        b.connectTo( d, C4.W );

        nodeCollection[ a.getCoordinates().toString() ] = a;
        nodeCollection[ b.getCoordinates().toString() ] = b;
        nodeCollection[ c.getCoordinates().toString() ] = c;
        nodeCollection[ d.getCoordinates().toString() ] = d;
        nodeCollection[ e.getCoordinates().toString() ] = e;

        m.setNodes( nodeCollection );
        m.setCurrentNode( a );

        expect( m.move( C4.N ) ).to.be.equal( e );
        expect( m.move( C4.S ) ).to.be.equal( a );
        expect( m.move( C4.E ) ).to.be.equal( c );
        expect( m.move( C4.W ) ).to.be.equal( a );
        expect( m.move( C4.S ) ).to.be.equal( b );
        expect( m.move( C4.W ) ).to.be.equal( d );
    });
});