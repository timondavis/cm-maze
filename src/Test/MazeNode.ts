import {expect} from 'chai';
import 'mocha';
import {MazeNode} from "../MazeNode";

describe( 'MazeNode', () => {

    it( 'connects bidirectionally to each node by default, but can be done in directed graph fashion', () => {

        let a = new MazeNode( 8 );
        let b = new MazeNode( 8 );
        let c = new MazeNode( 8 );

        // A < -- > B connect
        a.connectTo( b, 3 );

        expect( a.isNeighborsWith(b) ).to.be.true;
        expect( b.isNeighborsWith(a) ).to.be.true;

        expect( a.getNeighborAt( 3 ) ).to.be.equal( b );
        expect( b.getNeighborAt( 7 ) ).to.be.equal( a );

        // B -> C connect
        b.connectTo( c, 1, false );

        expect( b.isNeighborsWith( c ) ).to.be.true;
        expect( c.isNeighborsWith( b ) ).to.be.false;

        expect( b.getNeighborAt( 1 ) ).to.be.equal( c );
        expect( c.getNeighborAt( 5 ) ).to.be.undefined;
    });

    it( 'can be explicitly named', () => {

        const a = new MazeNode( 8 );
        a.setName( "My Name" );
        expect( a.getName() ).to.be.equal( "My Name" );
    });

    it ( 'can report on who its neighboring nodes are', function () {

        let a = new MazeNode( 4 ).setName("A");
        let neighborsOfA: MazeNode[];
        let neighborsOfB: MazeNode[];

        a.connectTo( new MazeNode( 4 ).setName( "C" ), 0, false );
        a.connectTo( new MazeNode( 4 ).setName( "B" ), 1 );
        a.connectTo( new MazeNode( 4 ).setName( "D" ), 2, false );

        neighborsOfA = a.getNeighbors();
        neighborsOfB = a.getNeighborAt( 1 ).getNeighbors();

        expect( neighborsOfA[0].getName() ).to.be.equal( "C" );
        expect( neighborsOfA[1].getName() ).to.be.equal( "B" );
        expect( neighborsOfA[2].getName() ).to.be.equal( "D" );

        expect( neighborsOfB[0].getName() ).to.be.equal( "A" );

        neighborsOfA = a.getNeighbors( true );
        neighborsOfB = a.getNeighborAt( 1 ).getNeighbors( true );

        expect( neighborsOfA ).to.have.lengthOf( 4 );
        expect( neighborsOfA[0].getName() ).to.be.equal( "C" );
        expect( neighborsOfA[1].getName() ).to.be.equal( "B" );
        expect( neighborsOfA[2].getName() ).to.be.equal( "D" );
        expect( neighborsOfA[3] ).to.be.undefined;

        expect( neighborsOfB ).to.have.lengthOf( 4 );
        expect( neighborsOfB[0] ).to.be.undefined;
        expect( neighborsOfB[1] ).to.be.undefined;
        expect( neighborsOfB[2] ).to.be.undefined;
        expect( neighborsOfB[3].getName() ).to.be.equal( "A" );
    });

    it ( 'can report on what its occupied exit points are', function() {

        let a = new MazeNode( 4 ).setName("A");
        let exitsOfA: number[];
        let exitsOfC: number[];

        a.connectTo( new MazeNode( 4 ).setName( "B" ), 3, false );
        a.connectTo( new MazeNode( 4 ).setName( "C" ), 1);
        a.connectTo( new MazeNode( 4 ).setName( "D" ), 2, false );

        exitsOfA = a.getOccupiedExitPoints();
        exitsOfC = a.getNeighborAt( 1 ).getOccupiedExitPoints();

        expect( a.getNeighborAt( exitsOfA[0] ).getName() ).to.be.equal( "C" );
        expect( a.getNeighborAt( exitsOfA[1] ).getName() ).to.be.equal( "D" );
        expect( a.getNeighborAt( exitsOfA[2] ).getName() ).to.be.equal( "B" );

        expect( a.getNeighborAt( 1 ).getNeighborAt( exitsOfC[0] ).getName() ).to.be.equal( "A" );
    });

    it( 'can report on what its open exit points are', () => {

        let exitsOpenOnA : number[];
        let a = new MazeNode( 8 );

        a.connectTo( new MazeNode( 8 ), 0 );
        a.connectTo( new MazeNode( 8 ), 2 );
        a.connectTo( new MazeNode( 8 ), 4 );
        a.connectTo( new MazeNode( 8 ), 6 );

        exitsOpenOnA = a.getOpenExitPoints();

        expect( exitsOpenOnA ).to.have.lengthOf( 4 );
        expect( exitsOpenOnA[0] ).to.be.equal( 1 );
        expect( exitsOpenOnA[1] ).to.be.equal( 3 );
        expect( exitsOpenOnA[2] ).to.be.equal( 5 );
        expect( exitsOpenOnA[3] ).to.be.equal( 7 );
    });
});