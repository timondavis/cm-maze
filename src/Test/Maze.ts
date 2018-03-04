import {MazeBuilder} from "../MazeBuilder";
import {Maze} from "../Maze";
import {CardinalityBehaviorFour2D, CB4_CARD} from "../Behavior/CardinalityBehaviorFour2D";
import {expect} from 'chai';
import 'mocha';
import {MazeNode} from "../MazeNode";
import {MazeCoordinates2D} from "../MazeCoordinates/MazeCoordinates2D";

describe( 'Maze', () => {

    let m = new Maze();

    it( 'allows CardinalityBehavior to be set and reported on the Maze', () => {

        m = new Maze();
        m.setCardinalityBehavior( new CardinalityBehaviorFour2D() );

       expect( m.getCardinalityBehavior() ).to.be.instanceOf( CardinalityBehaviorFour2D );
    });

    it( 'can be assigned a node dictionary, and it can report the dictionary back to a caller', () => {

        m = new Maze();

        let a = new MazeNode( new CardinalityBehaviorFour2D() );
        let b = new MazeNode( new CardinalityBehaviorFour2D() );
        let c = new MazeNode( new CardinalityBehaviorFour2D() );
        let d = new MazeNode( new CardinalityBehaviorFour2D() );
        let e = new MazeNode( new CardinalityBehaviorFour2D() );

        let nodeCollection: { [key:string] : MazeNode } = {};
        let capturedNodeCollection: { [key:string] : MazeNode };

        a.setCoordinates( new MazeCoordinates2D( [1, 1] ));
        b.setCoordinates( new MazeCoordinates2D( [1, 2] ));
        c.setCoordinates( new MazeCoordinates2D( [2, 1] ));
        d.setCoordinates( new MazeCoordinates2D( [2, 0] ));
        e.setCoordinates( new MazeCoordinates2D( [0, 1] ));

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

        let a = new MazeNode( new CardinalityBehaviorFour2D() );
        let b = new MazeNode( new CardinalityBehaviorFour2D() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setCoordinates( new MazeCoordinates2D( [1, 1] ));
        b.setCoordinates( new MazeCoordinates2D( [1, 2] ));

        nodeCollection[ a.getCoordinates().toString() ] = a;
        nodeCollection[ b.getCoordinates().toString() ] = b;

        m.setNodes( nodeCollection );

        expect( m.getNode( new MazeCoordinates2D( [1,2] ))).to.be.equal( b );
    });

    it( 'facilitates definition of "starting" and "ending" nodes', () =>  {
        m = new Maze();

        let a = new MazeNode( new CardinalityBehaviorFour2D() );
        let b = new MazeNode( new CardinalityBehaviorFour2D() );
        let c = new MazeNode( new CardinalityBehaviorFour2D() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setCoordinates( new MazeCoordinates2D( [1, 1] ));
        b.setCoordinates( new MazeCoordinates2D( [1, 2] ));
        c.setCoordinates( new MazeCoordinates2D( [2, 1] ));

        m.setStartNode( a );
        m.setFinishNode( c );

        nodeCollection[ a.getCoordinates().toString() ] = a;
        nodeCollection[ b.getCoordinates().toString() ] = b;
        nodeCollection[ c.getCoordinates().toString() ] = c;

        m.setNodes( nodeCollection );

        expect( m.getStartNode() ).to.be.equal( a );
        expect( m.getFinishNode() ).to.be.equal( c );
    });
});