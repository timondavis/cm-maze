import {expect} from 'chai';
import 'mocha';
import {MazeNode} from "../../MazeNode";
import {Compass4, C4} from "../../Behavior/Compass4";
import {Compass8, C8} from "../../Behavior/Compass8";
import {MazeBuilder} from "../../MazeBuilder";
import {NodeLocation2D} from "../../MazeCoordinates/NodeLocation2D";
import {Cardinality} from "../../Behavior/Cardinality";
import {Maze} from "../../Maze";

describe( 'MazeNode', () => {

    let r = 10; // Default randomize ceiling

    it( 'connects bidirectionally to each node by default, but can be done in directed graph fashion', () => {

        let m = new Maze();

        let a = new MazeNode( new Compass8() );
        let b = new MazeNode( new Compass8() );
        let c = new MazeNode( new Compass8() );

        m.addNode(a, false);
        m.addNode(b, false);
        m.addNode(c, false);

        // A < -- > B connect
        a.connectTo( b, 3 );

        expect( a.isNeighborsWith(b) ).to.be.true;
        expect( b.isNeighborsWith(a) ).to.be.true;

        expect( a.getNeighborIdAt( 3 ) ).to.be.equal( b.getId() );
        expect( b.getNeighborIdAt( 7 ) ).to.be.equal( a.getId() );

        // B -> C connect
        b.connectTo( c, 1, false );

        expect( b.isNeighborsWith( c ) ).to.be.true;
        expect( c.isNeighborsWith( b ) ).to.be.false;

        expect( m.getNodeWithId(b.getNeighborIdAt( 1 ))).to.be.equal( c );
        expect( m.getNodeWithId(c.getNeighborIdAt( 5 ))).to.be.null;
    });

    it( 'can be explicitly named', () => {

        let m = new Maze();

        const a = new MazeNode(new Compass4);
        a.setName( "My Name" );
        expect( a.getName() ).to.be.equal( "My Name" );
    });

    it ( 'can report on who its neighboring nodes are', function () {

        let m = new Maze();

        let a = new MazeNode(new Compass4()).setName("A");
        let b = new MazeNode(new Compass4()).setName("B");
        let c = new MazeNode(new Compass4()).setName( "C" );
        let d = new MazeNode(new Compass4()).setName( "D" );

        m.addNode(a, false);
        m.addNode(b, false);
        m.addNode(c, false);
        m.addNode(d, false);

        let neighborsOfA: string[];
        let neighborsOfB: string[];

        a.connectTo( c, C4.N, false );
        a.connectTo( b, C4.E );
        a.connectTo( d, C4.S, false );

        neighborsOfA = a.getNeighborIds();
        neighborsOfB = m.getNodeWithId(a.getNeighborIdAt( 1 )).getNeighborIds();

        expect( m.getNodeWithId(neighborsOfA[0]).getName() ).to.be.equal( "C" );
        expect( m.getNodeWithId(neighborsOfA[1]).getName() ).to.be.equal( "B" );
        expect( m.getNodeWithId(neighborsOfA[2]).getName() ).to.be.equal( "D" );

        expect( m.getNodeWithId(neighborsOfB[0]).getName() ).to.be.equal( "A" );

        neighborsOfA = a.getNeighborIds( true );
        neighborsOfB = m.getNodeWithId(a.getNeighborIdAt( 1 )).getNeighborIds( true );

        expect( neighborsOfA ).to.have.lengthOf( 4 );
        expect( m.getNodeWithId(neighborsOfA[0]).getName() ).to.be.equal( "C" );
        expect( m.getNodeWithId(neighborsOfA[1]).getName() ).to.be.equal( "B" );
        expect( m.getNodeWithId(neighborsOfA[2]).getName() ).to.be.equal( "D" );
        expect( neighborsOfA[3] ).to.be.undefined;

        expect( neighborsOfB ).to.have.lengthOf( 4 );
        expect( neighborsOfB[0] ).to.be.undefined;
        expect( neighborsOfB[1] ).to.be.undefined;
        expect( neighborsOfB[2] ).to.be.undefined;
        expect( m.getNodeWithId(neighborsOfB[3]).getName() ).to.be.equal( "A" );
    });

    it ( 'can report on what its occupied exit points are', function() {

        let m = new Maze();

        let a = new MazeNode(new Compass4() ).setName("A");
        let b = new MazeNode(new Compass4() ).setName("B");
        let c = new MazeNode(new Compass4() ).setName("C");
        let d = new MazeNode(new Compass4() ).setName("D");

        m.addNode(a, false);
        m.addNode(b, false);
        m.addNode(c, false);
        m.addNode(d, false);

        let exitsOfA: number[];
        let exitsOfC: number[];

        a.connectTo( b, C4.W, false );
        a.connectTo( c, C4.E );
        a.connectTo( d, C4.S, false );

        exitsOfA = a.getOccupiedConnectionPoints();
        exitsOfC = m.getNodeWithId(a.getNeighborIdAt( 1 )).getOccupiedConnectionPoints();

        expect( m.getNodeWithId(a.getNeighborIdAt( exitsOfA[0] )).getName() ).to.be.equal( "C" );
        expect( m.getNodeWithId(a.getNeighborIdAt( exitsOfA[1] )).getName() ).to.be.equal( "D" );
        expect( m.getNodeWithId(a.getNeighborIdAt( exitsOfA[2] )).getName() ).to.be.equal( "B" );

        expect( m.getNodeWithId(m.getNodeWithId(a.getNeighborIdAt( 1 )).getNeighborIdAt( exitsOfC[0] )).getName() ).to.be.equal( "A" );
    });

    it( 'can report on what its open exit points are', () => {

        let m = new Maze();

        let exitsOpenOnA : number[];
        let exitsOccupiedOnA: number[];
        let a = new MazeNode( new Compass8() );

        a.connectTo( new MazeNode(new Compass8() ), C8.N );
        a.connectTo( new MazeNode(new Compass8() ), C8.E );
        a.connectTo( new MazeNode(new Compass8() ), C8.S );
        a.connectTo( new MazeNode(new Compass8() ), C8.W );

        exitsOpenOnA = a.getAvailableConnectionPoints();
        exitsOccupiedOnA = a.getOccupiedConnectionPoints();

        expect( exitsOpenOnA ).to.have.lengthOf( 4 );
        expect( exitsOpenOnA[0] ).to.be.equal( 1 );
        expect( exitsOpenOnA[1] ).to.be.equal( 3 );
        expect( exitsOpenOnA[2] ).to.be.equal( 5 );
        expect( exitsOpenOnA[3] ).to.be.equal( 7 );

        expect( exitsOccupiedOnA[0] ).to.be.equal( 0 );
        expect( exitsOccupiedOnA[1] ).to.be.equal( 2 );
        expect( exitsOccupiedOnA[2] ).to.be.equal( 4 );
        expect( exitsOccupiedOnA[3] ).to.be.equal( 6 );

    });

    it( 'confirms whether another supplied node is neighbors with this node', () => {

        let m = new Maze();

        let a = new MazeNode(new Compass4() );
        let b = new MazeNode(new Compass4() );
        let c = new MazeNode(new Compass4() );
        let d = new MazeNode(new Compass4() );

        m.addNode(a, false);
        m.addNode(b, false);
        m.addNode(c, false);
        m.addNode(d, false);

        a.connectTo( b, C4.NORTH );
        a.connectTo( d, C4.WEST );
        b.connectTo( c, C4.WEST );
        d.connectTo( c, C4.NORTH );

        expect( a.isNeighborsWith( b ) ).to.be.true;
        expect( a.isNeighborsWith( d ) ).to.be.true;
        expect( c.isNeighborsWith( b ) ).to.be.true;
        expect( d.isNeighborsWith( c ) ).to.be.true;

        expect( a.isNeighborsWith( c ) ).to.be.false;
        expect( c.isNeighborsWith( a ) ).to.be.false;
        expect( b.isNeighborsWith( d ) ).to.be.false;
    });

    it( 'can accept and report 2 dimensional coordinates (as instances of NodeLocation2D objects)', () => {

        let m = new Maze();

        let a = new MazeNode( new Compass8() );
        const coords = [ MazeBuilder.rand( r ), MazeBuilder.rand( r ) ];

        a.setLocation( new NodeLocation2D( coords ) );
        expect( a.getLocation().toString() ).to.be.equal( new NodeLocation2D( coords ).toString() );
    });

    it( 'reports on whether a given exit point on the node is occupied or empty (two separate functions)', () => {

        let m = new Maze();

        let a = new MazeNode(new Compass4() );
        let b = new MazeNode(new Compass4() );
        let c = new MazeNode(new Compass4() );

        a.connectTo( b, C4.NORTH );
        a.connectTo( c, C4.SOUTH );

        expect( a.isConnectionPointOpen(0) ).to.be.false; expect( a.isConnectionPointOpen(1) ).to.be.true;
        expect( a.isConnectionPointOpen(2) ).to.be.false; expect( a.isConnectionPointOpen(3) ).to.be.true;
        expect( a.isConnectionPointOccupied(0) ).to.be.true; expect( a.isConnectionPointOccupied(1) ).to.be.false;
        expect( a.isConnectionPointOccupied(2) ).to.be.true; expect( a.isConnectionPointOccupied(3) ).to.be.false;

        expect( b.isConnectionPointOpen(0) ).to.be.true; expect( b.isConnectionPointOpen(1) ).to.be.true;
        expect( b.isConnectionPointOpen(2) ).to.be.false; expect( b.isConnectionPointOpen(3) ).to.be.true;
        expect( b.isConnectionPointOccupied(0) ).to.be.false; expect( b.isConnectionPointOccupied(1) ).to.be.false;
        expect( b.isConnectionPointOccupied(2) ).to.be.true; expect( b.isConnectionPointOccupied(3) ).to.be.false;

        expect( c.isConnectionPointOpen(0) ).to.be.false; expect( c.isConnectionPointOpen(1) ).to.be.true;
        expect( c.isConnectionPointOpen(2) ).to.be.true; expect( c.isConnectionPointOpen(3) ).to.be.true;
        expect( c.isConnectionPointOccupied(0) ).to.be.true; expect( c.isConnectionPointOccupied(1) ).to.be.false;
        expect( c.isConnectionPointOccupied(2) ).to.be.false; expect( c.isConnectionPointOccupied(3) ).to.be.false;
    });

    it( 'reports the cardinality behavior instance assigned to the node on demand', () => {

        let m = new Maze();

        let a = new MazeNode(new Compass4() );

        expect( a.getCardinality() ).to.be.instanceOf( Cardinality );
        expect( a.getCardinality() ).to.be.instanceOf( Compass4 );
        expect( a.getCardinality() ).not.to.be.instanceOf( Compass8 );
    });

    it( 'accepts and respects limits to the amount of nodes that this node can be connected to', () => {

        let m = new Maze();

        let unlimited = new MazeNode(new Compass4() );
        let limitedToOne = new MazeNode(new Compass4() );
        let limitedToThree = new MazeNode(new Compass4() );

        limitedToOne.setMaxConnections(1);
        limitedToThree.setMaxConnections(3);

        for ( let i = 0 ; i < 4 ; i++ ) {

            expect( () => { unlimited.connectTo( new MazeNode(new Compass4() ), i ) } )
                .not.to.throw();

            //
            if ( i < 1 ) {
                expect( () => { limitedToOne.connectTo( new MazeNode(new Compass4() ), i ) } )
                    .not.to.throw();
            } else {
                expect( () => { limitedToOne.connectTo( new MazeNode(new Compass4() ), i ) } )
                    .to.throw();
            }

            if ( i < 3 ) {

                expect( () => { limitedToThree.connectTo( new MazeNode(new Compass4() ), i ) } )
                    .not.to.throw();
            } else {
                expect( () => { limitedToThree.connectTo( new MazeNode(new Compass4() ), i ) } )
                    .to.throw();
            }
        }
    });
});
