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
        m.setCardinality( new Compass4() );

       expect( m.getCardinality() ).to.be.instanceOf( Compass4 );
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

        a.setLocation( new NodeLocation2D( [1, 1] ));
        b.setLocation( new NodeLocation2D( [1, 2] ));
        c.setLocation( new NodeLocation2D( [2, 1] ));
        d.setLocation( new NodeLocation2D( [2, 0] ));
        e.setLocation( new NodeLocation2D( [0, 1] ));

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;
        nodeCollection[ c.getLocation().toString() ] = c;
        nodeCollection[ d.getLocation().toString() ] = d;
        nodeCollection[ e.getLocation().toString() ] = e;

        m.setNodes( nodeCollection );
        capturedNodeCollection = m.getNodes();

        expect( capturedNodeCollection[a.getLocation().toString() ] ).to.be.equal( a );
        expect( capturedNodeCollection[b.getLocation().toString() ] ).to.be.equal( b );
        expect( capturedNodeCollection[c.getLocation().toString() ] ).to.be.equal( c );
        expect( capturedNodeCollection[d.getLocation().toString() ] ).to.be.equal( d );
        expect( capturedNodeCollection[e.getLocation().toString() ] ).to.be.equal( e );
    });

    it( 'can return nodes residing at the indicated coordinates', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setLocation( new NodeLocation2D( [1, 1] ));
        b.setLocation( new NodeLocation2D( [1, 2] ));

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;

        m.setNodes( nodeCollection );

        expect( m.getNode( new NodeLocation2D( [1,2] ))).to.be.equal( b );
    });

    it( 'facilitates definition of "starting" and "ending" nodes', () =>  {
        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setLocation( new NodeLocation2D( [1, 1] ));
        b.setLocation( new NodeLocation2D( [1, 2] ));
        c.setLocation( new NodeLocation2D( [2, 1] ));

        m.setStartNode( a );
        m.setFinishNode( c );

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;
        nodeCollection[ c.getLocation().toString() ] = c;

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

        a.setLocation( new NodeLocation2D( [1, 1] ));
        b.setLocation( new NodeLocation2D( [1, 2] ));
        c.setLocation( new NodeLocation2D( [2, 1] ));

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;
        nodeCollection[ c.getLocation().toString() ] = c;

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

        a.setLocation( new NodeLocation2D( [1, 1] )).setName( "A" );
        b.setLocation( new NodeLocation2D( [1, 2] )).setName( "B" );
        c.setLocation( new NodeLocation2D( [2, 1] )).setName( "C" );
        d.setLocation( new NodeLocation2D( [2, 0] )).setName( "D" );
        e.setLocation( new NodeLocation2D( [0, 1] )).setName( "E" );

        a.connectTo( e, C4.N );
        a.connectTo( c, C4.E );
        a.connectTo( b, C4.S );
        b.connectTo( d, C4.W );

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;
        nodeCollection[ c.getLocation().toString() ] = c;
        nodeCollection[ d.getLocation().toString() ] = d;
        nodeCollection[ e.getLocation().toString() ] = e;

        m.setNodes( nodeCollection );
        m.setCurrentNode( a );

        expect( m.move( C4.N ) ).to.be.equal( e );
        expect( m.move( C4.S ) ).to.be.equal( a );
        expect( m.move( C4.E ) ).to.be.equal( c );
        expect( m.move( C4.W ) ).to.be.equal( a );
        expect( m.move( C4.S ) ).to.be.equal( b );
        expect( m.move( C4.W ) ).to.be.equal( d );
    });

    it( 'also returns maze nodes back as an array on demand', () => {
        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setLocation( new NodeLocation2D( [1, 1] ));
        b.setLocation( new NodeLocation2D( [1, 2] ));
        c.setLocation( new NodeLocation2D( [1, 3] ));

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;

        m.setNodes( nodeCollection );

        let nodesArray = m.getNodesArray();

        expect( nodesArray.indexOf(a) ).to.not.be.equal( -1 );
        expect( nodesArray.indexOf(b) ).to.not.be.equal( -1 );
        expect( nodesArray.indexOf(c) ).to.be.equal( -1 );
    });

    it ( 'facilitates forEeach traversal by employing a callback function parameter', () => {

        m = new Maze();

        let a = new MazeNode( new Compass4() );
        let b = new MazeNode( new Compass4() );
        let c = new MazeNode( new Compass4() );

        let nodeCollection: { [key:string] : MazeNode } = {};

        a.setLocation( new NodeLocation2D( [1, 1] ));
        a.setName( a.getLocation().toString() );
        b.setLocation( new NodeLocation2D( [1, 2] ));
        b.setName( b.getLocation().toString() );
        c.setLocation( new NodeLocation2D( [1, 3] ));
        c.setName( c.getLocation().toString() );

        nodeCollection[ a.getLocation().toString() ] = a;
        nodeCollection[ b.getLocation().toString() ] = b;

        m.setNodes( nodeCollection );

        let nodesArray: MazeNode[];
        let nodesNames: string[];
        nodesArray = [];
        nodesNames = [];
        m.forEachNode((node, key, nodes) => {
            nodesArray.push(node);
            nodesNames.push(key);
            expect(nodes).to.have.property(a.getLocation().toString());
            expect(nodes).to.have.property(b.getLocation().toString());
            expect(nodes).not.to.have.property(c.getLocation().toString());
        });

        expect( nodesArray ).to.have.lengthOf( 2 );
        expect( nodesNames ).to.have.lengthOf( 2 );
        expect( nodesArray.indexOf( a ) ).not.to.be.equal( -1 );
        expect( nodesArray.indexOf( b ) ).not.to.be.equal( -1 );
        expect( nodesArray.indexOf( c ) ).to.be.equal( -1 );

        console.log( a.getName() );
        //console.log( nodesNames[0] );
        expect( nodesNames.indexOf( a.getName() )).not.to.be.equal( -1 );
        expect( nodesNames.indexOf( b.getName() )).not.to.be.equal( -1 );
        expect( nodesNames.indexOf( c.getName() )).to.be.equal( -1 );

    });

});